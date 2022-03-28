from django.contrib.auth.models import AbstractUser, User
from django.core.exceptions import ValidationError
from django.db import models

from slp import models as slp_models


class Product(models.Model):
    product_name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return self.product_name


class MachineType(models.Model):
    machine_name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return self.machine_name


class MixingChamberSize(models.Model):
    mixing_size = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return self.mixing_size


class SprayingType(models.Model):
    spray_type = models.CharField(max_length=255)
    mixing_size = models.ForeignKey(to=MixingChamberSize, on_delete=models.CASCADE)
    machine_type = models.ForeignKey(to=MachineType, on_delete=models.CASCADE)
    pressure_set_temp = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return self.spray_type


class ASideTemp(models.Model):
    a_side_temp = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.a_side_temp)


class BSideTemp(models.Model):
    b_side_temp = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.b_side_temp)


class HoseTemp(models.Model):
    hose_temp = models.CharField(null=True, blank=True, max_length=255)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.hose_temp)


class SubstrateTemp(models.Model):
    subs_temp = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.subs_temp)


class StartingDrumTemp(models.Model):
    start_drum_temp = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.start_drum_temp)


class HumidityLevel(models.Model):
    humidity_level = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.humidity_level)


class SprayingSpeed(models.Model):
    spraying_speed = models.CharField(null=True, blank=True, max_length=255)
    temperature_change = models.IntegerField(null=True, blank=True, default=0)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.spraying_speed)


class HoseTypeInsulated(models.Model):
    hose_type = models.CharField(null=True, blank=True, max_length=255)
    temperature_change = models.IntegerField(null=True, blank=True, default=0)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.hose_type)


class HoseIn(models.Model):
    hose_in = models.CharField(null=True, blank=True, max_length=255)
    temperature_change = models.IntegerField(null=True, blank=True, default=0)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.hose_in)


class SprayLayers(models.Model):
    layer = models.CharField(null=True, blank=True, max_length=255)
    temperature_change = models.IntegerField(null=True, blank=True, default=0)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.layer)


class SubstrateType(models.Model):
    substrate_type = models.CharField(null=True, blank=True, max_length=255)
    percentage_to_yield = models.FloatField(null=False, blank=True, default=0)
    temperature_change = models.IntegerField(null=True, blank=True, default=0)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.substrate_type)


class AmbientTemp(models.Model):
    ambient_temp = models.IntegerField(null=False, blank=False)
    product = models.ForeignKey(null=True, blank=True, to=Product, on_delete=models.CASCADE)
    mixing_chamber_size = models.ForeignKey(null=True, blank=True, to=MixingChamberSize, on_delete=models.CASCADE)
    a_side_temp = models.ForeignKey(null=True, blank=True, to=ASideTemp, on_delete=models.CASCADE)
    b_side_temp = models.ForeignKey(null=True, blank=True, to=BSideTemp, on_delete=models.CASCADE)
    hose_temp = models.ForeignKey(null=True, blank=True, to=HoseTemp, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.ambient_temp)


# class Question(models.Model):
# product_choice = [(x.product_name, _(x.product_name)) for x in Product.objects.all()]
#
# machine_choice = [(x.machine_name, _(x.machine_name)) for x in MachineType.objects.all()]
#
# mixing_chamber = [(x.mixing_size, _(x.mixing_size)) for x in MixingChamberSize.objects.all()]
#
# spray_choice = [(x, _(x)) for x in SprayingType.objects.values_list('spray_type', flat=True).distinct()]
#
# ambient_choice = [(x, x) for x in AmbientTemp.objects.values_list('ambient_temp', flat=True).distinct()]
#
# substrate_choice = [(x, x) for x in SubstrateTemp.objects.values_list('subs_temp', flat=True)]
#
# starting_drum_choice = [(x, x) for x in StartingDrumTemp.objects.values_list('start_drum_temp', flat=True)]
#
# humidity_level_choice = [(x, x) for x in HumidityLevel.objects.values_list('humidity_level', flat=True)]
#
# spraying_speed_choice = [(x, _(x)) for x in SprayingSpeed.objects.values_list('spraying_speed', flat=True)]
#
# hose_type_insulated_choice = [(x, _(x)) for x in HoseTypeInsulated.objects.values_list('hose_type', flat=True)]
#
# hose_in_choice = [(x, _(x)) for x in HoseIn.objects.values_list('hose_in', flat=True)]
#
# substrate_type_choice = [(x, _(x)) for x in SubstrateType.objects.values_list('substrate_type', flat=True)]
#
# layers = [(x, _(x)) for x in SprayLayers.objects.values_list('layer', flat=True)]
#
# question = models.CharField(max_length=255, null=False, blank=False)
# product_value = MultiSelectField(null=True, blank=True, choices=product_choice)
# mixing_chamber_size = MultiSelectField(null=True, blank=True, choices=mixing_chamber)
# machine_type_value = MultiSelectField(null=True, blank=True, choices=machine_choice)
# spray_type_value = MultiSelectField(null=True, blank=True, choices=spray_choice)
# ambient_temp_value = MultiSelectField(null=True, blank=True, choices=ambient_choice)
# recommended_starting_drum_temp = models.IntegerField(null=True, blank=True)
# substrate_temp_value = MultiSelectField(null=True, blank=True, choices=substrate_choice)
# starting_temp_value = MultiSelectField(null=True, blank=True, choices=starting_drum_choice)
# humidity_value = MultiSelectField(null=True, blank=True, choices=humidity_level_choice)
# spraying_speed_value = MultiSelectField(null=True, blank=True, choices=spraying_speed_choice)
# hose_type_insulated_value = MultiSelectField(null=True, blank=True, choices=hose_type_insulated_choice)
# hose_in_value = MultiSelectField(null=True, blank=True, choices=hose_in_choice)
# substrate_type_value = MultiSelectField(null=True, blank=True, choices=substrate_type_choice)
# spray_layers = MultiSelectField(null=True, blank=True, choices=layers)
#
# created_at = models.DateTimeField(auto_now_add=True, editable=False)
# updated_at = models.DateTimeField(auto_now=True, editable=True)
# is_deleted = models.BooleanField(default=False)
# deleted_at = models.DateTimeField(editable=True, null=True, blank=True)
#
# def __str__(self):
# return str(self.question)


# class Address(models.Model):
#     add_line1 = models.CharField(max_length=255, blank=True)
#     city = models.CharField(max_length=255, blank=True)
#     state = models.CharField(max_length=255, blank=True)
#     zip_code = models.IntegerField(blank=True)
#     created_at = models.DateTimeField(auto_now_add=True, editable=False)
#     updated_at = models.DateTimeField(auto_now=True, editable=True)
#
#
# class CustomUser(AbstractUser):
#     username = None
#     email = models.EmailField(_('email address'), unique=True)
#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = []
#
#     first_name = models.CharField(max_length=30, null=False, blank=False)
#     last_name = models.CharField(max_length=30, null=False, blank=False)
#     email_verification = models.BooleanField(default=False)
#     company_name = models.CharField(max_length=30, blank=True)
#     phone = models.IntegerField(blank=True)
#     address = models.ForeignKey(to=Address, on_delete=models.CASCADE, related_name="user_address")
#     image = models.ImageField(upload_to='user_profile/', default='default.jpg')
#     img_thumbnail = models.ImageField(upload_to='user_thumbnails/', default='default.jpg')
#     created_at = models.DateTimeField(auto_now_add=True, editable=False)
#     updated_at = models.DateTimeField(auto_now=True, editable=True)
#     is_blocked = models.BooleanField(default=False)
#     blocked_at = models.DateTimeField(editable=True, null=True, blank=True)
#
#     objects = CustomUserManager()
#
#
# @python_2_unicode_compatible
# class Token(rest_framework.authtoken.models.Token):
#     # key is no longer primary key, but still indexed and unique
#     key = models.CharField(_("Key"), max_length=40, db_index=True, unique=True)
#     # relation to user is a ForeignKey, so each user can have more than one token
#     user = models.ForeignKey(
#     settings.AUTH_USER_MODEL, related_name='auth_tokens',
#     on_delete=models.DO_NOTHING, verbose_name=_("CustomUser")
#     )
#     device_id = models.CharField(max_length=64)
#     device_type = models.CharField(max_length=64)
#     device_fcm_token = models.CharField(max_length=64)
#     created_at = models.DateTimeField(auto_now_add=True, editable=False)
#
#     class Meta:
#         unique_together = (('user', 'device_id', 'device_type', 'device_fcm_token'),)


def validate_only_one_instance(obj):
    model = obj.__class__
    if (model.objects.count() > 0 and
        obj.id != model.objects.get().id):
        raise ValidationError("Can only create 1 %s instance" % model.__name__)


class SprayFoamType(models.Model):
    def clean(self):
        validate_only_one_instance(self)

    question = models.CharField(default="What type of foam are you spraying?", max_length=255)
    product_value = models.ManyToManyField(to=Product)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.question)


class SprayMachineType(models.Model):
    def clean(self):
        validate_only_one_instance(self)

    question = models.CharField(default="What kind of machine are you using?", max_length=255)
    machine_type_value = models.ManyToManyField(to=MachineType)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.question)


class SprayMixingChamber(models.Model):
    def clean(self):
        validate_only_one_instance(self)

    question = models.CharField(default="What mixing chamber size are you using?", max_length=255)
    mixing_chamber_size = models.ManyToManyField(to=MixingChamberSize)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.question)


class SprayType(models.Model):
    def clean(self):
        validate_only_one_instance(self)

    # def limit_choices_to():
    #     # distinct = SprayingType.objects.filter(spra)
    #     # print("distinct : ", distinct)
    #     # records = SprayingType.objects.filter(spray_type__in=[item['spray_type'] for item in distinct])
    #     # print("records : ", records)
    #     return {"spray_type__contains": ["Wall", "Ceiling"]}

    question = models.CharField(default="Are you spraying walls or ceilings?", max_length=255)
    spray_type_value = models.ManyToManyField(to=SprayingType)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.question)


class AmbientTemperature(models.Model):
    def clean(self):
        validate_only_one_instance(self)

    question = models.CharField(default="What is the ambient temperature?", max_length=255)
    ambient_temp_value = models.ManyToManyField(to=AmbientTemp)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.question)


class SubstrateTemperature(models.Model):
    def clean(self):
        validate_only_one_instance(self)

    question = models.CharField(default="What is the substrate temperature?", max_length=255)
    substrate_temp_value = models.ManyToManyField(to=SubstrateTemp)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.question)


class BoardFeet(models.Model):
    ambient_temp = models.IntegerField(null=False, blank=False)
    product = models.ForeignKey(null=True, blank=True, to=Product, on_delete=models.CASCADE)
    mixing_chamber_size = models.ForeignKey(null=True, blank=True, to=MixingChamberSize, on_delete=models.CASCADE)
    board_feet = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.board_feet)


class Density(models.Model):
    ambient_temp = models.IntegerField(null=False, blank=False)
    product = models.ForeignKey(null=True, blank=True, to=Product, on_delete=models.CASCADE)
    mixing_chamber_size = models.ForeignKey(null=True, blank=True, to=MixingChamberSize, on_delete=models.CASCADE)
    density = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.density)


class Condition(models.Model):
    # difference = recommended_starting_drum_temp - user_entered_drum_temp
    difference = models.IntegerField(null=False, blank=False)
    change_in_heaters = models.CharField(null=False, blank=False, max_length=255)
    warning_message = models.CharField(null=False, blank=True, max_length=255,
                                       default="Please select the temperature difference above 20 degrees")


class StartingDrumTemperature(models.Model):
    def clean(self):
        validate_only_one_instance(self)

    question = models.CharField(default="What is the starting drum temperature?", max_length=255)
    starting_temp_value = models.ManyToManyField(to=StartingDrumTemp)
    recommended_starting_drum_temp = models.IntegerField(null=False, blank=True, default=50)
    conditions = models.ManyToManyField(to=Condition, related_name="drum_temp_conditions")
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.question)


class SprayHumidityLevel(models.Model):
    def clean(self):
        validate_only_one_instance(self)

    question = models.CharField(default="What is the humidity level?", max_length=255)
    humidity_value = models.ManyToManyField(to=HumidityLevel)
    recommended_humidity_temp = models.IntegerField(null=False, blank=True, default=50)
    recommended_ambient_temp = models.IntegerField(null=False, blank=True, default=85)
    increased_temp = models.IntegerField(null=False, blank=True, default=5)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.question)


class SpeedOfSpraying(models.Model):
    def clean(self):
        validate_only_one_instance(self)

    question = models.CharField(default="What is speed of spraying?", max_length=255)
    spraying_speed_value = models.ManyToManyField(to=SprayingSpeed)
    # fast_increased_temp = models.IntegerField(null=False, blank=True, default=3)
    # slow_decreased_temp = models.IntegerField(null=False, blank=True, default=2)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.question)


class HoseInsulated(models.Model):
    def clean(self):
        validate_only_one_instance(self)

    question = models.CharField(default="Is the hose well insulated?", max_length=255)
    hose_type_insulated_value = models.ManyToManyField(to=HoseTypeInsulated)
    # well_insulated_decreased_temp = models.IntegerField(null=False, blank=True, default=2)
    # poorly_insulated_increased_temp = models.IntegerField(null=False, blank=True, default=2)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.question)


class SprayHoseIn(models.Model):
    def clean(self):
        validate_only_one_instance(self)

    question = models.CharField(default="Is hose in the sun, on hot asphalt, in the rain, or snow?", max_length=255)
    hose_in_value = models.ManyToManyField(to=HoseIn)
    # sun_or_hot_asphalt_decreased_temp = models.IntegerField(null=False, blank=True, default=2)
    # rain_or_snow_increased_temp = models.IntegerField(null=False, blank=True, default=2)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.question)


class Substrate(models.Model):
    def clean(self):
        validate_only_one_instance(self)

    question = models.CharField(default="Substrate type?", max_length=255)
    substrate_type_value = models.ManyToManyField(to=SubstrateType)
    # metal_increased_temp = models.IntegerField(null=False, blank=True, default=3)
    # concrete_increased_temp = models.IntegerField(null=False, blank=True, default=2)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.question)


class Layers(models.Model):
    def clean(self):
        validate_only_one_instance(self)

    question = models.CharField(default="How many layers will you spray?", max_length=255)
    spray_layers = models.ManyToManyField(to=SprayLayers)
    # percentage_to_yield = models.IntegerField(null=False, blank=True, default=5)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.question)


class UPCUserRating(models.Model):
    user = models.ForeignKey(to=slp_models.User, on_delete=models.CASCADE)
    rating = models.IntegerField(null=False, blank=True, default=5)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
