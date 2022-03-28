from django.shortcuts import render, redirect
from push_notifications.gcm import send_message
from django.http import HttpResponse
from slp.models import AdminSettings, User, GiftBitLog, Notification, Admin, Device, UserRewards
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from django.http import JsonResponse
from django.core import serializers
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,HTTP_500_INTERNAL_SERVER_ERROR
)
from userapi import validations
import requests
from giftbit import GiftbitClient
import datetime
from push_notifications.models import APNSDevice, GCMDevice

# For multi-language support
from django.utils.translation import gettext_lazy as _
from django.utils.translation import activate

@csrf_exempt
@api_view(["POST"])
def giftbit_api(request,id):
	try:
		res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
		print('request langugae : ', res_lan)

		if res_lan == "es":
			activate('es')
			pass

		data, token = validations.check_request(request, 'token')
		print("Data : ", data, "\nToken : ", token)
	except Exception as e:
	    print(e)
	    res_data = {"status_code": 400, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
	    return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
	try:
	    user, token_list = validations.get_user_obj(token)
	except Exception as e:
	    print(e)
	    res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
	    return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
	try:
		giftbit_data = data.get('giftbit_data')
		coupen_brand = giftbit_data[0]['brands']
		coupen_cents = giftbit_data[0]['cents']
		point = AdminSettings.objects.filter(id=1)
		fcm_tokens = []
		for x in point.values():
			dollar_point = x['no_of_points_to_usd']
			total_points = User.objects.filter(id=id)
			for x in total_points:
				print("device==>",x.device)
				my_data = x.device
				for my_fcm in my_data:
					print("my_fcm===>",my_fcm.device_fcm_token)
					list_tokens = my_fcm.device_fcm_token
					fcm_tokens.append(list_tokens)
			print("fcm_tokens===>",fcm_tokens[-1],fcm_tokens)
			gcm_reg_id = fcm_tokens[-1]
			print("gcm_reg_id====>",gcm_reg_id)
			the_user = User.objects.get(id=id)
			# devices = GCMDevice.objects.filter(registration_id=gcm_reg_id)
			# print("devices tttt===>",devices)
			# print("push_not===>",push_not)
			my_name=[]
			my_mail = []
			for x in total_points:
				my_name.append(x.full_name)
				my_mail.append(x.email)
			print("my_mail===>",my_mail)
			for temp_point in total_points.values():
				final_points = temp_point['points']
				minimum_balance_points_value = AdminSettings.objects.filter(id=1)
				minimum_balance_points=[]
				print("final_points==>",final_points)
				for x in minimum_balance_points_value:
					print(x.user_eligibility_points)
					minimum_balance_points.append(x.user_eligibility_points)
				print("minimum_balance_points==>",minimum_balance_points)
				if  final_points > minimum_balance_points[0]:
					coupen_point_balance = final_points-minimum_balance_points[0]
					print("coupen_point_balance==>",coupen_point_balance)
					available_dollar_coupen_point = coupen_point_balance//dollar_point
					print("available_dollar_coupen_point===>",available_dollar_coupen_point)
					try:
						if available_dollar_coupen_point!=0:
							cents = coupen_cents
							print("cents===>",cents)
							my_dollar_from_cents = cents//100
							coupen_point = my_dollar_from_cents*dollar_point
							coupen_dollar = my_dollar_from_cents
							if available_dollar_coupen_point >=coupen_dollar:
								remain_points = final_points-coupen_point
								updated_points = User.objects.filter(id=id).update(points=remain_points)

								UserRewards.objects.create(user_id=user, reward_name="Cash Out Points",
														   reward_type="Cash Out Points", reward_points=coupen_point,
														   points_type="Debit")

								expiry_date = (datetime.date.today() + datetime.timedelta(6*365/12)).isoformat()
								payload = {
							    "gift_template": "TMXUCOCJMQJX",
							    "contacts": [
							         {
							            "firstname":my_name[0],
							             "lastname":my_name[0],
							             "email":my_mail[0]
							         }
							    ],
							    "price_in_cents":cents,
							    "brand_codes": [
							        coupen_brand
							     ],
							    "expiry":expiry_date,
								}
								print("inside it===>",payload)
								headers = {'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJTSEEyNTYifQ==.VFAwbUpwc05SMXQzeWhiR3BIbVcvOGNuMG1TajhqMmVadmEvbG5RZFNqMkNBcmtVZmhVTVJSK0svY3pVOFlvcFU0S0NSbmw1ZG8zM0ZHWDFTSW0rQnVTS016OGJHVTF0VGEzRGZKZUs5dllYNEg3WThsOUhvZGZZTWhVOTIwZnc=.Ss+f4HDj+CRCt8PIIvP1F1LoKeDsUA7f7QM0wMLNxok='}
								r = requests.post("https://api-testbed.giftbit.com/papi/v1/campaign", json=payload,headers=headers)
								dada = r.json()
								fcm_device = GCMDevice.objects.create(registration_id=gcm_reg_id, cloud_message_type="FCM")
								data = fcm_device.send_message(f"{coupen_point} points redeemed by you for {coupen_brand} coupon.")
								print("data====>",data)
								msg = f"Congratulations, {coupen_dollar}$ coupon of {coupen_brand} sent to your registered E-mail."
								Notification.objects.create(user_id=user, notification_msg=msg, points=coupen_dollar)
								GiftBitLog.objects.create(sent_user=my_name[0],brandname=coupen_brand,coupen_amount=coupen_dollar)
								res_data = {"status_code": 200, "status": "Success", "message": _("{0}$ coupon of '{1}' sent to your registered E-mail").format(coupen_dollar,coupen_brand), "data": {}}
								return Response(data=res_data, status=status.HTTP_200_OK)
							else:
								res_data = {"status_code": 400, "status": "fail", "message": _("You have Insufficient points."), "data": {}}
								return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
						else:
							res_data = {"status_code": 400, "status": "fail", "message": _("You have Insufficient points."), "data": {}}
							return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
					except Exception as e:
						print("error==>",e)
						return Response({"error":"internal server error"},status=HTTP_400_BAD_REQUEST)

				else:
					res_data = {"status_code": 400, "status": "fail", "message": _("You are Not eligible for Reedem minimum required points is {0}").format(minimum_balance_points[0]), "data": {}}
					return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
	except Exception as e:
		print("error==>",e)
		return Response({"error":"internal server error"},status=HTTP_400_BAD_REQUEST)

			
def giftbitLog(request):
	try:
		is_admin = True
		is_merchant = False
		id = request.session['aid']
		a = Admin.objects.filter(id=id).get()
		name = a.full_name
		name = name.capitalize()
		all_data = GiftBitLog.objects.all()
		return render(request,"giftbitlog.html",{"giftbit_class":True,"is_admin":is_admin,"name":name,"all_data":all_data})
	except Exception as e:
		print('Exception in video',e)
		return redirect('login_error')

