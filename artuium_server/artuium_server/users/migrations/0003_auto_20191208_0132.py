# Generated by Django 2.2.7 on 2019-12-07 16:32

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20191112_1520'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='follower',
            field=models.ManyToManyField(blank=True, related_name='_user_follower_+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='user',
            name='following',
            field=models.ManyToManyField(blank=True, related_name='_user_following_+', to=settings.AUTH_USER_MODEL),
        ),
    ]
