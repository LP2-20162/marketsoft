from django.conf.urls import url, include
from rest_framework import routers


from .producto_view import ProductoViewSet
from .cliente_view import ClienteViewSet
from .distribuidor_view import DistribuidorViewSet
from .marca_view import MarcaViewSet
from .compra_view import CabeceraViewSet

router = routers.DefaultRouter()


router.register(r'cliente', ClienteViewSet, 'cliente-view')
router.register(r'producto', ProductoViewSet, 'producto-view')
router.register(r'distribuidor', DistribuidorViewSet, 'distribuidor-view')
router.register(r'marca', MarcaViewSet, 'marca-view')
router.register(r'cabecera', CabeceraViewSet, 'cabecera-view')
urlpatterns = [

    url(r'^', include(router.urls)),

]
