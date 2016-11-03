# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-11-03 23:00
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Autor',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=50)),
                ('direccion', models.TextField(blank=True, null=True)),
                ('fecha_nac', models.DateField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name_plural': 'Autores',
                'verbose_name': 'Autor',
                'permissions': (('list_autor', 'Can list autor'), ('get_autor', 'Can get autor')),
            },
        ),
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=60)),
                ('codigo', models.CharField(blank=True, max_length=15, null=True)),
                ('estado', models.BooleanField(default=True)),
            ],
            options={
                'verbose_name_plural': 'Categorias',
                'verbose_name': 'Categoria',
                'permissions': (('list_categoria', 'Can list categoria'), ('get_categoria', 'Can get categoria')),
            },
        ),
        migrations.CreateModel(
            name='Ejemplar',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('codigo', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name_plural': 'Ejemplares',
                'verbose_name': 'Ejemplar',
                'permissions': (('list_ejemplar', 'Can list ejemplar'), ('get_ejemplar', 'Can get ejemplar')),
            },
        ),
        migrations.CreateModel(
            name='Libro',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=50)),
                ('tipo', models.CharField(choices=[('FISICO', 'Fisico'), ('VIRTUAL', 'Virtual'), ('FIS_VIR', 'FisicoVirtual')], default='FISICO', max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('autors', models.ManyToManyField(blank=True, to='catalogo.Autor')),
                ('categoria', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='catalogo.Categoria')),
            ],
            options={
                'verbose_name_plural': 'Libros',
                'verbose_name': 'Libro',
                'permissions': (('list_libro', 'Can list libro'), ('get_libro', 'Can get libro')),
            },
        ),
        migrations.AddField(
            model_name='ejemplar',
            name='libro',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='catalogo.Libro'),
        ),
    ]
