from uuid import uuid4
from django.db import models


class Marca(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    nombre = models.CharField(max_length=40)
    caracteristica = models.CharField(max_length=50)

    def __unicode__(self):
        return self.nombre
# agregar direccion
