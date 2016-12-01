from rest_framework import serializers, viewsets
from market_service_apps.registro.models.cliente import Cliente


class ClienteSerializer(serializers.ModelSerializer):

    persona_nombre = serializers.ReadOnlyField(
        source='persona.nombre')

    class Meta:

        fields = '__all__'
        model = Cliente


class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
