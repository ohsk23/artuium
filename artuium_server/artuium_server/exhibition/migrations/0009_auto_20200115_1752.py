# Generated by Django 2.2.7 on 2020-01-15 08:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exhibition', '0008_auto_20200115_1749'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exhibition',
            name='fee',
            field=models.TextField(verbose_name='요금'),
        ),
    ]
