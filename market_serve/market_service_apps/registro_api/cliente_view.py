import logging

from rest_framework import serializers, viewsets
from rest_framework.response import Response

from rest_framework.decorators import list_route
#from django.db.models import Q
#from operator import __or__ as OR
#from functools import reduce

from market_service_apps.registro.models.cliente import Cliente


from market_service_apps.utils.security import log_params
from market_service_apps.utils.permissions import ModelPermission
from market_service_apps.utils.pagination import ModelPagination


from rest_framework import permissions
from django.utils.translation import ugettext as _  # , ungettext

log = logging.getLogger(__name__)


class MiPermission(permissions.BasePermission):
    """
    Ejemplo de permiso para microrecursos @list_route o @detail_route
    """

    def has_permission(self, request, view):
        perms = ('registro.list_cliente',)  # cambie aqui el permiso
        if request.user.has_perms(perms):
            return True
        else:
            log.info(
                _('Permission denied. You don\'t have permission to %s.'
                  ) % (perms),
                extra=log_params(request)
            )
            return False


class ClienteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cliente
        fields = '__all__'
    # fields = ('url', 'username', 'email', 'is_staff')


class ClienteViewSet(ModelPagination, viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    permission_classes = [ModelPermission, ]

    @list_route(url_path='export', methods=['get'],
                permission_classes=[MiPermission])
    def reporte_clientes(self, request, *args, **kwargs):
        lista = []
        pre_query = self.get_queryset().values()
        for x in pre_query:
            lista.append([x['nombre'], x['direccion']])
        print(lista)
        #data = Autor.objects.pdf(lista, 'mi primer reporte')
        data = self.get_queryset().filter()
        # return Response({'detail':str('Exportado a PDF')})
        # return Response(data)
        serializer = self.get_serializer(data, many=True)
        return Response(serializer.data)
