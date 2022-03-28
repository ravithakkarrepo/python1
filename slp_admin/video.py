import os
import sys
import subprocess

from PIL import Image
from io import BytesIO

from django.core.files.uploadedfile import InMemoryUploadedFile
from django.shortcuts import render, redirect
from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response

from slp.models import *
import boto3
from AllFoamTech.settings import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_STORAGE_BUCKET_NAME
from django.core.files.storage import default_storage
from ffmpy import FFmpeg
def video_table(request):
	try:
		is_admin = True
		is_merchant = False
		id = request.session['aid']
		a = Admin.objects.filter(id=id).get()
		name = a.full_name
		name = name.capitalize()
		obj = Video.objects.all().filter(is_deleted=False)
		return render(request,"videos.html",{"is_admin":True,"obj":obj,"video_class":True,"name":name})
	except Exception as e:
		print('Exception in video',e)
		return redirect('login_error')
		
def video_add_table(request):
	try:
		is_admin = True
		is_merchant = False
		id = request.session['aid']
		a = Admin.objects.filter(id=id).get()
		name = a.full_name
		name = name.capitalize()
		obj = Category.objects.all().filter(is_deleted=False)
		return render(request,"add-video.html",{"is_admin":True,"obj":obj,"video_class":True,"name":name})
	except Exception as e:
		print('Exception in video',e)
		return redirect('login_error')

def add_new_video(request):
	try:
		is_admin = True
		is_merchant = False
		my_title = False
		video_added = False
		if request.method == "POST":
			id = request.session['aid']
			a = Admin.objects.filter(id=id).get()
			name = a.full_name
			name = name.capitalize()

			category = request.POST.get("category")
			title = request.POST.get("title").strip()
			# title = title.lower()
			print('title yha aaega',title)
			video = request.FILES.get("video")
			discription = request.POST.get("discription")
			if Video.objects.filter(category = category,video_name__iexact = title).exists():
				my_title = True
				video_added = False
			else:
				data = Video.objects.create(category=category, upload_video=video, video_name=title, video_desc=discription)
				video_added = True
				my_title = False
				try:
					video_url = data.upload_video.url
					print("video_url : ", video_url)
					video_name = str(data.upload_video)[13:-4]
					print("video_name : ", video_name)

					from ffmpy import FFmpeg
					ff = FFmpeg(inputs={video_url: None}, outputs={"./slp/media/{0}.png".format(video_name): ['-ss', '00:00:00', '-vframes', '1']})
					ff.run()

					imageTemproary = Image.open('./slp/media/{0}.png'.format(video_name))
					outputIoStream = BytesIO()
					imageTemproary.save(outputIoStream, format="png")
					outputIoStream.seek(0)
					uploadedImage = InMemoryUploadedFile(outputIoStream, 'ImageField', "%s.png" % video_name,
															'image/png', sys.getsizeof(outputIoStream), None)

					print("imageTemproary : ", uploadedImage)
					data.video_thumbnail = uploadedImage
					data.save()

					os.remove('./slp/media/{0}.png'.format(video_name))

					video_length = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of',
												   'default=noprint_wrappers=1:nokey=1', video_url],
												  stdout=subprocess.PIPE,
												  stderr=subprocess.STDOUT)

					video_length_in_seconds = float(video_length.stdout)

					data.video_length = video_length_in_seconds
					data.save()

					print("data.video_thumbnail.url : ", data.video_thumbnail.url)
				except Exception as e:
					print("Exception in creating video thumbnail : ", e)

		obj = Category.objects.all()
		return render(request, "add-video.html", {"is_admin": True, "obj": obj, "video_class": True, "name": name, "video_added": video_added,"my_title":my_title})

	except Exception as e:
		print('Exception in video',e)
		return redirect('login_error')

			# data_obj = Video.objects.all()
			# print('data obj',data_obj)
			# print('data obj',data_obj)

			# for data_sub_obj in data_obj:
			# 	print('inside for',data_sub_obj.id)
			# 	# cate = data_sub_obj.category.strip()
			# 	# cate = cate.lower()
			# 	data_sub_obj1 = data_sub_obj.category
			# 	print('data_sub_obj with id',data_sub_obj1)
			# 	video_strip = data_sub_obj.video_name.strip()
			# 	print('video_strip id with name',video_strip,'name only',data_sub_obj.video_name)
			# 	video_lower = video_strip.lower()
			# 	# if cate==category:
			# 		# print(title.lower())
			# 	Video.objects.filter(category__iexact = data_sub_obj.category, video_name__iexact = data_sub_obj.video_name.strip()).exists()	
			# 	# if data_sub_obj1 and video_lower == title.lower():
			# 	# 	print('inside if',title.lower(),data_sub_obj1,video_lower)
			# obj = Category.objects.all()
		# return render(request,"add-video.html",{"is_admin":True,"video_class":True,"name":name,"my_title":my_title,"video_success":video_success})
			# ff = FFmpeg(inputs={video: None}, outputs={"output.png": ['-ss', '00:00:4', '-vframes', '1']})
			# print("ffff=====>",ff)
			# ff.run()
		
		# return redirect("video_table")
		# else:
		# return HttpResponse("oops somethinsg wrong")	
			

		

	

def del_video(request,id):
	try:
		is_admin = True
		is_merchant = False
		del_obj = Video.objects.get(id=id)
		print('11111',del_obj,del_obj.id)
		del_obj_id = del_obj.id
		session = boto3.Session( aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY, )
		s3 = session.resource("s3")
		obj = s3.Object(AWS_STORAGE_BUCKET_NAME, "media/" + str(del_obj.upload_video)).delete()
		obj = s3.Object(AWS_STORAGE_BUCKET_NAME, "media/" + str(del_obj.video_thumbnail)).delete()
		quiz_id_filter = Quiz.objects.filter(videoId=del_obj_id)
		if quiz_id_filter.exists():
			quiz_id_filter.filter()
			del_obj.delete()
		else:
			del_obj.delete()
		return redirect("video_table")
	except Exception as e:
		print('Exception in video',e)
		return redirect('login_error')

def edit_video_page(request,id):
	try:
		is_admin = True
		is_merchant = False
		edit_obj = Video.objects.get(id=id)
		obj = Category.objects.all().filter(is_deleted=False)
		id = request.session['aid']
		a = Admin.objects.filter(id=id).get()
		name = a.full_name
		name = name.capitalize()
		return render(request,"edit_video.html",{"is_admin":True,"edit_obj":edit_obj,"obj":obj,"video_class":True,"name":name})
	except Exception as e:
		print('Exception in video',e)
		return redirect('login_error')
def update_video_page(request, id):
	try:
		is_admin = True
		is_merchant = False

		aid = request.session['aid']
		a = Admin.objects.filter(id=aid).get()
		name = a.full_name
		name = name.capitalize()
		print("above video get")

		video_data = Video.objects.get(id=id)
		print("after video get")

		categories = Category.objects.all().filter(is_deleted=False)
		if request.method == "POST":
			category = request.POST.get("category")
			title = request.POST.get("title")
			video = request.FILES.get("video")
			video_asda = request.FILES.get("video_asda")
			discription = request.POST.get("discription")
			vid = Video.objects.get(id=video_data.id)
			vid.category = category
			vid.video_name = title
			vid.video_desc = discription
			print("above video if condition")
			if video is not None:
				session = boto3.Session( aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY, )
				s3 = session.resource("s3")
				obj = s3.Object(AWS_STORAGE_BUCKET_NAME, "media/" + str(vid.upload_video)).delete()
				obj = s3.Object(AWS_STORAGE_BUCKET_NAME, "media/" + str(vid.video_thumbnail)).delete()
				vid.upload_video = video

			vid.save()
			print("above video 2nd if condition")

			if video is not None:
				try:
					video_url = vid.upload_video.url
					print("video_url : ", video_url)
					video_name = str(vid.upload_video)[13:-4]
					print("video_name : ", video_name)

					from ffmpy import FFmpeg
					ff = FFmpeg(inputs={video_url: None},
								outputs={
									"./slp/media/{0}.png".format(video_name): ['-ss', '00:00:00', '-vframes', '1']})
					ff.run()

					imageTemproary = Image.open('./slp/media/{0}.png'.format(video_name))
					outputIoStream = BytesIO()
					imageTemproary.save(outputIoStream, format="png")
					outputIoStream.seek(0)
					uploadedImage = InMemoryUploadedFile(outputIoStream, 'ImageField', "%s.png" % video_name,
														 'image/png', sys.getsizeof(outputIoStream), None)

					print("imageTemproary : ", uploadedImage)
					vid.video_thumbnail = uploadedImage
					vid.save()

					os.remove('./slp/media/{0}.png'.format(video_name))

					video_length = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of',
												   'default=noprint_wrappers=1:nokey=1', video_url],
												  stdout=subprocess.PIPE,
												  stderr=subprocess.STDOUT)

					video_length_in_seconds = float(video_length.stdout)

					vid.video_length = video_length_in_seconds
					vid.save()

					print("data.video_thumbnail.url : ", vid.video_thumbnail.url)
				except Exception as e:
					print("Exception in creating video thumbnail : ", e)

			print("before remder")
			return render(request, "edit_video.html",
						  {"is_admin": True, "edit_obj": video_data, "obj": categories, "video_class": True,
						   "name": name, "video_updated": True})

		else:
			return render(request,"edit_video.html",{"video_data":video_data,"video_class":True})
	except Exception as e:
		print('Exception in video',e)
		return redirect('login_error')

def setting_admin(request):
	try:
		is_admin = True
		is_merchant = False  
		id = request.session['aid']
		a = Admin.objects.filter(id=id).get()
		name = a.full_name
		name = name.capitalize()
		points = AdminSettings.objects.last()
		usd_value = points.no_of_points_to_usd
		pointsvalue = points.user_referral_points
		eligibility_points = points.user_eligibility_points
		contractor_panel_no_of_points_to_one_usd = points.contractor_panel_no_of_points_to_one_usd
		support_request_points = points.support_request_points

		rec_temp = 0
		return render(request,"settings.html",{"is_admin":True,"usd_value":usd_value,"pointsvalue":pointsvalue,
											   "eligibility_points":eligibility_points,'settings_class':True,
											   "name":name, "rec_temp": rec_temp, "support_request_points": support_request_points,
											   "contractor_panel_no_of_points_to_one_usd": contractor_panel_no_of_points_to_one_usd})
	except Exception as e:
		print('Exception in video',e)
		return redirect('login_error')


def setting_dollar(request):
	try:
		is_admin = True
		is_merchant = False
		if request.method=="POST":
			usdvalue = request.POST.get("usdvalue")
			AdminSettings.objects.filter(id=1).update(no_of_points_to_usd=usdvalue)

			admin = Admin.objects.get(id=1)
			admin.settings = AdminSettings.objects.get(id=1)
			admin.save()

			id = request.session['aid']
			a = Admin.objects.filter(id=id).get()
			name = a.full_name
			name = name.capitalize()
			points = AdminSettings.objects.last()
			usd_value = points.no_of_points_to_usd
			pointsvalue = points.user_referral_points
			eligibility_points = points.user_eligibility_points
			contractor_panel_no_of_points_to_one_usd = points.contractor_panel_no_of_points_to_one_usd
			support_request_points = points.support_request_points

			return render(request, "settings.html",
						  {"is_admin": True, "usd_value": usd_value, "pointsvalue": pointsvalue,
						   "eligibility_points": eligibility_points, 'settings_class': True, "name": name,
						   "dollar_updated": True, "support_request_points": support_request_points,
						   "contractor_panel_no_of_points_to_one_usd": contractor_panel_no_of_points_to_one_usd})

			# return redirect("settings_admin")
	except Exception as e:
		print('Exception in video',e)
		return redirect('login_error')


def settings_bonus(request):
	try:
		is_admin = True
		is_merchant = False
		if request.method=="POST":
			bonusValue = request.POST.get("bonuspoints")
			AdminSettings.objects.filter(id=1).update(user_referral_points=bonusValue)

			admin = Admin.objects.get(id=1)
			admin.settings = AdminSettings.objects.get(id=1)
			admin.save()

			id = request.session['aid']
			a = Admin.objects.filter(id=id).get()
			name = a.full_name
			name = name.capitalize()
			points = AdminSettings.objects.last()
			usd_value = points.no_of_points_to_usd
			pointsvalue = points.user_referral_points
			eligibility_points = points.user_eligibility_points
			contractor_panel_no_of_points_to_one_usd = points.contractor_panel_no_of_points_to_one_usd
			support_request_points = points.support_request_points

			return render(request, "settings.html",
						  {"is_admin": True, "usd_value": usd_value, "pointsvalue": pointsvalue,
						   "eligibility_points": eligibility_points, 'settings_class': True, "name": name,
						   "bonus_updated": True, "support_request_points": support_request_points,
						   "contractor_panel_no_of_points_to_one_usd": contractor_panel_no_of_points_to_one_usd})

			# return redirect("settings_admin")
	except Exception as e:
		print('Exception in video',e)
		return redirect('login_error')


def settings_eligibilty_points(request):
	try:
		is_admin = True
		is_merchant = False
		if request.method == "POST":
			eligibility_points = request.POST.get("Eligibilitypoints")
			AdminSettings.objects.filter(id=1).update(user_eligibility_points=eligibility_points)

			admin = Admin.objects.get(id=1)
			admin.settings = AdminSettings.objects.get(id=1)
			admin.save()

			id = request.session['aid']
			a = Admin.objects.filter(id=id).get()
			name = a.full_name
			name = name.capitalize()
			points = AdminSettings.objects.last()
			usd_value = points.no_of_points_to_usd
			pointsvalue = points.user_referral_points
			eligibility_points = points.user_eligibility_points
			contractor_panel_no_of_points_to_one_usd = points.contractor_panel_no_of_points_to_one_usd
			support_request_points = points.support_request_points

			return render(request, "settings.html",
						  {"is_admin": True, "usd_value": usd_value, "pointsvalue": pointsvalue,
						   "eligibility_points": eligibility_points, 'settings_class': True, "name": name,
						   "eligibility_updated": True, "support_request_points": support_request_points,
						   "contractor_panel_no_of_points_to_one_usd": contractor_panel_no_of_points_to_one_usd})

			# return redirect("settings_admin")
	except Exception as e:
		print('Exception in video',e)
		return redirect('login_error')


def contractor_panel_points_to_1_dollar(request):
	try:
		is_admin = True
		is_merchant = False

		if request.method == "POST":
			usdvalue = request.POST.get("usdvalue")
			AdminSettings.objects.filter(id=1).update(contractor_panel_no_of_points_to_one_usd=usdvalue)

			admin = Admin.objects.get(id=1)
			admin.settings = AdminSettings.objects.get(id=1)
			admin.save()

			id = request.session['aid']
			a = Admin.objects.filter(id=id).get()
			name = a.full_name
			name = name.capitalize()

			points = AdminSettings.objects.last()
			usd_value = points.no_of_points_to_usd
			pointsvalue = points.user_referral_points
			eligibility_points = points.user_eligibility_points
			contractor_panel_no_of_points_to_one_usd = points.contractor_panel_no_of_points_to_one_usd
			support_request_points = points.support_request_points

			return render(request, "settings.html",
						  {"is_admin": True, "usd_value": usd_value, "pointsvalue": pointsvalue,
						   "eligibility_points": eligibility_points, "support_request_points": support_request_points,
						   "contractor_panel_no_of_points_to_one_usd": contractor_panel_no_of_points_to_one_usd,
						   'settings_class': True, "name": name, "contractor_points_updated": True})

			# return redirect("settings_admin")
	except Exception as e:
		print('Exception in contractor_panel_points_to_1_dollar ', e)
		return redirect('login_error')


def support_point(request):
	try:
		is_admin = True
		is_merchant = False
		if request.method == "POST":
			support_point = request.POST.get("support_point")
			AdminSettings.objects.filter(id=1).update(support_request_points=support_point)

			admin = Admin.objects.get(id=1)
			admin.settings = AdminSettings.objects.get(id=1)
			admin.save()

			id = request.session['aid']
			a = Admin.objects.filter(id=id).get()
			name = a.full_name
			name = name.capitalize()
			points = AdminSettings.objects.last()
			usd_value = points.no_of_points_to_usd
			pointsvalue = points.user_referral_points
			eligibility_points = points.user_eligibility_points
			contractor_panel_no_of_points_to_one_usd = points.contractor_panel_no_of_points_to_one_usd
			support_request_points = points.support_request_points

			return render(request, "settings.html",
						  {"is_admin": True, "usd_value": usd_value, "pointsvalue": pointsvalue,
						   "eligibility_points": eligibility_points, 'settings_class': True, "name": name,
						   "support_points_updated": True, "support_request_points": support_request_points,
						   "contractor_panel_no_of_points_to_one_usd": contractor_panel_no_of_points_to_one_usd})

			# return redirect("settings_admin")
	except Exception as e:
		print('Exception in video',e)
		return redirect('login_error')