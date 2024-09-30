from email.policy import default
from django.db import models
from django.core.validators import MinValueValidator
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager
from django.utils.translation import gettext_lazy as _

# Create your luka models here.

'''Modeller må registreres i admn.py for å vises på adminsiden.'''

class CustomUser(AbstractUser):
    '''
    Egen brukermodell som arver feltene fra den innebygde User-modellen
    og legger til noen ekstra felter. 
    Opprettelse av CustomUser-instans gjøres av CustomUserManager.

    is_admin-feltet bestemmer om en bruker har adminrettigheter eller ei.
    '''
    email = models.EmailField(_('email address'), unique=True, blank=False)
    is_admin = models.BooleanField(_('is admin'), default=False, null=False)
    profile_image = models.ImageField(_('profile image'), upload_to='images/', default="images/default_profile_image.png")
    is_disabled = models.BooleanField(_('is disabled'), default=False)

    objects = CustomUserManager()

    def __str__(self):
        return self.username

class Post(models.Model):
    POST_TYPES = [
        ("sell", "sell"),
        ("buy", "buy"),
    ]

    title = models.CharField(max_length=120, blank=False)
    post_type = models.CharField(max_length=4, choices=POST_TYPES, default='sell')
    event_type = models.CharField(max_length=50, default="Konsert")
    location = models.CharField(max_length=25, null=True)
    date = models.CharField(max_length=10, null=True)
    time = models.CharField(max_length=20, null=True)
    price = models.IntegerField(validators=[MinValueValidator(0)], default=0)
    description = models.TextField(blank=True)
    ownerfk = models.ForeignKey(CustomUser, null=False, blank=False, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    hidden = models.BooleanField(default=False)

    def _str_(self):
        return self.title


class Login(models.Model):
    username = models.CharField(max_length=120)

    
class Flagging(models.Model):
    category = models.CharField(max_length=50, default='Spam')
    description = models.TextField(blank=True)
    post = models.ForeignKey(Post, null=True, on_delete=models.CASCADE)
