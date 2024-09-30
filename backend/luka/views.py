from django.shortcuts import redirect, render
import json
from quopri import encodestring
import django
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import PostSerializer, CustomUserSerializer, FlaggingSerializer, PostSerializer
from .models import Post, CustomUser, Flagging
from rest_framework.authtoken.models import Token
from django.db.models import Count, F

# Create your views here.


class CreatePostView(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by("-id")
    serializer_class = PostSerializer
    
class CreateFlaggingView(viewsets.ModelViewSet):
    queryset = Flagging.objects.all().order_by("-id")
    serializer_class = FlaggingSerializer

class ListFlagView(viewsets.ModelViewSet):
    serializer_class = FlaggingSerializer
    queryset = Flagging.objects.all()

    def list(self, request, *args, **kwargs):
        postnum = self.request.query_params.get("post")
        
        # Lager en filtrert query 
        filteredQuery = Flagging.objects.filter(post=postnum)
        # Serializer databasespørringen
        page = self.paginate_queryset(filteredQuery)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(filteredQuery, many=True)

        # Lager en Response og returnerer den (sender svar tilbake til brukeren)
        return Response(serializer.data)



class ListPostView(viewsets.ModelViewSet):
    """
    Class for handling GET requets to localhost:8000/api/list-post

    GET request parameters format:
    params: {filters:[{filteron:'field', filterop:'operator', filtervalue:'value'}, {filteron:'field', filterop:'operator', filtervalue:'value'}, ...], sortattr:'(-)field'}

    Valid values:
    filteron: All fields of Post database model (location, price, etc.)
    filterop: '<=', '>=', '<', '>', '=='
    filtervalue: String or integer value comparable to the value stored int the 'filteron' field.
    sortattr: All fields of Post database model (location, price, etc.). Can be prefixed with '-' to reverse order
    """
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def list(self, request, *args, **kwargs):

        # Slår sammen et felt og en operator til en string som kan brukes som spørring til databasen
        def createFilterString(keyword, operator):
            startString = keyword
            if operator == ">=":
                endstring = "__gte"
            elif operator == "<=":
                endstring = "__lte"
            elif operator == ">":
                endstring = "__gt"
            elif operator == "<":
                endstring = "__lt"
            elif operator == "==":
                endstring = "__iexact"
            elif operator == "===":
                endstring = "__exact"
            elif operator == "search":
                endstring = "__icontains"
            else:
                print("Invalid operator:", operator)
                raise ValueError
            return startString + endstring

        # Henter ut verdier ifra parametere i spørringen
        filterList = list(self.request.query_params.getlist('filters[]'))
        orderAttr = self.request.query_params.get("sortattr")

        paramFilter = {}

        # Går gjennom alle filterene i spørringen, sjekker om de er gyldige, og legger dem til i en dictionary
        for i in filterList:
            try:
                filterDict = json.loads(i)
            except:
                print("Failed to deserialize filter", filterDict)
            try:
                filterString = createFilterString(
                    filterDict["filteron"], filterDict["filterop"])
                Post._meta.get_field(filterDict["filteron"])
                paramFilter[filterString] = filterDict["filtervalue"]
            except ValueError:
                print("Failed to add filter due to invalid operator")
            except AttributeError:
                print("Failed to add filter because the specified field does not exist")
            except django.core.exceptions.FieldDoesNotExist:
                if "__" in filterDict["filteron"]:
                    try:
                        Post._meta.get_field(filterDict["filteron"][:filterDict["filteron"].index("__")])
                        paramFilter[filterString] = filterDict["filtervalue"]
                        print(filterString)
                    except:
                        print("Filtered field",
                            filterDict["filteron"], "is not a field in Post")
                else:
                    print("Filtered field",
                            filterDict["filteron"], "is not a field in Post")

        # Sjekker om order_by feltet er gyldig. Hvis ikke, setter til None, så man fortsatt kan få en ikke-sortert query
        try:
            if orderAttr == None:
                pass
            elif orderAttr == "flag_count":
                pass
            elif orderAttr == "-flag_count":
                pass
            elif orderAttr[0] == "-":
                Post._meta.get_field(orderAttr[1::])
            else:
                Post._meta.get_field(orderAttr)
        except django.core.exceptions.FieldDoesNotExist:
            print("Invalid order_by field")
            orderAttr = None

        # Lager en filtrert query og sorterer hvis orderAttr er et gyldig felt å sortere på
        if orderAttr != None:
            filteredQuery = Post.objects.annotate(flag_count=Count("flagging"), email=F('ownerfk_id__email'), owner=F('ownerfk_id__username')).filter(**paramFilter).order_by(orderAttr)
        else:
            filteredQuery = Post.objects.annotate(flag_count=Count("flagging"), email=F('ownerfk_id__email'), owner=F('ownerfk_id__username')).filter(**paramFilter)

        # Serializer databasespørringen
        page = self.paginate_queryset(filteredQuery)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(filteredQuery, many=True)

        # Lager en Response og returnerer den (sender svar tilbake til brukeren)
        return Response(serializer.data)


class PostView(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class UserViewSet(viewsets.ModelViewSet):
    '''
    list-metoden kjøres ved mottatt GET-forespørsel.
    Den får tilsendt en Token som en query_param og 
    returnerer brukeren som er tilknyttet Tokenen.
    '''
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()

    def list(self, request):
        try:
            # token er sendt som parameter i GET-forespørselen
            # Token.object.get().user returnerer brukeren med den gitte token
            queryset = Token.objects.get(
                key=request.query_params.get("token")).user
            if queryset.is_disabled:
                return Response("Brukeren har blitt blokkert av admin", 403)
            serializer = CustomUserSerializer(queryset)
        except Token.DoesNotExist:
            raise Exception

        return Response(serializer.data)
    

    # Tar imot en PUT-forespørsel for å endre profilbildet.
    # partial=True gjør at ikke alle feltene i modellen trengs å oppgis.
    # Bildet lastes opp til mappen backend/media/images/
    # def update(self, request, pk):
    #     user = CustomUser.objects.get(id=pk)

    #     serializer = CustomUserSerializer(instance=user, data=request.data, partial=True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response("Kunne ikke laste opp bilde.", status=404)