from django.shortcuts import render, redirect
from django.http import HttpResponse
from slp.models import Quiz,Question,User,Device,QuizResult,Video,UserRewards,Notification
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
    HTTP_200_OK
)
from .serializers import NotificationSerializer
from userapi import validations, serializers
import requests

# For multi-language support
from django.utils.translation import gettext_lazy as _
from django.utils.translation import activate


@api_view(["GET"])
def notification_getAPI(request,id):
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

	notification_get = Notification.objects.get(user_id=id)
	notification_serializer = NotificationSerializer(notification_get, many=True)
	res_data = {"status_code": 200, "status": "success", "message": _("notification list"), "data": notification_serializer.data}
	return Response(data=res_data, status=status.HTTP_200_OK)