# Generated by Django 2.2.7 on 2019-12-19 17:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exhibition', '0006_auto_20191220_0131'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exhibition',
            name='notopendate',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
