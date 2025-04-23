from django.http import JsonResponse
from django.http import HttpResponse
from docxtpl import DocxTemplate
import tempfile
from .utils import generar_pdf_desde_docx, generar_pdf_desde_docxlinux
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

# Crear reportes
@csrf_exempt
@require_http_methods(["POST"])
def generar_reporte_cf(request):
    if request.method == "POST":
        import json
        data = json.loads(request.body)

        # Cargar plantilla Word con placeholders
        doc = DocxTemplate("mybackend/plantillas/reporte_cf.docx")

        doc.render(data)

        with tempfile.NamedTemporaryFile(suffix=".docx", delete=False) as temp_doc:
            doc.save(temp_doc.name)
            pdf_path = generar_pdf_desde_docxlinux(temp_doc.name)  # genera el PDF

        with open(pdf_path, "rb") as f:
            response = HttpResponse(f.read(), content_type="application/pdf")
            response["Content-Disposition"] = 'attachment; filename="reporte_cf.pdf"'
            return response
'''
@csrf_exempt
@require_http_methods(["POST"])
def generar_reporte_cf(request):
    import json
    data = json.loads(request.body)
    doc = DocxTemplate("mybackend/plantillas/reporte_cf.docx")
    doc.render(data)

    with tempfile.NamedTemporaryFile(suffix=".docx", delete=False) as temp_doc:
        doc.save(temp_doc.name)
        with open(temp_doc.name, "rb") as f:
            response = HttpResponse(f.read(), content_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document")
            response["Content-Disposition"] = 'attachment; filename=reporte_cf.docx'
            return response
'''

def hello_world(request):
    return JsonResponse({"message": "¡Hola desde Django!"})