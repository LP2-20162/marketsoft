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


class Compra(TimeStampModel):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    trabajador = models.ForeignKey(settings.AUTH_USER_MODEL)
    distribuidor = models.ForeignKey(Distribuidor)
    marca = models.ForeignKey(Marca)
    fecha = models.DateField(auto_now_add=True)
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
    update_stock, sender=Compra, dispatch_uid="update_stock_count")
