import json
import os
from upc.models import MachineType
from mtranslate import translate
from rest_framework import serializers

from AllFoamTech.settings import MEDIA_URL, MEDIA_ROOT
from slp import models
from userapi import validations
from django.utils.translation import gettext_lazy as _
from django.utils.translation import activate


class FullUserSerializer(serializers.ModelSerializer):
    # address = serializers.SerializerMethodField('get_address')
    # image = serializers.SerializerMethodField('get_image_url')
    # referred_by = serializers.SerializerMethodField('get_referred_by')
    # referrals = serializers.SerializerMethodField('get_referrals')

    class Meta:
        model = models.User
        fields = ["id", "full_name", "email", "phone", "company_name", "address", "points", "referred_by",
                  "referral_code", "referrals", "img_thumbnail", "created_at", "is_blocked"]

    # def get_address(self, data):
    #     address = data.address
    #     print(address.__dict__)
    #     return json.dumps(address.__dict__)
    #
    # def get_image_url(self, data):
    #     photo_url = data.image.path
    #     return photo_url
    #
    # def get_referred_by(self, data):
    #     referred_by = data.referred_by
    #     if referred_by is not None:
    #         user = models.User.objects.get(id=referred_by)
    #         return user.full_name
    #     else:
    #         return None
    #
    # def get_referrals(self, data):
    #     referrals = data.referrals
    #     ans = {}
    #     print(referrals)
    #     for x in referrals:
    #         print(x)
    #         usr = models.User.objects.get(id=int(x.referrals))
    #         ans[usr.id] = usr.full_name
    #     return ans


class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Device
        fields = "__all__"


class UserDataSerializer(serializers.ModelSerializer):
    device = DeviceSerializer(many=True, read_only=True)

    class Meta:
        model = models.User
        fields = ["id", "full_name", "email", "phone", "company_name", "points", "referred_by", "referral_code",
                  "device", "img_thumbnail", "created_at", "is_blocked"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ["id", "full_name", "email", "company_name"]

        def create(self, validated_data):
            return models.User.objects.create(**validated_data)


class UserTranslatedSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField("get_full_name")

    class Meta:
        model = models.User
        fields = ["id", "full_name", "email"]

        def create(self, validated_data):
            return models.User.objects.create(**validated_data)

    def get_full_name(self, data):
        name = data.full_name
        return translate(name, "es", "auto")


# class ProductActivationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.ProductActivationQuestions
#         fields = "__all__"


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Question
        fields = "__all__"


class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = models.Quiz
        fields = ["quiz_name", "questions", "videoId", "points", "id","quiz_played","is_deleted"]


class QuizQuestion(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = models.Quiz
        fields = ["questions", "id","videoId"]


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Notification
        fields = "__all__"


class NotificationTranslatedSerializer(serializers.ModelSerializer):
    activate('es')
    notification_msg = serializers.SerializerMethodField("get_notification_msg")

    class Meta:
        model = models.Notification
        fields = ["user_id", "notification_msg", "points", "created_at", "updated_at", "is_deleted", "deleted_at"]

    # def get_notification_msg(self, data):
    #     msg = str(data.notification_msg)
    #     return translate(msg, "es", "auto")

    def get_notification_msg(self, data):
        activate('es')
        msg = str(data.notification_msg)
        ls = msg.split(str(data.points))
        # ls.insert(1, "% (points)s")
        msg = ""
        msg = msg.join(ls)
        print(msg)
        if (msg.find("splitted by") != -1):
            new_msg = msg[:int(msg.find("splitted by"))+11]
            name_ls = msg.split(new_msg)
            msg = new_msg

        # if (msg.find("coupon of") != -1):
        #     cp_ls = msg.split('coupon of ')
        #     cp_ls = cp_ls[1]
        #     company = cp_ls[:cp_ls.find(' sent')]
        #     msg = msg.replace(company, '')
        translated_str = _(msg)
        print(translated_str)
        ls = translated_str.split("puntos")
        ls.insert(1, str(data.points) + " puntos")
        msg = ""
        msg = msg.join(ls)
        if (msg.find("dividido") != -1):
            msg = msg + name_ls[1]
        print(msg)
        return msg


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = "__all__"


class ProductSerializerLimited(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = ["id", "product_name", "image", "total_points", "initial_point"]


# class ProductImageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.Product
#         fields = ["image"]


class MerchantSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Merchant
        fields = "__all__"


class EachProductSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField("get_full_name")
    # technical_datasheet = serializers.SerializerMethodField('get_tech_url')
    # application_guideline = serializers.SerializerMethodField('get_app_url')
    # safety_datasheet = serializers.SerializerMethodField('get_safety_url')

    class Meta:
        model = models.Product
        fields = ["full_name", "merchant_id", "id", "product_name", "total_points", "initial_point", "a_side_batch",
                  "a_side_set_temp", "b_side_set_temp", "hose_set_temp", "pressure_set", "mixing_chamber_size", "image",
                  "start_drum_temp", "a_side_batch_point", "a_side_set_temp_point", "b_side_set_temp_point",
                  "hose_set_temp_point", "pressure_set_point", "mixing_chamber_size_point", "image_point",
                  "start_drum_temp_point", "description", "created_at", "updated_at", "is_deleted", "deleted_at"]
        depth = 1

    def get_full_name(self, data):
        merchant_id = data.merchant_id
        merchant = models.Merchant.objects.get(id=merchant_id)
        return merchant.full_name

    # def get_tech_url(self, data):
    #     tech_list = data.technical_datasheet
    #     ls = [str(x) for x in tech_list]
    #     return ls

    # def get_app_url(self, data):
    #     app_list = data.application_guideline
    #     ls = [str(x) for x in app_list]
    #     return ls

    # def get_safety_url(self, data):
    #     safety_list = data.safety_datasheet
    #     ls = [str(x) for x in safety_list]
    #     return ls


class MerchantSpecificProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField('get_image_url')

    class Meta:
        model = models.Product
        fields = ["id", "product_name", "image"]

    def get_image_url(self, data):
        photo_url = data.image.url
        return photo_url

class MerchantSpecificProductTranslatedSerializer(serializers.ModelSerializer):
    product_name = serializers.SerializerMethodField('get_product_name')
    image = serializers.SerializerMethodField('get_image_url')

    class Meta:
        model = models.Product
        fields = ["id", "product_name", "image"]

    def get_product_name(self, data):
        product_name = data.product_name
        return translate(product_name, "es", "auto")

    def get_image_url(self, data):
        photo_url = data.image.url
        return photo_url


class MerchantSpecificProductDetailsSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField('get_image_url')
    product = serializers.SerializerMethodField('get_product_url')
    jobSite = serializers.SerializerMethodField('get_job_site_url')
    

    class Meta:
        model = models.Product
        fields = ["id", "product_name", "total_points", "image", "product", "jobSite"]

    def get_image_url(self, data):
        print('data-------------',data)
        photo_url = data.image.url
        return photo_url

    
    def get_product_url(self, data):
        product = data.product_resources
        print('product---1111',product)
        certi = [{"url": str(x), "type": "pdf"} for x in product]
        print('certi---1111-',certi)

        images = data.product_resources_img
        print('images00---111',images)
        img = [{"url": str(x), "type": "image"} for x in images]
        print('image--11-',img)
        certi.extend(img)
        return certi

    def get_job_site_url(self, data):
        job = data.job_site
        print('job---1111',job)
        certi = [{"url": str(x), "type": "pdf"} for x in job]
        print('certi-job--1111-',certi)

        images = data.job_site_img
        print('images00---111',images)
        img = [{"url": str(x), "type": "image"} for x in images]
        print('image--11-',img)
        certi.extend(img)
        return certi


class MerchantSpecificProductDetailsTranslatedSerializer(serializers.ModelSerializer):
    product_name = serializers.SerializerMethodField('get_product_name')
    image = serializers.SerializerMethodField('get_image_url')
    technical_datasheet = serializers.SerializerMethodField('get_tech_url')
    application_guideline = serializers.SerializerMethodField('get_app_url')
    safety_datasheet = serializers.SerializerMethodField('get_safety_url')
    certificate = serializers.SerializerMethodField('get_certificate_url')

    class Meta:
        model = models.Product
        fields = ["id", "product_name", "total_points", "image", "technical_datasheet",
                  "application_guideline", "safety_datasheet", "certificate"]

    def get_product_name(self, data):
        product_name = data.product_name
        return translate(product_name, "es", "auto")

    def get_image_url(self, data):
        photo_url = data.image.url
        return photo_url

    def get_tech_url(self, data):
        tech_list = data.technical_datasheet
        ls = [str(x) for x in tech_list]
        return ls

    def get_app_url(self, data):
        app_list = data.application_guideline
        app = [{"url": str(x), "type": "pdf"} for x in app_list]

        photo_url = data.video_link
        img = [{"url": x.video_id.url, "type": "video"} for x in photo_url]
        app.extend(img)
        return app

    def get_safety_url(self, data):
        safety_list = data.safety_datasheet
        ls = [str(x) for x in safety_list]
        return ls

    def get_certificate_url(self, data):
        certi = data.product_resources
        ls = [str(x) for x in certi]

        images = data.product_resources_img
        img = [{"url": str(x), "type": "image"} for x in images]
        ls.extend(img)
        return ls


class QrSerializer(serializers.ModelSerializer):
    product_image = serializers.SerializerMethodField('get_product_img')
    humidity = serializers.SerializerMethodField('get_humidity')
    wind_speed = serializers.SerializerMethodField('get_wind_speed')
    temp = serializers.SerializerMethodField('get_temp')
    # qr_img_name = serializers.SerializerMethodField('get_qr_img_name')

    class Meta:
        model = models.QRCode
        fields = ["id", "product_image", "product_id", "merchant_id", "scanned_location", "qr_image", "batch_id",
                  "humidity", "wind_speed", "temp"]

    def get_product_img(self, data):
        product_id = data.product_id
        try:
            product = models.Product.objects.get(id=int(product_id))
            return product.image.url
        except Exception as e:
            return None

    def get_humidity(self, data):
        whether_info = data.whether_info
        try:
            if isinstance(whether_info, str):
                whether =  eval(whether_info)
                return whether.get('humidity')
        except Exception as e:
            return None

    def get_wind_speed(self, data):
        whether_info = data.whether_info
        try:
            if isinstance(whether_info, str):
                whether =  eval(whether_info)
                return whether.get('wind_speed')
        except Exception as e:
            return None

    def get_temp(self, data):
        whether_info = data.whether_info
        try:
            if isinstance(whether_info, str):
                whether =  eval(whether_info)
                celsius = whether.get('temp')
                fahrenheit = (celsius * 1.8) + 32
                g = float("{:.2f}".format(fahrenheit))
                return g
        except Exception as e:
            return None


class QrTranslatedSerializer(serializers.ModelSerializer):
    product_image = serializers.SerializerMethodField('get_product_img')
    scanned_location = serializers.SerializerMethodField('get_scanned_location')
    # qr_img_name = serializers.SerializerMethodField('get_qr_img_name')

    class Meta:
        model = models.QRCode
        fields = ["id", "product_image", "product_id", "merchant_id", "scanned_location", "qr_image", "batch_id"]

    def get_product_img(self, data):
        product_id = data.product_id
        try:
            product = models.Product.objects.get(id=int(product_id))
            return product.image.url
        except Exception as e:
            return None

    def get_scanned_location(self, data):
        location = str(data.scanned_location)
        return translate(location, "es", "auto")


class UserRewardsSerializer(serializers.ModelSerializer):
    qr_code = QrSerializer(read_only=True)
    product_default_img = serializers.CharField(source="custom_property")
    # lifetime_earned_points = serializers.SerializerMethodField('get_user_lifetime_points')
    # available_points = serializers.SerializerMethodField('get_user_available_points')

    class Meta:
        model = models.UserRewards
        fields = ["id", "qr_code", "user_id", "qr_status", "reward_name", "reward_type", "reward_points", "points_type",
                  "dispute_status", "is_splitted", "updated_at", "product_default_img"]

    # def get_user_lifetime_points(self, data):
    #     user = data.user_id
    #     lifetime_earned_points = validations.user_lifetime_points(user)
    #     return lifetime_earned_points
    #
    # def get_user_available_points(self, data):
    #     user = data.user_id
    #     available_points = user.points
    #     return available_points


class UserRewardsTranslatedSerializer(serializers.ModelSerializer):
    activate("es")
    qr_code = QrSerializer(read_only=True)
    product_default_img = serializers.CharField(source="custom_property")
    qr_status = serializers.SerializerMethodField('get_qr_status')
    reward_name = serializers.SerializerMethodField('get_reward_name')
    reward_type = serializers.SerializerMethodField('get_reward_type')
    dispute_status = serializers.SerializerMethodField('get_dispute_status')
    # lifetime_earned_points = serializers.SerializerMethodField('get_user_lifetime_points')
    # available_points = serializers.SerializerMethodField('get_user_available_points')

    class Meta:
        model = models.UserRewards
        fields = ["id", "qr_code", "user_id", "qr_status", "reward_name", "reward_type", "reward_points", "points_type",
                  "dispute_status", "is_splitted", "updated_at", "product_default_img"]

    def get_qr_status(self, data):
        dt = str(data.qr_status)
        return _(dt)

    def get_reward_name(self, data):
        dt = str(data.reward_name)
        return _(dt)

    def get_reward_type(self, data):
        dt = str(data.reward_type)
        return _(dt)

    def get_dispute_status(self, data):
        dt = str(data.dispute_status)
        return _(dt)

    # def get_user_lifetime_points(self, data):
    #     user = data.user_id
    #     lifetime_earned_points = validations.user_lifetime_points(user)
    #     return lifetime_earned_points
    #
    # def get_user_available_points(self, data):
    #     user = data.user_id
    #     available_points = user.points
    #     return available_points

class ProductActivationSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField('get_image_url')

    class Meta:
        model = models.ProductActivationQuestions
        fields = ["a_side_batch", "a_side_set_temp", "b_side_set_temp", "hose_set_temp", "pressure_set",
                  "mixing_chamber_size", "image", "start_drum_temp","machine_type","substrate_type",
                  "substrate_temp","substrate_moisture","saftey_warning_signs_posted",
                  "mechanical_ventilation_used","sprayer_using_fresh_air","complete_after_spraying"]

    def get_image_url(self, data):
        try:
            photo_url = data.image.url
            return photo_url
        except Exception as e:
            print("No image in Product activation", e)
            return None


class MerchantSerializer(serializers.ModelSerializer):
    # image = serializers.SerializerMethodField('get_image_url')

    class Meta:
        model = models.Merchant
        fields = ["id", "full_name", "company_name", "email"]

    # def get_image_url(self, data):
    #     photo_url = data.image.url
    #     return photo_url


class MerchantTranslatedSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField('get_full_name')
    company_name = serializers.SerializerMethodField('get_company_name')
    # image = serializers.SerializerMethodField('get_image_url')

    class Meta:
        model = models.Merchant
        fields = ["id", "full_name", "company_name", "email"]

    def get_full_name(self, data):
        name = data.full_name
        return translate(name, "es", "auto")

    def get_company_name(self, data):
        company_name = data.company_name
        return translate(company_name, "es", "auto")

    # def get_image_url(self, data):
    #     photo_url = data.image.url
    #     return photo_url


class LeaderUserSerializer(serializers.ModelSerializer):
    img_thumbnail = serializers.SerializerMethodField('get_image_url')

    class Meta:
        model = models.User
        fields = ["full_name", "email", "points", "img_thumbnail", "company_name"]

    def get_image_url(self, data):
        photo_url = data.img_thumbnail.url
        return photo_url


class LeaderUserTranslatedSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField('get_full_name')
    img_thumbnail = serializers.SerializerMethodField('get_image_url')
    company_name = serializers.SerializerMethodField('get_company_name')

    class Meta:
        model = models.User
        fields = ["full_name", "email", "points", "img_thumbnail", "company_name"]

    def get_full_name(self, data):
        get_full_name = data.full_name
        return translate(get_full_name, "es", "auto")

    def get_image_url(self, data):
        photo_url = data.img_thumbnail.url
        return photo_url

    def get_company_name(self, data):
        company_name = data.company_name
        return translate(company_name, "es", "auto")


class DisputeRequestSerializer(serializers.ModelSerializer):
    qr_id = serializers.SerializerMethodField('get_qr_id')
    user_email = serializers.SerializerMethodField('get_user_email')
    created_at = serializers.SerializerMethodField("get_created_at")

    class Meta:
        model = models.DisputeRequest
        fields = ['id', 'qr_id', 'user_email', 'message', 'dispute_status', "created_at"]

    def get_qr_id(self, data):
        qr = data.opposite_user_userrewards_id.qr_code
        return qr

    def get_user_email(self, data):
        user_email = data.user_id.email
        return user_email

    def get_created_at(self, data):
        dt = data.created_at
        date = str(dt)

        return date[:19]


class SecondDisputeRequestSerializer(serializers.ModelSerializer):
    qr_id = serializers.SerializerMethodField('get_qr_id')
    user_email = serializers.SerializerMethodField('get_user_email')

    class Meta:
        model = models.DisputeRequest
        fields = ['id', 'qr_id', 'user_email', 'message', 'dispute_status']

    def get_qr_id(self, data):
        print("data : ", data)
        qr = data.opposite_user_userrewards_id.qr_code.id
        return qr

    def get_user_email(self, data):
        user_email = data.user_id.email
        return user_email


class ProductActivationQuestionsSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField("get_image")

    class Meta:
        model = models.ProductActivationQuestions
        fields = ["a_side_batch", "a_side_set_temp", "b_side_set_temp", "hose_set_temp", "pressure_set",
                  "mixing_chamber_size", "start_drum_temp", "image"]

    def get_image(self, data):
        try:
            photo_url = data.image.url
            return photo_url
        except Exception as e:
            print(e)
            return "https://slp-static.s3.us-east-2.amazonaws.com/media/product/image/default.png"


class ScannedQRSerializer(serializers.ModelSerializer):
    user_id = UserSerializer(read_only=True)
    qr_code = QrSerializer(read_only=True)
    product_activation_questions = ProductActivationQuestionsSerializer(read_only=True)
    product_point = serializers.SerializerMethodField("get_product_points")
    product_name = serializers.SerializerMethodField("get_product_name")
    merchant_name = serializers.SerializerMethodField("get_merchant_name")
    dispute_requests = serializers.SerializerMethodField("get_dispute_name")
    created_at = serializers.SerializerMethodField("get_created_at")

    class Meta:
        model = models.UserRewards
        fields = ["id", "user_id", "qr_code", "product_point", "product_name", "merchant_name", "dispute_requests",
                  "product_activation_questions", "qr_status", "created_at"]

    def get_product_points(self, data):
        qr = data.qr_code
        # print(qr)

        product_id = qr.product_id
        product = models.Product.objects.get(id=product_id)

        return product.total_points

    def get_product_name(self, data):
        qr = data.qr_code
        # print(qr)

        product_id = qr.product_id
        product = models.Product.objects.get(id=product_id)

        return product.product_name

    def get_merchant_name(self, data):
        qr = data.qr_code
        # print(qr)

        merchant_id = qr.merchant_id
        merchant = models.Merchant.objects.get(id=merchant_id)

        return merchant.full_name

    def get_dispute_name(self, data):
        id = data.id
        d = models.DisputeRequest.objects.all().filter(opposite_user_userrewards_id_id=data.id)
        dispute = SecondDisputeRequestSerializer(instance=d, many=True)
        # print("dispute : ", dispute)

        return dispute.data

    def get_created_at(self, data):
        dt = data.created_at
        date = str(dt)

        return date[:19]


class QuizShowResult(serializers.ModelSerializer):
    user_Ans = serializers.SerializerMethodField("get_user_Ans")
    real_quiz_Ans = serializers.SerializerMethodField("get_real_quiz_Ans")
    # matched_userId = serializers.SerializerMethodField("match_query")
    class Meta:
        model = models.QuizResult
        fields = ["id","quiz_videoId","user_Ans","real_quiz_Ans","answer","quiz_played","played_user"]

    def get_user_Ans(self, data):
        # userId = self.context["user_Id"]
        # print("userId===>",userId)
        ans = data.user_Ans
        # print("ans===>",ans)
        # player = data.played_user
        # print("player===>",player.id)
        # if userId == player.id:
        return eval(ans)
        # return None

    def get_real_quiz_Ans(self, data):
        # userId = self.context["user_Id"]
        # print("userId===>",userId)
        # print("real_self==>",self)
        ans = data.real_quiz_Ans
        # player = data.played_user
        # print("player===>",player.id)
        # print("ans==>",ans)
        # if userId == player.id:
        return eval(ans)
        # return None

    # def quiz_delete(self,data):
    #     quiz_data = data.quiz_videoId

    #     print("quiz_data==>",quiz_data)
    #     quiz_key = models.Quiz.objects.filter(videoId=quiz_data)
    #     print("quiz_key==>",quiz_key)
    #     for x in quiz_key:
    #         return x.is_deleted

    # def match_query(self,data):
    #     my_id = data.id
    #     print("my ==> id==>",my_id)
    #     userId = self.context["user_Id"]
    #     print("userId===>",userId)
    #     obj_user = models.QuizResult.objects.filter(id=my_id)
    #     for x in obj_user:
    #         print("======>",x.played_user.id)
    #         if userId == x.played_user.id:
    #             print("matched")
    #             return userId
    #     print("obj_user==>",obj_user)
    #     return None

class NotificationSerializer(serializers.ModelSerializer):
    # image = serializers.SerializerMethodField('get_image_url')

    class Meta:
        model = models.Notification
        fields = ["id","user_id","notification_msg","created_at"]

class MachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MachineTypes
        fields = ['id', 'machine_type']

class SubstrateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SubstrateTypes
        fields = ['id', 'substrate_type']