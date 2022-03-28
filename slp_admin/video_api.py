from django.shortcuts import render, redirect
from django.http import HttpResponse
from slp.models import Video,Category,Admin,Quiz
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
from .serializers import VideoSerializer,CategorySerializer
from rest_framework.permissions import AllowAny
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.permissions import IsAuthenticated
from userapi import validations, serializers

# For multi-language support
from django.utils.translation import gettext_lazy as _
from django.utils.translation import activate


# @csrf_exempt
# @api_view(["POST"])
# def video_postAPI(request):
# 	try:
# 		data, token = validations.check_request(request, 'token')
# 		print("Data : ", data, "\nToken : ", token)
# 	except Exception as e:
# 	    print(e)
# 	    res_data = {"status_code": 400, "status": "fail", "message": "Invalid request", "data": {}}
# 	    return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
# 	try:
# 	    user, token_list = validations.get_user_obj(token)
# 	except Exception as e:
# 	    print(e)
# 	    res_data = {"status_code": 400, "status": "fail", "message": "Invalid access token", "data": {}}
# 	    return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
#
# 	if request.method == "POST":
# 		video = VideoSerializer(data=request.data)
# 		if video.is_valid():
# 			video.save()
# 			res_data = {"status_code": 200, "status": "success", "message": "video list", "data": {}}
# 			return Response(data=res_data, status=status.HTTP_200_OK)
# 		return Response(video.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def video_getAPI(request):
	token = request.GET.get('access_token', '')

	res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
	print('request langugae : ', res_lan)

	if res_lan == "es":
		activate('es')
		pass

	if token == '':
		res_data = {"status_code": 401, "status": "fail", "message": "Invalid token", "data": {}}
		return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
	try:
		user, token_list = validations.get_user_obj(token)
	except Exception as e:
		print(e)
		res_data = {"status_code": 401, "status": "fail", "message": "Invalid access token", "data": {}}
		return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

	Video_get = Video.objects.all().filter(is_deleted=False)
	v_serializer = VideoSerializer(Video_get, many=True, context={"user_id": user.id})
	res_data = {"status_code": 200, "status": "success", "message": _("video list"), "data": v_serializer.data}
	return Response(data=res_data, status=status.HTTP_200_OK)


# @csrf_exempt
# @api_view(["POST"])
# def category_postAPI(request):
# 	try:
# 		data, token = validations.check_request(request, 'token')
# 		print("Data : ", data, "\nToken : ", token)
# 	except Exception as e:
# 	    print(e)
# 	    res_data = {"status_code": 400, "status": "fail", "message": "Invalid request", "data": {}}
# 	    return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
# 	try:
# 	    user, token_list = validations.get_user_obj(token)
# 	except Exception as e:
# 	    print(e)
# 	    res_data = {"status_code": 400, "status": "fail", "message": "Invalid access token", "data": {}}
# 	    return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
# 	if request.method == "POST":
# 		category = CategorySerializer(data=request.data)
# 		if category.is_valid():
# 			category.save()
# 			return Response(category.data, status=status.HTTP_201_CREATED)
# 		return Response(category.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def category_getAPI(request):
	token = request.GET.get('access_token', '')
	res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
	print('request langugae : ', res_lan)

	if res_lan == "es":
		activate('es')
		pass

	if token == '':
		res_data = {"status_code": 401, "status": "fail", "message": "Invalid token", "data": {}}
		return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
	try:
		user, token_list = validations.get_user_obj(token)
	except Exception as e:
		print(e)
		res_data = {"status_code": 401, "status": "fail", "message": "Invalid access token", "data": {}}
		return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
	cat_list = Category.objects.all()
	c_serializer = CategorySerializer(cat_list, many=True)
	res_data = {"status_code": 200, "status": "success", "message": _("category list"), "data": c_serializer.data}
	return Response(data=res_data, status=status.HTTP_200_OK)


# @csrf_exempt
# @api_view(["POST"])
# def category_postAPI(request):
# 	if request.method == "POST":
# 		c_serializer = CategorySerializer(data=request.data)	
# 	category_name = request.POST.get("category_name")
# 	if category_name == "":
# 	    return Response({'error': 'please fill category_name'},
# 	                    status=HTTP_400_BAD_REQUEST)
# 	Category.objects.create(category_name=category_name)
# 	return Response({'success': "data submitted"},
# 	               	status=HTTP_200_OK)


def category_display(request):
	try:
		is_admin = True
		is_merchant = False
		id = request.session['aid']
		a = Admin.objects.filter(id=id).get()
		name = a.full_name
		name = name.capitalize()
		obj = Category.objects.all()
		return render(request,"videos-categories.html",{'is_admin':True,"obj":obj,"category_class":True,"name":name})
	except Exception as e:
		print('Exception in video',e)
		return redirect('login_error')

def category_add(request):
	try:
		id = request.session['aid']
		a = Admin.objects.filter(id=id).get()
		name = a.full_name
		name = name.capitalize()
		obj = Category.objects.all()

		if request.method=="POST":
			category_name  = request.POST.get("category_name").strip()
			if Category.objects.filter(category_name__iexact=category_name).exists():
				print('if')
				category_already_exists = True
				category_added = False
			else:	
				data = Category.objects.create(category_name=category_name)
				print('else')
				category_added = True
				category_already_exists = False
			return render(request, "videos-categories.html",
						  {'is_admin': True, "obj": obj, "category_class": True, "name": name,
						   "category_added": category_added,"category_already_exists":category_already_exists})

			# return redirect("category_display")
		else:
			return HttpResponse("errir")
	except Exception as e:
		return render(request,"videos-categories.html",{'is_admin':True,"obj":obj,"category_class":True,"e":e,"name":name})

def del_category(request,id):
	try:
		is_admin = True
		is_merchant = False
		del_data = Category.objects.get(id=id)
		
		del_data_c_name = del_data.category_name
		print("@@@@@@@@@@@111111",del_data_c_name)

		del_data_video = Video.objects.filter(category=del_data_c_name)

		# quiz_data = Quiz.objects.filter(videoId=del_data_video.id)
		if del_data_video.exists():
			del_data.delete()
			del_data_video.delete()

		else:
			del_data.delete()

		return redirect("category_display")
	except Exception as e:
		print('Exception in video',e)
		return redirect('login_error')