from rest_framework import serializers, viewsets
from market_service_apps.registro.models.producto import Producto


class ProductoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Producto
        fields = '__all__'


class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
