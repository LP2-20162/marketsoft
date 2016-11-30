from django.contrib import admin

from .models.cliente import Cliente
from .models.producto import Producto
from .models.distribuidor import Distribuidor
from .models.marca import Marca
from .models.compra import Compra
# Register your models here.


@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'apellidos', 'dni', 'direccion')
    search_fields = ('dni', 'nombre', 'apellidos', 'direccion')
    list_per_page = 3


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('presentancion',  'nombre', 'descripcion', 'fecha_expiracion',
                    'fecha_produccion',  'precio_Compra', 'precio_venta', 'stock')
    search_fields = ('nombre', 'descripcion')
    list_per_page = 3


@admin.register(Distribuidor)
class DistribuidorAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'ruc')
    search_fields = ('codigo', 'nombre', 'direccion')
    list_per_page = 3


@admin.register(Marca)
class EmpresaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'caracteristica')
    list_per_page = 3


class producto_compraInline(admin.TabularInline):
    model = Compra
