from django.contrib import admin
from .models import Post, Flagging, CustomUser


# Register your models here.
admin.site.register(Flagging)
admin.site.register(Post)
admin.site.register(CustomUser)
