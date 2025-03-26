from django.contrib import admin
from django.urls import path
from django.http import HttpResponse  # Agregar esta importación
from .views import hello_world, ir_list, ir_detail, ir_create, ir_update, ir_delete
from .views import hello_world, hp_list, hp_detail, hp_create, hp_update, hp_delete

# urls.py
from django.urls import path, include
from rest_framework import routers
from .views import IRViewSet, HPViewSet, CEViewSet, CFViewSet, HRViewSet, ICViewSet, IEViewSet, IRRViewSet, LDViewSet, LIViewSet

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
# Registra los demás modelos





def home(request):
    return HttpResponse("¡Backend funcionando en Render!")

urlpatterns = [

    path('api/', include(router.urls)),



    path('', home, name='home'),  # Nueva ruta para "/"
    path('api/message/', hello_world),
    path('admin/', admin.site.urls),

    #perfiles IR
    #path('ir/', ir_list, name='ir_list'),
    #path('ir/<int:ir_id>/', ir_detail, name='ir_detail'),
    #path('ir/create/', ir_create, name='ir_create'),
    #path('ir/<int:ir_id>/update/', ir_update, name='ir_update'),
    #path('ir/<int:ir_id>/delete/', ir_delete, name='ir_delete'),

    #perfiles HP
    #path('hp/', hp_list, name='hp_list'),
    #path('hp/<int:hp_id>/', hp_detail, name='hp_detail'),
    #path('hp/create/', hp_create, name='hp_create'),
    #path('hp/<int:hp_id>/update/', hp_update, name='hp_update'),
    #path('hp/<int:hp_id>/delete/', hp_delete, name='hp_delete'),
]

