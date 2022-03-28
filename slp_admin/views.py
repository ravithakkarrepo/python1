import copy
import os

from django.contrib.sites.shortcuts import get_current_site
from django.shortcuts import render, redirect
from django.http import HttpResponse
from rest_framework.views import APIView
from pymongo import MongoClient
import time
import pymongo
import datetime
from pymsgbox import *
from slp.models import *
from django.core import mail
from django.utils.html import strip_tags
from django.template.loader import render_to_string
from django import template
from bson.objectid import ObjectId
from AllFoamTech import settings
import hashlib
from jake import get_base64_hashed
from jake import give_back_hashed

import random
import string
from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from slp import models

from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
from push_notifications.models import APNSDevice, GCMDevice
from rest_framework.decorators import api_view
from userapi.validations import define_html_paragraph

register = template.Library()
mongoClient = pymongo.MongoClient('mongodb://localhost:27017/')
db = mongoClient['all_foam_tech']
merchant_collection = db['slp_merchant']
admin_collection = db['slp_admin']
product_collection = db['slp_product']
batch_collection = db['slp_batch']
video_collection = db['slp_video']
user_collection = db['slp_user']
address_collection = db['slp_address']
banner_collection = db['slp_banner']
question_collection = db['slp_question']
quiz_collection = db['slp_quiz']
bannercopy_collection = db['slp_bannercopy']

logout = 'false'
def login_error(request):
	session_expire = True
	if 'aid' in request.session:
		return redirect('dashboard')
	else:
		email, password, remember_me = '', '', ''
		if 'email' in request.session:
			email = request.session['email']
		if 'password' in request.session:
			password = request.session['password']
		if 'remember_me' in request.session:
			remember_me = request.session['remember_me']
		admin_login = True
	return render(request,'admin-login.html',{'session_expire':session_expire,'remember_me_on':remember_me,'admin_login':admin_login,'password':password,'email':email})


class Login_page(APIView):
	def get(self,request):
		try:
			if 'aid' in request.session:
				return redirect('dashboard')
			else:
				email = ''
				password = ''
				remember_me = ''
				if 'email' in request.session:
					email = request.session['email']
				if 'password' in request.session:
					password = request.session['password']
				if 'remember_me' in request.session:
					remember_me = request.session['remember_me']
				admin_login = True
				logout = True
			return render(request,'admin-login.html',{'remember_me_on':remember_me,'admin_login':admin_login,'password':password,'email':email,'logout':logout})
		except Exception as e:
			return HttpResponse(status=404)

	def post(self,request):
		is_admin = False
		is_merchant = False
		try:
			error = False
			remember_me = ''
			data = request.data
			email = data['email']
			password = data['password']
			if 'remember_me' in data:
				remember_me = data['remember_me']
			else:
				if 'remember_me' in request.session:
					del request.session['remember_me']
					del request.session['email']
					del request.session['password']
			all_admin = Admin.objects.all()
			login_query = Admin.objects.filter(email=email, password=password).exists()
			if remember_me == 'on':
				request.session['email'] = email
				request.session['password'] = password
				request.session['remember_me'] = True
			if login_query:
				is_admin = True
				a = Admin.objects.filter(email=email).get()
				name = a.full_name
				name = name.capitalize()
				request.session['aid'] = a.id
				count_user, count_merchant, count_product, count_video, count_banner  = get_user_merchant()
				a_dashboard_class = True
				return redirect('dashboard')

			else:
				error = True
				admin_login = True
				return render(request,'admin-login.html',{'password':password,'email':email,'remember_me_on':remember_me,'error':error,'admin_login':admin_login})		
			admin_login = True
			return render(request,'admin-login.html',{'password':password,'email':email,'remember_me_on':remember_me,'admin_login':admin_login})		
		except Exception as e:
			return HttpResponse(status=404)

def logout(request):
	try:
		admin_login = True
		del request.session['aid']
		return redirect('login_page')
	except Exception as e:
		return redirect('login_error')

def get_user_merchant():
	obj_user = User.objects.all()
	obj_merchant = Merchant.objects.all()
	obj_product = Product.objects.filter(is_deleted=False).all()
	obj_video = Video.objects.all()
	obj_banner = Banner.objects.all().filter(is_deleted=False)

	count_user = obj_user.count()
	count_merchant = obj_merchant.count()
	count_product = obj_product.count()
	count_video = obj_video.count()
	count_banner = obj_banner.count()
	return count_user, count_merchant, count_product, count_video, count_banner

def dashboard(request):
	if logout != 'true':
		try:
			id = request.session['aid']
		except Exception as e:
			return redirect('login_page')
		a = Admin.objects.filter(id=id).get()
		full_name = a.full_name
		name = full_name.capitalize()

		is_admin = True
		is_merchant = False
		count_user, count_merchant, count_product, count_video, count_banner  = get_user_merchant()
		a_dashboard_class = True
		return render(request, "Dashboard.html",{'a_dashboard_class':a_dashboard_class,'count_user':count_user,'count_merchant':count_merchant,'count_product':count_product,'count_video':count_video, 'count_banner':count_banner, "is_admin":is_admin,'is_merchant':is_merchant,'name':name})
	else:
		return redirect('login_error')

def user_list(request):
	try:
		is_admin = True
		is_merchant = False
		data = user_collection.find()
		id = request.session['aid']
		a = Admin.objects.filter(id=id).get()
		full_name = a.full_name
		name = full_name.capitalize()
		company_namelist = []
		full_namelist = []
		emaillist = []
		is_blockedlist = []
		user_idlist = []
		for k in data:
			u_full_name = k['full_name']
			full_namelist.append(u_full_name)
			email = k['email']
			emaillist.append(email)
			company_name = k['company_name']
			company_namelist.append(company_name)
			is_blocked = k['is_blocked']
			is_blockedlist.append(is_blocked)
			user_id = k['id']
			user_idlist.append(user_id)
		comb = zip(full_namelist,emaillist,company_namelist,is_blockedlist,user_idlist)
		user_class = True	
		return render(request, 'user-list.html',{'user_class':user_class,"data":comb,"is_admin":is_admin,'is_merchant':is_merchant,'name':name})	
	except Exception as e:
		return redirect('login_error')

def view_list(request,user_id):
	try:
		u_id = user_id

		is_admin = True
		is_merchant = False
		dispute_status = ''
		split = ''
		task_details = ''
		id = request.session['aid']
		a = Admin.objects.filter(id=id).get()
		name = a.full_name
		name = name.capitalize()

		details = User.objects.filter(id=int(u_id)).get()
		userdata_id = details.id
		full_name = details.full_name
		split_name = full_name.split(' ')
		first_name = split_name[0]
		last_name = split_name[1]
		img = details.img_thumbnail
		email = details.email
		company_name = details.company_name.lower()
		phone = details.phone
		points = details.points
		referred_by = details.referred_by
		print('email----',details.email_verification_token,details.email_verification)

		id_exists = User.objects.filter(id=referred_by).exists()
		referred = ''
		if referred_by is None:
			referred = "None"
		else:
			referred = User.objects.filter(id=referred_by).get()
			referred = referred.full_name
		referral_code = details.referral_code
		is_blocked = details.is_blocked
		points = details.points
		add_line1 = details.address.add_line1
		add_line2 = details.address.add_line2
		city = details.address.city
		state = details.address.state
		zip_code = details.address.zip_code
		country = details.address.country
		rewardss = UserRewards.objects.all().count()

		ur = UserRewards.objects.all()	
		referred_by_query =UserRewards.objects.filter(user_id_id=u_id).exists()
		created_at_list = []
		reward_points_list = []
		is_splitted_list = []
		reward_type_list = []
		qr_code_id_list = []
		points_type_list = []
		admin_reason_list = []

		if referred_by_query:
			from userapi import serializers

			queryset = models.UserRewards.objects.all().filter(user_id_id=u_id, originally_scanned=True, qr_status="Completed")
			serializer = serializers.ScannedQRSerializer(queryset, many=True)

			print('11111111111',serializer.data)  
			id = request.session['aid']
			a = models.Admin.objects.filter(id=id).get()
			full_name = a.full_name
			name = full_name.capitalize()
			print('name capitalize==============', name)
			data = serializer.data
			ls = [dict(x) for x in data]
			print(ls)
			for x in ls:
				ans = dict(x.get("user_id"))
				x['user_id'] = ans
				ans = dict(x.get("qr_code"))
				x['qr_code'] = ans

				qr = x["qr_code"]["qr_image"]
				fdir, fname = os.path.split(qr)
				ff = fname.split('.')
				x["qr_code"]["qr_image"] = ff[0]



			referred_by_data = UserRewards.objects.filter(user_id_id=u_id).all()
			for data in referred_by_data:
				created_at = data.created_at
				created_at_list.append(created_at)
				reward_points = data.reward_points
				reward_points_list.append(reward_points)
				is_splitted = data.is_splitted
				is_splitted_list.append(is_splitted)

				reward_type = data.reward_type
				reward_type_list.append(reward_type)

				qr_code_id = data.qr_code_id
				qr_code_id_list.append(qr_code_id)

				points_type = data.points_type
				points_type_list.append(points_type)
				admin_reason = data.admin_reason
				admin_reason_list.append(admin_reason)
			comb = zip(created_at_list,reward_points_list,is_splitted_list,reward_type_list,qr_code_id_list,points_type_list,admin_reason_list)
		else:
			created_at_list = ''
			reward_points_list = ''
			is_splitted_list = ''
			reward_type_list = ''
			qr_code_id_list = ''
			points_type_list = ''
			admin_reason_list = ''
			comb = ''
		user_class = True	
		from userapi import validations
		lifetime_points = validations.user_lifetime_points(details)


		if Task.objects.filter(assigned_user=u_id).exists():
			task_details = Task.objects.filter(assigned_user=u_id)
		else:
			task_details = ''		

		context = {
			'first_name':first_name,
			'last_name':last_name,
			'name':name,
			'email' : email,
			'phone' : phone,
			"image": img,
			'company_name':company_name,
			'available_points':points,
			'lifetime_earned_points': lifetime_points,
			'referred':referred,
			'referral_code':referral_code,
			'is_admin':is_admin,
			'is_merchant':is_merchant,
			'add_line1':add_line1,
			'add_line2':add_line2,
			'city':city,
			'state':state,
			'country':country,
			'zip_code':zip_code,
			'is_blocked': is_blocked,
			'user_id':user_id,
			'points':points,
			'user_class':user_class,
			'comb':comb,
			'task_details':task_details,
			"data": ls,
		} 			
		return render(request, 'view_list.html',context)
	except Exception as e:
		return redirect('login_error')

def Reward_Points_Management(request,user_id):
	try:
		user = User.objects.get(id=user_id)
		mean = user.device
		fcm_list=[]
		for my_fcm in mean:
			fcm_list.append(my_fcm.device_fcm_token)
		gcm_reg_id = fcm_list[-1]
		points_reward_greater = False
		if request.method == 'POST':
			add_remove = request.POST.get('exampleRadios')
			available_point = request.POST.get('available_point')
			available_point = int(available_point)
			points_reward = request.POST.get('points_reward')
			points_reward = int(points_reward)
			admin_reason = request.POST.get('admin_reason')

			if add_remove == 'add':
				fcm_device = GCMDevice.objects.create(registration_id=gcm_reg_id, cloud_message_type="FCM")
				data = fcm_device.send_message(f"{points_reward} Points credited by Admin")
				final_point = available_point + points_reward
				UserRewards.objects.create(user_id_id=user_id,reward_points=points_reward,admin_reason=admin_reason, reward_name="Dispute Points", reward_type="Dispute Points", points_type="Credit", dispute_status="Resolved")
				not_msg = f"Congratulations, {points_reward} points has been successfully credited into your account for {admin_reason}"
				models.Notification.objects.create(user_id_id=user_id, points=points_reward, notification_msg=not_msg)

			elif add_remove == 'remove':
				fcm_device = GCMDevice.objects.create(registration_id=gcm_reg_id, cloud_message_type="FCM")
				data = fcm_device.send_message(f"{points_reward} Points debited by Admin")
				final_point = available_point - points_reward
				UserRewards.objects.create(user_id_id=user_id,reward_points=points_reward,admin_reason=admin_reason, reward_name="Dispute Points", reward_type="Dispute Points", points_type="Debit", dispute_status="Resolved")
				not_msg = f"Congratulations, {points_reward} points has been debited from your account for {admin_reason}"
				models.Notification.objects.create(user_id_id=user_id, points=points_reward, notification_msg=not_msg)

			User.objects.filter(id=user_id).update(points=final_point)
			return redirect('view_list',user_id=user_id)	


		return redirect('view_list',user_id=user_id)	



	except Exception as e:
		return redirect('login_error')



def ublock(request,user_id):
	details = User.objects.filter(id=user_id).get()
	is_blocked = details.is_blocked
	if is_blocked:
		User.objects.filter(id=user_id).update(is_blocked=False)
	else:	
		User.objects.filter(id=user_id).update(is_blocked=True)
	return redirect('user_list')

def merchant_list(request):
	try:
		is_admin = True
		is_merchant = False
		m_idlist = []
		full_namelist = []
		emaillist = []
		phonelist = []
		obj_product_list = []
		is_blockedlist = []
		id = request.session['aid']
		a_values = Admin.objects.filter(id=id).get()
		full_name = a_values.full_name
		name = full_name.capitalize()

		query = {"is_deleted" : False}
		values = merchant_collection.find(query)
		print('values----',values)
		for k in values:
			m_id = k['id']
			m_idlist.append(m_id)
			m_full_name = k['full_name']
			full_namelist.append(m_full_name)
			email = k['email']
			emaillist.append(email)
			phone = k['phone']
			phonelist.append(phone)
			is_blocked = k['is_blocked']
			is_blockedlist.append(is_blocked)
			obj_product = Product.objects.filter(is_deleted=False,merchant_id=m_id).count()
			obj_product_list.append(obj_product)
		comb = zip(m_idlist,full_namelist,emaillist,phonelist,obj_product_list,is_blockedlist)	
		merchant_class = True
		return render(request, 'merchant_list.html',{'comb':comb,'merchant_class':merchant_class,"is_admin":is_admin,'is_merchant':is_merchant,'name':name})	
	except Exception as e:
		return redirect('login_error')

def add_merchant(request):
	is_admin = True
	is_merchant = False
	date_1 = datetime.now()
	date = str(date_1)
	try:
		success = False
		not_success = False
		already_exists = False
		id = request.session['aid']
		values = Admin.objects.filter(id=id).get()
		name = values.full_name
		name = name.capitalize()

		if request.method == 'POST':
			full_name = request.POST.get('full_name')
			email = request.POST.get('email')
			phone = request.POST.get('phone')
			newObjectId = ObjectId()
			token_id = str(newObjectId)
			add = Address.objects.create()
			if Merchant.objects.filter(email=email).exists():
				already_exists = True
			else:	
				merchant_add = Merchant.objects.create(full_name=full_name,email=email,phone=phone,token_id=token_id, address=add)
				print('merchant_add---',merchant_add)
				subject = 'ActivationLink'

				current_site = get_current_site(request)
				domain = current_site.domain

				url = f"http://{domain}/reset_password/{merchant_add.id}/"
				print('url----',url)
				html_message = render_to_string('new_mail.html', {'url':url,'is_admin':True,'first_name': full_name,'token_id':token_id})
				plain_message = strip_tags(html_message)
				from_email = settings.DEFAULT_FROM_EMAIL
				to = email
				mail.send_mail(subject, plain_message, from_email, [to], html_message=html_message)
				Address.objects.filter(id=add.id).update(merchant_id=merchant_add.id)
				if mail and merchant_add:
					success = True
				else:
					not_success = True
		merchant_class = True		
		return render(request,'add_merchant.html',{'loader':True,'merchant_class':merchant_class,'is_admin':is_admin,'is_merchant':is_merchant,'date':date,'name':name,'success':success,'not_success':not_success,'already_exists':already_exists})	
	except Exception as ex:
		return redirect('login_error')

def ActivationLink(request,token_id):
	token_id = token_id
	is_user, active_merchant, reset_password = False, False, False
	if Merchant.objects.filter(token_id=token_id).exists():
		active_merchant = True
		is_user = False
		reset_password = False
	elif User.objects.filter(email_verification_token=token_id).exists():
		usr = User.objects.get(email_verification_token=token_id)
		is_user, active_merchant, reset_password = True, False, False
		if token_id.startswith('rs-pwd-'):
			reset_password = True
		if usr.email_verification and not reset_password:
			msg = 'User account is already verified. You can login from application.'
			return render(request, "ActivationLink.html", {'token_id': token_id, 'active_merchant': active_merchant,
														   "reset_password": reset_password, 'is_user': is_user,
														   'msg': msg})
		usr.email_verification = True
		if isinstance(usr.referred_by, int):
			admin = models.Admin.objects.get(id=1)
			set_obj = admin.settings
			admin_point = set_obj.user_referral_points
			usr.points += admin_point
			not_msg = f"Congratulations, You have earned {admin_point} points from referred by an existing user."
			models.Notification.objects.create(user_id=usr, points=admin_point, notification_msg=not_msg)
			models.UserRewards.objects.create(user_id=usr, reward_points=admin_point, points_type="Credit",
											  reward_name='Earned Points', reward_type="Referral Points")
			referred_user_id = usr.referred_by
			referred_user = User.objects.get(id=referred_user_id)
			try:
				referred_device = referred_user.device
				referred_device_data = []
				for x in referred_device:
					referred_device_data.append(x.device_fcm_token)
				gcm_reg_id = referred_device_data[-1]
				fcm_device = GCMDevice.objects.create(registration_id=gcm_reg_id, cloud_message_type="FCM")
				data = fcm_device.send_message("You earned {0} points by referring a new user.".format(admin_point))
			except Exception as e:
				print("Exception while sending push notification to existing user : ", e)
			not_msg = f"Congratulations, You have earned {admin_point} points by referring a new user."
			models.Notification.objects.create(user_id=referred_user, points=admin_point, notification_msg=not_msg)

			models.UserRewards.objects.create(user_id=referred_user, reward_points=admin_point, points_type="Credit",
											  reward_name='Earned Points',
											  reward_type="Referral Points")
			referred_user.points += admin_point
			referred_user.save()
		usr.save()
	return render(request, "ActivationLink.html", {'token_id': token_id, 'active_merchant': active_merchant,
												   'is_user': is_user, "reset_password": reset_password})


def pass_update(request, token_id):
	token_id = token_id
	try:
		if request.method == 'POST':
			token_id = request.POST.get('token_id')
			password = request.POST.get('password')
			c_password = request.POST.get('c_password')
			myquery = { "token_id": token_id }

			if token_id.startswith('rs-pwd-'):
				usr = User.objects.get(email_verification_token=token_id)
				if password == c_password:
					iter = 2000
					salt = "random_salt"
					hashed_pass = get_base64_hashed(password, salt, iter, hashlib.sha256)
					usr.password = hashed_pass
					usr.save()
					return render(request, template_name="ActivationLink.html", context={"password_updated": True, "is_user": True})
				else:
					alert(text='password and confirm_password does not match!', title='Error Alert', button='OK')
					return redirect('ActivationLink', token_id=token_id)
			else:
				values = merchant_collection.find(myquery)
				if values:
					if password != c_password:
						alert(text='password and confirm_password does not match!', title='Error Alert', button='OK')
						return redirect('ActivationLink', token_id=token_id)
					else:
						iter = 2000
						salt = "random_salt"
						hashed_pass = get_base64_hashed(c_password, salt, iter, hashlib.sha256)
						Merchant.objects.filter(token_id=token_id).update(password=hashed_pass)
						return redirect("Login_page")
	except Exception as e:
		print(e)

def merchant_details(request,user_id):
	try:
		m_id = user_id
		is_admin = True
		is_merchant = False
		product_idlist = []
		product_namelist = []
		total_pointslist = []
		id = request.session['aid']
		a = Admin.objects.filter(id=id).get()
		name = a.full_name
		name = name.capitalize()
		details = Merchant.objects.filter(id=int(m_id)).get()
		if Product.objects.filter(merchant_id=int(m_id),is_deleted=False).exists():
			products = Product.objects.filter(merchant_id=int(m_id),is_deleted=False).all()
		else:
			products = ''

		merchant_class = True		
		context = {
			'is_admin':is_admin,
			'is_merchant':is_merchant,
			'user_id':user_id,
			'details':details,
			'name':name,
			'merchant_class':merchant_class,
			'products':products,
			'merchant_product':True
		}
		return render(request, 'merchant_details.html',context)
	except Exception as e:
		return redirect('login_error')
			

def merchant_delete(request,user_id):
	m_id = user_id
	mer_find = Merchant.objects.filter(id=m_id).get()
	is_deleted = mer_find.is_deleted
	Merchant.objects.filter(id=m_id).update(is_deleted=True)
	pro_del_query = { "merchant_id": m_id}
	pro_find = merchant_collection.find(pro_del_query)
	for data in pro_find:
		for k,v in data.items():
			if k == "is_deleted":
				is_deleted = v
	if is_deleted == False:
		product_collection.update_one(pro_del_query, {"$set": {'is_deleted':True}})

	batch_delete = { "merchant_id": m_id}
	batch_find = merchant_collection.find(batch_delete)
	for data in batch_find:
		for key,val in data.items():
			if key == "is_deleted":
				is_deleted = val
	if is_deleted == False:
		batch_collection.update_one(batch_delete, {"$set": {'is_deleted':True}})

	return redirect('merchant_list')


def merchant_block(request,user_id):
	m_id = user_id
	details = Merchant.objects.filter(id=m_id).get()
	is_blocked = details.is_blocked
	if is_blocked:
		Merchant.objects.filter(id=m_id).update(is_blocked=False)
	else:
		Merchant.objects.filter(id=m_id).update(is_blocked=True)
	return redirect('merchant_details',user_id=m_id)

def banner_list(request):
	try:
		is_admin = True
		is_merchant = False
		id = request.session['aid']
		a = Admin.objects.filter(id=id).get()
		full_name = a.full_name
		name = full_name.capitalize()

		query = {"is_deleted" : False}
		con1 = banner_collection.find(query)
		id_list = []
		company_name_list = []
		image_list = []
		status_list = []
		url_list = []
		for c in con1:
			b_id = c['id']
			id_list.append(b_id)

			company_name = c['company_name']
			company_name_list.append(company_name)
			url = c['url']
			url_list.append(url)
			image = c['image']
			image_list.append(image)

			status = c['status']
			status_list.append(status)
		comb = zip(id_list,company_name_list,image_list,status_list,url_list)
		banner_class = True
		return render(request, 'banner_list.html',{"is_admin":is_admin,'is_merchant':is_merchant,'name':name,'comb':comb,'banner_class':banner_class})
	except Exception as e:
		return redirect('login_error')

def add_banner(request):
	is_admin = True
	is_merchant = False
	try:
		add_banner = False
		id = request.session['aid']
		values = Admin.objects.filter(id=id).get()
		name = values.full_name
		name = name.capitalize()

		if request.method == 'POST':
			company_name = request.POST.get('company_name')
			image = request.FILES.get("image")
			url = request.POST.get("banner_url")




			Banner.objects.create(company_name=company_name,image=image,url=url)
			add_banner = True
		banner_class = True 
		return render(request, 'add_banner.html',{"is_admin":is_admin,'is_merchant':is_merchant,'name':name,'banner_class':banner_class,'add_banner':add_banner})
	except Exception as e:
		return redirect('login_error')

def banner_delete(request, id):
	try:
		banner_delete = {}
		bann_del = []
		bann_id = id
		banner_find = Banner.objects.filter(id=bann_id)
		for data in banner_find:
			banner_delete['is_deleted'] = data.is_deleted
			bann_del.append(banner_delete)
		Banner.objects.filter(id=bann_id, is_deleted=False).update(is_deleted=True)
		return redirect('banner_list')
			
	except Exception as ex:
		return render(request=request, template_name='banner_list.html', context={'error': True})


def banner_status(request,id):
	b_id = id
	try:
		is_admin = True
		is_merchant = False
		status_live = False

		id = request.session['aid']
		values = Admin.objects.filter(id=id).get()
		name = values.full_name
		name = name.capitalize()

		if Banner.objects.filter(id=b_id).all():
			if Banner.objects.filter(id=b_id,status=False).update(status=True):
				print('iiiiifffff',b_id)
			else:
				Banner.objects.filter(id=b_id,status=True).update(status=False)
				
		con1 = Banner.objects.filter(is_deleted=False).all()
		id_list = []
		company_name_list = []
		image_list = []
		status_list = []
		url_list = []
		if con1:
			for c in con1:
				id_list.append(c.id)
				company_name_list.append(c.company_name)
				image_list.append(c.image)
				status_list.append(c.status)
		banner_class = True 

		comb = zip(id_list,company_name_list,image_list,status_list,url_list)
		context = {
		'is_admin':is_admin,
		'is_merchant':is_merchant,
		'name':name,
		'comb':comb,
		'banner_class':banner_class,
		'status_live':status_live,
		}
		return render(request, 'banner_list.html',context)
	except Exception as e:
		print('Exception-->',e)

def quiz_list(request):
	try:
		is_admin = True
		is_merchant = False
		quiz_list = Quiz.objects.filter(is_deleted=False).all()
		id = request.session['aid']
		a_values = Admin.objects.filter(id=id).get()
		full_name = a_values.full_name
		full_name = full_name.capitalize()

		quizlist = [] 
		url_list = []
		for data in quiz_list:
			url_list.append(data.videoId_id)

			quizlist.append(data)
		vdieo_list = []
		video_name_list = []
		for x in url_list:
			vdo_obj = Video.objects.filter(id=x).get()
			url_id = vdo_obj.id
			video_name = vdo_obj.video_name

			vdieo_list.append(url_id)
			video_name_list.append(video_name)
		comb = zip(quizlist,video_name_list)
		quiz_class = True
		return render(request,"quiz_list.html",{"comb":comb,"is_admin":is_admin,'is_merchant':is_merchant,'name':full_name,'quiz_class':quiz_class})
	except Exception as e:
		return redirect('login_error')

def add_ques(request):
	try:
		is_admin = True
		is_merchant = False
		selectVideo = False
		add_quiz = False
		id = request.session['aid']
		a_values = Admin.objects.filter(id=id).get()
		full_name = a_values.full_name
		full_name = full_name.capitalize()
		video_id_list = []
		video_name_list = []
		video_category_list = []
		ques_list_create = []
		products = Product.objects.filter(is_deleted=False)
		already_products = [x for x in Quiz.objects.filter(is_deleted=False).values_list('product', flat=True) if x is not None]
		print(already_products)
		for x in already_products:
			products = products.exclude(id=x)
		print('products : ', products)

		video_all = Video.objects.all().filter(is_deleted=False)
		for k in video_all:
			quiz_all = Quiz.objects.all().filter(is_deleted=False)
			if len(quiz_all) != 0:
				for q in quiz_all: 
					if Quiz.objects.filter(videoId_id=k.id,is_deleted=False).exists():
						print('***********')
					else:
						video_id = k.id
						video_id_list.append(video_id)
						video_name = k.video_name
						video_name_list.append(video_name)
						video_category_list.append(k.category)
						break
			else:
				video_id = k.id
				video_id_list.append(video_id)
				video_name = k.video_name
				video_name_list.append(video_name)
				video_category_list.append(k.category)
		video_combo = zip(video_id_list,video_name_list,video_category_list)
		if request.method == 'POST':
			datas = request.POST
			
			question_string = 'ques'
			answer_string = 'ans'
			a_string = 'a'
			b_string = 'b'
			c_string = 'c'
			d_string = 'd'
			ques_list = []
			new_ques_list = []
			data = {}
			arr = {}
			n = 10
			quiz_name = ''
			points = ''
			v_obj = ''
			da = ''
			selected_product = None if datas['product'] == "0" else int(datas['product'])
			for key,value in datas.items():
				if datas['video_id'] == '0':

					selectVideo = True
					break
				else:
					if  key == 'quiz_name':
						quiz_name = value
					if key == 'points':
						points = value
					if key == 'video_id':
						videoid = value

					for i in range(1,n):
						new = str(i)+'_list'
						new = []
						if question_string.startswith('ques'):
							if key == 'question_'+str(i):
								question = value
								question = question.strip()
						if a_string.startswith('a'):
							if key == 'a_'+str(i):
								a = value
								a = a.strip()

						if b_string.startswith('b'):
							if key == 'b_'+str(i):
								b = value
								b = b.strip()
								
						if c_string.startswith('c'):
							if key == 'c_'+str(i):
								c = value
								c = c.strip()
								
						if d_string.startswith('d'):
							if key == 'd_'+str(i):
								d = value
								d = d.strip()
						if answer_string.startswith('ans'):
							if key == 'answer_'+str(i):
								answer = value
								answer = answer.strip()

								ques = Question.objects.create(question=question,op1=a,op2=b,op3=c,op4=d,answer=answer)
								ques.question_id = ques.id
								ques.save()

								ques_list.append(ques)
								query = {'id':videoid}
								video = Video.objects.filter(id=videoid).all()

								for da in video:
									vid = da.id
			if da != '':
				if selected_product is not None:
					quiz_id_create = Quiz.objects.create(quiz_name=quiz_name,points=points, questions=ques_list,
														 videoId=da, product_id=int(selected_product))
				else:
					quiz_id_create = Quiz.objects.create(quiz_name=quiz_name, points=points, questions=ques_list,
														 videoId=da)
				for q in range(0,len(ques_list)):
					test = Question.objects.filter(id=ques_list[q].id).update(quiz_id=str(quiz_id_create.id))
					ques = ques_list[q]
					ques.quiz_id = str(quiz_id_create.id)
					ques.save()
					new_ques_list.append(ques)

				quiz_id_create.questions = new_ques_list
				quiz_id_create.save()
				add_quiz = True

		quiz_class = True
		return render(request, 'add_ques.html',{'selectVideo':selectVideo,'is_admin':is_admin,'is_merchant':is_merchant,'videodata':video_combo,'name':full_name,'quiz_class':quiz_class,'add_quiz':add_quiz, 'products': products})
	except Exception as e:
		return redirect('login_error')


def quiz_delete(request,id):
	quiz_id = id
	Quiz.objects.filter(id=quiz_id,is_deleted=False).update(is_deleted=True)

	return redirect('quiz_list')

def view_questions(request,id):
	try:
		u_id = id
		is_admin = True
		is_merchant = False
		question_list =[]
		op1_list = []
		op2_list = []
		op3_list = []
		op4_list = []
		answer_list = []
		id = request.session['aid']
		a_values = Admin.objects.filter(id=id).get()
		full_name = a_values.full_name
		full_name = full_name.capitalize()
		data = Quiz.objects.filter(id=u_id).get()
		quiz_id = data.id
		quiz_name = data.quiz_name
		quiz_points = data.points
		quiz_questions = data.questions
		quiz_videoId_id = data.videoId_id
		name = Video.objects.filter(id=data.videoId_id).all()
		for naam in name:
			video_name = naam.video_name

		if quiz_questions != '':
			for dataa in quiz_questions:
				question = dataa
				question_list.append(question)
				op1 = dataa.op1
				op1_list.append(op1)
				op2 = dataa.op2
				op2_list.append(op2)
				op3 = dataa.op3
				op3_list.append(op3)
				op4 = dataa.op4
				op4_list.append(op4)
				answer = dataa.answer
				answer_list.append(answer)
		
		comb = zip(question_list,op1_list,op2_list,op3_list,op4_list,answer_list)
		quiz_class = True				
		context = {
			'quiz_name':quiz_name,
			'points':quiz_points,
			'is_admin':is_admin,
			'is_merchant':is_merchant,
			'video_name':video_name,
			'comb':comb,
			'name':full_name,
			'quiz_class':quiz_class,
			'quiz_obj': data
		} 			
		return render(request, 'view_questions.html',context)
	except Exception as e:
		return redirect('login_error')



class edit_questions(APIView):
	def get(self,request,id):
		try:
			u_id = id
			is_admin = True
			is_merchant = False
			question_list =[]
			op1_list = []
			op2_list = []
			op3_list = []
			op4_list = []
			question_id_list = []
			answer_list = []
			id = request.session['aid']
			a_values = Admin.objects.filter(id=id).get()
			full_name = a_values.full_name
			full_name = full_name.capitalize()
			data = Quiz.objects.filter(id=u_id).get()
			quiz_id = data.id
			quiz_name = data.quiz_name
			quiz_points = data.points
			quiz_questions = data.questions
			quiz_videoId_id = data.videoId_id
			name = Video.objects.filter(id=data.videoId_id).all()
			for naam in name:
				video_name = naam.video_name
					
			for dataa in quiz_questions:

				question = dataa

				n = Question.objects.all().filter(quiz_id=quiz_id,question=question)
				for n1 in n:
					question_id_list.append(n1.id)
				question_list.append(question)
				op1 = dataa.op1
				op1_list.append(op1)
				op2 = dataa.op2
				op2_list.append(op2)
				op3 = dataa.op3
				op3_list.append(op3)
				op4 = dataa.op4
				op4_list.append(op4)
				answer = dataa.answer
				answer_list.append(answer)
			comb = zip(question_list,op1_list,op2_list,op3_list,op4_list,answer_list,question_id_list)				

			quiz_class = True
			context = {
				'quiz_id':quiz_id,
				'quiz_name':quiz_name,
				'points':quiz_points,
				'is_admin':is_admin,
				'is_merchant':is_merchant,
				'video_name':video_name,
				'comb':comb,
				'name':full_name,
				'quiz_class':quiz_class,
			} 			
			return render(request, 'edit_questions.html',context)
		except Exception as e:
			return render(request, 'edit_questions.html')


	def post(self,request,id):
		try:
			is_admin = True
			is_merchant = False
			ques_id = id
			question_string = 'ques'
			answer_string = 'ans'
			a_string = 'a'
			b_string = 'b'
			c_string = 'c'
			d_string = 'd'
			arr = {}
			n = 10
			ques_list = []
			edit_question_list = []
			edit_a_list = []
			edit_b_list = []
			edit_c_list = []
			edit_d_list = []
			edit_ans_list = []
			question_id_list1 = []
			
			query1 = {"_id":ques_id}
			values = quiz_collection.find(query1)
			for value in values:
				for key,val in value.items():
					if value == "id":	
						qid = values[value]
			data = request.data

			if 'question_id' not in data:
				datas = request.POST
				question_string = 'ques'
				answer_string = 'ans'
				a_string = 'a'
				b_string = 'b'
				c_string = 'c'
				d_string = 'd'
				ques_list = []
				new_ques_list = []
				arr = {}
				n = 10
				for key,value in datas.items():
					if  key == 'quiz_name':
						quiz_name = value
					if key == 'points':
						points = value
					if key == 'video_id':
						videoid = value
					for i in range(1,n):
						new = str(i)+'_list'
						new = []
						if question_string.startswith('ques'):
							if key == 'question_'+str(i):
								question = value
								arr[i]= question
						if a_string.startswith('a'):
							if key == 'a_'+str(i):
								a = value
								arr[i]= a
						if b_string.startswith('b'):
							if key == 'b_'+str(i):
								b = value
								arr[i]= b
						if c_string.startswith('c'):
							if key == 'c_'+str(i):
								c = value
								arr[i]= c
						if d_string.startswith('d'):
							if key == 'd_'+str(i):
								d = value
								arr[i]= d
						if answer_string.startswith('ans'):
							if key == 'answer_'+str(i):
								answer = value
								ques = Question.objects.create(quiz_id=data['quiz_id'],question=question,op1=a,op2=b,op3=c,op4=d,answer=answer)
								ques.question_id = ques.id
								ques.save()
								q  = Quiz.objects.filter(id=datas['quiz_id']).get()
								for q in q.questions:
									ques_list.append(q)
								ques_list.append(ques)
				Quiz.objects.filter(id=datas['quiz_id']).update(questions=ques_list)

			else:
				question_id_list1.append(data['question_id'])

				quiz = models.Quiz.objects.get(id=data['quiz_id'])
				questionsssss = quiz.questions
				qs_ls = [x.question_id for x in questionsssss]
				
				ls = enumerate(qs_ls)
				ans = [i for i, j in ls if j==data['question_id']]
				index = ans[0]
				jd = [x for x in qs_ls if x!=data['question_id']]
				jdd = [models.Question.objects.get(id=int(j)) for j in jd]
				for kk,vv in data.items():
					for i in range(1,n):
						new = str(i)+'_list'
						if question_string.startswith('ques'):
							if kk == 'question_'+str(i):
								question = vv
						if a_string.startswith('a'):
							if kk == 'a_'+str(i):
							    a = vv
							    arr[i]= a
						if b_string.startswith('b'):
							if kk == 'b_'+str(i):
							    b = vv
							    arr[i]= b
						if c_string.startswith('c'):
							if kk == 'c_'+str(i):
							    c = vv
							    arr[i]= c
						if d_string.startswith('d'):
							if kk == 'd_'+str(i):
							    d = vv
							    arr[i]= d
						if answer_string.startswith('ans'):
							if kk == 'answer_'+str(i):
								answer = vv

								Question.objects.filter(id=ques_id).update(question=question,op1=a,op2=b,op3=c,op4=d,answer=answer)
								que = Question.objects.get(id=ques_id)
								ques_list.append(que)
								jdd.insert(index, que)
								u = Quiz.objects.filter(id=data['quiz_id']).update(questions=jdd)

			return redirect('edit_questions',id=data['quiz_id'])
		except Exception as e:
			return redirect('login_error')


def delete_questions(request,id):
	quiz_id = id
	q=Quiz.objects.get(questions={'question_id': id})
	questions = q.questions
	ls = [x for x in questions if x.question_id != str(quiz_id)]
	Quiz.objects.filter(id=q.id).update(questions=ls)
	Question.objects.filter(id=quiz_id,is_deleted=False).delete()
	return redirect('edit_questions',id=q.id)


class ResetPassword(APIView):
	def get(self,request,id):
		try:
			is_admin = True
			is_merchant =False
			if Merchant.objects.filter(id=id,is_activated=False).exists():
				Merchant.objects.filter(id=id).update(is_activated=True)
				return render(request, 'reset_password.html',{'id':id,'is_admin':is_admin,'is_merchant':is_merchant})
			else:
				return render(request,'404.html')	
				
		except Exception as e:
			return HttpResponse(status=404)
	def post(self,request,id):
		try:
			data = request.data
			new_password = data['new_password']
			confirm_password = data['confirm_password']
			iter = 2000
			salt = "random_salt"
			hashed_pass = get_base64_hashed(new_password, salt, iter, hashlib.sha256)
			Merchant.objects.filter(id=id).update(password=hashed_pass)
			return redirect('login')
		except Exception as e:
			return HttpResponse(status=404)

class change_password(APIView):
	def get(self,request):
		try:
			is_admin = True
			is_merchant = False
			id = request.session['aid']
			a_values = Admin.objects.filter(id=id).get()
			name = a_values.full_name
			name = name.capitalize()

			return render(request, 'change_password.html',{'a_values':a_values,'is_admin':is_admin,'is_merchant':is_merchant,'name':name})
		except Exception as e:
			return HttpResponse(status=404)
	def post(self,request):
		try:
			id = request.session['aid']
			data = request.data
			old_password = data['old_password']
			new_password = data['new_password']
			confirm_password = data['confirm_password']
			Admin.objects.filter(id=id).update(password=confirm_password)
			return redirect('dashboard')
		except Exception as e:
			return HttpResponse(status=404)	

class banner_edit(APIView):
	def get(self,request,id):
		try:
			banner_id = id
			is_admin = True
			is_merchant = False
			id = request.session['aid']
			values = Admin.objects.filter(id=id).get()
			name = values.full_name
			name = name.capitalize()
			d = Banner.objects.filter(id=banner_id).get()
			banner_class = True 
			return render(request,'banner_edit.html',{'data':d,"is_admin":is_admin,'is_merchant':is_merchant,'name':name,'banner_class':banner_class})
		except Exception as e:
			return redirect('login_error')	
	def post(self,request,id):
		try:
			edit_banner = False
			banner_id = id
			is_admin = True
			is_merchant = False
			id = request.session['aid']
			values = Admin.objects.filter(id=id).get()
			name = values.full_name
			name = name.capitalize()
			data = request.data
			company_name = data['company_name']
			url = data['banner_url']
			Banner.objects.filter(id=banner_id).update(company_name=company_name,url=url)
			edit_banner = True
			banner_class = True 
			d = Banner.objects.filter(id=banner_id).get()
			return render(request,'banner_edit.html',{'name':name,'is_admin':is_admin,'is_merchant':is_merchant,'edit_banner':edit_banner,'data':d,'banner_class':banner_class})	
		except Exception as e:
			print(e)

def contact_us(request):
	try:
		is_admin, is_merchant = True, False

		id = request.session['aid']
		values = Admin.objects.filter(id=id).get()
		name = values.full_name
		name = name.capitalize()

		contacts = UserSupportRequest.objects.order_by('-created_at').all()
		contact_data = copy.deepcopy(contacts)

		contact_data = sorted(contact_data, key=lambda i: i.created_at, reverse=True)

		for data in contact_data:
			create_date = str(data.created_at)
			data.created_at = create_date[:19]
			data.save()
		for data in contact_data:
			msg = data.message
			answer = define_html_paragraph(msg=msg)
			data.message = answer

		contactus_class = True
		return render(request, 'contact_us.html', {"contact_data": contact_data, "is_admin": is_admin,
												   "is_merchant": is_merchant, "name": name,
												   "contactus_class": contactus_class})
	except Exception as e:
		print(e)

@api_view(['POST'])
def contact_us_resolved(request,id):
	fcm_list = []
	dispute = models.UserSupportRequest.objects.filter(id=int(id)).get()
	dispute.dispute_status = "Resolved"
	dispute.save()
	user_id = dispute.user_id

	points = AdminSettings.objects.last()

	UserRewards.objects.create(user_id=user_id, reward_name='Support Point', reward_type='Sprayer Points',
							   reward_points=points.support_request_points, points_type="Credit")

	user = User.objects.get(id=user_id.id)
	print('before points updated : ', user.points)
	user.points += points.support_request_points
	user.save()
	print('after points updated : ', user.points)
	
	data = user_id.device
	for x in data:
		fcm_list.append(x.device_fcm_token)
	gcm_reg_id = fcm_list[-1]
	fcm_device = GCMDevice.objects.create(registration_id=gcm_reg_id, cloud_message_type="FCM")
	data = fcm_device.send_message(f"{points.support_request_points} points credited for your dispute request resolved by Admin")
	msg = f"Congratulations, Your dispute request resolved by Admin."
	models.Notification.objects.create(user_id=user_id, notification_msg=msg, points=0)
	res_data = {"status_code": 200, "status": "success", "message": "status changed","data": {}}
	return Response(data=res_data, status=status.HTTP_200_OK)


def contest_view_list(request,id,user_id):
	try:
		u_id = user_id
		con_id = int(id)

		is_admin = True
		is_merchant = False
		dispute_status = ''
		split = ''
		id = request.session['aid']
		a = Admin.objects.filter(id=id).get()
		name = a.full_name
		name = name.capitalize()

		details = User.objects.filter(id=int(u_id)).get()
		userdata_id = details.id
		full_name = details.full_name
		split_name = full_name.split(' ')
		first_name = split_name[0]
		last_name = split_name[1]
		img = details.img_thumbnail
		email = details.email
		company_name = details.company_name
		phone = details.phone
		points = details.points
		referred_by = details.referred_by
		id_exists = User.objects.filter(id=referred_by).exists()
		referred = ''
		if referred_by is None:
			referred = "None"
		else:
			referred = User.objects.filter(id=referred_by).get()
			referred = referred.full_name
		referral_code = details.referral_code
		is_blocked = details.is_blocked
		points = details.points
		add_line1 = details.address.add_line1
		add_line2 = details.address.add_line2
		city = details.address.city
		state = details.address.state
		zip_code = details.address.zip_code
		country = details.address.country
		rewardss = UserRewards.objects.all().count()

		ur = UserRewards.objects.all()	
		referred_by_query =UserRewards.objects.filter(user_id_id=u_id).exists()
		created_at_list = []
		reward_points_list = []
		is_splitted_list = []
		reward_type_list = []
		qr_code_id_list = []
		points_type_list = []
		admin_reason_list = []

		if referred_by_query:
			referred_by_data = UserRewards.objects.filter(user_id_id=u_id).all()
			for data in referred_by_data:
				created_at = data.created_at
				created_at_list.append(created_at)
				reward_points = data.reward_points
				reward_points_list.append(reward_points)
				is_splitted = data.is_splitted
				is_splitted_list.append(is_splitted)

				reward_type = data.reward_type
				reward_type_list.append(reward_type)

				qr_code_id = data.qr_code_id
				qr_code_id_list.append(qr_code_id)

				points_type = data.points_type
				points_type_list.append(points_type)
				admin_reason = data.admin_reason
				admin_reason_list.append(admin_reason)
			comb = zip(created_at_list,reward_points_list,is_splitted_list,reward_type_list,qr_code_id_list,points_type_list,admin_reason_list)
		else:
			created_at_list = ''
			reward_points_list = ''
			is_splitted_list = ''
			reward_type_list = ''
			qr_code_id_list = ''
			points_type_list = ''
			admin_reason_list = ''
			comb = ''
		contest_class = True	
		from userapi import validations
		lifetime_points = validations.user_lifetime_points(details)

		context = {
			'first_name':first_name,
			'last_name':last_name,
			'name':name,
			'email' : email,
			'phone' : phone,
			"image": img,
			'company_name':company_name,
			'available_points':points,
			'lifetime_earned_points': lifetime_points,
			'referred':referred,
			'referral_code':referral_code,
			'is_admin':is_admin,
			'is_merchant':is_merchant,
			'add_line1':add_line1,
			'add_line2':add_line2,
			'city':city,
			'state':state,
			'country':country,
			'zip_code':zip_code,
			'is_blocked': is_blocked,
			'user_id':user_id,
			'points':points,
			'contest_class':contest_class,
			'comb':comb,
			'contest_id':con_id,
		} 			
		return render(request, 'contest_view_list.html',context)
	except Exception as e:
		return redirect('login_error')