# Generated by Django 2.2.7 on 2019-12-19 08:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exhibition', '0004_auto_20191211_0145'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exhibition',
            name='notopendate',
            field=models.DateField(blank=True, null=True),
        ),
    ]
