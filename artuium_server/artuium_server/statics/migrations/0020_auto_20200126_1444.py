# Generated by Django 2.2.7 on 2020-01-26 05:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('statics', '0019_auto_20200122_1814'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reply',
            name='replies',
            field=models.ManyToManyField(blank=True, related_name='_reply_replies_+', to='statics.Reply'),
        ),
    ]
