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
from .serializers import QuizSerializer,UserDataSerializer,QuizQuestion,QuizShowResult
from userapi import validations, serializers
import requests

# For multi-language support
from django.utils.translation import gettext_lazy as _
from django.utils.translation import activate
from push_notifications.models import APNSDevice, GCMDevice
@api_view(["GET"])
def quiz_getAPI(request):
	token = request.GET.get('access_token', '')
	res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
	print('request langugae : ', res_lan)

	if res_lan == "es":
		activate('es')
		pass

	if token == '':
		res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
		return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
	try:
		user, token_list = validations.get_user_obj(token)
	except Exception as e:
		print(e)
		res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
		return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

	quiz_get = Quiz.objects.filter(is_deleted=False)
	quiz_serializer = QuizSerializer(quiz_get, many=True)
	res_data = {"status_code": 200, "status": "success", "message": _("quiz list"), "data": quiz_serializer.data}
	return Response(data=res_data, status=status.HTTP_200_OK)

@api_view(["GET"])
def quiz_video(request,videoId):
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

	quiz_question_get = Quiz.objects.filter(videoId=videoId)
	print("data===>",quiz_question_get)
	quiz_ques_searializers = QuizQuestion(quiz_question_get,many=True)
	res_data = {"status_code": 200, "status": "success", "message": _("question list"), "data": quiz_ques_searializers.data}
	return Response(data=res_data, status=status.HTTP_200_OK)

@api_view(["GET"])
def quiz_finshed_res(request):
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

	print(user)
	user.points += 2500
	user.save()
	res_data = {"status_code": 200, "status": "success", "message": "", "data": {}}
	return Response(data=res_data, status=status.HTTP_200_OK)

@api_view(["POST"])
def quiz_ans(request, videoId):
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

	static_data = data.get('quiz_answers')
	user_answer = []
	real_answer = []
	fcm_list = []
	for static_data_1 in static_data:
		sata_arr = list(static_data_1.values())
		user_answer.append(sata_arr)

	quix = Quiz.objects.get(videoId=videoId)
	live_Ans = []
	question = quix.questions
	for data in question:
		data1 = (data.question_id, data.answer)
		answer_list = list(data1)
		real_answer.append(answer_list)
		demo_data = {"question_id":data.question_id,"answer": data.answer}
		live_Ans.append(demo_data)
	if user_answer == real_answer:
		quix.quiz_played=True
		quix.save()
		msg = f"Congratulations, You have earned {quix.points} points for attempting quiz successfully."
		Notification.objects.create(user_id=user, notification_msg=msg, points=quix.points)
		user.points += int(quix.points)
		user.save()
		data = QuizResult.objects.create(user_Ans=static_data,real_quiz_Ans=live_Ans,answer="Right Answer",played_user=user,quiz_videoId=videoId)
		video = Video.objects.get(id=videoId)
		quiz_Fcm = User.objects.get(id=user.id)
		data = quiz_Fcm.device
		for x in data:
			fcm_list.append(x.device_fcm_token)
		gcm_reg_id = fcm_list[-1]
		fcm_device = GCMDevice.objects.create(registration_id=gcm_reg_id, cloud_message_type="FCM")
		data = fcm_device.send_message(f"You've won the quiz and earned {quix.points} points successfully.")
		UserRewards.objects.create(user_id=user,video=video,reward_name="Earned Points",reward_type="Learn to Earn Points",reward_points=quix.points,points_type="Credit")
		res_data = {"status_code": 200, "status": "success", "message": _("Your Answer matched and you Earned {0} Points").format(quix.points), "data": {}}
		return Response(data=res_data, status=status.HTTP_200_OK)
	else:
		#flag pass karis not match no points
		quix.quiz_played=True
		quix.save()
		data = QuizResult.objects.create(user_Ans=static_data,real_quiz_Ans=live_Ans,answer="Wrong Answer",played_user=user,quiz_videoId=videoId)
		res_data = {"status_code": 400, "status": "error", "message": _("Your Answer Not matched. No points Earned."), "data": {}}
		return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def quiz_show_result(request,quiz_videoId):
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

	quiz_show = QuizResult.objects.filter(played_user=user, quiz_videoId=quiz_videoId)
	for x in quiz_show:
		if user.id == x.played_user.id:
			quiz_serializer = QuizShowResult(quiz_show, many=True,context={"user_Id":user.id})
			res_data = {"status_code": 200, "status": "success", "message": _("quiz list"), "data": quiz_serializer.data}
			return Response(data=res_data, status=status.HTTP_200_OK)
