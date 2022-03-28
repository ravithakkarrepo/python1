import pytz
from slp.models import Contest,Admin,ContestPlay,UserRewards
# from slp.models import *
from django.shortcuts import render, redirect, HttpResponse
from slp.models import *
from .serializers import ContestSerializer, ContestEachSerializer, ContestPlayUserSerializer, \
	TranslatedContestSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from userapi import validations, serializers
from django.http import JsonResponse
from push_notifications.models import APNSDevice, GCMDevice
import datetime
import time
from datetime import datetime
from rest_framework.views import APIView
# from django.template.context_processors import csrf
import requests
import ast
from dateutil import tz

# For multi-language support
from django.utils.translation import gettext_lazy as _
from django.utils.translation import activate

# For Cron Job using Celery
from AllFoamTech.tasks import start_contest, end_contest
from slp import models


def add_contest(request):
	print('add_contest')
	is_admin, is_merchant = True, False
	try:
		add_contest, contest_already_exists, add_contest_failed = False, False, False
		date_1 = datetime.utcnow()
		print('datetime.utcnow() : ', date_1)

		id = request.session['aid']
		values = Admin.objects.filter(id=id).get()
		name = values.full_name
		name = name.capitalize()

		if request.method == 'POST':
			print('post')
			contest_name = request.POST.get('contest_name')
			contest_point = request.POST.get('contest_point')
			contest_details = request.POST.get('contest_details')

			pst = pytz.timezone('EST')

			contest_startdate = request.POST.get('contest_startdate')
			contest_startdate = datetime.strptime(contest_startdate, "%Y-%m-%d %H:%M")
			contest_startdate = pst.localize(contest_startdate)

			contest_enddate = request.POST.get("contest_enddate")
			contest_enddate = datetime.strptime(contest_enddate, "%Y-%m-%d %H:%M")
			contest_enddate = pst.localize(contest_enddate)

			contest_image = request.FILES.get("contest_image")

			print('contest_name : ', contest_name, "type of contest_name : ", type(contest_name))
			print('contest_point : ', contest_point, "type of contest_point : ", type(contest_point))
			print('contest_details : ', contest_details, "type of contest_details : ", type(contest_details))
			print("contest_startdate : ", contest_startdate, "type of contest_startdate : ", type(contest_startdate),
				  "\ncontest_enddate : ", contest_enddate, "type of contest_enddate : ", type(contest_enddate))
			print('contest_image : ', contest_image, "type of contest_image : ", type(contest_image))

			if Contest.objects.filter(contest_name__iexact=contest_name).exists():
				contest_already_exists = True
				print('contest_already_exists', contest_already_exists)
			else:
				try:
					fcm_users = User.objects.all()
					fcm_list=[]
					for fcm_x in fcm_users:
						all_fcm_device = fcm_x.device
						for my_fm in all_fcm_device:
							gcm_reg_id = my_fm.device_fcm_token
							fcm_list.append(gcm_reg_id)
					order = [gcm_reg_id for gcm_reg_id in fcm_list]
					print("after 1st for loop, order : ", order)

					for gcm_reg_id in order:
						fcm_device = GCMDevice.objects.create(registration_id=gcm_reg_id, cloud_message_type="FCM")
						data = fcm_device.send_message("New contest added")
						print("data====>",data)

					print("after 2nd for loop")
				except Exception as e:
					print("\nException while sending push notifications : ", e, "\n")

				try:
					ad = Contest.objects.create(contest_name=contest_name, contest_point=contest_point,
												contest_details=contest_details, contest_startdate=contest_startdate,
												contest_enddate=contest_enddate, contest_image=contest_image)
					# add_Contest = True`
					print('after contest created : ', ad)
					add_contest = True

				except Exception as e:
					print("\nException while creating Contest instance : ", e, "\n")
					add_contest_failed = True

				else:
					try:
						start_contest.apply_async([ad.id], eta=contest_startdate)
						end_contest.apply_async([ad.id], eta=contest_enddate)
					except Exception as e:
						print("Exception while doing crone job using Celery : ", e)

		contest_class = True
		return render(request,'add_contest.html',{'is_admin': is_admin, 'is_merchant': is_merchant, 'name': name,
												  'add_contest': add_contest, 'contest_class': contest_class,
												  'contest_already_exists': contest_already_exists,
												  'add_contest_failed': add_contest_failed})
	except Exception as ex:
		print('\nException in add page : ', ex, "\n")
		return redirect('login_error')

@api_view(["GET"])
def get_contest_list(request):
	try:
		pst = pytz.timezone('EST')
		is_admin, is_merchant = True, False

		id = request.session['aid']
		a = Admin.objects.filter(id=id).get()
		name = a.full_name
		name = name.capitalize()

		data_contest = Contest.objects.all()
		print("data_contest : ", data_contest)

		date_1 = datetime.utcnow()
		print('default today : ',date_1, "TYpe : ", type(date_1))

		initial_data = date_1.strftime("%Y-%m-%d %H:%M")
		print("initial time : ", initial_data, "Type : ", type(initial_data))

		start_date, end_date, json_response = [], [], []
		combo = zip()

		for data in data_contest:
			particular_contest_data = {}

			particular_contest_data["contest_id"] = data.id
			particular_contest_data["contest_name"] = data.contest_name
			particular_contest_data["contest_details"] = data.contest_details

			starttime = data.contest_startdate.astimezone(pst)
			starttime = str(starttime)
			# start_date.append(starttime[:19])
			particular_contest_data["start_date"] = starttime[:19]

			endtime = data.contest_enddate.astimezone(pst)
			endtime = str(endtime)
			end_date.append(endtime[:19])
			particular_contest_data["end_date"] = endtime[:19]

			particular_contest_data["contest_status"] = data.contest_status

			particular_contest_data["url_data"] = {"id": data.id, "status" : data.contest_status}
			# particular_contest_data["contest_class"] = True
			# particular_contest_data["is_admin"] = True

			json_response.append(particular_contest_data)
		# json_response.append("contest_class")
		# json_response.append("is_admin")

		# contest_class = True

		res = {"data": json_response}
		return Response(data=res)
	except Exception as e:
		print('Exception in video', e)
		return HttpResponse(status=status.HTTP_400_BAD_REQUEST)


def contest_list(request):
	try:
		is_admin, is_merchant = True, False

		id = request.session['aid']
		a = Admin.objects.filter(id=id).get()
		name = a.full_name
		name = name.capitalize()
		contest_class = True

		return render(request, "new_contest_list.html", {"is_admin": is_admin, "contest_class":contest_class,'loop1':'true',"name":name})
	except Exception as e:
		print('Exception in video', e)
		return redirect('login_error')

# def contest_list(request):
# 	try:
# 		pst = pytz.timezone('EST')
#
# 		is_admin, is_merchant = True, False
#
# 		id = request.session['aid']
# 		a = Admin.objects.filter(id=id).get()
# 		name = a.full_name
# 		name = name.capitalize()
#
# 		data_contest = Contest.objects.all()
# 		print("data_contest : ", data_contest)
#
# 		date_1 = datetime.utcnow()
# 		print('default today : ',date_1, "TYpe : ", type(date_1))
#
# 		initial_data = date_1.strftime("%Y-%m-%d %H:%M")
# 		print("initial time : ", initial_data, "Type : ", type(initial_data))
# 		# initial_data = pst.localize(initial_data)
#
# 		print("initial_data : ", initial_data)
#
# 		start_date = []
# 		end_date = []
# 		combo = zip()
#
#
# 		for data in data_contest:
# 			# combo = ''
# 			# print(data.contest_enddate,type(data.contest_enddate))
# 			endtime = data.contest_enddate
# 			print('endtime : ', endtime, "type: ", type(endtime))
#
# 			end_data = endtime.strftime("%Y-%m-%d %H:%M")
# 			print("end time : ", end_data, "type: ", type(end_data))
#
# 			# contest_enddate = datetime.strptime(endtime, "%Y-%m-%d %H:%M")
# 			# end_data = pst.localize(end_data)
#
# 			# print(data.contest_startdate)
# 			starttime = data.contest_startdate
# 			print('start date : ', starttime)
#
# 			start_data = starttime.strftime("%Y-%m-%d %H:%M")
# 			print("start time str : ", start_data, "type : ", type(start_data))
#
# 			print('if before ---initial_data',initial_data, type(initial_data),">=",start_data,type(start_data))
# 			print('if before ---end_data',initial_data, type(initial_data),"<=",end_data,type(end_data))
#
# 			# if initial_data >= start_data:
# 			# 	print('updated to running', initial_data, start_data)
# 			# 	Contest.objects.filter(contest_startdate=start_data, contest_status='upcoming').update(contest_status='running')
# 			# 	print('1111111111111')
#             #
# 			# if initial_data >= end_data:
# 			# 	print('updated to completed',initial_data,end_data)
# 			# 	Contest.objects.filter(contest_enddate=end_data, contest_status='running').update(contest_status='completed')
#
# 			print('data contest', data_contest)
#
# 			starttime = data.contest_startdate.astimezone(pst)
# 			starttime = str(starttime)
# 			start_date.append(starttime[:19])
#
# 			endtime = data.contest_enddate.astimezone(pst)
# 			endtime = str(endtime)
# 			end_date.append(endtime[:19])
#
# 			combo = zip(data_contest, start_date, end_date)
# 		contest_class = True
# 		return render(request, "contest_list.html", {"is_admin": is_admin, "combo": combo, "data_contest": data_contest,
# 													 "start_date": start_date, "end_date": end_date,"name":name,
# 													 "contest_class":contest_class, 'loop1':'true'})
# 	except Exception as e:
# 		print('Exception in video', e)
# 		return redirect('login_error')

def contest_details(request,id):
	print('contest details',id)
	try:
		print('contest details : ', type(id))
		c_id = id
		is_admin, is_merchant = True, False
		id = request.session['aid']
		a = Admin.objects.filter(id=id).get()
		name = a.full_name
		name = name.capitalize() 

		contest_userReward = ''
		contestPlay = ContestPlay.objects.filter(contest_id_id=c_id).all()
		print('contestPlay : ', contestPlay)
		list_2 = ''
		final_data = []

		participated_user_list, emails, company_names, participated_user_contest_points = [], [], [], []

		final_winner = ''
		contest_data = Contest.objects.filter(id=int(c_id)).get()
		print('contest_data======', contest_data)
		for pp in contestPlay:
			print('pppppppppppppp',type(pp.contest_user_id),pp.contest_user_id)
			contest_userReward = ContestPlay.objects.filter(contest_user_id=pp.contest_user_id).all()
			print('1234567',contest_userReward)

			for user_details in contest_userReward:
				print("$$$$$4",user_details.contest_user)
				print("!!!!!!!1",type(user_details.contest_user.device))
				print("!!!!!!!1",type(user_details.contest_user.device))
				list_data = user_details.contest_user.device
				for i in range(0,len(list_data)):
					list_2 = list_data[i].access_token
					print("@@@@@@@@@@@@@@",list_2)
		print("after 1st for loop : ", list_2)
		if list_2 != '':
			# url = "http://127.0.0.1:8000/contest_user/"+str(c_id)+"?access_token="+list_2
			#
			# print("!!!!!!!!!!!!!!!!!!!!1",url)
			# x = requests.get(url)
			# print('-----------------',x)
			# data = x.json()
			# print('data================',data)
			# print("data.get(status_code) : ", data.get("status_code"))
			#
			# if data.get("status_code") != 200:
			# 	pass
			# else:
			# 	data1 = data["data"]
			#
			# 	print("@@@@@@@@data@@@@@@@",len(data))
			#
			# 	for y in range(0,len(data1)):
			#
			# 		final_data.append(data1[y])
			# 		temp = User.objects.get(id=data1[y]['contest_user'])
			# 		print(")))))))))))))",temp)
			# 		email_companyName.append(temp)
			# 		print("((((((((()))))))))",email_companyName)
			# 		print("data1 : ", data1)
			# 		print("contesttttttt  : ", data1[y]["contest_user"])
			# 		contest_play_obj = models.ContestPlay.objects.get(contest_id=contest_data, contest_user=temp, contest_played=True)
			# 		# rewards = models.UserRewards.objects.filter(user_id=temp, qr_status="Completed").filter(created_at__range=(contest_data.contest_startdate, contest_data.contest_enddate))
			#
			# 		# credited_rewards = rewards.filter(points_type="Credit")
			# 		# debited_rewards = rewards.filter(points_type="Debit")
			# 		#
			# 		# print("rewards : ", rewards)
			# 		# print("Credited : ", credited_rewards)
			# 		# print("Debited : ", debited_rewards)
			# 		#
			# 		# ls = [x.reward_points for x in credited_rewards]
			# 		# minus_points_ls = [x.reward_points for x in debited_rewards]
			# 		# user_contest_points = sum(ls)
			# 		# minus_points = sum(minus_points_ls)
			# 		#
			# 		# print("Total earned points in contest : ", user_contest_points-minus_points)
			# 		#
			# 		# participated_user_contest_points.append(user_contest_points-minus_points)


			winner_url = "http://127.0.0.1:8000/contest_user_board_admin/"+str(c_id)+"?access_token="+list_2
			winner_get_date = requests.get(winner_url)
			winner_data = winner_get_date.json()
			print('winner_data : ', winner_data)

			participated_user_list = [x.get("full_name") for x in winner_data["Final_Winner"]]
			print("participated_user_list : ", participated_user_list)
			emails = [x.get("email") for x in winner_data["Final_Winner"]]
			print("emails : ", emails)
			company_names = [x.get("company") for x in winner_data["Final_Winner"]]
			print("company_names : ", company_names)
			participated_user_contest_points = [x.get("points") for x in winner_data["Final_Winner"]]
			print("participated_user_contest_points : ", participated_user_contest_points)

			if Contest.objects.filter(contest_status = 'completed', id=c_id):
				final_win = winner_data["Final_Winner"]
				sorted_winner_list = sorted(final_win, key=lambda i: i['points'], reverse=True)
				final_winner = sorted_winner_list[0]

				if final_winner['points'] == 0:
					final_winner = ''
			else:
				print('inside else')
				final_winner = ''

		comb = zip(participated_user_list, emails, company_names, participated_user_contest_points)

		contest_class = True

		pst = pytz.timezone('EST')

		start_date = contest_data.contest_startdate.astimezone(pst)
		start_date = str(start_date)
		start_date = start_date[:19]

		end_date = contest_data.contest_enddate.astimezone(pst)
		end_date = str(end_date)
		end_date = end_date[:19]


		context = {
			'is_admin':is_admin,
			'is_merchant':is_merchant,
			'c_id':c_id,
			'c_data':contest_data,
			'name':name,
			'contest_class':contest_class,
			'contest_userReward':contest_userReward,
			'comb':comb,
			'final_winner':final_winner,
			'start_date': start_date,
			'end_date': end_date,
		}
		return render(request,'contest_details.html', context)
	except Exception as e:
		print('errpr in contest details',e)	


class contest_edit(APIView):
	def get(self, request, id):
		try:
			print('contest edit', id)
			contest_id = id
			print('contest', contest_id)
			is_admin = True
			is_merchant = False
			id = request.session['aid']
			print('iiiiiiiiiiiiiii', id)
			values = Admin.objects.filter(id=id).get()
			name = values.full_name
			name = name.capitalize()
			print('name========', name)
			date_1 = datetime.utcnow()
			cc = Contest.objects.all()
			print('cccccccccccccccccc', cc)
			for ccc in cc:
				print('ccccccccccc1111111111', ccc.contest_image)

				edit_get_startdate = ccc.contest_startdate
				edit_get_start_data = edit_get_startdate.strftime("%Y-%m-%d %H:%M")

				contest_startdate = datetime.strptime(edit_get_start_data, "%Y-%m-%d %H:%M")
				contest_startdate = contest_startdate.replace(tzinfo=pytz.utc)
				contest_startdate = contest_startdate.astimezone(pytz.timezone("EST"))
				contest_startdate = datetime.strftime(contest_startdate, "%Y-%m-%d %H:%M")

				print("\n Contest Startdate : ", contest_startdate)

				edit_get_enddate = ccc.contest_enddate
				edit_get_end_data = edit_get_enddate.strftime("%Y-%m-%d %H:%M")

				contest_enddate = datetime.strptime(edit_get_end_data, "%Y-%m-%d %H:%M")
				contest_enddate = contest_enddate.replace(tzinfo=pytz.utc)
				contest_enddate = contest_enddate.astimezone(pytz.timezone("EST"))
				contest_enddate = datetime.strftime(contest_enddate, "%Y-%m-%d %H:%M")
				print("\n contest_enddate : ", contest_enddate)

				contest_image = str(ccc.contest_image)
				print('iiiiiiiiiiiiiiiii', contest_image, type(contest_image))

			c = Contest.objects.filter(id=contest_id).get()
			print('data->', c.contest_image)
			contest_class = True
			return render(request, 'contest_edit.html',
						  {'contest': c, 'edit_get_start_data': contest_startdate, 'contest_image': contest_image,
						   'edit_get_end_data': contest_enddate, "is_admin": is_admin, 'is_merchant': is_merchant,
						   'name': name, 'contest_class': contest_class})

		except Exception as e:
			print('Exception::', e)
			return redirect('login_error')

	def post(self, request, id):

		try:
			print("request.data : ", request.data)
			edit_contest = False
			print('contest_edit post', id)
			contest_id = id
			print('contest', contest_id)
			is_admin = True
			is_merchant = False
			id = request.session['aid']
			print('iiiiiiiiiiiiiii', id)
			values = Admin.objects.filter(id=id).get()
			name = values.full_name
			name = name.capitalize()
			print('name========', name)
			date_1 = datetime.utcnow()
			vv = Contest.objects.filter(id=contest_id).get()
			data = request.data
			print('print data on post time', data)
			if 'contest_startdate' not in data:
				print('if')
				vv.contest_name = data['contest_name']
				vv.contest_point = data['contest_point']
				vv.contest_details = data['contest_details']
				if data['contest_image'] == '':
					img = vv.contest_image
					vv.contest_image = img
				else:
					vv.contest_image = data['contest_image']
				# vv.contest_startdate = data['contest_startdate']

				end_date = data['contest_enddate']
				pst = pytz.timezone('EST')
				end_date = datetime.strptime(end_date, "%Y-%m-%d %H:%M")


				print("\nend_date : ", end_date, "Type : ", type(end_date), "\n")
				print("\nvv.contest_enddate : ", vv.contest_enddate.astimezone(tz=pytz.timezone('EST')).replace(tzinfo=None), "Type : ", type(vv.contest_enddate), "\n")

				if vv.contest_enddate.astimezone(tz=pytz.timezone('EST')).replace(tzinfo=None) == end_date:
					pass
				else:
					end_date = pst.localize(end_date)
					vv.contest_enddate = end_date

					try:
						end_contest.apply_async([vv.id], eta=end_date)
					except Exception as e:
						print("Exception while doing crone job using Celery : ", e)

				vv.save()

			else:
				print('else')
				vv.contest_name = data['contest_name']
				vv.contest_point = data['contest_point']
				vv.contest_details = data['contest_details']
				if data['contest_image'] == '':
					img = vv.contest_image
					vv.contest_image = img
				else:
					vv.contest_image = data['contest_image']

				pst = pytz.timezone('EST')

				start_date = data['contest_startdate']
				end_date = data['contest_enddate']

				start_date = datetime.strptime(start_date, "%Y-%m-%d %H:%M")

				if vv.contest_startdate.astimezone(tz=pytz.timezone('EST')).replace(tzinfo=None) == start_date:
					pass
				else:
					start_date = pst.localize(start_date)
					vv.contest_startdate = start_date

					try:
						start_contest.apply_async([vv.id], eta=start_date)
					except Exception as e:
						print("Exception while doing crone job using Celery : ", e)

				end_date = datetime.strptime(end_date, "%Y-%m-%d %H:%M")

				if vv.contest_enddate.astimezone(tz=pytz.timezone('EST')).replace(tzinfo=None) == end_date:
					pass
				else:
					end_date = pst.localize(end_date)
					vv.contest_enddate = end_date

					try:
						end_contest.apply_async([vv.id], eta=end_date)
					except Exception as e:
						print("Exception while doing crone job using Celery : ", e)

				print("\nstart_date : ", start_date, "type : ", type(start_date), "\n")
				print("\nvv.contest_startdate : ", vv.contest_startdate, "Type : ", type(vv.contest_startdate), "\n")

				print("\nend_date : ", end_date, "Type : ", type(end_date), "\n")
				print("\nvv.contest_enddate : ", vv.contest_enddate, "Type : ", type(vv.contest_enddate), "\n")

				vv.save()
			edit_contest = True
			contest_class = True
			# return redirect('contest_edit',id=contest_id)
			c = Contest.objects.filter(id=contest_id).get()
			return render(request, 'contest_edit.html',
						  {'name': name, 'is_admin': is_admin, 'is_merchant': is_merchant, 'edit_contest': edit_contest,
						   'contest': c, 'contest_class': contest_class})
		except Exception as e:
			print(e)
			return HttpResponse(status=400)


def delete_contest(request, id):
	data = Contest.objects.get(id=id)
	data.delete()
	return redirect("contestList")

@api_view(["GET"])
def ContestgetAPI(request, id):
	res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
	print('request langugae : ', res_lan)

	if res_lan == "es":
		activate('es')
		pass

	token = request.GET.get('access_token', '')
	if token == '':
		res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Request"), "data": {}}
		return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
	try:
		user, token_list = validations.get_user_obj(token)
	except Exception as e:
		print(e)
		res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
		return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
	contest_xyz = ContestPlay.objects.filter(contest_user=id)
	print("context_xyz",contest_xyz)
	contestObj = Contest.objects.all()
	if res_lan == "es":
		contest_serializers = TranslatedContestSerializer(contestObj, many=True, context={"user_Id": user.id})
	else:
		contest_serializers = ContestSerializer(contestObj, many=True, context={"user_Id": user.id})
	res_data = {"status_code": 200, "status": "success", "message": _("Contest List"), "data": contest_serializers.data}
	return Response(data=res_data, status=status.HTTP_200_OK)

@api_view(["POST"])
def participate(request):
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

	contest_id = request.data["contest_id"]
	contest_final_id = Contest.objects.get(id=contest_id)
	user_exists_play = ContestPlay.objects.filter(contest_user=user.id)

	if contest_final_id.contest_status == "upcoming":
		res_data = {"status_code": 400, "status": "warning",
					"message": _("You cannot participate because contest isn't start")}
		return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
	elif contest_final_id.contest_status == "completed":
		res_data = {"status_code": 400, "status": "warning", "message": _("Contest is over. You cannot participate")}
		return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
	else:
		for x in user_exists_play:
			if x.contest_id.id == int(contest_id) and x.contest_user.id == user.id:
				res_data = {"status_code": 400, "status": "warning", "message": _("You've already participated")}
				return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
		update_data = ContestPlay.objects.create(contest_id=contest_final_id, contest_user=user, contest_played=True)
		res_data = {"status_code": 200, "status": "success", "message": _("Successfully participated")}
		return Response(data=res_data, status=status.HTTP_200_OK)


@api_view(["GET"])
def one_contest(request, id):
	res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
	print('request langugae : ', res_lan)

	if res_lan == "es":
		activate('es')
		pass

	token = request.GET.get('access_token', '')
	if token == '':
		res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Request"), "data": {}}
		return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

	try:
		user, token_list = validations.get_user_obj(token)
	except Exception as e:
		print(e)
		res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
		return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

	contestObj = Contest.objects.filter(id=id)
	contest_serializers = ContestEachSerializer(contestObj, many=True, context={"user_Id": user.id})
	res_data = {"status_code": 200, "status": "success", "message": _("Contest Each List"),
				"data": contest_serializers.data}
	return Response(data=res_data, status=status.HTTP_200_OK)

@api_view(["GET"])
def contest_user(request,contest_id):
	res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
	print('request langugae : ', res_lan)

	if res_lan == "es":
		activate('es')
		pass

	token = request.GET.get('access_token', '')
	if token == '':
		res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Request"), "data": {}}
		return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
	try:
		user, token_list = validations.get_user_obj(token)
	except Exception as e:
		print(e)
		res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
		return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
	contesuser = ContestPlay.objects.filter(contest_id=contest_id)
	contest_user_serializers = ContestPlayUserSerializer(contesuser,many=True)
	res_data = {"status_code": 200, "status": "success", "message": _("Contest User List"), "data": contest_user_serializers.data}
	return Response(data=res_data, status=status.HTTP_200_OK)


@api_view(["GET"])
def contest_user_board(request,contest_id):
	res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
	print('request langugae : ', res_lan)

	if res_lan == "es":
		activate('es')
		pass

	token = request.GET.get('access_token', '')
	if token == '':
		res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Request"), "data": {}}
		return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

	try:
		user, token_list = validations.get_user_obj(token)
	except Exception as e:
		print(e)
		res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
		return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

	try:
		contestuser = ContestPlay.objects.filter(contest_id=contest_id)
		# print("contest_user===>",contestuser.contest_id.contest_status)
		seen_titles = set()
		final_result = []
		for each_contest in contestuser:
			print("each_contest==>",each_contest)
			print("contest_user===>",each_contest.contest_id.contest_status)
			if each_contest.contest_played == True:

				contest_start = each_contest.contest_id.contest_startdate
				contest_startdata = contest_start.strftime("%Y-%m-%d %H:%M:%S")
				contest_startmodify = datetime.strptime(contest_startdata, '%Y-%m-%d %H:%M:%S')
				
				contest_end = each_contest.contest_id.contest_enddate
				contest_enddata = contest_end.strftime("%Y-%m-%d %H:%M:%S")
				contest_endmodify = datetime.strptime(contest_enddata, '%Y-%m-%d %H:%M:%S')

				rewards = UserRewards.objects.filter(user_id=each_contest.contest_user.id).filter(qr_status="Completed")
				user_point = 0
				winner_user = {}

				if list(rewards) == []:
					winner_user['userId'] = each_contest.contest_user.id
					winner_user['contest_points'] = each_contest.contest_id.contest_point
					winner_user['full_name'] = each_contest.contest_user.full_name
					winner_user['image'] = each_contest.contest_user.image.url
					winner_user['points'] = 0

					final_result.append(winner_user)

				for reward_data in rewards:
					qr_createddate = reward_data.created_at.strftime("%Y-%m-%d %H:%M:%S")
					qr_modifydate = datetime.strptime(qr_createddate, '%Y-%m-%d %H:%M:%S')

					if qr_modifydate > contest_startmodify and qr_modifydate < contest_endmodify:
						user_id_batch = reward_data.user_id
						winner_user['userId'] = reward_data.user_id.id
						winner_user['contest_points'] = each_contest.contest_id.contest_point
						winner_user['full_name'] = reward_data.user_id.full_name
						winner_user['image'] = reward_data.user_id.image.url
						user_point += reward_data.reward_points
						print("user_point===>",user_point)
						winner_user['points'] = user_point
					else:
						print("not in")
					final_result.append(winner_user)
		seen = set()
		new_list = []

		print("final_result : ", final_result)

		for fdata in final_result:
		    tupledata = tuple(fdata.items())
		    if tupledata not in seen:
		        seen.add(tupledata)
		        new_list.append(fdata)
		print("winner_user====>",winner_user)

		contest_winner = sorted(new_list, key=lambda new_list: new_list['points'], reverse=True)
		print("contest winner====>",contest_winner)

		max_newone =max(new_list, key=lambda new_list: new_list['points'])
		print("max_newone====>",max_newone)

		contestuser = ContestPlay.objects.filter(contest_id=contest_id)
		for in_contest in contestuser:
			data_contest_play = Contest.objects.filter(id=in_contest.contest_id.id).update(contest_result_generated=True)
			if in_contest.contest_id.contest_result_generated == False:
				data_user = User.objects.filter(id=max_newone['userId'])
				for user_point in data_user:
					user_point.points += int(each_contest.contest_id.contest_point)
					user_point.save()
					fcm_list = []
					devices = user_point.device
					for device_fcm in devices:
						fcm_list.append(device_fcm.device_fcm_token)
					gcm_reg_id = fcm_list[-1]
					fcm_device = GCMDevice.objects.create(registration_id=gcm_reg_id, cloud_message_type="FCM")
					data = fcm_device.send_message("Congratulations, you won the {} contest".format(in_contest.contest_id.contest_name))
					msg = f"Congratulations,based on your great performance in the {in_contest.contest_id.contest_name} contest You have won the {each_contest.contest_id.contest_point} amount of points."
					Notification.objects.create(user_id=user_point, notification_msg=msg, points=each_contest.contest_id.contest_point)
		return JsonResponse({"Final_Winner":contest_winner[0],"status":200},safe=False)

	except Exception as e:
		print("error==>",e)
		return JsonResponse({"success": "[]","status":200},safe=False)


@api_view(["GET"])
def contest_user_board_admin(request,contest_id):
	token = request.GET.get('access_token', '')
	if token == '':
		res_data = {"status_code": 401, "status": "fail", "message": "Invalid token", "data": {}}
		return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
	try:
		user, token_list = validations.get_user_obj(token)
	except Exception as e:
		print(e)
		res_data = {"status_code": 401, "status": "fail", "message": "Invalid access token", "data": {}}
		return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

	try:
		contestuser = ContestPlay.objects.filter(contest_id=contest_id)
		seen_titles = set()
		final_result = []
		for each_contest in contestuser:
			if each_contest.contest_played == True:
				contest_start = each_contest.contest_id.contest_startdate
				contest_startdata = contest_start.strftime("%Y-%m-%d %H:%M:%S")
				contest_startmodify = datetime.strptime(contest_startdata, '%Y-%m-%d %H:%M:%S')

				contest_end = each_contest.contest_id.contest_enddate
				contest_enddata = contest_end.strftime("%Y-%m-%d %H:%M:%S")
				contest_endmodify = datetime.strptime(contest_enddata, '%Y-%m-%d %H:%M:%S')

				rewards = UserRewards.objects.filter(user_id=each_contest.contest_user.id).filter(qr_status="Completed").filter(updated_at__range=(contest_start, contest_end))
				user_point = 0
				winner_user = {}
				if list(rewards) == []:
					winner_user['userId'] = each_contest.contest_user.id
					winner_user['contest_points'] = each_contest.contest_id.contest_point
					winner_user['full_name'] = each_contest.contest_user.full_name
					winner_user['image'] = each_contest.contest_user.image.url
					winner_user['email'] = each_contest.contest_user.email
					winner_user['company'] = each_contest.contest_user.company_name
					winner_user['available_points'] = each_contest.contest_user.points
					winner_user['points'] = 0

					final_result.append(winner_user)

				for reward_data in rewards:
					qr_createddate = reward_data.created_at.strftime("%Y-%m-%d %H:%M:%S")
					qr_modifydate = datetime.strptime(qr_createddate, '%Y-%m-%d %H:%M:%S')
					if qr_modifydate > contest_startmodify and qr_modifydate < contest_endmodify:
						user_id_batch = reward_data.user_id
						winner_user['userId'] = reward_data.user_id.id
						winner_user['contest_points'] = each_contest.contest_id.contest_point
						winner_user['full_name'] = reward_data.user_id.full_name
						winner_user['image'] = reward_data.user_id.image.url
						winner_user['email'] = reward_data.user_id.email
						winner_user['company'] = reward_data.user_id.company_name
						winner_user['available_points'] = reward_data.user_id.points
						user_point += reward_data.reward_points
						winner_user['points'] = user_point
					else:
						print("not in")
					final_result.append(winner_user)
				seen = set()
				new_list = []
				for fdata in final_result:
				    tupledata = tuple(fdata.items())
				    if tupledata not in seen:
				        seen.add(tupledata)
				        new_list.append(fdata)
		contest_winner = sorted(new_list, key=lambda each_contest: each_contest['points'], reverse=True)
		max_newone = max(new_list, key=lambda each_contest: each_contest['points'])
		return JsonResponse({"Final_Winner":contest_winner,"status":200},safe=False)

	except Exception as e:
		return JsonResponse({"success":"[]","status":200},safe=False)