from uuid import uuid4
from django.db import models

import datetime
# Create your models here.

TAX_VALUE = 0.18

# Create your models here.


class Producto(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    presentancion = models.CharField(max_length=50)
    nombre = models.CharField(max_length=200, unique=True)

    fecha_expiracion = models.DateField()
    fecha_produccion = models.DateField()
    descripcion = models.TextField(max_length=400)
    precio_Compra = models.DecimalField(
        max_digits=5, decimal_places=2, default=0.00)
    precio_venta = models.DecimalField(
        max_digits=5, decimal_places=2, default=0.00)
    stock = models.PositiveSmallIntegerField()

    def __unicode__(self):
        return self.nombre

    def preeciototal(self):
        precio_total = self.precio_compra * self.stock
        return precio_total

    def estadoproducto(self):
        hoy = datetime.date.today()
        dias = (self.fecha_expiracion - hoy).days
        return dias

    def incrementarlote(self, *args, **kwargs):
        if self.lote == 0:
            self.lote += 1
            self.store.save()
        super(Producto, self).save(*args, **kwargs)

    def save(self, *args, **kwargs):
        if self.precio_venta:
            self.igv = round(float(self.precio_venta) * TAX_VALUE, 3)
            super(Producto, self).save(*args, **kwargs)
        else:
            self.igv = 0
            super(Producto, self).save(*args, **kwargs)
