import os

from djongo.models import EmbeddedModelField, ArrayModelField
from phone_field import PhoneField
from djongo import models
from AllFoamTech.settings import MEDIA_ROOT, MEDIA_URL
from ckeditor.fields import RichTextField
from userapi.validations import validate_file_extension
from datetime import datetime


class Address(models.Model):
    merchant_id = models.IntegerField(null=False, blank=False)
    contractor_id = models.IntegerField(null=True, blank=False)
    add_line1 = models.CharField(max_length=300, null=False, blank=False)
    add_line2 = models.CharField(max_length=300, null=False, blank=False)
    city = models.CharField(max_length=30, null=False, blank=False)
    state = models.CharField(max_length=30, null=False, blank=False)
    country = models.CharField(max_length=30, null=False, blank=False)
    zip_code = models.IntegerField(null=False, blank=False)

    # class Meta:
    #     abstract = True


class Referral(models.Model):
    referrals = models.CharField(max_length=30, null=True, blank=True)

    # class Meta:
    #     abstract = True


class Device(models.Model):
    device_id = models.CharField(max_length=30, null=True, blank=True)
    device_type = models.CharField(max_length=30, null=True, blank=True)
    device_fcm_token = models.CharField(max_length=30, null=True, blank=True)
    access_token = models.CharField(max_length=30, null=True, blank=True)

    # class Meta:
    #     abstract = True


# class Technical(models.Model):
#     tech_datasheet = models.FileField(null=False, upload_to='product/tech_data/')

#     def __str__(self):
#         return self.tech_datasheet.url


# class Application(models.Model):
#     app_datasheet = models.FileField(null=False, upload_to='product/app_data/')

#     def __str__(self):
#         return self.app_datasheet.url


# class Safety(models.Model):
#     safe_datasheet = models.FileField(null=False, upload_to='product/safety_data/')

#     def __str__(self):
#         return self.safe_datasheet.url


# class ProductVideo(models.Model):
#     video_id = models.FileField(null=False, upload_to='product/videos/')

#     def __str__(self):
#         return self.video_id.url


# class Certificate(models.Model):
#     certificate_file = models.FileField(null=False, upload_to='product/certificate/')

#     def __str__(self):
#         return self.certificate_file.url


# class CertificateImg(models.Model):
#     certificate_file = models.ImageField(null=False, upload_to='product/certificate/')

#     def __str__(self):
#         return self.certificate_file.url


# class Equipment(models.Model):
#     equipment_file = models.FileField(null=False, upload_to='product/equipment/')

#     def __str__(self):
#         return self.equipment_file.url


# class EquipmentImg(models.Model):
#     equipment_file = models.FileField(null=False, upload_to='product/equipment/')

#     def __str__(self):
#         return self.equipment_file.url


# class Industry(models.Model):
#     industry_file = models.FileField(null=False, upload_to='product/industry/')

#     def __str__(self):
#         return self.industry_file.url


# class IndustryImg(models.Model):
#     industry_file = models.FileField(null=False, upload_to='product/industry/')

#     def __str__(self):
#         return self.industry_file.url


# class Building(models.Model):
#     building_file = models.FileField(null=False, upload_to='product/building/')

#     def __str__(self):
#         return self.building_file.url


# class BuildingImg(models.Model):
#     building_file = models.FileField(null=False, upload_to='product/building/')

#     def __str__(self):
#         return self.building_file.url


# class Quality(models.Model):
#     quality_file = models.FileField(null=False, upload_to='product/quality/')

#     def __str__(self):
#         return self.quality_file.url


# class QualityImg(models.Model):
#     quality_file = models.FileField(null=False, upload_to='product/quality/')

#     def __str__(self):
#         return self.quality_file.url


class UPCProductResources(models.Model):
    product_resource_file = models.FileField(null=False, upload_to='product/ProductResources/')

    def __str__(self):
        return self.product_resource_file.url


class UPCProductResourcesImg(models.Model):
    product_resource_file = models.ImageField(null=False, upload_to='product/ProductResources/')

    def __str__(self):
        return self.product_resource_file.url


class TechTips(models.Model):
    tech_tips_file = models.FileField(null=False, upload_to='product/TechTips/')

    def __str__(self):
        return self.tech_tips_file.url


class TechTipsImg(models.Model):
    tech_tips_file = models.FileField(null=False, upload_to='product/TechTips/')

    def __str__(self):
        return self.tech_tips_file.url


class Safety(models.Model):
    safety_file = models.FileField(null=False, upload_to='product/safety/')

    def __str__(self):
        return self.safety_file.url


class SafetyImg(models.Model):
    safety_file = models.FileField(null=False, upload_to='product/safety/')

    def __str__(self):
        return self.safety_file.url


class Building(models.Model):
    building_file = models.FileField(null=False, upload_to='product/building/')

    def __str__(self):
        return self.building_file.url


class BuildingImg(models.Model):
    building_file = models.FileField(null=False, upload_to='product/building/')

    def __str__(self):
        return self.building_file.url


class JobSite(models.Model):
    job_file = models.FileField(null=False, upload_to='product/job/')

    def __str__(self):
        return self.job_file.url


class JobSiteImg(models.Model):
    job_file = models.FileField(null=False, upload_to='product/job/')

    def __str__(self):
        return self.job_file.url


class Equipment(models.Model):
    equipment_file = models.FileField(null=False, upload_to='product/equipment/')

    def __str__(self):
        return self.equipment_file.url


class EquipmentImg(models.Model):
    equipment_file = models.FileField(null=False, upload_to='product/equipment/')

    def __str__(self):
        return self.equipment_file.url

class AdminSettings(models.Model):
    no_of_points_to_usd = models.IntegerField(null=False, blank=False, default=10000)
    user_referral_points = models.IntegerField(null=False, blank=False, default=10000)
    user_eligibility_points = models.IntegerField(null=False, blank=False, default=10000)
    percentage_of_new_user_referral_points = models.IntegerField(null=False, blank=False, default=10)
    duration_in_year_for_get_new_user_referral_points = models.IntegerField(null=False, blank=False, default=1)
    contractor_panel_no_of_points_to_one_usd = models.IntegerField(null=False, blank=False, default=100)
    support_request_points = models.IntegerField(null=False, blank=False, default=300)


class Admin(models.Model):
    full_name = models.CharField(max_length=30, null=False, blank=False)
    email = models.EmailField(max_length=30, null=False, blank=False, unique=True)
    password = models.CharField(max_length=12, null=False, blank=False)
    settings = EmbeddedModelField(model_container=AdminSettings)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)


class User(models.Model):
    # first_name = models.CharField(max_length=30, null=False, blank=False)
    # last_name = models.CharField(max_length=30, null=False, blank=False)
    full_name = models.CharField(max_length=30, null=False, blank=False)
    email = models.EmailField(max_length=30, null=False, blank=False, unique=True)
    email_verification = models.BooleanField(default=False)
    email_verification_token = models.CharField(max_length=12, null=True, blank=False)
    password = models.CharField(max_length=12, null=False, blank=False)
    phone = PhoneField(null=False, blank=False)
    company_name = models.CharField(max_length=30, null=False, blank=False)
    address = EmbeddedModelField(model_container=Address)
    points = models.IntegerField(null=False, blank=False, default=0)
    # tempPoints = models.IntegerField(null=False, blank=False, default=0)
    referred_by = models.IntegerField(null=True, blank=False)
    referral_code = models.CharField(max_length=10, null=False, blank=False, unique=True)
    referrals = ArrayModelField(model_container=Referral, null=False)
    device = ArrayModelField(model_container=Device, null=False)
    image = models.ImageField(upload_to='user_profile/', default='default.jpg')
    img_thumbnail = models.ImageField(upload_to='user_thumbnails/', default='default.jpg')
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_blocked = models.BooleanField(default=False)
    blocked_at = models.DateTimeField(editable=True, null=True, blank=True)


class Merchant(models.Model):
    full_name = models.CharField(max_length=30, null=False, blank=False)
    company_name = models.CharField(max_length=225, null=True, blank=True)
    email = models.EmailField(max_length=30, null=False, blank=False, unique=True)
    password = models.CharField(max_length=12, null=True, blank=False)
    phone = models.IntegerField(null=False, blank=False)
    address = EmbeddedModelField(model_container=Address)
    image = models.ImageField(null=True, blank=True, upload_to='merchant_profile/', default='default.jpg')
    token_id = models.CharField(max_length=30, null=True, blank=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_blocked = models.BooleanField(default=False)
    blocked_at = models.DateTimeField(editable=True, null=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)
    is_activated = models.BooleanField(default=False)


class MachineTypes(models.Model):
    # oid = models.AutoField(auto_created=True, primary_key=True)
    machine_type = models.CharField(max_length=30, null=True, blank=True) 
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)       


class SubstrateTypes(models.Model):
    substrate_type = models.CharField(max_length=30, null=True, blank=True) 
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True) 

    
class Product(models.Model):
    merchant_id = models.CharField(max_length=30, null=True, blank=False, default=0)
    product_name = models.CharField(max_length=30, null=False, blank=False)
    total_points = models.IntegerField(null=False, blank=False, default=0)
    initial_point = models.IntegerField(null=False, blank=False, default=0)
    a_side_batch = models.CharField(max_length=30, null=False, blank=False, default=0)
    a_side_set_temp = models.IntegerField(null=False, blank=False, default=0)
    b_side_set_temp = models.IntegerField(null=False, blank=False, default=0)
    hose_set_temp = models.IntegerField(null=False, blank=False, default=0)
    pressure_set = models.IntegerField(null=False, blank=False, default=0)
    mixing_chamber_size = models.IntegerField(null=False, blank=False, default=0)
    image = models.ImageField(null=False, upload_to='product/image/', default='product/image/default.png')
    start_drum_temp = models.IntegerField(null=False, blank=False, default=0)
    a_side_batch_point = models.IntegerField(null=False, blank=False, default=0)
    a_side_set_temp_point = models.IntegerField(null=False, blank=False, default=0)
    b_side_set_temp_point = models.IntegerField(null=False, blank=False, default=0)
    hose_set_temp_point = models.IntegerField(null=False, blank=False, default=0)
    pressure_set_point = models.IntegerField(null=False, blank=False, default=0)
    mixing_chamber_size_point = models.IntegerField(null=False, blank=False, default=0)
    image_point = models.IntegerField(null=False, blank=False, default=0)
    start_drum_temp_point = models.IntegerField(null=False, blank=False, default=0)
    machine_type = models.ForeignKey(to=MachineTypes, on_delete=models.CASCADE)
    substrate_type = models.ForeignKey(to=SubstrateTypes, on_delete=models.CASCADE)
    substrate_temp = models.CharField(max_length=5, null=True, blank=True, default=0)
    substrate_moisture = models.CharField(max_length=5, null=True, blank=True, default=0)
    saftey_warning_signs_posted = models.CharField(max_length=30, null=True, blank=True, default=0)
    mechanical_ventilation_used = models.CharField(max_length=30, null=True, blank=True, default=0)
    sprayer_using_fresh_air = models.CharField(max_length=30, null=True, blank=True, default=0)
    complete_after_spraying = models.CharField(max_length=30, null=True, blank=True, default=0)
    # technical_datasheet = ArrayModelField(model_container=Technical, null=True)
    # application_guideline = ArrayModelField(model_container=Application, null=True)
    # safety_datasheet = ArrayModelField(model_container=Safety, null=True)
    # video_link = ArrayModelField(model_container=ProductVideo, null=True)
    # certificate = ArrayModelField(model_container=Certificate, null=True)
    # certificate_img = ArrayModelField(model_container=CertificateImg, null=True)
    # equipment = ArrayModelField(null=True, model_container=Equipment)
    # equipment_img = ArrayModelField(null=True, model_container=EquipmentImg)
    # industry = ArrayModelField(null=True, model_container=Industry)
    # industry_img = ArrayModelField(null=True, model_container=IndustryImg)
    # building = ArrayModelField(null=True, model_container=Building)
    # building_img = ArrayModelField(null=True, model_container=BuildingImg)
    # quality = ArrayModelField(null=True, model_container=Quality)
    # quality_img = ArrayModelField(null=True, model_container=QualityImg)
    product_resources = ArrayModelField(model_container=UPCProductResources, null=True)
    product_resources_img = ArrayModelField(model_container=UPCProductResourcesImg, null=True)
    # tech_tips = ArrayModelField(null=True, model_container=TechTips)
    # tech_tips_img = ArrayModelField(null=True, model_container=TechTipsImg)
    # safety = ArrayModelField(null=True, model_container=Safety)
    # safety_img = ArrayModelField(null=True, model_container=SafetyImg)
    # building = ArrayModelField(null=True, model_container=Building)
    # building_img = ArrayModelField(null=True, model_container=BuildingImg)
    job_site = ArrayModelField(null=True, model_container=JobSite)
    job_site_img = ArrayModelField(null=True, model_container=JobSiteImg)
    # equipment = ArrayModelField(null=True, model_container=Equipment)
    # equipment_img = ArrayModelField(null=True, model_container=EquipmentImg)
    description = models.CharField(max_length=500, null=True, blank=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)


class Category(models.Model):
    # author = models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    category_name = models.CharField(max_length=30, null=False, blank=False, unique=True)
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)


class Video(models.Model):
    category = models.CharField(max_length=30, null=False, blank=False)
    upload_video = models.FileField(null=False, upload_to='upload_video/', validators=[validate_file_extension])
    video_thumbnail = models.ImageField(null=True, blank=True, upload_to='video_thumbnail/',
                                        default="video_thumbnail/defaultVideo.png")
    video_length = models.IntegerField(null=False, blank=False, default=0)
    video_name = models.CharField(max_length=50, null=False, blank=False)
    video_desc = models.CharField(max_length=255, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)


class Question(models.Model):
    question_id = models.CharField(max_length=25, null=True, blank=True)
    question = models.CharField(max_length=255, null=False, blank=False)
    quiz_id = models.CharField(max_length=25, null=True, blank=True)
    op1 = models.CharField(max_length=50, null=False, blank=False)
    op2 = models.CharField(max_length=50, null=False, blank=False)
    op3 = models.CharField(max_length=50, null=False, blank=False)
    op4 = models.CharField(max_length=50, null=False, blank=False)
    answer = models.CharField(max_length=50, null=False, blank=False)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.question

    def __int__(self):
        return self.id


class Quiz(models.Model):
    quiz_name = models.CharField(max_length=30, null=False, blank=False)
    questions = ArrayModelField(model_container=Question)
    videoId = models.ForeignKey(to=Video, on_delete=models.CASCADE)
    product = models.ForeignKey(to=Product, on_delete=models.CASCADE, null=True, blank=True)
    points = models.CharField(max_length=30, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now_add=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)
    quiz_played = models.BooleanField(default=False)
    objects = models.DjongoManager()


class Notification(models.Model):
    user_id = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name="user_notifications")
    notification_msg = models.CharField(max_length=255, null=False, blank=False)
    points = models.IntegerField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True)


class Batch(models.Model):
    merchant_id = models.CharField(max_length=30, null=False, blank=False)
    batch_name = models.CharField(max_length=30, null=False, blank=False)
    product_id = models.CharField(max_length=30, null=False, blank=False)
    quantity = models.IntegerField(null=False, blank=False)
    start_date = models.CharField(max_length=255, null=False, blank=False)
    start_time = models.CharField(max_length=255, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True)


class QRCode(models.Model):
    batch_id = models.CharField(max_length=30, null=False, blank=False)
    # product_image = models.ForeignKey(to=Product, on_delete=models.CASCADE, null=True, blank=True)
    product_id = models.CharField(max_length=30, null=False, blank=False)
    merchant_id = models.CharField(max_length=30, null=False, blank=False)
    qr_image = models.ImageField(null=False, upload_to='qr_image/')
    is_scanned = models.BooleanField(default=False)
    scanned_coordinates = models.CharField(max_length=250, null=True, blank=True)
    scanned_location = models.CharField(max_length=250, null=True, blank=True)
    whether_info = models.CharField(max_length=250, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)


class Banner(models.Model):
    company_name = models.CharField(max_length=50, null=False, blank=False)
    image = models.ImageField(null=False, upload_to='banner/')
    url = models.URLField(max_length=250)
    status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)


class ProductActivationQuestions(models.Model):
    qr_id = models.CharField(max_length=30, null=True, blank=True, default=0)
    a_side_batch = models.CharField(max_length=30, null=True, blank=True, default=0)
    a_side_set_temp = models.IntegerField(null=True, blank=True, default=0)
    b_side_set_temp = models.IntegerField(null=True, blank=True, default=0)
    hose_set_temp = models.IntegerField(null=True, blank=True, default=0)
    pressure_set = models.IntegerField(null=True, blank=True, default=0)
    mixing_chamber_size = models.CharField(max_length=30, null=True, blank=True, default='00')
    image = models.ImageField(null=True, blank=True, upload_to='product_activation/')
    start_drum_temp = models.IntegerField(null=True, blank=True, default=0)
    # machine_type = models.ForeignKey(to=MachineTypes, on_delete=models.CASCADE)
    machine_type = models.CharField(max_length=30, null=True, blank=True, default=0)

    machine_temp = models.IntegerField(null=True, blank=True, default=0)
    # substrate_type = models.ForeignKey(to=SubstrateTypes, on_delete=models.CASCADE)
    substrate_type = models.CharField(max_length=30, null=True, blank=True, default=0)

    substrate_temp = models.IntegerField(null=True, blank=True, default=0)
    substrate_moisture = models.IntegerField(null=True, blank=True, default=0)
    saftey_warning_signs_posted = models.CharField(max_length=30, null=True, blank=True, default=0)
    mechanical_ventilation_used = models.CharField(max_length=30, null=True, blank=True, default=0)
    sprayer_using_fresh_air = models.CharField(max_length=30, null=True, blank=True, default=0)
    complete_after_spraying = models.CharField(max_length=30, null=True, blank=True, default=0)


class LeaderBoard(models.Model):
    user_id = models.ForeignKey(to=User, on_delete=models.CASCADE)
    month = models.CharField(max_length=30, null=False, blank=False)


class UserSupportRequest(models.Model):
    user_id = models.ForeignKey(to=User, on_delete=models.CASCADE)
    message = models.CharField(max_length=255, null=False, blank=False)
    dispute_status = models.CharField(max_length=50, null=False, blank=False, default="Pending")
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)


class AdminPoints(models.Model):
    no_of_points_to_usd = models.IntegerField(null=False, blank=False, default=1000)
    user_referral_points = models.IntegerField(null=False, blank=False, default=10000)


class PostCms(models.Model):
    def number1():
        try:
            data = PostCms.objects.latest('id')
            return data.id + 1
        except Exception as e:
            return 1

    English = "English"
    Spanish = "Spanish"
    languages = [
        (English, 'English'),
        (Spanish, 'Spanish')
    ]
    id = models.IntegerField(primary_key=True, default=number1)
    language = models.CharField(choices=languages, max_length=255, null=False, blank=False)
    title = models.CharField(max_length=255, null=False, blank=False)
    content = RichTextField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)


class QuizResult(models.Model):
    played_user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    quiz_videoId = models.IntegerField(null=False, blank=False)
    # quiz = models.ForeignKey(to=Quiz, on_delete=models.CASCADE)
    user_Ans = models.CharField(max_length=255, null=False, blank=False)
    real_quiz_Ans = models.CharField(max_length=255, null=False, blank=False)
    answer = models.CharField(max_length=255, null=False, blank=False)
    quiz_played = models.BooleanField(default=True)


class GiftBitLog(models.Model):
    sent_user = models.CharField(max_length=255, null=False, blank=False)
    brandname = models.CharField(max_length=255, null=False, blank=False)
    coupen_amount = models.CharField(max_length=255, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)


class Contest(models.Model):
    def number1():
        try:
            data = Contest.objects.latest('id')
            return data.id + 1
        except Exception as e:
            return 1

    id = models.IntegerField(primary_key=True, default=number1)
    contest_name = models.CharField(max_length=255, blank=True, null=True)
    contest_details = models.TextField(blank=True, null=True)
    contest_image = models.ImageField(null=False, upload_to='contest/')
    contest_point = models.IntegerField(null=False, blank=False, default=2500)
    contest_startdate = models.DateTimeField(default=datetime.now, blank=True)
    contest_enddate = models.DateTimeField(default=datetime.now, blank=True)
    contest_status = models.CharField(max_length=255, blank=True, null=True, default="upcoming")
    contest_result_generated = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)


class ContestPlay(models.Model):
    def number1():
        try:
            data = ContestPlay.objects.latest('id')
            return data.id + 1
        except Exception as e:
            return 1

    id = models.IntegerField(primary_key=True, default=number1)
    contest_id = models.ForeignKey(to=Contest, on_delete=models.CASCADE)
    contest_user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    contest_played = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)


class Contractor(models.Model):
    full_name = models.CharField(max_length=30, null=False, blank=False)
    company_name = models.CharField(max_length=225, null=False, blank=False)
    contact_name = models.CharField(max_length=30, null=False, blank=False)
    contact_name2 = models.CharField(max_length=30, null=True, blank=True)
    email = models.EmailField(max_length=30, null=False, blank=False, unique=True)
    email2 = models.EmailField(max_length=30, null=True, blank=True, default='abc@yopmail.com')
    password = models.CharField(max_length=12, null=True, blank=False)
    phone = models.IntegerField(null=False, blank=False)
    phone2 = models.CharField(max_length=10, null=True, blank=True)
    address = EmbeddedModelField(model_container=Address)
    image = models.ImageField(null=True, blank=True, upload_to='contractor_profile_img/', default='default.jpg')
    token_id = models.CharField(max_length=30, null=True, blank=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_blocked = models.BooleanField(default=False)
    blocked_at = models.DateTimeField(editable=True, null=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)
    is_activated = models.BooleanField(default=False)


class JobCategory(models.Model):
    contractor = models.ForeignKey(to=Contractor, on_delete=models.CASCADE)
    job_category_name = models.CharField(max_length=255, blank=False, null=False)
    status = models.CharField(max_length=255, blank=False, null=False, default="Active")
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    # def __str__(self):
    #     return str(self.job_category_name)


class TaskAttachment(models.Model):
    attachment = models.FileField(null=False, upload_to='contractor/task_attachments/')
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)

    def __str__(self):
        return self.attachment.url

    def extension(self):
        name, extension = os.path.splitext(self.attachment.name)
        return extension


class Task(models.Model):
    contractor = models.ForeignKey(to=Contractor, on_delete=models.CASCADE)
    assigned_user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    assigned_job = models.ForeignKey(to=JobCategory, on_delete=models.CASCADE)
    title = models.CharField(max_length=200, null=True, blank=False)
    description = models.CharField(max_length=255, blank=False, null=False, default="Active")
    start_date = models.DateTimeField(editable=True, null=False, blank=False)
    end_date = models.DateTimeField(editable=True, null=False, blank=False)
    attachment = ArrayModelField(null=False, model_container=TaskAttachment)
    location = models.CharField(max_length=255, blank=False, null=False)
    task_status = models.CharField(max_length=255, blank=False, null=False, default="To Do")
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.description)


class ProductAddPointsRequest(models.Model):
    requested_contractor = models.ForeignKey(to=Contractor, on_delete=models.CASCADE)
    product = models.ForeignKey(to=Product, on_delete=models.CASCADE)
    additional_points = models.IntegerField(null=False, blank=False)
    monthly_changes = models.FloatField(null=False, blank=False)
    request_status = models.CharField(max_length=255, blank=False, null=False, default="Pending")
    payment_status = models.CharField(max_length=255, blank=False, null=False, default="Unpaid")

    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)


class QRTasksMapping(models.Model):
    task = models.ForeignKey(to=Task, on_delete=models.CASCADE)
    qr_code = models.ForeignKey(to=QRCode, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)


class TaskAddPointsRequest(models.Model):
    requested_contractor = models.ForeignKey(to=Contractor, on_delete=models.CASCADE)
    task = models.ForeignKey(to=Task, on_delete=models.CASCADE)
    additional_points = models.IntegerField(null=False, blank=False)
    amount_to_pay = models.FloatField(null=False, blank=False)
    request_status = models.CharField(max_length=255, blank=False, null=False, default="Pending")
    payment_status = models.CharField(max_length=255, blank=False, null=False, default="Unpaid")

    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(editable=True, null=True, blank=True)


class UserRewards(models.Model):
    user_id = models.ForeignKey(to=User, on_delete=models.CASCADE)
    qr_code = models.ForeignKey(to=QRCode, on_delete=models.CASCADE, null=True, blank=True)
    video = models.ForeignKey(to=Video, on_delete=models.CASCADE, null=True, blank=True)
    task_add_points_request = models.ForeignKey(to=TaskAddPointsRequest, on_delete=models.CASCADE)
    originally_scanned = models.BooleanField(default=False)
    reward_name = models.CharField(max_length=30, null=False, blank=False)
    reward_type = models.CharField(max_length=30, null=False, blank=False)
    reward_points = models.IntegerField(null=False, blank=False, default=0)
    points_type = models.CharField(max_length=30, null=False, blank=False)
    product_activation_questions = models.ForeignKey(to=ProductActivationQuestions, on_delete=models.CASCADE, null=True,
                                                     blank=True)
    qr_status = models.CharField(max_length=30, null=True, blank=True)
    admin_reason = models.CharField(max_length=255, null=True, blank=True)
    dispute_status = models.CharField(max_length=30, null=True, blank=True)
    is_splitted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)

    @property
    def custom_property(self):
        return MEDIA_URL + "default.jpg"


class DisputeRequest(models.Model):
    user_id = models.ForeignKey(to=User, on_delete=models.CASCADE)
    message = models.CharField(max_length=255, null=False, blank=False)
    dispute_status = models.CharField(max_length=50, null=False, blank=False, default="Pending")
    opposite_user_userrewards_id = models.ForeignKey(to=UserRewards, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)

    class Meta:
        ordering = ('-created_at',)


class EquipmentResources(models.Model):
    equipment_resources = models.FileField(null=False, upload_to='product/NewEquipment/')
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)


class TechTipsFile(models.Model):
    tech_tips_file = models.FileField(null=False, upload_to='product/NewTechTips/')
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)


class safetyDocumentFile(models.Model):
    safety_document_file = models.FileField(null=False, upload_to='product/NewSafety/')
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)


class BuildingDocumentFile(models.Model):
    building_document_file = models.FileField(null=False, upload_to='product/NewBuilding/')
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)