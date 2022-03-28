from rest_framework import serializers, status
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.response import Response
from rest_framework.validators import UniqueValidator
from upc.models import Product, SprayFoamType, SprayMachineType, SprayMixingChamber, SprayType, AmbientTemperature, SubstrateTemperature, StartingDrumTemperature, SprayHumidityLevel, SpeedOfSpraying, HoseInsulated, SprayHoseIn, Substrate, Layers
from django.contrib.auth.hashers import make_password


# class QuestionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Question
#         fields = ['id', 'question', 'product_value', 'mixing_chamber_size', 'machine_type_value', 'spray_type_value',
#                   'ambient_temp_value', 'substrate_temp_value', 'starting_temp_value', 'humidity_value',
#                   'spraying_speed_value', 'hose_type_insulated_value', 'hose_in_value', 'substrate_type_value',
#                   'spray_layers']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['product_name']


class SprayFoamTypeSerializer(serializers.ModelSerializer):
    options = serializers.SerializerMethodField("get_products")

    class Meta:
        model = SprayFoamType
        fields = ['question', 'options']

    def get_products(self, data):
        products = data.product_value.all()
        return [product.product_name for product in products]


class SprayMachineTypeSerializer(serializers.ModelSerializer):
    options = serializers.SerializerMethodField("get_machines")

    class Meta:
        model = SprayMachineType
        fields = ['question', 'options']

    def get_machines(self, data):
        machines = data.machine_type_value.all()
        return [machine.machine_name for machine in machines]


class SprayMixingChamberSerializer(serializers.ModelSerializer):
    options = serializers.SerializerMethodField("get_mixing")

    class Meta:
        model = SprayMixingChamber
        fields = ['question','options']

    def get_mixing(self, data):
        mixings = data.mixing_chamber_size.all()
        return [mixing.mixing_size for mixing in mixings]


class SprayTypeSerializer(serializers.ModelSerializer):
    options = serializers.SerializerMethodField("get_types")

    class Meta:
        model = SprayType
        fields = ['question','options']

    def get_types(self, data):
        types = data.spray_type_value.all()
        return [type.spray_type for type in types]


class AmbientTemperatureSerializer(serializers.ModelSerializer):
    options = serializers.SerializerMethodField("get_ambient")

    class Meta:
        model = AmbientTemperature
        fields = ['question','options']

    def get_ambient(self, data):
        ambients = data.ambient_temp_value.all()
        return [ambient.ambient_temp for ambient in ambients]


class SubstrateTemperatureSerializer(serializers.ModelSerializer):
    options = serializers.SerializerMethodField("get_substrate")

    class Meta:
        model = SubstrateTemperature
        fields = ['question','options']

    def get_substrate(self, data):
        substrates = data.substrate_temp_value.all()
        return [substrate.subs_temp for substrate in substrates]


class StartingDrumTemperatureSerializer(serializers.ModelSerializer):
    options = serializers.SerializerMethodField("get_starting_drum")

    class Meta:
        model = StartingDrumTemperature
        fields = ['question', 'options']

    def get_starting_drum(self, data):
        starting_temps = data.starting_temp_value.all()
        return [starting_temp.start_drum_temp for starting_temp in starting_temps]


class SprayHumidityLevelSerializer(serializers.ModelSerializer):
    options = serializers.SerializerMethodField("get_humidity_value")

    class Meta:
        model = SprayHumidityLevel
        fields = ['question', 'options']

    def get_humidity_value(self, data):
        humidity_values = data.humidity_value.all()
        return [humidity_value.humidity_level for humidity_value in humidity_values]


class SpeedOfSprayingSerializer(serializers.ModelSerializer):
    options = serializers.SerializerMethodField("get_spraying_speed_value")

    class Meta:
        model = SpeedOfSpraying
        fields = ['question', 'options']

    def get_spraying_speed_value(self, data):
        spraying_speed_values = data.spraying_speed_value.all()
        return [spraying_speed_value.spraying_speed for spraying_speed_value in spraying_speed_values]


class HoseInsulatedSerializer(serializers.ModelSerializer):
    options = serializers.SerializerMethodField("get_hose_type_insulated_value")

    class Meta:
        model = HoseInsulated
        fields = ['question', 'options']

    def get_hose_type_insulated_value(self, data):
        hose_type_insulated_values = data.hose_type_insulated_value.all()
        return [hose_type_insulated_value.hose_type for hose_type_insulated_value in hose_type_insulated_values]


class SprayHoseInSerializer(serializers.ModelSerializer):
    options = serializers.SerializerMethodField("get_hose_in_value")

    class Meta:
        model = SprayHoseIn
        fields = ['question', 'options']

    def get_hose_in_value(self, data):
        hose_in_values = data.hose_in_value.all()
        return [hose_in_value.hose_in for hose_in_value in hose_in_values]


class SubstrateSerializer(serializers.ModelSerializer):
    options = serializers.SerializerMethodField("get_substrate_type_value")

    class Meta:
        model = Substrate
        fields = ['question', 'options']

    def get_substrate_type_value(self, data):
        substrate_type_values = data.substrate_type_value.all()
        return [substrate_type_value.substrate_type for substrate_type_value in substrate_type_values]


class LayersSerializer(serializers.ModelSerializer):
    options = serializers.SerializerMethodField("get_spray_layers")

    class Meta:
        model = Layers
        fields = ['question', 'options']

    def get_spray_layers(self, data):
        layers = data.spray_layers.all()
        return [layer.layer for layer in layers]
