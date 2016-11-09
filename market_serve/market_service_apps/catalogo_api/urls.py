from django.conf.urls import url, include
from rest_framework import routers


from .producto_view import ProductoViewSet
from .cliente_view import ClienteViewSet
from .distribuidor_view import DistribuidorViewSet

router = routers.DefaultRouter()


router.register(r'cliente', ClienteViewSet, 'cliente-view')
router.register(r'producto', ProductoViewSet, 'producto-view')
router.register(r'distribuidor', DistribuidorViewSet, 'distribuidor-view')

urlpatterns = [

    url(r'^', include(router.urls)),

]
