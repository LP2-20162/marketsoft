from uuid import uuid4
from django.db import models
from .producto import Producto
from .distribuidor import Distribuidor
from .marca import Marca
from django.db.models import signals
#from django.core.urlresolvers import reverse
from django.conf import settings


class TimeStampModel(models.Model):

    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True)

    class Meta:
        abstract = True


class Cabecera(TimeStampModel):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    trabajador = models.ForeignKey(settings.AUTH_USER_MODEL)
    codigo = models.CharField(max_length=10, unique=True)
    distribuidor = models.ForeignKey(Distribuidor)
    marca = models.ForeignKey(Marca)
    fecha = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name = "Compras"
        verbose_name_plural = "Compras"

    def __unicode__(self):
        return self.codigo


class DetalleCompra(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    list = models.ForeignKey(Cabecera, related_name='cabecera')
    producto = models.ForeignKey(Producto)
    cantidad = models.IntegerField()

    def suma(self):
        return self.cantidad * self.producto.precio_Compra

    def __unicode__(self):
        return unicode(self.producto)


def update_stock(sender, instance, **kwargs):
    instance.producto.stock += instance.cantidad
    instance.producto.save()

# register the signal
signals.post_save.connect(
    update_stock, sender=DetalleCompra, dispatch_uid="update_stock_count")
