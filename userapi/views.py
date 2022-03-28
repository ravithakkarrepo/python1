import json
import sys
from django.db.models import Q
from django.core import mail
from django.shortcuts import render, redirect
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from pymsgbox import alert
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from slp import models
import random
import string

from upc.models import Product as UPCProduct
from userapi import validations, serializers
import requests
import shutil
import os
from PIL import Image
from django.core.files import File
from rest_framework.parsers import FileUploadParser
from django.contrib.sites.shortcuts import get_current_site
from AllFoamTech import settings
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile

#For Whether Forecasting from Latitude and Longitude
from AllFoamTech.settings import WHETHER_API_KEY

# For Google location
import googlemaps
from AllFoamTech.settings import GOOGLE_API_KEY_3

# For multi-language support
from django.utils.translation import gettext_lazy as _
from django.utils.translation import activate

from mtranslate import translate

# To delete data from AWS S3 Bucket
from AllFoamTech.settings import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_STORAGE_BUCKET_NAME
import boto3

session = boto3.Session(
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
)
s3 = session.resource('s3')
from push_notifications.models import APNSDevice, GCMDevice

class RegisterUser(APIView):
    """
    API for User Registration in ReactNative app.
    API Input Data Type : Json
    API Input Data : *full_name, *email, *password, *phone, *company_name, *address, referred_by
    API Output Data : On Success -> Msg="User Created Successfully! Please verify your email." Status=200 OK
                      On Failure -> Msg="Email already exists" Status=406 Not Acceptable
                      On Failure -> Msg="Field Missing" Status=400 Bad Request
    """

    def post(self, request):

        res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
        print('request langugae : ', res_lan)

        if res_lan == "es":
            activate('es')
            pass

        try:
            data, dict_keys = validations.check_request(request, 'keys')
            print("Data : ", data, "\nType od Data : ", type(data), list(dict_keys))
        except Exception as e:
            print(e)
            res_data = {"status_code": 400, "status": "fail", "message": _('Invalid Request'), "data": {}}
            return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
        args = list(dict_keys)
        ans = validations.get_request_data(data, args)

        if not isinstance(ans, dict):
            if ans == 'email already exists':
                res_data = {"status_code": 406, "status": "fail",
                            "message": _('User with this email is already exists'), "data": {}}
                return Response(data=res_data, status=status.HTTP_406_NOT_ACCEPTABLE)
            if ans[0] == '0':
                dt = ans.split(' ')
                res_data = {"status_code": 400, "status": "fail", "message": f"{dt[1]} is mandatory",       # Except in django.po
                            "data": {}}
                return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
            if ans == "Invalid referral code":
                res_data = {"status_code": 400, "status": "fail", "message": _('Invalid Referral Code'), "data": {}}
                return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)

        name, email, password, phone, company_name, address = ans.get('full_name'), ans.get('email'), \
                                                              ans.get('password'), ans.get('phone'), \
                                                              ans.get('company_name').lower().strip(), ans.get('address')
        # try:
        #     if name.find(' ') != -1:
        #         names = name.split(' ')
        #         first_name = name[0]
        #         last_name = name[1]
        # except Exception as e:
        #     print("exception in split full name : ", e)
        #     first_name = name
        #     last_name = ''
        password = validations.hash_password(password)

        referral_code = ''.join(random.choices(string.ascii_letters + string.digits, k=6))
        while referral_code in [obj.referral_code for obj in models.User.objects.all()]:
            referral_code = ''.join(random.choices(string.ascii_letters + string.digits, k=6))

        obj = models.Referral(None)
        referrals = [obj]

        device = models.Device(None)
        device = [device]

        verification_token = ''.join(random.choices(string.ascii_letters + string.digits, k=12))
        while verification_token in [obj.email_verification_token for obj in models.User.objects.all()]:
            verification_token = ''.join(random.choices(string.ascii_letters + string.digits, k=12))

        if 'referred_by' not in ans:
            models.User.objects.create(full_name=name, email=email,
                                       password=password, phone=phone, company_name=company_name, address=address,
                                       referral_code=referral_code, referrals=referrals, device=device,
                                       email_verification_token=verification_token)

        else:
            referred_by = ans.get('referred_by')
            models.User.objects.create(full_name=name, email=email,
                                       password=password, phone=phone, company_name=company_name, address=address,
                                       referred_by=referred_by, referral_code=referral_code, referrals=referrals,
                                       device=device, email_verification_token=verification_token)

            referred_user = models.User.objects.get(email=email)
            referral_user = models.User.objects.get(id=referred_by)
            ref = models.Referral.objects.create(referrals=referred_user.id)

            if referral_user.referrals[0].referrals is None:
                referral_user.referrals[0] = ref
            else:
                referral_user.referrals.append(ref)
            referred_user.save()
            referral_user.save()

        subject = 'User Activation for Sprayer Loyalty Program'
        is_user = True
        current_site = get_current_site(request)
        domain = current_site.domain
        url = f"http://{domain}/activation_link/{verification_token}/"
        html_message = render_to_string('new_mail.html', {'first_name': name, 'url': url, 'is_user': is_user})
        plain_message = strip_tags(html_message)
        from_email = settings.DEFAULT_FROM_EMAIL
        to = email
        mail.send_mail(subject, plain_message, from_email, [to], html_message=html_message)

        res_data = {"status_code": 200, "status": "success",
                    "message": _('You have been Registered successfully. Please Check your email to Activate your account. Please allow several minutes for the email to arrive.'), "data": {}}
        return Response(data=res_data, status=status.HTTP_200_OK)


class UserLogin(APIView):
    """
    API for User Login in React Native app.
    API Input Data Type : Json
    Input params in request : *email, *password, *device_id, *device_type and *device_fcm_token
    API Output Data : On Success -> {"access_token": "", "user_id": "", "points": ""} with Status=200 OK
                      On Failure -> Msg="User with specified Email not exists." Status=401 NOT ACCEPTABLE
                      On Failure -> Msg="Missing Fields." Status=400 BAD REQUEST
                      On Failure -> Msg="User hasn't verified their mail yet.." Status=406 NOT ACCEPTABLE
    """

    def post(self, request):

        res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
        print('request langugae : ', res_lan)

        if res_lan == "es":
            activate('es')
            pass

        try:
            data, dict_keys = validations.check_request(request, 'keys')
            print("Data : ", data, "\nType od Data : ", type(data), list(dict_keys))
        except Exception as e:
            print(e)
            res_data = {"status_code": 400, "status": "fail", "message": _("Invalid Request"), "data": {}}
            return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)

        if 'email' in dict_keys:
            email = data.get("email")
            users = models.User.objects.all()
            emails = [user.email for user in users]
            if email not in emails:
                res_data = {"status_code": 401, "status": "fail", "message": _("No User is signed up with this email"),
                            "data": {}}
                return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
        else:
            res_data = {"status_code": 400, "status": "fail", "message": _("Email is mandatory"), "data": {}}
            return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)

        if 'password' in dict_keys:
            password = data.get("password")
        else:
            res_data = {"status_code": 400, "status": "fail", "message": _("Password is mandatory"), "data": {}}
            return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)

        if 'device_id' in dict_keys:
            device_id = data.get("device_id")
        else:
            res_data = {"status_code": 400, "status": "fail", "message": _("device_id is mandatory"), "data": {}}
            return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)

        if 'device_type' in dict_keys:
            device_type = data.get("device_type")
        else:
            res_data = {"status_code": 400, "status": "fail", "message": _("device_type is mandatory"), "data": {}}
            return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)

        if 'device_fcm_token' in dict_keys:
            device_fcm_token = data.get("device_fcm_token")
        else:
            res_data = {"status_code": 400, "status": "fail", "message": _("device_fcm_token is mandatory"), "data": {}}
            return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)

        try:
            password = validations.hash_password(password)
            if models.User.objects.filter(email=email, password=password).exists():
                usr = models.User.objects.get(email=email, password=password)
                print(models.User.objects.filter(email=email, password=password))
                if not usr.email_verification:
                    res_data = {"status_code": 406, "status": "fail",
                                "message": _("User hasn't verify their activation mail yet. Please accept that to Login"),
                                "data": {}}
                    return Response(data=res_data, status=status.HTTP_406_NOT_ACCEPTABLE)
                if usr.is_blocked:
                    res_data = {"status_code": 406, "status": "fail",
                                "message": _("User is blocked by admin. Please contact admin to resolve this."),
                                "data": {}}
                    return Response(data=res_data, status=status.HTTP_406_NOT_ACCEPTABLE)
            else:
                res_data = {"status_code": 406, "status": "fail", "message": _("Invalid Login Credential"), "data": {}}
                return Response(data=res_data, status=status.HTTP_406_NOT_ACCEPTABLE)
        except Exception as e:
            print(e)
            res_data = {"status_code": 406, "status": "fail", "message": _("Invalid Login Credential"), "data": {}}
            return Response(data=res_data, status=status.HTTP_406_NOT_ACCEPTABLE)

        else:
            access_token = ''.join(random.choices(string.ascii_letters + string.digits, k=6))
            while access_token in [obj.access_token for obj in models.Device.objects.all()]:
                access_token = ''.join(random.choices(string.ascii_letters + string.digits, k=6))

            device = models.Device.objects.create(device_id=device_id, device_type=device_type,
                                                  device_fcm_token=device_fcm_token, access_token=access_token)

            # print(usr.device[0].device_id, "\ntype", type(usr.device[0].device_id))
            if usr.device == []:
                usr.device.append(device)
            elif usr.device[0].device_id == None:
                usr.device[0] = device
            else:
                usr.device.append(device)
            usr.save()

            banners = models.Banner.objects.all().filter(status=True, is_deleted=False)
            banner_list = [{"banner_ad_url": banner.url, "banner_image": banner.image.url} for banner in banners]

            lifetime_earned_points = validations.user_lifetime_points(usr)

            res_data = {"status_code": 200, "status": "success", "message": _("User successfully logged in"),
                        "data": {"access_token": access_token, "user_id": usr.id, "banners": banner_list,
                                 "lifetime_earned_points": lifetime_earned_points, "available_points": usr.points,
                                 "is_blocked": usr.is_blocked}}
            return Response(data=res_data, status=status.HTTP_200_OK)

        res_data = {"status_code": 400, "status": "fail", "message": _("Something went wrong"), "data": {}}
        return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)


class MobileDashboard(APIView):
    """
    API for User Dashboard in React Native app.
    API Input Data Type : Json
    Input params in request : *access_token

    """

    def get(self, request):

        res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
        print('request langugae : ', res_lan)

        if res_lan == "es":
            activate('es')
            pass

        token = request.GET.get('access_token', '')
        print(token)
        if token == '':
            res_data = {"status_code": 400, "status": "fail", "message": _("Invalid Request"), "data": {}}
            return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
        try:
            user_obj, token_list = validations.get_user_obj(token)
        except Exception as e:
            print(e)
            res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
            return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
        if token in token_list:
            points = user_obj.points
        else:
            print('False')
            res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
            return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

        banners = models.Banner.objects.all().filter(status=True, is_deleted=False)
        banner_list = [{"banner_ad_url": banner.url, "banner_image": banner.image.url} for banner in banners]

        lifetime_earned_points = validations.user_lifetime_points(user_obj)

        data = {"lifetime_earned_points": lifetime_earned_points, "available_points": points, "banners": banner_list,
                "is_blocked": user_obj.is_blocked}
        res_data = {"status_code": 200, "status": "success", "message": _("Dashboard Retrieved"), "data": data}
        return Response(data=res_data, status=status.HTTP_200_OK)


class GetUser(APIView):
    def get(self, request):

        res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
        print('request langugae : ', res_lan)

        if res_lan == "es":
            activate('es')
            pass

        token = request.GET.get('access_token', '')
        print(token)

        if token == '':
            res_data = {"status_code": 400, "status": "fail", "message": _("Invalid Request"), "data": {}}
            return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
        try:
            user, token_list = validations.get_user_obj(token)
        except Exception as e:
            print(e)
            res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
            return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
        print(user.image)
        referrals = user.referrals
        if referrals[0].referrals is not None:
            ans_referrals = {}
            for x in referrals:
                uid = x.referrals
                print(uid)
                try:
                    usr = models.User.objects.get(id=uid)
                    name = usr.full_name
                    ans_referrals[uid] = name
                except Exception as e:
                    print(e)
                    pass
        else:
            ans_referrals = [x.referrals for x in referrals]

        result = {
            # 'first_name': user.first_name,
            # 'last_name': user.last_name,
            'full_name': user.full_name,
            'email': user.email,
            'phone': str(user.phone),
            'company_name': user.company_name,
            'address': {"add_line1": user.address.add_line1, "add_line2": user.address.add_line2,
                        "city": user.address.city, "state": user.address.state, "country": user.address.country,
                        "zip_code": user.address.zip_code},
            'points': user.points,
            'referred_by': user.referred_by,
            'referral_code': user.referral_code,
            'referrals': ans_referrals,
            'image': user.image.url,
            'thumbnail_image': user.img_thumbnail.url,
            'created_at': user.created_at,
            'is_blocked': user.is_blocked
        }

        # if res_lan == "es":
        #     if referrals[0].referrals is not None:
        #         print(ans_referrals)
        #         dic = ans_referrals
        #         for key, val in dic.items():
        #             dic[key] = translate(val, "es", "auto")
        #         ans_referrals = dic
        #     else:
        #         ans_referrals = [x.referrals for x in referrals]
        #     result = {
        #         'full_name': translate(user.full_name, "es", "auto"),
        #         'email': user.email,
        #         'phone': str(user.phone),
        #         'company_name': translate(user.company_name, "es", "auto"),
        #         'address': {"add_line1": translate(user.address.add_line1, "es", "auto"),
        #                     "add_line2": translate(user.address.add_line2, "es", "auto"),
        #                     "city": translate(user.address.city, "es", "auto"),
        #                     "state": translate(user.address.state, "es", "auto"),
        #                     "country": translate(user.address.country, "es", "auto"),
        #                     "zip_code": user.address.zip_code},
        #         'points': user.points,
        #         'referred_by': user.referred_by,
        #         'referral_code': user.referral_code,
        #         'referrals': ans_referrals,
        #         'image': user.image.url,
        #         'thumbnail_image': user.img_thumbnail.url,
        #         'created_at': user.created_at,
        #         'is_blocked': user.is_blocked
        #     }


        # serializer = serializers.FullUserSerializer(user)
        # print(serializer.data)
        res_data = {"status_code": 200, "status": "success", "message": _("Successfully got user data"), "data": result}
        return Response(data=res_data, status=status.HTTP_200_OK)


@api_view(["GET"])
def referral_code(request):

    res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
    print('request langugae : ', res_lan)

    if res_lan == "es":
        activate('es')
        pass

    token = request.GET.get('access_token', '')
    if token == '':
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
    try:
        user, token_list = validations.get_user_obj(token)
    except Exception as e:
        print(e)
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

    referral_code = user.referral_code
    app_url = "https://play.google.com/store/apps/details?id=com.skype.raider"
    referral_msg = f"Hey, I'm using Sprayer Loyalty Program. Join me! Use my referral code '{referral_code}' while " \
                   f"registering. Download it here: {app_url}"

    res = {
        "referral_code": referral_code,
        "referral_msg": referral_msg,
        "is_blocked": user.is_blocked
    }

    # if res_lan == "es":
    #     res["referral_msg"] = translate(referral_msg, "es", "auto")

    res_data = {"status_code": 200, "status": "success", "message": _("Successfully get user referral code and message"),
                "data": res}
    return Response(data=res_data, status=status.HTTP_200_OK)


class CompanyName(APIView):
    """
    API for getting company names by searching words in React Native app.
    API Input Data Type : Json
    Input params in request : *access_token, *search_pattern
    Output params in request : List of companies of specified pattern, if pattern isn't specified then list of all
                                companies will be returned.
    """

    def get(self, request):

        # res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
        # print('request langugae : ', res_lan)
        #
        # if res_lan == "es":
        #     activate('es')
        #     pass

        companies = [user.company_name for user in models.User.objects.all()]
        companies = list(dict.fromkeys(companies))
        pattern = request.GET.get('pattern', '')
        pattern = pattern.lower()
        ret_list = []
        if pattern != '':
            for company in companies:
                company = company.lower()
                if company.startswith(pattern):
                    ret_list.append(company)
        if len(ret_list) == 0:
            data = {'company_names': companies}
        else:
            data = {'company_names': ret_list}
        res_data = {"status_code": 200, "status": "success", "message": "Company list sent", "data": data}
        return Response(data=res_data, status=status.HTTP_200_OK)


class ForgetPassword(APIView):
    def post(self, request):

        res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
        print('request langugae : ', res_lan)

        if res_lan == "es":
            activate('es')
            pass

        try:
            data, email = validations.check_request(request, 'email')
            print("Data : ", data, "\nemail : ", email)
        except Exception as e:
            print(e)
            res_data = {"status_code": 400, "status": "fail", "message": _("Invalid Request"), "data": {}}
            return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)

        if models.User.objects.filter(email=email).exists():
            user = models.User.objects.get(email=email)
        else:
            res_data = {"status_code": 400, "status": "fail", "message": _("User with this email is not registered yet"),
                        "data": {}}
            return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
        print(user)
        is_user = True
        forget_password = True

        verification_token = ''.join(random.choices(string.ascii_letters + string.digits, k=6))
        verification_token = "rs-pwd-" + verification_token
        while verification_token in [obj.email_verification_token for obj in models.User.objects.all()]:
            verification_token = ''.join(random.choices(string.ascii_letters + string.digits, k=6))
            verification_token = "rs-pwd-" + verification_token

        user.email_verification_token = verification_token
        user.save()
        current_site = get_current_site(request)
        domain = current_site.domain

        print("domain : ", domain)
        url = f"http://{domain}/activation_link/{verification_token}/"

        subject = 'Forget Password Link for Sprayer Loyalty Program'
        html_message = render_to_string('mail.html', {'first_name': user.full_name, 'url': url,
                                                      'is_user': is_user, 'forget_password': forget_password})
        plain_message = strip_tags(html_message)
        from_email = settings.DEFAULT_FROM_EMAIL
        to = email
        mail.send_mail(subject, plain_message, from_email, [to], html_message=html_message)

        res_data = {"status_code": 200, "status": "success",
                    "message": _("Password reset link has been sent to your registered email address"), "data": {}}
        return Response(data=res_data, status=status.HTTP_200_OK)


class EditUser(APIView):
    parser_class = [FileUploadParser]

    def put(self, request):
        """
        full name, phone, company name, image
        """
        res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
        print('request langugae : ', res_lan)

        if res_lan == "es":
            activate('es')
            pass

        try:
            data, token = validations.check_request(request, 'token')
            print("Data : ", data, "\nToken : ", token)
        except Exception as e:
            print(e)
            res_data = {"status_code": 400, "status": "fail", "message": _("Invalid Request"), "data": {}}
            return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
        try:
            user, token_list = validations.get_user_obj(token)
        except Exception as e:
            print(e)
            res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
            return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

        print("after 2 try blocks")
        ans_dict = {}
        for key in data.keys():
            ans = data.get(key)
            ans_dict[key] = ans

        try:
            if 'full_name' in data.keys():
                full_name = data.get('full_name')
                user.full_name = full_name
            if 'phone' in data.keys():
                phone = data.get('phone')
                user.phone = phone
            if 'company_name' in data.keys():
                company_name = data.get('company_name')
                user.company_name = company_name
            if 'image' in data.keys():
                image = data.get("image", None)
                print("data.get image : ", image, "type of get image : ", type(image))
                print("data.FILES.get image", request.FILES.get("image"), "type of that file image : ", type(request.FILES.get("image")))

                try:
                    if image is not None:
                        print("inside condition means new image uploaded")
                        existing_img = str(user.image)
                        if existing_img != "default.jpg" and not None:
                            s3.Object(AWS_STORAGE_BUCKET_NAME, "media/" + existing_img).delete()
                        existing_img_thumbnail = str(user.img_thumbnail)
                        if existing_img_thumbnail != "default.jpg" and not None:
                            s3.Object(AWS_STORAGE_BUCKET_NAME, "media/" + existing_img_thumbnail).delete()
                except Exception as e:
                    print("exception : ", e)

                user.image = image
                user.save()

                user.img_thumbnail = user.image
                user.save()
                #
                #     size = (500, 500)
                #     fdir, fname = os.path.split(user.image.url)
                #     print(fdir, fname)
                #     ls = fname.split('.')
                #     formt = ls[-1].upper()
                #     print(formt)
                #     if formt == 'JPG':
                #         fname = ls[0] + '.png'
                #         ls[-1] = 'png'
                #     response = requests.get(user.image.url, stream=True)
                #     with open(f'./slp/media/{fname}', 'wb') as out_file:
                #         shutil.copyfileobj(response.raw, out_file)
                #
                #     im = Image.open(f'./slp/media/{fname}')
                #     im.thumbnail(size)
                #
                #     im.save(f'./slp/media/thumb_{fname}', ls[-1].upper())
                #     print('after img save')
                #     f = open(f'./slp/media/thumb_{fname}', 'rb')
                #     temp = File(f)
                #     user.img_thumbnail.save(f'thumb_{fname}', temp, save=True)
                #     user.save()
                #     print('before f close')
                #     f.close()
                #     print('after f close')
                #     os.remove(f'./slp/media/{fname}')
                #     os.remove(f'./slp/media/thumb_{fname}')

            if 'address' in data.keys():
                try:
                    address = data.get('address')
                    print("address : ", address)
                    add_id = user.address.merchant_id
                    print("add_id : ", add_id)
                    add = models.Address.objects.get(id=add_id)
                    print("add obj : ", add)
                    if isinstance(address, str):
                        address = json.loads(address)

                    add.add_line1, add.add_line2, add.city, add.state, add.zip_code = address.get('add_line1'), \
                                                                                      address.get('add_line2'),\
                                                                                      address.get('city'), \
                                                                                      address.get('state'), \
                                                                                      address.get('zip_code')
                    add.save()
                    user.address = add
                except Exception as e:
                    print("exception : ", e)
        except Exception as e:
            print(e)
            res_data = {"status_code": 400, "status": "fail", "message": _("Bad Request"), "data": {}}
            return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
        user.save()

        referrals = user.referrals
        if referrals[0].referrals is not None:
            ans_referrals = {}
            for x in referrals:
                uid = x.referrals
                print(uid)
                try:
                    usr = models.User.objects.get(id=uid)
                    name = usr.full_name
                    ans_referrals[uid] = name
                except Exception as e:
                    print("Exception :--> ", e)
                    pass
        else:
            ans_referrals = [x.referrals for x in referrals]

        result = {
            'full_name': user.full_name,
            'email': user.email,
            'phone': str(user.phone),
            'company_name': user.company_name,
            'address': {"add_line1": user.address.add_line1, "add_line2": user.address.add_line2,
                        "city": user.address.city, "state": user.address.state, "country": user.address.country,
                        "zip_code": user.address.zip_code},
            'points': user.points,
            'referred_by': user.referred_by,
            'referral_code': user.referral_code,
            'referrals': ans_referrals,
            'image': user.image.url,
            'thumbnail_image': user.img_thumbnail.url,
            'created_at': user.created_at,
            'is_blocked': user.is_blocked
        }

        # if res_lan == "es":
        #     if referrals[0].referrals is not None:
        #         print(ans_referrals)
        #         dic = ans_referrals
        #         for key, val in dic.items():
        #             dic[key] = translate(val, "es", "auto")
        #         ans_referrals = dic
        #     else:
        #         ans_referrals = [x.referrals for x in referrals]
        #     result = {
        #         'full_name': translate(user.full_name, "es", "auto"),
        #         'email': user.email,
        #         'phone': str(user.phone),
        #         'company_name': translate(user.company_name, "es", "auto"),
        #         'address': {"add_line1": translate(user.address.add_line1, "es", "auto"),
        #                     "add_line2": translate(user.address.add_line2, "es", "auto"),
        #                     "city": translate(user.address.city, "es", "auto"),
        #                     "state": translate(user.address.state, "es", "auto"),
        #                     "country": translate(user.address.country, "es", "auto"),
        #                     "zip_code": user.address.zip_code},
        #         'points': user.points,
        #         'referred_by': user.referred_by,
        #         'referral_code': user.referral_code,
        #         'referrals': ans_referrals,
        #         'image': user.image.url,
        #         'thumbnail_image': user.img_thumbnail.url,
        #         'created_at': user.created_at,
        #         'is_blocked': user.is_blocked
        #     }

        res_data = {"status_code": 200, "status": "success", "message": _("Data Updated Successfully"), "data": result}
        return Response(data=res_data, status=status.HTTP_200_OK)


class UserLogout(APIView):
    def post(self, request):

        res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
        print('request langugae : ', res_lan)

        if res_lan == "es":
            activate('es')
            pass

        try:
            data, token = validations.check_request(request, 'token')
            print("Data : ", data, "\nToken : ", token)
        except Exception as e:
            print(e)
            res_data = {"status_code": 400, "status": "fail", "message": _("Invalid Request"), "data": {}}
            return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
        try:
            user, token_list = validations.get_user_obj(token)
        except Exception as e:
            print(e)
            res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
            return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

        device = user.device
        for x in device:
            if x.access_token == token:
                dev_obj = x
        try:
            index = device.index(dev_obj)
            print(index)
            del device[index]
            user.device = device
        except Exception as e:
            print(e)
            res_data = {"status_code": 400, "status": "fail", "message": _("Bad Request"), "data": {}}
            return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
        user.save()
        res_data = {"status_code": 200, "status": "success", "message": _("User Logout Successfully"), "data": {}}
        return Response(data=res_data, status=status.HTTP_200_OK)


class ScanQR(APIView):
    def post(self, request):
        res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
        print('request langugae scan: ', res_lan)

        if res_lan == "es":
            activate('es')
            pass

        try:
            data, token = validations.check_request(request, 'token')
            print("Data : ", data, "\nToken : ", token)
        except Exception as e:
            print('in except',e)
            res_data = {"status_code": 400, "status": "fail", "message": _("Invalid Request"), "data": {}}
            return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
        try:
            user, token_list = validations.get_user_obj(token)
        except Exception as e:
            print('in except 2',e)
            res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
            return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
        try:
            qr_id = data.get('QR_ID')
            merchant_id = data.get('MERCHANT_ID')
            product_id = data.get('PRODUCT_ID')
            scanned_location = data.get('scanned_location')
            print('print all before use',qr_id, merchant_id, product_id, scanned_location)
        except Exception as e:
            print('in except 3',e)
            res_data = {"status_code": 400, "status": "fail", "message": _("Invalid QR Code"), "data": {}}
            return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
        try:
            print('in qr try---')
            print('try if qr exists----',models.QRCode.objects.filter(id=qr_id).exists())
            qr = models.QRCode.objects.get(id=qr_id)
            print('qr object----',qr)

            # if qr.scanned_location is not None and models.UserRewards.objects.filter(user_id=user, qr_code=qr).exists():
            #     msg = "You've already scanned this qr. Please check in your qr history with status pending and click " \
            #           "on that to move further"
            #     res_data = {"status_code": 400, "status": "fail", "message": msg, "data": {}}
            #     return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)

            if qr.is_scanned:
                userrewards = models.UserRewards.objects.get(qr_code=qr, originally_scanned=True)
                originally_scanned_by = userrewards.user_id
                res_data = {"status_code": 400, "status": "fail", "message": _("QR Code is already scanned"), "data":
                            {"scanned_by": originally_scanned_by.full_name, "email": originally_scanned_by.email,
                             "scanned_at": qr.scanned_location, "user_image": originally_scanned_by.img_thumbnail.url, "qr_id":
                                 qr_id, "user_rewards_id": userrewards.id}}

                if res_lan == "es":
                    res_data = {"status_code": 400, "status": "fail", "message": _("QR Code is already scanned"),
                                "data": {"scanned_by": translate(originally_scanned_by.full_name, "es", "auto"),
                                         "email": originally_scanned_by.email,
                                         "scanned_at": translate(qr.scanned_location, "es", "auto"),
                                         "user_image": originally_scanned_by.img_thumbnail.url, "qr_id": qr_id,
                                         "user_rewards_id": userrewards.id}}
                return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)

            product = models.Product.objects.get(id=product_id)
            merchant = models.Merchant.objects.get(id=merchant_id)

            # For finding quiz related to this product
            is_quiz_available, quiz_played, video_id_if_quiz_available = False, False, None
            if models.Quiz.objects.filter(product=product).exists():
                quiz = models.Quiz.objects.get(product=product)
                is_quiz_available, video_id_if_quiz_available = True, quiz.videoId_id
                if models.QuizResult.objects.filter(played_user=user, quiz_videoId=quiz.videoId_id, quiz_played=True).exists():
                    quiz_played = True

            result = {
                "product_initial_points": product.initial_point,
                "product_image": product.image.url,
                "product_name": product.product_name,
                "merchant_id": merchant.id,
                "merchant_name": merchant.full_name,
                "product_total_points": product.total_points,
                "product_id": product_id,
                "qr_id": qr.id,
                "is_quiz_available": is_quiz_available and not quiz_played,
                "video_id_if_quiz_available": video_id_if_quiz_available,
            }
            print(result)

            # if res_lan == "es":
            #     result = {
            #         "product_initial_points": product.initial_point,
            #         "product_image": product.image.url,
            #         "product_name": translate(product.product_name, "es", "auto"),
            #         "merchant_name": translate(merchant.full_name, "es", "auto"),
            #         "product_total_points": product.total_points,
            #         "product_id": product_id,
            #         "qr_id": qr.id
            #     }

            # qr.is_scanned = True

            qr.scanned_location = scanned_location
            qr.scanned_coordinates = scanned_location
            qr.save()
        except Exception as e:
            print('final qr exception',e)
            res_data = {"status_code": 400, "status": "fail", "message": _("BAD REQUEST. Server Problem"), "data": {}}
            return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)

        else:
        #     user_rewards_obj = models.UserRewards.objects.create(user_id=user, qr_code=qr, reward_type="Scan QR Code",
        #                                                          reward_points=product.total_points,
        #                                                          reward_name='Scan QR Code', points_type="Credit",
        #                                                          qr_status="Only scanned")
        #     result['user_rewards_id'] = user_rewards_obj.id

            res_data = {"status_code": 200, "status": "success", "message": _("Successfully Scanned QR Code"),
                        "data": result}
            return Response(data=res_data, status=status.HTTP_200_OK)


class ProductActivation(APIView):
    parser_class = [FileUploadParser]

    def post(self, request):
        res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
        print('request langugae : ', res_lan)

        if res_lan == "es":
            activate('es')
            pass

        try:
            data, token = validations.check_request(request, 'token')
            print("Data : ", data, "\nToken : ", token)
        except Exception as e:
            print("exception1 : ", e)
            res_data = {"status_code": 400, "status": "fail", "message": _("Invalid Request"), "data": {}}
            return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
        try:
            user, token_list = validations.get_user_obj(token)
        except Exception as e:
            print("exception2 : ", e)
            res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
            return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

        try:
            product_id = data.get('product_id')
            product = models.Product.objects.get(id=product_id)

        except Exception as e:
            print("exception3 : ", e)
            res_data = {"status_code": 401, "status": "fail", "message": "Invalid product id or product id not passed",
                        "data": {}}
            return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

        try:
            print("\ninside find qr code")
            qr_id = data.get('qr_id')
            qr = models.QRCode.objects.get(id=qr_id)
        except Exception as e:
            print("exception 4: ", e)
            res_data = {"status_code": 401, "status": "fail", "message": "Invalid qr id or qr id not passed", "data": {}}
            return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

        try:
            print("\ninside fetching data")
            # obj_dict = {}
            a_side_batch = data.get("a_side_batch", None)
            print("a_side_batch : ", a_side_batch, "  Type of a_side_batch: ", type(a_side_batch))
            if a_side_batch == "":
                a_side_batch = None
            # if a_side_batch is not None:
            #     obj_dict['a_side_batch'] = a_side_batch
            a_side_set_temp = data.get("a_side_set_temp", None)
            print("a_side_set_temp : ", a_side_set_temp, "  Type of a_side_set_temp: ", type(a_side_set_temp))
            if a_side_set_temp == "undefined":
                a_side_set_temp = None

            # if a_side_set_temp is not None:
            #     obj_dict['a_side_set_temp'] = a_side_set_temp
            b_side_set_temp = data.get("b_side_set_temp", None)
            print("b_side_set_temp : ", b_side_set_temp, "  Type of b_side_set_temp: ", type(b_side_set_temp))
            if b_side_set_temp == "undefined":
                b_side_set_temp = None

            # if b_side_set_temp is not None:
            #     obj_dict['b_side_set_temp'] = b_side_set_temp
            hose_set_temp = data.get("hose_set_temp", None)
            print("hose_set_temp : ", hose_set_temp, "  Type of hose_set_temp: ", type(hose_set_temp))
            if hose_set_temp == "undefined":
                hose_set_temp = None

            # if hose_set_temp is not None:
            #     obj_dict['hose_set_temp'] = hose_set_temp
            pressure_set = data.get("pressure_set", None)
            print("pressure_set : ", pressure_set, "  Type of pressure_set: ", type(pressure_set))
            if pressure_set == "undefined":
                pressure_set = None
            # if pressure_set is not None:
            #     obj_dict['pressure_set'] = pressure_set
            mixing_chamber_size = data.get("mixing_chamber_size", None)
            print("mixing_chamber_size : ", mixing_chamber_size, "  Type of mixing_chamber_size: ", type(mixing_chamber_size))
            if mixing_chamber_size == "undefined":
                mixing_chamber_size = None
            # if mixing_chamber_size is not None:
            #     obj_dict['mixing_chamber_size'] = mixing_chamber_size

            image = request.FILES.get('image', None)
            print("image from files get: ", image, "type of image : ", type(image))

            start_drum_temp = data.get('start_drum_temp', None)
            print("req start_drum_temp : ", start_drum_temp, " type of start_drum_temp : ", type(start_drum_temp))
            if start_drum_temp == "undefined":
                start_drum_temp = None

            # machine_type = data.get('machine_type', None)
            # print("req machine_type : ", machine_type, " type of machine_type : ", type(machine_type))
            # machine_type_obj = models.MachineTypes.objects.get(id=machine_type)
            # print('machine_type_obj----',machine_type_obj)
            # if machine_type == "undefined":
            #     machine_type = None

            # substrate_type = data.get('substrate_type', None)
            # print("req substrate_type : ", substrate_type, " type of substrate_type : ", type(substrate_type))
            # substrate_type_obj = models.SubstrateTypes.objects.get(id=substrate_type)
            # print('substrate_type_obj----',substrate_type_obj)
            
            # if substrate_type == "undefined":
            #     substrate_type = None

            machine_type = data.get("machine_type", None)
            print("machine_type : ", machine_type, "  Type of machine_type: ", type(machine_type))
            if machine_type == "":
                machine_type = None

            substrate_type = data.get('substrate_type', None)
            print("req substrate_type : ", substrate_type, " type of substrate_type : ", type(substrate_type))
            if substrate_type == "undefined":
                substrate_type = None

            machine_temp = data.get('machine_temp', None)
            print("req machine_temp : ", machine_temp, " type of machine_temp : ", type(machine_temp))
            if machine_temp == "undefined":
                machine_temp = None
            
            substrate_temp = data.get('substrate_temp', None)
            print("req substrate_temp : ", substrate_temp, " type of substrate_temp : ", type(substrate_temp))
            if substrate_temp == "undefined":
                substrate_temp = None
            
            substrate_moisture = data.get('substrate_moisture', None)
            print("req substrate_moisture : ", substrate_moisture, " type of substrate_moisture : ", type(substrate_moisture))
            if substrate_moisture == "undefined":
                substrate_moisture = None

            saftey_warning_signs_posted = data.get('saftey_warning_signs_posted', None)
            print("req saftey_warning_signs_posted : ", saftey_warning_signs_posted, " type of saftey_warning_signs_posted : ", type(saftey_warning_signs_posted))
            if saftey_warning_signs_posted == "undefined":
                saftey_warning_signs_posted = None

            mechanical_ventilation_used = data.get('mechanical_ventilation_used', None)
            print("req mechanical_ventilation_used : ", mechanical_ventilation_used, " type of mechanical_ventilation_used : ", type(mechanical_ventilation_used))
            if mechanical_ventilation_used == "undefined":
                mechanical_ventilation_used = None

            sprayer_using_fresh_air = data.get('sprayer_using_fresh_air', None)
            print("req sprayer_using_fresh_air : ", sprayer_using_fresh_air, " type of sprayer_using_fresh_air : ", type(sprayer_using_fresh_air))
            if sprayer_using_fresh_air == "undefined":
                sprayer_using_fresh_air = None

            complete_after_spraying = data.get('complete_after_spraying', None)
            print("req complete_after_spraying : ", complete_after_spraying, " type of complete_after_spraying : ", type(complete_after_spraying))
            if complete_after_spraying == "undefined":
                complete_after_spraying = None

            # if start_drum_temp is not None:
            #     obj_dict['start_drum_temp'] = start_drum_temp

            # if image is None:
            #     print("inside image is none")
            #     image = data.get("image", None)
            #     print("if image is none then image from data get: ", image)
            # if image is not None and not isinstance(image, str) :
            #     print("\ninside image convertor")
            #     size = (300, 300)
            #     fdir, fname = os.path.split(str(image))
            #     print(fdir, fname)
            #     ls = fname.split('.')
            #     formt = ls[-1].upper()
            #     print(formt)
            #     if formt == 'JPG':
            #         fname = ls[0] + '.png'
            #         ls[-1] = 'png'
            #
            #     im = Image.open(image)
            #     im.thumbnail(size)
            #
            #     im.save(f'./slp/media/thumb_{fname}', ls[-1].upper())
            #     # print('ls===========ls===========', ls[-1])
            #
            #     imageTemproary = Image.open(f'./slp/media/thumb_{fname}')
            #     outputIoStream = BytesIO()
            #     imageTemproary.resize((1005, 360))
            #     imageTemproary.save(outputIoStream, format=ls[-1], quality=60)
            #     outputIoStream.seek(0)
            #     uploadedImage = InMemoryUploadedFile(outputIoStream, 'ImageField',
            #                                          f"%s.{ls[-1]}" % image.name.split('.')[0],
            #                                          f'image/{ls[-1]}', sys.getsizeof(outputIoStream), None)
            #     image = uploadedImage
            #     os.remove(f'./slp/media/thumb_{fname}')
            # print("after convert req files get image : ", image)
            # if image is not None:
            #     obj_dict['image'] = image

        except Exception as e:
            print("exception 5: ", e)
            res_data = {"status_code": 400, "status": "fail", "message": _("Something went wrong"),
                        "data": {}}
            return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
        else:
        #     if data.get('save_and_continue') == "false":
        #         print("\ninside first  submit ")
        #         res_data = {"status_code": 400, "status": "fail",
        #                     "message": "Pass the User Rewards Id in the submit click", "data": {}}
        #         return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
            keys = data.keys()
            try:
                print("\ninside find user rewards id")
                if "user_rewards_id" in keys:
                    # print("user rewards : ")
                    user_rewards = models.UserRewards.objects.get(id=int(data.get("user_rewards_id")))
                else:
                    try:
                        if models.UserRewards.objects.filter(user_id=user, qr_code=qr, originally_scanned=True).exists():
                            res_data = {"status_code": 400, "status": "fail",
                                        "message": "User has already saved/submitted data for this qr. "
                                                   "Please pass user_rewards_id to continue", "data": {}}
                            return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
                    except Exception as e:
                        print("exception while checking user has saved/sumitted data for this qr", e)

                    user_rewards = models.UserRewards.objects.create(user_id=user, qr_code=qr, reward_type="Sprayer Points",
                                                                     reward_points=product.total_points,
                                                                     reward_name='Earned Points', points_type="Credit",
                                                                     qr_status="Pending")
                    print('user reward----',user_rewards)                                                 
                    gcm_tokens = [x.device_fcm_token for x in user.device]
                    fcm_device = GCMDevice.objects.create(registration_id=gcm_tokens[-1], cloud_message_type="FCM")
                    fcm_device.send_message(f"{product.total_points} points has credited into your account for scanning a new QR code")
            except Exception as e:
                print("Exception 6 :-> ", e)
                res_data = {"status_code": 400, "status": "fail",
                            "message": "exception while fetching userrewards object or creating one", "data": {}}
                return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
                # user_rewards_id = user_rewards_obj.id
                # user_rewards = models.UserRewards.objects.get(id=user_rewards_id)

            # if user_rewards.qr_status == "Submitted":
            #     print("\ninside checking product act is already done or not")
            #     res_data = {"status_code": 400, "status": "fail",
            #                 "message": _("Product activation for this qr is already submitted"), "data": {}}
            #     return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
            try:
                if user_rewards.product_activation_questions is not None:
                    product_act = user_rewards.product_activation_questions
                    # print(product_act)
                    print("\ninside find product act obj")
                    if "image" not in data.keys() or image is None:
                        print("\ninside another if  find product act obj")
                        product_act.a_side_batch, product_act.a_side_set_temp, product_act.b_side_set_temp, \
                        product_act.hose_set_temp, product_act.pressure_set, product_act.mixing_chamber_size, \
                        product_act.start_drum_temp, product_act.machine_type, product_act.substrate_type, \
                        product_act.substrate_temp, product_act.substrate_moisture, product_act.saftey_warning_signs_posted, \
                        product_act.mechanical_ventilation_used, product_act.sprayer_using_fresh_air, product_act.complete_after_spraying, \
                              = a_side_batch, a_side_set_temp, b_side_set_temp, hose_set_temp,\
                                pressure_set, mixing_chamber_size, start_drum_temp, machine_type, substrate_type, \
                                substrate_temp, substrate_moisture, saftey_warning_signs_posted, \
                                mechanical_ventilation_used, sprayer_using_fresh_air, complete_after_spraying
                    else:
                        # Delete existing image stored in S3 bucket
                        print("\ninside else find product act obj to update existing product_act obj")
                        existing_img = str(product_act.image)
                        s3.Object(AWS_STORAGE_BUCKET_NAME, "media/" + existing_img).delete()

                        product_act.a_side_batch, product_act.a_side_set_temp, product_act.b_side_set_temp, \
                        product_act.hose_set_temp, product_act.pressure_set, product_act.mixing_chamber_size, \
                        product_act.image, product_act.start_drum_temp, product_act.machine_type, \
                        product_act.substrate_type, product_act.substrate_temp, product_act.substrate_moisture, \
                        product_act.saftey_warning_signs_posted, product_act.mechanical_ventilation_used, \
                        product_act.sprayer_using_fresh_air, product_act.complete_after_spraying, \
                            = a_side_batch, a_side_set_temp, b_side_set_temp, hose_set_temp, \
                            pressure_set, mixing_chamber_size, image, start_drum_temp, machine_type, substrate_type,\
                            substrate_temp, substrate_moisture, saftey_warning_signs_posted, \
                            mechanical_ventilation_used, sprayer_using_fresh_air, complete_after_spraying
                                                                         
                    product_act.save()

                    user_rewards.product_activation_questions = product_act

                else:
                    print("\ninside else find product act obj to create new product_act object")

                    qr_id_exists = models.ProductActivationQuestions.objects.filter(qr_id=qr_id).exists()
                    if qr_id_exists:
                        print('yes exists')
                        obj = models.ProductActivationQuestions.objects.filter(qr_id=qr_id).update(
                                                                            a_side_set_temp=a_side_set_temp,
                                                                            b_side_set_temp=b_side_set_temp,
                                                                            hose_set_temp=hose_set_temp,
                                                                            pressure_set=pressure_set,
                                                                            mixing_chamber_size=mixing_chamber_size,
                                                                            image=image, 
                                                                            machine_type=machine_type,
                                                                            substrate_type=substrate_type,
                                                                            substrate_moisture=substrate_moisture,
                                                                            saftey_warning_signs_posted=saftey_warning_signs_posted,
                                                                            mechanical_ventilation_used=mechanical_ventilation_used,
                                                                            sprayer_using_fresh_air=sprayer_using_fresh_air,
                                                                            complete_after_spraying=complete_after_spraying)

                        print('obj-----------',obj)
                        user_rewards.product_activation_questions = obj
                    else:
                        print('in else product creation---')
                        obj = models.ProductActivationQuestions.objects.create(qr_id=qr_id,
                                                                                a_side_batch=a_side_batch, 
                                                                                start_drum_temp=start_drum_temp,
                                                                                substrate_temp=substrate_temp,
                                                                                machine_temp=machine_temp)
                        user_rewards.product_activation_questions = obj

                qr.is_scanned = True
                qr.save()
                user_rewards.originally_scanned = True
                user_rewards.save()
            except Exception as e:
                print("Exception 7--> ", e)
                res_data = {"status_code": 400, "status": "fail",
                            "message": "Exception while saving ProductAvtivationQuestions object", "data": {}}
                return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)

            location = qr.scanned_location
            try:
                print("\ninside try to find google location")
                location = eval(location)
                longitude = location.get("longitude")
                latitude = location.get("latitude")
                gmaps = googlemaps.Client(key=GOOGLE_API_KEY_3)
                reverse_geocode_result = gmaps.reverse_geocode((latitude, longitude))
                formatted_address = reverse_geocode_result[0].get("formatted_address")
                qr.scanned_location = formatted_address
                qr.save()
                # print("successfully executed google map api", formatted_address)
            except Exception as e:
                print('exception 8: ', e)

            if qr.whether_info is None:
                whether_location = qr.scanned_coordinates
                try:
                    print("\ninside try to find whether")

                    location = eval(whether_location)
                    longitude = location.get("longitude")
                    latitude = location.get("latitude")
                    url = "https://api.weatherbit.io/v2.0/current"
                    param = {
                        "key": WHETHER_API_KEY,
                        "lat": latitude,
                        "lon": longitude
                    }
                    response = requests.get(url=url, params=param)
                    response_text = eval(response.text)
                    print("response text type : ", type(response_text))
                    response_data = response_text.get("data")

                    humidity = validations.find_param(response_data, "rh")
                    wind_speed = validations.find_param(response_data, "wind_spd")
                    temp = validations.find_param(response_data, "temp")

                    dc = {"humidity": humidity, "wind_speed": wind_speed, "temp": temp}
                    qr.whether_info = str(dc)
                    print("whether forecasting string", dc)
                    qr.save()
                except Exception as e:
                    print("exception in whether : ", e)

            print('data : ', data)
            print("data.get('save_and_continue') : ", data.get('save_and_continue'), type(data.get('save_and_continue')))
            if data.get('save_and_continue') == "true":
                print("\ninside update status pending")
                user_rewards.qr_status = "Pending"
                user_rewards.save()

                rewards = models.UserRewards.objects.all().filter(user_id=user.id)
                # print(rewards)
                ls = []
                for reward in rewards:
                    if reward.qr_code != None:
                        ls.append(reward)

                if res_lan == "es":
                    rewards_serializer = serializers.UserRewardsTranslatedSerializer(ls, many=True)
                    print("---->>> after translated serializer")
                else:
                    rewards_serializer = serializers.UserRewardsSerializer(ls, many=True)

                # print(rewards_serializer.data)
                # dt = rewards_serializer.data

                banners = models.Banner.objects.all().filter(status=True, is_deleted=False)
                banner_list = [{"banner_ad_url": banner.url, "banner_image": banner.image.url} for banner in banners]

                lifetime_earned_points = validations.user_lifetime_points(user)
                ls = list(rewards_serializer.data)

                product_name = None
                pps = [product.product_name for product in UPCProduct.objects.all()]
                if product.product_name in pps:
                    product_name = product.product_name

                data = {"lifetime_earned_points": lifetime_earned_points, "available_points": user.points,
                        "banners": banner_list, "rewards_history": ls, "product_name": product_name}

                # dt["user_rewards_id"] = user_rewards.id
                # dt["product_id"] = product.id
                res_data = {"status_code": 200, "status": "success",
                            "message": _("Successfully saved data & QR History received"), "data": data}
                return Response(data=res_data, status=status.HTTP_200_OK)
            else:
                print("\ninside update status to submit")
                # user_rewards.qr_status = "Submitted"
                user_rewards.save()

                product_name = None
                pps = [product.product_name for product in UPCProduct.objects.all()]
                if product.product_name in pps:
                    product_name = product.product_name

                res_data = {"status_code": 200, "status": "success", "message": _("Successfully Submitted Data"),
                            "data": {"points": user_rewards.reward_points, "user_rewards_id": user_rewards.id,
                                     "product_id": product.id, "product_name": product_name}}
                return Response(data=res_data, status=status.HTTP_200_OK)


@api_view(["POST"])
def cancel(request):

    res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
    print('request langugae : ', res_lan)

    if res_lan == "es":
        activate('es')
        pass

    try:
        data, token = validations.check_request(request, 'token')
        print("Data : ", data, "\nToken : ", token)
    except Exception as e:
        print(e)
        res_data = {"status_code": 400, "status": "fail", "message": _("Invalid Request"), "data": {}}
        return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
    try:
        user, token_list = validations.get_user_obj(token)
    except Exception as e:
        print(e)
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
    if data.get('user_rewards_id') is not None:
        try:
            user_rewards_id = data.get('user_rewards_id')
            user_rewards = models.UserRewards.objects.get(id=user_rewards_id)
            qr = user_rewards.qr_code

            if user_rewards.product_activation_questions is not None:
                prod_act = user_rewards.product_activation_questions

                existing_img = str(prod_act.image)
                s3.Object(AWS_STORAGE_BUCKET_NAME, "media/" + existing_img).delete()

                prod_act.delete()
            user_rewards.delete()
        except Exception as e:
            print(e)
            res_data = {"status_code": 401, "status": "fail", "message": "Invalid user rewards id", "data": {}}
            return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
    else:
        qr_id = data.get('qr_id')
        qr = models.QRCode.objects.get(id=qr_id)

    qr.scanned_location = None
    qr.is_scanned = False
    qr.save()

    res_data = {"status_code": 200, "status": "success", "message": _("Successfully Deleted Table. Successfully Cancel"),
                "data": {}}
    return Response(data=res_data, status=status.HTTP_200_OK)


@api_view(["POST"])
def dont_split(request):
    res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
    print('request langugae : ', res_lan)

    if res_lan == "es":
        activate('es')
        pass

    try:
        data, token = validations.check_request(request, 'token')
        print("Data : ", data, "\nToken : ", token)
    except Exception as e:
        print(e)
        res_data = {"status_code": 400, "status": "fail", "message": _("Invalid Request"), "data": {}}
        return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
    try:
        user, token_list = validations.get_user_obj(token)
    except Exception as e:
        print(e)
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

    try:
        user_rewards_id = data.get('user_rewards_id')
        user_rewards = models.UserRewards.objects.get(id=int(user_rewards_id))
    except Exception as e:
        print(e)
        res_data = {"status_code": 401, "status": "fail", "message": "user rewards id is not valid", "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

    # points = user_rewards.reward_points
    # validations.check_duration_in_years_and_add_extra_points_to_existing_user(user, user_rewards, points)

    if user_rewards.qr_status == 'Completed':
        res_data = {"status_code": 401, "status": "fail",
                    "message": _("Already completed earn points process for this QR"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

    user_rewards.qr_status = 'Completed'
    user_rewards.is_splitted = False
    user.points += user_rewards.reward_points

    not_msg = f"Congratulations, You have earned {user_rewards.reward_points} points from scanning a product."
    models.Notification.objects.create(user_id=user, points=user_rewards.reward_points, notification_msg=not_msg)

    user_rewards.save()
    user.save()

    rewards = models.UserRewards.objects.all().filter(user_id=user.id)
    print(rewards)

    if res_lan == "es":
        rewards_serializer = serializers.UserRewardsTranslatedSerializer(rewards, many=True)
        print("---->>> after translated serializer")
    else:
        rewards_serializer = serializers.UserRewardsSerializer(rewards, many=True)

    print(rewards_serializer.data)

    banners = models.Banner.objects.all().filter(status=True, is_deleted=False)
    banner_list = [{"banner_ad_url": banner.url, "banner_image": banner.image.url} for banner in banners]

    lifetime_earned_points = validations.user_lifetime_points(user)

    ls = list(rewards_serializer.data)

    data = {"lifetime_earned_points": lifetime_earned_points, "available_points": user.points, "banners": banner_list,
            "rewards_history": ls}
    # data.update(rewards_serializer.data)
    # rewards_serializer.data.append(data)
    print(data)

    res_data = {"status_code": 200, "status": "success",
                "message": _("Successfully credited points & User Rewards History received"), "data": data}
    return Response(data=res_data, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_users_for_specific_company(request):
    res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
    print('request langugae : ', res_lan)

    if res_lan == "es":
        activate('es')
        pass

    token = request.GET.get('access_token', '')
    if token == '':
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
    try:
        user, token_list = validations.get_user_obj(token)
    except Exception as e:
        print(e)
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
    company = user.company_name
    users = models.User.objects.all().filter(company_name=company)
    users = [obj for obj in users if obj.email != user.email]

    # if res_lan == "es":
    #     user_serializer = serializers.UserTranslatedSerializer(users, many=True)
    # else:
    user_serializer = serializers.UserSerializer(users, many=True)

    print(user_serializer)
    res_data = {"status_code": 200, "status": "success", "message": "", "data": user_serializer.data}
    return Response(data=res_data, status=status.HTTP_200_OK)


class Split(APIView):
    def post(self, request):

        res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
        print('request langugae : ', res_lan)

        if res_lan == "es":
            activate('es')
            pass

        try:
            data, token = validations.check_request(request, 'token')
            print("Data : ", data, "\nToken : ", token)
        except Exception as e:
            print(e)
            res_data = {"status_code": 400, "status": "fail", "message": _("Invalid Request"), "data": {}}
            return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
        try:
            user, token_list = validations.get_user_obj(token)
        except Exception as e:
            print(e)
            res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
            return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

        try:
            user_rewards_id = data.get('user_rewards_id')
            user_rewards = models.UserRewards.objects.get(id=int(user_rewards_id))
        except Exception as e:
            print(e)
            res_data = {"status_code": 401, "status": "fail", "message": "user rewards id is not valid", "data": {}}
            return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

        if user_rewards.qr_status == "Completed":
            res_data = {"status_code": 401, "status": "fail", "message": _("QR Code scan process already Completed"),
                        "data": {}}
            return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

        minus_point_to_main_user = 0
        db_list = data.get('users')
        for x in db_list:
            usr = x.get('user')
            percentage = x.get('percentage')
            user_obj = models.User.objects.get(id=usr)
            print("user object : ", user_obj)
            splitted_point = (percentage / 100) * user_rewards.reward_points
            user_obj.points += int(splitted_point)

            not_msg = f"Congratulations, You have earned {int(splitted_point)} points from scanning a product which is " \
                      f"splitted by {user.full_name}."
            models.Notification.objects.create(user_id=user_obj, points=int(splitted_point), notification_msg=not_msg)

            models.UserRewards.objects.create(user_id=user_obj, qr_code=user_rewards.qr_code, qr_status="Completed",
                                              reward_points=splitted_point, points_type="Credit", is_splitted=True,
                                              reward_name='Earned Points',
                                              reward_type="Sprayer Points")
            user_obj.save()

            gcm_tokens = [x.device_fcm_token for x in user_obj.device]
            fcm_device = GCMDevice.objects.create(registration_id=gcm_tokens[-1], cloud_message_type="FCM")
            fcm_device.send_message(f"You have earned {int(splitted_point)} points from scanning a product which is splitted by your friend.")

            minus_point_to_main_user += int(splitted_point)

        user_points = user_rewards.reward_points - minus_point_to_main_user

        user.points += user_points
        user.save()
        user_rewards.reward_points = user_points
        user_rewards.qr_status = 'Completed'
        user_rewards.is_splitted = True
        user_rewards.save()

        not_msg = f"Congratulations, You have earned {int(user_points)} points from scanning a product."
        models.Notification.objects.create(user_id=user, points=user_points, notification_msg=not_msg)

        # product_points = user_rewards.reward_points
        # validations.check_duration_in_years_and_add_extra_points_to_existing_user(user, user_rewards, product_points)

        rewards = models.UserRewards.objects.all().filter(user_id=user.id)
        print(rewards)

        if res_lan == "es":
            rewards_serializer = serializers.UserRewardsTranslatedSerializer(rewards, many=True)
        else:
            rewards_serializer = serializers.UserRewardsSerializer(rewards, many=True)
        print(rewards_serializer)

        banners = models.Banner.objects.all().filter(status=True, is_deleted=False)
        banner_list = [{"banner_ad_url": banner.url, "banner_image": banner.image.url} for banner in banners]

        lifetime_earned_points = validations.user_lifetime_points(user)
        ls = list(rewards_serializer.data)

        data = {"lifetime_earned_points": lifetime_earned_points, "available_points": user.points,
                "banners": banner_list, "rewards_history": ls}

        res_data = {"status_code": 200, "status": "success",
                    "message": _("Successfully splitted points & User Rewards History received"), "data": data}
        return Response(data=res_data, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_bell_notifications(request):
    res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
    print('request langugae : ', res_lan)

    if res_lan == "es":
        activate('es')
        pass

    token = request.GET.get('access_token', '')
    if token == '':
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
    try:
        user, token_list = validations.get_user_obj(token)
    except Exception as e:
        print(e)
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

    notifications = models.Notification.objects.all().filter(user_id=user.id)

    if res_lan == "es":
        notification_serializer = serializers.NotificationTranslatedSerializer(notifications, many=True)
        dt = [dict(x) for x in notification_serializer.data]
        print(dt)

        for x in dt:
            msg = str(x.get("notification_msg"))
            points = str(x.get("points"))
            ls = msg.split(points)
            # ls.insert(1, "%(points)s")
            msg = ""
            msg = msg.join(ls)
            print(msg)
            translated_str = _(msg)
            x['notification_msg'] = translated_str
    else:
        notification_serializer = serializers.NotificationSerializer(notifications, many=True)
    print(notification_serializer)
    res_data = {"status_code": 200, "status": "success", "message": _("Notifications received"),
                "data": notification_serializer.data}
    return Response(data=res_data, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_qr_history(request):
    print('get')
    res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
    print('request langugae : ', res_lan)

    if res_lan == "es":
        activate('es')
        pass
    token = request.GET.get('access_token', '')
    if token == '':
        print('token null',token)
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
    try:
        user, token_list = validations.get_user_obj(token)
    except Exception as e:
        print('exception',e)
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

    rewards = models.UserRewards.objects.all().filter(user_id=user.id)
    print('rewards-----',rewards)
    ls = []
    for reward in rewards:
        if reward.qr_code != None:
            ls.append(reward)

    if res_lan == "es":
        rewards_serializer = serializers.UserRewardsTranslatedSerializer(ls, many=True)
    else:
        rewards_serializer = serializers.UserRewardsSerializer(ls, many=True)
    print("\n\nserializer data : ", rewards_serializer.data)

    banners = models.Banner.objects.all().filter(status=True, is_deleted=False)
    banner_list = [{"banner_ad_url": banner.url, "banner_image": banner.image.url} for banner in banners]

    lifetime_earned_points = validations.user_lifetime_points(user)
    ls = list(rewards_serializer.data)

    data = {"lifetime_earned_points": lifetime_earned_points, "available_points": user.points,
            "banners": banner_list, "qr_history": ls}

    res_data = {"status_code": 200, "status": "success", "message": _("QR History received"), "data": data}
    return Response(data=res_data, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_specific_qr_details(request, user_rewards_id):
    res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
    print('request langugae : ', res_lan)

    if res_lan == "es":
        activate('es')
        pass

    token = request.GET.get('access_token', '')
    if token == '':
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
    try:
        user, token_list = validations.get_user_obj(token)
    except Exception as e:
        print(e)
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

    try:
        rewards = models.UserRewards.objects.get(id=user_rewards_id)
        print(rewards)
    except Exception as e:
        print(e)
        res_data = {"status_code": 401, "status": "fail", "message": "Invalid user rewards id", "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

    if rewards.qr_status != "Pending":
        res_data = {"status_code": 401, "status": "fail",
                    "message": _("User has already submitted product activation details for this qr code"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

    prod_act = rewards.product_activation_questions

    prod_act_serializer = serializers.ProductActivationSerializer(prod_act)
    print(prod_act_serializer)

    ret_data = prod_act_serializer.data
    ret_data["user_rewards_id"] = user_rewards_id
    ret_data["product_id"] = int(rewards.qr_code.product_id)
    ret_data["qr_id"] = rewards.qr_code.id

    # For finding quiz related to this product
    is_quiz_available, quiz_played, video_id_if_quiz_available = False, False, None
    if models.Quiz.objects.filter(product_id=int(rewards.qr_code.product_id)).exists():
        quiz = models.Quiz.objects.get(product_id=int(rewards.qr_code.product_id))
        is_quiz_available, video_id_if_quiz_available = True, quiz.videoId_id
        if models.QuizResult.objects.filter(played_user=user, quiz_videoId=quiz.videoId_id, quiz_played=True).exists():
            quiz_played = True

    ret_data["is_quiz_available"] = is_quiz_available and not quiz_played
    ret_data["video_id_if_quiz_available"] = video_id_if_quiz_available

    res_data = {"status_code": 200, "status": "success", "message": _("Specific QR History details received"),
                "data": ret_data}
    return Response(data=res_data, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_rewards(request):
    res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
    print('request langugae : ', res_lan)

    if res_lan == "es":
        activate('es')
        pass

    token = request.GET.get('access_token', '')
    if token == '':
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
    try:
        user, token_list = validations.get_user_obj(token)
    except Exception as e:
        print(e)
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

    rewards = models.UserRewards.objects.all().filter(user_id=user.id).filter(Q(qr_status="Completed") | Q(qr_status=None))
    print(rewards)

    if res_lan == "es":
        rewards_serializer = serializers.UserRewardsTranslatedSerializer(rewards, many=True)
    else:
        rewards_serializer = serializers.UserRewardsSerializer(rewards, many=True)
    print(rewards_serializer)

    banners = models.Banner.objects.all().filter(status=True, is_deleted=False)
    banner_list = [{"banner_ad_url": banner.url, "banner_image": banner.image.url} for banner in banners]

    lifetime_earned_points = validations.user_lifetime_points(user)
    ls = list(rewards_serializer.data)

    data = {"lifetime_earned_points": lifetime_earned_points, "available_points": user.points,
            "banners": banner_list, "rewards_history": ls}

    res_data = {"status_code": 200, "status": "success", "message": _("User Rewards History received"), "data": data}
    return Response(data=res_data, status=status.HTTP_200_OK)


@api_view(["GET"])
def merchant_list(request):
    res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
    print('request langugae : ', res_lan)

    if res_lan == "es":
        activate('es')
        pass

    token = request.GET.get('access_token', '')
    if token == '':
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
    try:
        user, token_list = validations.get_user_obj(token)
    except Exception as e:
        print(e)
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

    queryset = models.Merchant.objects.all()
    # if res_lan == "es":
    #     serializer = serializers.MerchantTranslatedSerializer(queryset, many=True)
    # else:
    serializer = serializers.MerchantSerializer(queryset, many=True)

    try:
        data = serializer.data
        print(data)
    except Exception as e:
        print(e)
        res_data = {"status_code": 400, "status": "fail", "message": "internal server error",
                    "data": {}}
        return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
    else:
        res_data = {"status_code": 200, "status": "success", "message": _("Merchant list arrived"),
                    "data": data}
        return Response(data=res_data, status=status.HTTP_200_OK)


@api_view(["GET"])
def merchant_specific_product_list(request):
    res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
    print('request langugae : ', res_lan)

    if res_lan == "es":
        activate('es')
        pass

    token = request.GET.get('access_token', '')
    if token == '':
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
    try:
        user, token_list = validations.get_user_obj(token)
    except Exception as e:
        print(e)
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

    # print(merchant_id)
    query = models.Product.objects.all().filter(is_deleted=False)
    print('product list-----',query)

    # if res_lan == "es":
    #     serializer = serializers.MerchantSpecificProductTranslatedSerializer(query, many=True)
    # else:
    serializer = serializers.MerchantSpecificProductSerializer(query, many=True)
    print('product serializer--------',serializer)
    try:
        data = serializer.data
        print(data)
    except Exception as e:
        print(e)
        res_data = {"status_code": 400, "status": "fail", "message": "internal server error",
                    "data": {}}
        return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
    else:
        res_data = {"status_code": 200, "status": "success", "message": _("Merchant Specific product list arrived"),
                    "data": data}
        return Response(data=res_data, status=status.HTTP_200_OK)


@api_view(["GET"])
def merchant_specific_product_details(request, product_id):
    res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
    print('request langugae here----: ', res_lan)

    if res_lan == "es":
        activate('es')
        pass

    token = request.GET.get('access_token', '')
    if token == '':
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
    try:
        user, token_list = validations.get_user_obj(token)
    except Exception as e:
        print(e)
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

    print('product id',product_id)
    query = models.Product.objects.get(id=product_id)
    print(query)

    # if res_lan == "es":
    #     serializer = serializers.MerchantSpecificProductDetailsTranslatedSerializer(query)
    # else:
    serializer = serializers.MerchantSpecificProductDetailsSerializer(query)
    print(serializer)
    try:
        data = serializer.data
        print(data)
    except Exception as e:
        print(e)
        res_data = {"status_code": 400, "status": "fail", "message": "internal server error",
                    "data": {}}
        return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
    else:
        res_data = {"status_code": 200, "status": "success", "message": _("Specific product list arrived"),
                    "data": data}
        return Response(data=res_data, status=status.HTTP_200_OK)


@api_view(["POST"])
def support_request(request):
    res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
    print('request langugae : ', res_lan)

    if res_lan == "es":
        activate('es')
        pass

    try:
        data, token = validations.check_request(request, 'token')
        print("Data : ", data, "\nToken : ", token)
    except Exception as e:
        print(e)
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
    try:
        user, token_list = validations.get_user_obj(token)
    except Exception as e:
        print(e)
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

    msg = data.get('message')

    models.UserSupportRequest.objects.create(user_id=user, message=msg)

    subject = 'Tech Support Request from User for Sprayer Loyalty Program'
    is_user = True
    html_message = render_to_string('mail.html', {'first_name': user.full_name, 'is_user': is_user,
                                                  "tech_request": True, "message": msg})
    plain_message = strip_tags(html_message)
    from_email = settings.DEFAULT_FROM_EMAIL
    to = settings.DEFAULT_FROM_EMAIL
    mail.send_mail(subject, plain_message, from_email, [to], html_message=html_message)

    res_data = {"status_code": 200, "status": "success", "message": _("TechSupport request sent successfully"),
                "data": {}}
    return Response(data=res_data, status=status.HTTP_200_OK)


@api_view(["GET"])
def leader_board(request):
    res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
    print('request langugae : ', res_lan)

    if res_lan == "es":
        activate('es')
        pass

    token = request.GET.get('access_token', '')
    if token == '':
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
    try:
        user, token_list = validations.get_user_obj(token)
    except Exception as e:
        print("Exception : ", e)
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

    queryset = models.User.objects.all().order_by('-points')
    # if res_lan == "es":
    #     serializer = serializers.LeaderUserTranslatedSerializer(queryset, many=True)
    # else:
    serializer = serializers.LeaderUserSerializer(queryset, many=True)

    print(serializer)
    try:
        data = serializer.data
        data = sorted(data, key=lambda i: i['points'], reverse=True)
        # print("data: ", data, "length of data : ", len(data), "top 10 : ", data[:10])
    except Exception as e:
        print("Exception : ", e)
        res_data = {"status_code": 400, "status": "fail", "message": "internal server error",
                    "data": {}}
        return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
    else:
        res_data = {"status_code": 200, "status": "success", "message": _("Leader board list arrived"), "data": data}
        return Response(data=res_data, status=status.HTTP_200_OK)


@api_view(["POST"])
def dispute_request(request):
    res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
    print('request langugae : ', res_lan)

    if res_lan == "es":
        activate('es')
        pass

    try:
        data, token = validations.check_request(request, 'token')
        print("Data : ", data, "\nToken : ", token)
    except Exception as e:
        print("Exception : ", e)
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
    try:
        user, token_list = validations.get_user_obj(token)
    except Exception as e:
        print("Exception : ", e)
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
    try:
        message = data.get("message")
        qr_id = data.get("qr_id")
    except Exception as e:
        print("Exception : ", e)
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Request"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

    try:
        user_rewards = models.UserRewards.objects.get(qr_code_id=qr_id, originally_scanned=True)
        # print("userrewards===>", user_rewards.user_id)
        qr_history_list = []
        x = user_rewards.user_id.device
        for y in x:
            qr_history_list.append(y.device_fcm_token)
        # print("qr_history_list==>", qr_history_list)

        gcm_reg_id = qr_history_list[-1]
        fcm_device = GCMDevice.objects.create(registration_id=gcm_reg_id, cloud_message_type="FCM")
        data = fcm_device.send_message("The person made the dispute request against you.")
        msg = f"The person made the dispute request againist you."
        models.Notification.objects.create(user_id=user_rewards.user_id, notification_msg=msg, points=0)

        # device = APNSDevice.objects.get(registration_id=apns_token)
        # device.send_message("You've got mail")
        # print("data===>",data)
        fcm_list=[]
        user_rewards.dispute_status = "Pending"
        user_rewards.save()
        request = models.User.objects.get(id=user.id)
        # print("request===>", request.id)
        device_data = request.device
        for x in device_data:
            # print("===========>", x.device_fcm_token)
            fcm_list.append(x.device_fcm_token)
        # print("lists===>", fcm_list[-1])
        gcm_reg_id = fcm_list[-1]
        fcm_device = GCMDevice.objects.create(registration_id=gcm_reg_id, cloud_message_type="FCM")
        data = fcm_device.send_message("Dispute request successfully sent to Admin.")
        print("data===>", data)
        msg_notification = f"Congratulations, Your dispute request successfully sent to admin to resolve."
        models.Notification.objects.create(user_id=user, notification_msg=msg_notification, points=0)
        models.DisputeRequest.objects.create(user_id=user, message=message, opposite_user_userrewards_id=user_rewards)
    except Exception as e:
        print("Exception :--> ", e)
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Request"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

    res_data = {"status_code": 200, "status": "success", "message": _("Dispute request sent"), "data": {}}
    return Response(data=res_data, status=status.HTTP_200_OK)


@api_view(["POST"])
def pass_update(request, token_id):
    token_id = token_id
    print('pass_update', token_id)
    try:
        password = request.POST.get('confirm_password')
        c_password = request.POST.get('new_password')
        print(password, c_password)
        if token_id.startswith('rs-pwd-'):
            usr = models.User.objects.get(email_verification_token=token_id)
            if password == c_password:
                hashed_pass = validations.hash_password(password)
                usr.password = hashed_pass
                usr.save()
                print(usr)
                return render(request, template_name="ActivationLink.html", context={"password_updated": True,
                                                                                     "is_user": True})
            else:
                alert(text='password and confirm_password does not match!', title='Error Alert', button='OK')
                return redirect('ActivationLink', token_id=token_id)
    except Exception as e:
        print(e)
        res_data = {"status_code": 401, "status": "fail", "message": "Invalid request", "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)


@api_view(["GET"])
def get_machine_types(request):
    try:
        queryset = models.MachineTypes.objects.all()
        serializer = serializers.MachineSerializer(queryset, many=True)
        data = serializer.data
        res_data = {"status_code": 200, "status": "success", "message": _("Machine Types Get Successfully"), "data": data}
        return Response(data=res_data, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        res_data = {"status_code": 401, "status": "fail", "message": "Invalid request", "data": {}}
        return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_substrate_types(request):
    try:
        queryset = models.SubstrateTypes.objects.all()
        serializer = serializers.SubstrateSerializer(queryset, many=True)
        data = serializer.data
        res_data = {"status_code": 200, "status": "success", "message": _("Substrate Types Get Successfully"), "data": data}
        return Response(data=res_data, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        res_data = {"status_code": 401, "status": "fail", "message": "Invalid request", "data": {}}
        return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)