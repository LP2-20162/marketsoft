from rest_framework import serializers, viewsets
from market_service_apps.registro.models.venta import Cabecera_Venta


class VentaSerializer(serializers.ModelSerializer):

    persona_nombre = serializers.ReadOnlyField(
        source='persona.nombre')

    class Meta:

        fields = '__all__'
        model = Cabecera_Venta


class VentaViewSet(viewsets.ModelViewSet):
    queryset = Cabecera_Venta.objects.all()
    serializer_class = VentaSerializer
