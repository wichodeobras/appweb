# serializers.py
from rest_framework import serializers
from .models import IR, HP, CE,CF, HR, IC, IE,  IRR, LD, LI, ORC, ORR  # Importa los modelos que necesites
from .models import Infraestructura, SEP
from .models import CAL_ARENA, MORTERO_ARENA, CEMENTO_ARENA, CEMENTO_ARENA_CERNIDA, CEMENTO_CALHIDRA_ARENA

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

class ORCSerializer(serializers.ModelSerializer):
    class Meta:
        model = ORC
        fields = '__all__'

class ORRSerializer(serializers.ModelSerializer):
    class Meta:
        model = ORR
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

class CAL_ARENASerializer(serializers.ModelSerializer):
    class Meta:
        model = CAL_ARENA
        fields = '__all__'

class MORTERO_ARENASerializer(serializers.ModelSerializer):
    class Meta:
        model = MORTERO_ARENA
        fields = '__all__'

class CEMENTO_ARENASerializer(serializers.ModelSerializer):
    class Meta:
        model = CEMENTO_ARENA
        fields = '__all__'

class CEMENTO_ARENA_CERNIDASerializer(serializers.ModelSerializer):
    class Meta:
        model = CEMENTO_ARENA_CERNIDA
        fields = '__all__'

class CEMENTO_CALHIDRA_ARENASerializer(serializers.ModelSerializer):
    class Meta:
        model = CEMENTO_CALHIDRA_ARENA
        fields = '__all__'
