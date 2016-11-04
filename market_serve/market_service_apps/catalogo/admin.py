from django.contrib import admin

from .models.cliente import Cliente
from .models.producto import Producto

# Register your models here.


@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'apellidos', 'dni', 'direccion')
    search_fields = ('dni', 'nombre', 'apellidos')
    list_per_page = 3


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('lote', 'presentancion', 'TIPO', 'nombre', 'descripcion', 'fecha_expiracion',
                    'fecha_produccion',  'precio_Compra', 'precio_venta', 'stock')
    search_fields = ('nombre', 'descripcion')
    list_per_page = 3
