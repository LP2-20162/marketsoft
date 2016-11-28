# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-11-24 13:48
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Cabecera',
            fields=[
                ('created', models.DateField(auto_now_add=True)),
                ('modified', models.DateField(auto_now=True)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('fecha', models.DateField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'Compras',
                'verbose_name_plural': 'Compras',
            },
        ),
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=50)),
                ('apellidos', models.CharField(max_length=100)),
                ('dni', models.IntegerField()),
                ('direccion', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name_plural': 'Clientes',
                'permissions': (('list_cliente', 'Can list cliente'), ('get_cliente', 'Can get cliente')),
                'verbose_name': 'Cliente',
            },
        ),
        migrations.CreateModel(
            name='Compra',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('cantidad', models.IntegerField()),
                ('list', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cabecera', to='registro.Cabecera')),
            ],
        ),
        migrations.CreateModel(
            name='Distribuidor',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=20)),
                ('ruc', models.IntegerField(unique=True)),
                ('telefono', models.IntegerField()),
                ('direccion', models.CharField(max_length=60)),
            ],
        ),
        migrations.CreateModel(
            name='Marca',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=40)),
                ('caracteristica', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('lote', models.CharField(default=0, max_length=10, unique=True)),
                ('presentancion', models.CharField(max_length=50)),
                ('nombre', models.CharField(max_length=200, unique=True)),
                ('sanitario', models.CharField(max_length=200)),
                ('fecha_expiracion', models.DateField()),
                ('fecha_produccion', models.DateField()),
                ('descripcion', models.TextField(max_length=400)),
                ('precio_Compra', models.DecimalField(decimal_places=2, default=0.0, max_digits=5)),
                ('precio_venta', models.DecimalField(decimal_places=2, default=0.0, max_digits=5)),
                ('stock', models.PositiveSmallIntegerField()),
            ],
        ),
        migrations.AddField(
            model_name='compra',
            name='producto',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='registro.Producto'),
        ),
        migrations.AddField(
            model_name='cabecera',
            name='distribuidor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='registro.Distribuidor'),
        ),
        migrations.AddField(
            model_name='cabecera',
            name='marca',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='registro.Marca'),
        ),
        migrations.AddField(
            model_name='cabecera',
            name='trabajador',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
