from uuid import uuid4
from django.db import models


class Distribuidor(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    nombre = models.CharField(max_length=20)
    ruc = models.IntegerField()
    telefono = models.IntegerField(unique=True)
    direccion = models.CharField(max_length=60)

    def __unicode__(self):
        return self.nombre
