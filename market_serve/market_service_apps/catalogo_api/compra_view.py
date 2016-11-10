from rest_framework import serializers, viewsets
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce

from market_service_apps.catalogo.models.compra import Cabecera


class CabeceraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cabecera
        fields = '__all__'
        # fields = ('url', 'username', 'email', 'is_staff')


class CabeceraViewSet(viewsets.ModelViewSet):
    queryset = Cabecera.objects.all()
    serializer_class = CabeceraSerializer

    def get_queryset(self):
        query = self.request.query_params.get('query', '')
        queryall = (Q(codigo__icontains=query),
                    Q(nombre__icontains=query))
        queryset = self.queryset.filter(reduce(OR, queryall))
        return queryset
