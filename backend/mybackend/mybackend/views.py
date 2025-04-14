from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework import viewsets
import json
from .models import IR, HP, CE,CF, HR, IC, IE,  IRR, LD, LI, ORC, ORR  # etc.
from .models import Infraestructura, SEP
from .serializers import IRSerializer, HPSerializer, CESerializer, CFSerializer, HRSerializer, ICSerializer, IESerializer,IRRSerializer, LDSerializer, LISerializer, ORCSerializer, ORRSerializer
from .serializers import infraSerializer,  SEPSerializer 
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

class ORCViewSet(viewsets.ModelViewSet):
    queryset = ORC.objects.all()
    serializer_class = ORCSerializer

class ORRViewSet(viewsets.ModelViewSet):
    queryset = ORR.objects.all()
    serializer_class = ORRSerializer
# Crea ViewSets para los demás modelos de forma similar
class infraViewSet(viewsets.ModelViewSet):
    queryset = Infraestructura.objects.all()
    serializer_class = infraSerializer

class SEPViewSet(viewsets.ModelViewSet):
    queryset = SEP.objects.all()
    serializer_class = SEPSerializer





def hello_world(request):
    return JsonResponse({"message": "¡Hola desde Django!"})