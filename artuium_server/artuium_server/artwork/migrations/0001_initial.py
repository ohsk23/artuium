# Generated by Django 2.2.7 on 2019-11-12 06:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Artist',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='이름')),
            ],
            options={
                'verbose_name': '아티스트',
                'verbose_name_plural': '아티스트',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='Artwork',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='이름')),
                ('image', models.ImageField(upload_to='artwork/image/', verbose_name='이미지')),
                ('created', models.DateField(verbose_name='작품 날짜')),
                ('material', models.CharField(max_length=500)),
                ('content', models.TextField()),
                ('author', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='artworks', to='artwork.Artist')),
            ],
            options={
                'verbose_name': '아트워크',
                'verbose_name_plural': '아트워크',
                'ordering': ['-id'],
            },
        ),
    ]
