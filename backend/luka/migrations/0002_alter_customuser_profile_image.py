# Generated by Django 4.0.2 on 2022-03-28 09:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('luka', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='profile_image',
            field=models.ImageField(default='images/default_profile_image.png', upload_to='images/', verbose_name='profile image'),
        ),
    ]
