"""
URL configuration for mybackend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.http import HttpResponse  # Agregar esta importación
from .views import hello_world, ir_list, ir_detail, ir_create, ir_update, ir_delete

def home(request):
    return HttpResponse("¡Backend funcionando en Render!")

urlpatterns = [
    path('', home, name='home'),  # Nueva ruta para "/"
    path('api/message/', hello_world),
    path('admin/', admin.site.urls),
    path('ir/', ir_list, name='ir_list'),
    path('ir/<int:ir_id>/', ir_detail, name='ir_detail'),
    path('ir/create/', ir_create, name='ir_create'),
    path('ir/<int:ir_id>/update/', ir_update, name='ir_update'),
    path('ir/<int:ir_id>/delete/', ir_delete, name='ir_delete'),
]

