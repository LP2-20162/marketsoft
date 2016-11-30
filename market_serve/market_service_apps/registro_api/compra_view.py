from rest_framework import serializers, viewsets

from market_service_apps.registro.models.compra import Compra


class CompraSerializer(serializers.ModelSerializer):

    di_nombre = serializers.ReadOnlyField(
        source='distribuidor.monbre')

    pr_precio_venta = serializers.ReadOnlyField(
        source='producto.precio_venta')

    mr_nombre = serializers.ReadOnlyField(
        source='marca.nombre')

    class Meta:
        model = Compra
        fields = '__all__'


class CompraViewSet(viewsets.ModelViewSet):
    queryset = Compra.objects.all()
    serializer_class = CompraSerializer
