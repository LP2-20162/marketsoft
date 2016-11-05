from django.conf.urls import url, include
from rest_framework import routers


from .producto_view import ProductoViewSet
from .cliente_view import ClienteViewSet

router = routers.DefaultRouter()


router.register(r'cliente', ClienteViewSet, 'cliente-view')
router.register(r'producto', ProductoViewSet, 'producto-view')

urlpatterns = [

    url(r'^', include(router.urls)),

]
