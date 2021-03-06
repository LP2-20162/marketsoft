from django.contrib import admin

from .models.cliente import Cliente
from .models.producto import Producto
from .models.distribuidor import Distribuidor
from .models.marca import Marca
from .models.compra import Compra
from .models.venta import todo_item
from .models.venta import Cabecera_Venta
from .models.venta import todo_lists
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


@admin.register(Compra)
class CompraAdmin(admin.ModelAdmin):
    list_display = ('trabajador', 'distribuidor', 'marca',
                    'fecha', 'producto', 'cantidad')
    list_per_page = 3


class producto_ventaInline(admin.TabularInline):
    model = todo_item


class Detalle_VentaAdmin(admin.ModelAdmin):
    inlines = (producto_ventaInline,)

admin.site.register(Cabecera_Venta, Detalle_VentaAdmin)


class todolistAdmin(admin.ModelAdmin):
    list_display = ('name',)

admin.site.register(todo_lists, todolistAdmin)
