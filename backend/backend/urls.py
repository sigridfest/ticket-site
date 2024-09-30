"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers
from luka import views
from rest_framework.authtoken.views import obtain_auth_token

router = routers.DefaultRouter()
router.register(r'list-post', views.ListPostView)
router.register(r'list-flags', views.ListFlagView)
router.register(r'create-post', views.CreatePostView, 'create-post')
router.register(r'create-flag', views.CreateFlaggingView, 'create-flag')
router.register(r'update-post', views.PostView, 'update-post')
router.register(r'users', views.UserViewSet)



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('auth/', obtain_auth_token),
]

# Viser filer fra mappen med filsti MEDIA_ROOT (definert i settings.py)
# på urlen http://localhost:8000 + MEDIA_URL + filsti
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
