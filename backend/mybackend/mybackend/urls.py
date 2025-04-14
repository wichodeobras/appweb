from django.contrib import admin
from django.urls import path
from django.http import HttpResponse  # Agregar esta importación

# urls.py
from django.urls import path, include
from rest_framework import routers
from .views import hello_world
from .views import IRViewSet, HPViewSet, CEViewSet, CFViewSet, HRViewSet, ICViewSet, IEViewSet, IRRViewSet, LDViewSet, LIViewSet, ORCViewSet, ORRViewSet
from .views import infraViewSet, SEPViewSet

router = routers.DefaultRouter()
router.register(r'ir', IRViewSet)
router.register(r'hp', HPViewSet)
router.register(r'ce', CEViewSet)
router.register(r'cf', CFViewSet)
router.register(r'hr', HRViewSet)
router.register(r'ic', ICViewSet)
router.register(r'ie', IEViewSet)
router.register(r'irr', IRRViewSet)
router.register(r'ld', LDViewSet)
router.register(r'li', LIViewSet)
router.register(r'orc', ORCViewSet)
router.register(r'orr', ORRViewSet)
router.register(r'infra', infraViewSet)
router.register(r'SEP', SEPViewSet)
# Registra los demás modelos





def home(request):
    return HttpResponse("¡Backend funcionando en Render!")

urlpatterns = [

    path('api/', include(router.urls)),



    path('', home, name='home'),  # Nueva ruta para "/"
    path('api/message/', hello_world),
    path('admin/', admin.site.urls),


]

