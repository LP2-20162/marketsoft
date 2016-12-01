from rest_framework import serializers, viewsets
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce

from market_service_apps.registro.models.compra import Compra


class CompraSerializer(serializers.ModelSerializer):

    m_trabajador = serializers.ReadOnlyField(source='settings.AUTH_USER_MODEL.nombre')
    m_distribuidor = serializers.ReadOnlyField(source='distribuidor.nombre')
    m_marca = serializers.ReadOnlyField(source='marca.nombre')
    m_productor = serializers.ReadOnlyField(source='producto.nombre')

    class Meta:
        model = Compra
        fields = '__all__'


class CompraViewSet(viewsets.ModelViewSet):
    queryset = Compra.objects.all()
    serializer_class = CompraSerializer

    def get_queryset(self):
        query = self.request.query_params.get('query', '')
        queryall = (Q(id__icontains=query),
                    Q(distribuidor__nombre__icontains=query))
        queryset = self.queryset.filter(reduce(OR, queryall))
        return queryset
