from uuid import uuid4
from django.db import models


class Cliente(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    nombre = models.CharField(max_length=50)
    apellidos = models.CharField(max_length=100)
    dni = models.IntegerField()
    direccion = models.TextField(null=True, blank=True)
    fecha_nac = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Cliente"
        verbose_name_plural = "Clientes"
        permissions = (
            ('list_cliente', 'Can list cliente'),
            ('get_cliente', 'Can get cliente'),
        )

    def __str__(self):
        return self.nombre
