from uuid import uuid4
from django.db import models
from .producto import Producto
from .cliente import Cliente
from django.db.models import signals


class TimeStampModel(models.Model):

    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True)

    class Meta:
        abstract = True


class Cabecera_Venta(TimeStampModel):

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    cliente = models.ForeignKey(Cliente, null=True, blank=True)
    fecha = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Venta"
        verbose_name_plural = "Ventas"

    def __unicode__(self):
        return self.ruc


class todo_item(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    list_id = models.ForeignKey(Cabecera_Venta)
    producto = models.ForeignKey(Producto)
    cantidad = models.IntegerField()


def update_stock(sender, instance, **kwargs):
    instance.producto.stock -= instance.cantidad
    instance.producto.save()

# register the signal
signals.post_save.connect(update_stock, sender=todo_item,
                          dispatch_uid="update_stock_count")


class todo_lists(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=64)

    def __str__(self):
        return self.name

    def __unicode__(self):
        return self.name


class todo_itemm(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    list_id = models.ForeignKey(todo_lists)
    name = models.CharField(max_length=32)
    content = models.CharField(max_length=256, blank=True)

    def __str__(self):
        return "(%s)%s" % (self.list_id__name, self.name)

    def __unicode__(self):
        return "(%s)%s" % (self.list_id__name, self.name)
