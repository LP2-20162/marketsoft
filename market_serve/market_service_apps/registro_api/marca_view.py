import logging

from rest_framework import serializers, viewsets
from rest_framework.response import Response
from rest_framework.decorators import list_route
#from operator import __or__ as OR
#from functools import reduce

from market_service_apps.registro.models.marca import Marca

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
        perms = ('registro.list_marca',)  # cambie aqui el permiso
        if request.user.has_perms(perms):
            return True
        else:
            log.info(
                _('Permission denied. You don\'t have permission to %s.'
                  ) % (perms),
                extra=log_params(request)
            )
            return False


class MarcaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Marca
        fields = '__all__'


class MarcaViewSet(ModelPagination, viewsets.ModelViewSet):
    queryset = Marca.objects.all()
    serializer_class = MarcaSerializer
    permission_classes = [ModelPermission, ]

    """
    def get_queryset(self):
        queryset = Cliente.objects.all()
        return queryset
    def list(self, request, *args, **kwargs):
        query = request.query_params.get('query', '')
        all = self.request.query_params.get('all', None)
        # if all == 'true':
        #    self.pagination_class = None
        #    return Cliente.objects.all()
        if query is not None:
            queryall = (Q(nombre__icontains=query),
                        Q(direccion__icontains=query))
            queryset = self.get_queryset().filter(reduce(OR, queryall))
            results = self.paginate_queryset(queryset)
            if results is not None:
                serializer = self.get_serializer(results, many=True)
                return self.get_paginated_response(serializer.data)
        else:
            data = self.get_queryset()
            results = self.paginate_queryset(data)
            if results is not None:
                serializer = self.get_serializer(results, many=True)
                return self.get_paginated_response(serializer.data)
    """

    @list_route(url_path='export', methods=['get'],
                permission_classes=[MiPermission])
    def reporte_clientes(self, request, *args, **kwargs):
        lista = []
        pre_query = self.get_queryset().values()
        for x in pre_query:
            lista.append([x['nombre'], x['caracteristica']])
        print(lista)
        #data = Cliente.objects.pdf(lista, 'mi primer reporte')
        data = self.get_queryset().filter()
        # return Response({'detail':str('Exportado a PDF')})
        # return Response(data)
        serializer = self.get_serializer(data, many=True)
        return Response(serializer.data)
