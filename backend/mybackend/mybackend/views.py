from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework import viewsets
import json
from .models import IR, HP, CE,CF, HR, IC, IE,  IRR, LD, LI  # etc.
from .serializers import IRSerializer, HPSerializer, CESerializer, CFSerializer, HRSerializer, ICSerializer, IESerializer,IRRSerializer, LDSerializer, LISerializer

# views.py

class IRViewSet(viewsets.ModelViewSet):
    queryset = IR.objects.all()
    serializer_class = IRSerializer

class HPViewSet(viewsets.ModelViewSet):
    queryset = HP.objects.all()
    serializer_class = HPSerializer

class CEViewSet(viewsets.ModelViewSet):
    queryset = CE.objects.all()
    serializer_class = CESerializer

class CFViewSet(viewsets.ModelViewSet):
    queryset = CF.objects.all()
    serializer_class = CFSerializer

class HRViewSet(viewsets.ModelViewSet):
    queryset = HR.objects.all()
    serializer_class = HRSerializer

class ICViewSet(viewsets.ModelViewSet):
    queryset = IC.objects.all()
    serializer_class = ICSerializer

class IEViewSet(viewsets.ModelViewSet):
    queryset = IE.objects.all()
    serializer_class = IESerializer

class IRRViewSet(viewsets.ModelViewSet):
    queryset = IRR.objects.all()
    serializer_class = IRRSerializer

class LDViewSet(viewsets.ModelViewSet):
    queryset = LD.objects.all()
    serializer_class = LDSerializer

class LIViewSet(viewsets.ModelViewSet):
    queryset = LI.objects.all()
    serializer_class = LISerializer
# Crea ViewSets para los demás modelos de forma similar






def hello_world(request):
    return JsonResponse({"message": "¡Hola desde Django!"})

#CRUD IR
# Listar todos los registros
@require_http_methods(["GET"])
def ir_list(request):
    data = list(IR.objects.values())
    return JsonResponse(data, safe=False)


# Obtener un solo registro por ID
@require_http_methods(["GET"])
def ir_detail(request, ir_id):
    try:
        ir = IR.objects.get(id=ir_id)
        data = {
            "id": ir.id,
            "designacion_mm": ir.designacion_mm,
            "designacion_pulg": ir.designacion_pulg,
            "d": ir.d,
            "h": ir.h,
            "tw": ir.tw,
            "bf": ir.bf,
            "tf": ir.tf,
            "peso": ir.peso,
            "area": ir.area,
            "ix": ir.ix,
            "zx": ir.zx,
            "sx": ir.sx,
            "rx": ir.rx,
            "iy": ir.iy,
            "zy": ir.zy,
            "sy": ir.sy,
            "ry": ir.ry,
            "j": ir.j,
            "cw": ir.cw,
        }
        return JsonResponse(data)
    except IR.DoesNotExist:
        return JsonResponse({"error": "IR no encontrado"}, status=404)

# Crear nuevo registro
@csrf_exempt
@require_http_methods(["POST"])
def ir_create(request):
    try:
        data = json.loads(request.body)
        ir = IR.objects.create(**data)
        return JsonResponse({"id": ir.id}, status=201)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

# Actualizar registro existente
@csrf_exempt
@require_http_methods(["PUT"])
def ir_update(request, ir_id):
    try:
        ir = IR.objects.get(id=ir_id)
        data = json.loads(request.body)
        for field, value in data.items():
            setattr(ir, field, value)
        ir.save()
        return JsonResponse({"message": "Actualizado correctamente"})
    except IR.DoesNotExist:
        return JsonResponse({"error": "IR no encontrado"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

# Eliminar registro
@csrf_exempt
@require_http_methods(["DELETE"])
def ir_delete(request, ir_id):
    try:
        ir = IR.objects.get(id=ir_id)
        ir.delete()
        return JsonResponse({"message": "Eliminado correctamente"})
    except IR.DoesNotExist:
        return JsonResponse({"error": "IR no encontrado"}, status=404)


#CRUD HP
# Listar todos los registros
@require_http_methods(["GET"])
def hp_list(request):
    data = list(HP.objects.values())
    return JsonResponse(data, safe=False)


# Obtener un solo registro por ID
@require_http_methods(["GET"])
def hp_detail(request, hp_id):
    try:
        hp = HP.objects.get(id=hp_id)
        data = {
            "id": hp.id,
            "designacion_mm": hp.designacion_mm,
            "designacion_pulg": hp.designacion_pulg,
            "d": hp.d,
            "T": hp.T,
            "tw": hp.tw,
            "bf": hp.bf,
            "tf": hp.tf,
            "k": hp.k,
            "k1": hp.k1,
            "peso": hp.peso,
            "area": hp.area,
            "b2ft": hp.b2ft,
            "htw": hp.htw,
            "ix": hp.ix,
            "zx": hp.zx,
            "sx": hp.sx,
            "rx": hp.rx,
            "iy": hp.iy,
            "zy": hp.zy,
            "sy": hp.sy,
            "ry": hp.ry,
            "j": hp.j,
            "cw": hp.cw,
        }
        return JsonResponse(data)
    except HP.DoesNotExist:
        return JsonResponse({"error": "HP no encontrado"}, status=404)

# Crear nuevo registro
@csrf_exempt
@require_http_methods(["POST"])
def hp_create(request):
    try:
        data = json.loads(request.body)
        hp = HP.objects.create(**data)
        return JsonResponse({"id": hp.id}, status=201)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

# Actualizar registro existente
@csrf_exempt
@require_http_methods(["PUT"])
def hp_update(request, hp_id):
    try:
        hp = HP.objects.get(id=hp_id)
        data = json.loads(request.body)
        for field, value in data.items():
            setattr(hp, field, value)
        hp.save()
        return JsonResponse({"message": "Actualizado correctamente"})
    except HP.DoesNotExist:
        return JsonResponse({"error": "HP no encontrado"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

# Eliminar registro
@csrf_exempt
@require_http_methods(["DELETE"])
def hp_delete(request, hp_id):
    try:
        hp = HP.objects.get(id=hp_id)
        hp.delete()
        return JsonResponse({"message": "Eliminado correctamente"})
    except HP.DoesNotExist:
        return JsonResponse({"error": "HP no encontrado"}, status=404)


