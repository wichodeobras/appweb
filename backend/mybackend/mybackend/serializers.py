# serializers.py
from rest_framework import serializers
from .models import IR, HP, CE,CF, HR, IC, IE,  IRR, LD, LI   # Importa los modelos que necesites
from .models import Infraestructura, SEP

class IRSerializer(serializers.ModelSerializer):
    class Meta:
        model = IR
        fields = '__all__'

class HPSerializer(serializers.ModelSerializer):
    class Meta:
        model = HP
        fields = '__all__'

class CESerializer(serializers.ModelSerializer):
    class Meta:
        model = CE
        fields = '__all__'

class CFSerializer(serializers.ModelSerializer):
    class Meta:
        model = CF
        fields = '__all__'

class HRSerializer(serializers.ModelSerializer):
    class Meta:
        model = HR
        fields = '__all__'

class ICSerializer(serializers.ModelSerializer):
    class Meta:
        model = IC
        fields = '__all__'

class IESerializer(serializers.ModelSerializer):
    class Meta:
        model = IE
        fields = '__all__'

class IRRSerializer(serializers.ModelSerializer):
    class Meta:
        model = IRR
        fields = '__all__'

class LDSerializer(serializers.ModelSerializer):
    class Meta:
        model = LD
        fields = '__all__'

class LISerializer(serializers.ModelSerializer):
    class Meta:
        model = LI
        fields = '__all__'
# Define serializers para los demás modelos de forma similar
class infraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Infraestructura
        fields = '__all__'

class SEPSerializer(serializers.ModelSerializer):
    class Meta:
        model = SEP
        fields = '__all__'
