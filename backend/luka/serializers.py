from django.forms import CharField
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Post, CustomUser, Flagging, Post
from rest_framework.authtoken.models import Token

'''Serialisere omgjør fra json til databasemodeller og omvendt.'''


class PostSerializer(serializers.ModelSerializer):

    flag_count = serializers.IntegerField(required=False)
    email = serializers.EmailField(required=False)
    owner = serializers.CharField(max_length=30, required=False)
    class Meta:
        model = Post
        fields = "__all__"

        

class FlaggingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flagging
        fields = "__all__"


class CustomUserSerializer(serializers.ModelSerializer):
    '''
    Serialiserer for CustomUser-modellen. Kun feltene i fields utveksles med frontend,
    men passord kan kun skrives og ikke leses. create-metoden oppretter en Token som 
    knyttes til den nylig innloggede brukeren.
    '''
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password', 'is_admin', 'profile_image', "is_disabled")
        extra_kwargs = {'password': {'write_only': True,
                                     'required': True}, 'is_admin': {'read_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user
