import zipfile
import fpdf as FPDF
from django.contrib.sites.shortcuts import get_current_site
from django.shortcuts import render, redirect
from rest_framework.views import APIView
from django.http import HttpResponse
import hashlib
import base64

from AllFoamTech.settings import BASE_DIR
from AllFoamTech import settings
from jake import get_base64_hashed
from jake import give_back_hashed
from slp.models import *
from bson.objectid import ObjectId
import qrcode
from slp.mongo import *
import os
import sys
import img2pdf
from PIL import Image 
import random
import string
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core import mail
import io
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
import json
from zipfile import ZipFile
from io import BytesIO

# Create your views here.

class Login(APIView):
	def get(self,request):
		try:
			if 'mid' in request.session:
				return redirect('dashboard_')
			else:
				email =''
				password = ''
				remember_me_on = ''
				merchant_login = True
				if 'email' in request.session:
					email = request.session['email']
				if 'password' in request.session:
					password = request.session['password']
				if 'remember_me_on' in request.session:
					remember_me_on = request.session['remember_me_on']
				return render(request,'login-page.html',{'merchant_login':merchant_login,'email':email,'password':password,'remember_me_on':remember_me_on})
		except Exception as e:
			return HttpResponse(status=404)

	def post(self,request):
		try:
			is_merchant = False
			data = request.data
			remember_me = ''
			remember_me_on = False
			email = data['email']
			password = data['password']
			if 'remember_me' in data:
				remember_me = data['remember_me']
			else:
				remember_me_on = False
				if 'remember_me_on' in request.session:
					del request.session['remember_me_on']
					del request.session['email']
					del request.session['password']
			iter = 2000
			salt = "random_salt"
			hashed_pass = get_base64_hashed(password, salt, iter, hashlib.sha256)
			if remember_me == 'on':
				request.session['email'] = email
				request.session['password'] = password
				request.session['remember_me_on'] = True
			if Merchant.objects.filter(email=email, password=hashed_pass).exists():
				if Merchant.objects.filter(email=email,is_deleted=True):
					error = 'You are deleted please Contact to Admin.! (allfoamtech@gmail.com)'
					if 'email' in request.session:
						email = request.session['email']
					if 'password' in request.session:
						password = request.session['password']
					if 'remember_me_on' in request.session:
						remember_me_on = request.session['remember_me_on']
					return render(request,'login-page.html',{'error':error,'email':email,'password':password,'remember_me_on':remember_me_on})
				elif Merchant.objects.filter(email=email,is_blocked=True):
					error = 'You are block please Contact to Admin.! (allfoamtech@gmail.com)'
					if 'email' in request.session:
						email = request.session['email']
					if 'password' in request.session:
						password = request.session['password']
					if 'remember_me_on' in request.session:
						remember_me_on = request.session['remember_me_on']
					return render(request,'login-page.html',{'error':error,'email':email,'password':password,'remember_me_on':remember_me_on})
				else:
					m = Merchant.objects.filter(email=email).get()
					request.session['mid'] = m.id
					return redirect('dashboard_')
			else:
				error = 'Invalid Email Password'
				merchant_login = True
				if 'email' in request.session:
						email = request.session['email']
				if 'password' in request.session:
					password = request.session['password']
				if 'remember_me_on' in request.session:
					remember_me_on = request.session['remember_me_on']
				return render(request,'login-page.html',{'error':error,'remember_me_on':remember_me_on,'email':email,'password':password,'merchant_login':merchant_login})
		except Exception as e:
			return redirect('login')

class Logout(APIView):
	def get(self,request):
		try:
			data = request.session
			del request.session['mid']
			return redirect('login')
		except Exception as e:
			return redirect('login')

class m_dashboard(APIView):
	def get(self,request):
		try:
			id = request.session['mid']
			if Merchant.objects.filter(id=id,is_blocked=True):
				del request.session['mid']
				return redirect('login')
			else:	
				# id = request.session['mid']
				data = Merchant.objects.filter(id=id).get()
				is_merchant = True
				full_name = data.full_name	
				full_name = full_name.capitalize()
				obj_product = Product.objects.filter(merchant_id=id,is_deleted=False).all()
				obj_batch = Batch.objects.filter(merchant_id=id,is_deleted=False).all()
				obj_total_qr = QRCode.objects.filter(merchant_id=id).all()
				obj_scanned_qr = QRCode.objects.filter(merchant_id=id,is_scanned=True).all()
				count_product = obj_product.count()
				count_batch = obj_batch.count()
				count_qr = obj_total_qr.count()
				count_scanned_qr = obj_scanned_qr.count()
				dashboard_class = True
				return render(request, "Dashboard.html",{'dashboard_class':dashboard_class,'is_merchant':is_merchant,'count_product':count_product,'count_batch':count_batch,'name':full_name,'count_qr':count_qr,'count_scanned_qr':count_scanned_qr})
		except Exception as e:
			return redirect('login')

class Product_list(APIView):
	def get(self,request):
		try:
			id = request.session['mid']
			if Merchant.objects.filter(id=id,is_blocked=True):
				del request.session['mid']
				return redirect('login')
			else:	
				if 'mid' in request.session:
					# id = request.session['mid']
					data = Merchant.objects.filter(id=id).get()
					full_name = data.full_name
					full_name = full_name.capitalize()
					is_merchant = True
					is_admin = False
					products = Product.objects.filter(merchant_id=int(id),is_deleted=False).all()
					product_class = True
					return render(request,'product_list.html',{'product_list_class':product_class,'is_admin':is_admin,'is_merchant':is_merchant,'name':full_name,'products':products})
				else:
					return redirect('login')
		except Exception as e:
			return redirect('login')

class Batch_list(APIView):
	def get(self,request):
		try:
			id = request.session['mid']
			if Merchant.objects.filter(id=id,is_blocked=True):
				del request.session['mid']
				return redirect('login')
			else:	
				if 'mid' in request.session:
					id = request.session['mid']
					data = Merchant.objects.filter(id=id).get()
					full_name = data.full_name
					full_name = full_name.capitalize()
					is_merchant = True
					is_admin = False
					pna = ''
					pnaList = []
					batches = Batch.objects.filter(merchant_id=str(id),is_deleted=False).all()
					for b in list(batches):
						pid = b.product_id
						if Product.objects.filter(id=int(pid),is_deleted=False).exists():
							pna = Product.objects.get(id=int(pid),is_deleted=False)
							pnaList.append(pna.product_name)
					batch_class = True
					combo = zip(batches, pnaList)
					return render(request,'batch_list.html',{'batch_class':batch_class,'is_admin':is_admin,'is_merchant':is_merchant,'name':full_name,'batches':batches,'pnaList':pnaList,'combo':combo})
				else:
					return redirect('login')
		except Exception as e:
			return redirect('login')


class AddBatch(APIView):
	def get(self,request):
		try:
			id = request.session['mid']
			if Merchant.objects.filter(id=id,is_blocked=True):
				del request.session['mid']
				return redirect('login')
			else:	
				if 'mid' in request.session:
					id = request.session['mid']
					data = Merchant.objects.filter(id=id).get()
					full_name = data.full_name
					full_name = full_name.capitalize()
					is_merchant = True
					is_admin = False
					pname = []
					pid = []
					product = Product.objects.filter(merchant_id=id,is_deleted=False).all()
					batch_class = True
					return render(request,'add_batch.html',{'batch_class':batch_class,'name':full_name,'is_merchant':is_merchant,'is_admin':is_admin,'product':product,'loader':True})
				else:
					return redirect('login')
		except Exception as e:
			return redirect('login')

	def post(self, request):
		try:
			id = request.session['mid']
			if Merchant.objects.filter(id=id,is_blocked=True):
				del request.session['mid']
				return redirect('login')
			else:	
				id = request.session['mid']
				initial_points = []
				data = request.data
				if data['product_id'] == '0':
					return redirect('batch/')
				else:
					p_id = data['product_id']
					batch_number = data['batch_number']
					quantity = data['quantity']
					date = data['start_date']
					time = data['start_time']

					bid = Batch.objects.create(merchant_id=str(id),batch_name=batch_number,product_id=p_id,quantity=quantity,start_date=date,start_time=time)
					return redirect('qr',qid=bid.id)
		except Exception as e:
			return redirect('login')

def add_qr(request,qid):
	try:
		id = request.session['mid']
		if Merchant.objects.filter(id=id,is_blocked=True):
			del request.session['mid']
			return redirect('login')
		else:	
			add = ''
			id = request.session['mid']
			batches = Batch.objects.filter(merchant_id=id,id=qid).get()
			for i in range(0,batches.quantity):
				try:
					qr_id = QRCode.objects.create(batch_id=batches.id,merchant_id=batches.merchant_id,product_id=batches.product_id)
					add = "Batch has been added successfully"
					qr = qrcode.QRCode(   # Start QR CODE Generate 
						version = 1,
						error_correction = qrcode.constants.ERROR_CORRECT_H,
						box_size = 10,
						border = 4,
					)
					qr_data = {
						'UID': '42ef9ba1c50cfc760c70a6f52ba6c8dd2acb127d6e1ba648d6d0eaff2d4135ac',
						'QR_ID': qr_id.id,
						'MERCHANT_ID': id,
						'PRODUCT_ID': int(batches.product_id),
					}
					dt = json.dumps(qr_data)
					qr.add_data(dt)
					qr.make(fit=True)
					img = qr.make_image()
					img_name = batches.batch_name+"_"+str(qr_id.id)+"_"+str(i)+".png"
					thumb_io = io.BytesIO()
					img.save(thumb_io, format='PNG')
					thumb_file = InMemoryUploadedFile(thumb_io, None, img_name, 'image/png',
									thumb_io.getbuffer().nbytes, None)
					qr_id.qr_image = thumb_file
					qr_id.save()
					# user_folder = './slp/media/qr_image/'
					# if not os.path.exists(user_folder):
					# 	os.mkdir(user_folder)
					# img.save("./slp/media/qr_image/"+batches.batch_name+"_"+str(qr_id.id)+"_"+str(i)+".png")
					# q = QRCode.objects.filter(id=qr_id.id).update(qr_image=img)   # END QR CODE Generate
				except Exception as e:
					return redirect('login')
			data = Merchant.objects.filter(id=id).get()
			full_name = data.full_name
			full_name = full_name.capitalize()
			is_merchant = True
			is_admin = False
			pname = []
			pid = []
			product = Product.objects.filter(merchant_id=id,is_deleted=False).all()
			batch_class = True
			return render(request,'add_batch.html',{'batch_class':batch_class,'name':full_name,'is_merchant':is_merchant,'is_admin':is_admin,'product':product,'loader':True,'add':add})
			# batch_class = True
			# is_merchant = True
			# is_admin = False
			# data = Merchant.objects.filter(id=id).get()
			# full_name = data.full_name
			# full_name = full_name.capitalize()
			# pname = []
			# # batches = Batch.objects.filter(merchant_id=id).all()
			# batches = Batch.objects.filter(merchant_id=str(id),is_deleted=False).all()
			# for b in list(batches):
			# 	pid = b.product_id
			# 	if Product.objects.filter(id=int(pid),is_deleted=False).exists():
			# 		pna = Product.objects.get(id=int(pid),is_deleted=False)
			# 		pnaList.append(pna.product_name)
			# batch_class = True
			# combo = zip(batches, pnaList)
			# return render(request,'batch_list.html',{'batch_class':batch_class,'is_admin':is_admin,'is_merchant':is_merchant,'name':full_name,'add':add,'batches':batches,'pna':pna})
			# # return redirect('batch')
			# return HttpResponse(status=200)
	except Exception as e:
		return redirect('login')


def download_qr(request,bid):
	try:
		id = request.session['mid']
		if Merchant.objects.filter(id=id,is_blocked=True):
			del request.session['mid']
			return redirect('login')
		else:	
			qrs = QRCode.objects.all().filter(batch_id=str(bid))
			img_path_list = [qr.qr_image.url for qr in qrs]
			import requests
			import shutil
		
			zip_subdir = f"Batch_No_{bid}_QR_Codes"
			zip_filename = "%s.zip" % zip_subdir

			# Open StringIO to grab in-memory ZIP contents
			s = BytesIO()

			# The zip compressor
			zf = zipfile.ZipFile(s, "w")
			j = 1
			for i in img_path_list:
				response = requests.get(i, stream=True)
				with open(f'./slp/media/{bid}_{j}.png', 'wb') as out_file:
					shutil.copyfileobj(response.raw, out_file)

				fdir, fname = os.path.split(i)
				zip_path = os.path.join(zip_subdir, fname)

				zf.write(f'./slp/media/{bid}_{j}.png', zip_path)
				os.remove(f'./slp/media/{bid}_{j}.png')
				del response
				j += 1
			zf.close()

			resp = HttpResponse(s.getvalue(), content_type="application/zip")
			resp['Content-Disposition'] = 'attachment; filename=%s' % zip_filename
			return resp
	except Exception as e:
		return HttpResponse(e)


def view_product(request,id):
	pid = id
	id = request.session['mid']
	if Merchant.objects.filter(id=id,is_blocked=True):
		del request.session['mid']
		return redirect('login')
	else:	
		if 'mid' in request.session:
			# pid = id
			# id = request.session['mid']
			data = Merchant.objects.filter(id=id).get()
			full_name = data.full_name
			full_name = full_name.capitalize()
			is_merchant = True
			is_admin = False
			tech_list = []
			app_list = []
			safety_list = []
			video_list = []
			certificate_list = []
			vname_list = []
			techname_list = []
			safename_list = []
			appname_list = []
			certificatename_list = []

			product = Product.objects.filter(id=pid).all()
			for p in product:
				video_link = p.video_link
				for i in range(0,len(video_link)):
					v2 = video_link[i].video_id
					vname = str(v2).split('/')
					vname_list.append(vname[2])
					video_list.append(v2)
				tech1 = p.technical_datasheet
				for i in range(0,len(tech1)):
					tech2 = tech1[i].tech_datasheet
					techname = str(tech2).split('/')
					techname_list.append(techname[2])
					tech_list.append(tech2)
				app1 = p.application_guideline
				for i in range(0,len(app1)):
					app2 = app1[i].app_datasheet
					appname = str(app2).split('/')
					appname_list.append(appname[2])
					app_list.append(app2)
				safety1 = p.safety_datasheet
				for i in range(0,len(safety1)):
					safety2 = safety1[i].safe_datasheet
					safename = str(safety2).split('/')
					safename_list.append(safename[2])
					safety_list.append(safety2)
				certificate1 = p.certificate
				for i in range(0,len(certificate1)):
					certificate2 = certificate1[i].certificate_file
					certificatename = str(certificate2).split('/')
					certificatename_list.append(certificatename[2])
					certificate_list.append(certificate2)
				certificateImg1 = p.certificate_img
				# video_combo = ''
				for i in range(0,len(certificateImg1)):
					certificateImg2 = certificateImg1[i].certificate_file
					certificateImgName = str(certificateImg2).split('/')
					certificatename_list.append(certificateImgName[2])
					certificate_list.append(certificateImg2)
				video_combo = zip(video_list,vname_list)
				tech_combo = zip(tech_list,techname_list)
				app_combo = zip(app_list,appname_list)
				safety_combo = zip(safety_list,safename_list)
				certificate_combo = zip(certificate_list,certificatename_list)

			product_class = True
			context = {
				'is_admin':is_admin,
				'is_merchant':is_merchant,
				'name':full_name,
				'product_list_class':product_class,
				'video_combo':video_combo,
				'tech_combo':tech_combo,
				'app_combo':app_combo,
				'safety_combo':safety_combo,
				'certificate_combo':certificate_combo,
				'product':product
			}
			return render(request,'view_product.html',context)
		else:
			return redirect('login')

class EditProfile(APIView):
	def get(self,request):
		try:
			id = request.session['mid']
			if Merchant.objects.filter(id=id,is_blocked=True):
				del request.session['mid']
				return redirect('login')
			else:	
				if 'mid' in request.session:
					id = request.session['mid']
					values = Merchant.objects.filter(id=id).get()
					full_name = values.full_name
					full_name = full_name.capitalize()
					is_merchant = True
					is_admin = False
					company_name = values.company_name
					zip_code = values.address.zip_code
					if company_name == None:
						company_name = ""
					if zip_code == None:
						zip_code = ""

					return render(request,'edit_profile.html',{'value':values,'is_admin':is_admin,'is_merchant':is_merchant,'name':full_name, 'company_name':company_name,'zip_code':zip_code})
				else:
					return redirect('login')
		except Exception as e:
			return redirect('login')

	def post(self,request):
		try:
			id = request.session['mid']
			if Merchant.objects.filter(id=id,is_blocked=True):
				del request.session['mid']
				return redirect('login')
			else:	
				id = request.session['mid']
				values =Merchant.objects.filter(id=id).get()
				full_name = values.full_name
				full_name = full_name.capitalize()
				is_merchant = True
				is_admin = False
				data = request.data
				file = request.FILES
				add_dict = {}
				full_name_edit = data['full_name']
				company_name = data['company_name']
				if company_name == "":
					company_name = None
				add_dict['add_line1'] = data['address']
				add_dict['country'] = data['country']
				add_dict['state'] = data['state']
				add_dict['city'] = data['city']
				if data['zip_code'] == "":
					add_dict['zip_code'] = None
				else:
					add_dict['zip_code'] = data['zip_code']
				add_line1 = data['address']
				add_line2 = data['address']
				country = data['country']
				state = data['state']
				city = data['city']
				if data['zip_code'] == "":
					zip_code = None
				else:
					zip_code = data['zip_code']
				if data['image'] == '':
					Merchant.objects.filter(id=id).update(full_name=full_name_edit,company_name=company_name,address=add_dict)
				else:
					image = request.FILES['image']


					size = (300, 300)
					fdir, fname = os.path.split(str(image))
					ls = fname.split('.')
					formt = ls[-1].upper()
					if formt == 'JPG':
						fname = ls[0] + '.png'
						ls[-1] = 'png'

					im = Image.open(image)
					im.thumbnail(size)

					im.save(f'./slp/media/thumb_{fname}', ls[-1].upper())

					imageTemproary = Image.open(f'./slp/media/thumb_{fname}')
					outputIoStream = BytesIO()
					imageTemproary.resize((1005, 360))
					imageTemproary.save(outputIoStream, format=ls[-1], quality=60)
					outputIoStream.seek(0)
					uploadedImage = InMemoryUploadedFile(outputIoStream, 'ImageField', f"%s.{ls[-1]}" % image.name.split('.')[0],
														f'image/{ls[-1]}', sys.getsizeof(outputIoStream), None)
					image = uploadedImage

					os.remove(f'./slp/media/thumb_{fname}')


					values.image = image
					values.save()
					Merchant.objects.filter(id=id).update(full_name=full_name_edit,company_name=company_name,address=add_dict)
							
				Address.objects.filter(merchant_id=id).update(add_line1=add_line1,add_line2=add_line2,city=city,country=country,state=state,zip_code=zip_code)
				profile_edit = "Profile updated successfully"
				add_dict = {}
				values =Merchant.objects.filter(id=id).get()
				is_merchant = True
				is_admin = False
				return render(request,'edit_profile.html',{'profile_edit':profile_edit,'is_admin':is_admin,'is_merchant':is_merchant,'name':full_name,'value':values})
		except Exception as e:
			return redirect('login')

class forgot_password(APIView):
	def post(self,request):
		try:
			# id = request.session['mid']
			# if Merchant.objects.filter(id=id,is_blocked=True):
			# 	del request.session['mid']
			# 	return redirect('login')
			# else:
			email = request.POST.get('email')
			if Merchant.objects.filter(email=email,is_deleted=False,is_blocked=False).exists():
				data = Merchant.objects.filter(email=email,is_deleted=False,is_blocked=False).get()
				id = data.id

				current_site = get_current_site(request)
				domain = current_site.domain

				url = f"http://{domain}/merchant/reset_password_/{id}/"
				is_merchant =True
				subject = 'Reset Password'
				html_message = render_to_string('mail.html', {'url':url,'id':id,'is_merchant':is_merchant})
				plain_message = strip_tags(html_message)
				from_email = settings.DEFAULT_FROM_EMAIL
				to = email
				mail.send_mail(subject, plain_message, from_email, [to], html_message=html_message)
				return HttpResponse(status=200)
			else:
				return False
		except Exception as e:
			return redirect('login')

class Reset_Password(APIView):
	def get(self,request,id):
		try:
			# id = request.session['mid']
			if Merchant.objects.filter(id=id,is_blocked=True):
				del request.session['mid']
				return redirect('login')
			else:	
				is_admin =False
				is_merchant = True
				if Merchant.objects.filter(id=id).exists():
					return render(request, 'reset_password.html',{'id':id,'is_admin':is_admin,'is_merchant':is_merchant})
				return HttpResponse(status=200)

		except Exception as e:
			return redirect('login')
			
	def post(self,request,id):
		try:
			# id = request.session['mid']
			# if Merchant.objects.filter(id=id,is_blocked=True):
			# 	del request.session['mid']
			# 	return redirect('login')
			# else:
			data = request.data
			new_password = data['new_password']
			confirm_password = data['confirm_password']
			iter = 2000
			salt = "random_salt"
			hashed_pass = get_base64_hashed(new_password, salt, iter, hashlib.sha256)
			Merchant.objects.filter(id=id).update(password=hashed_pass)
			return redirect('login')
		except Exception as e:
			return redirect('login')	

class change_password(APIView):
	def get(self,request):
		try:
			id = request.session['mid']
			if Merchant.objects.filter(id=id,is_blocked=True):
				del request.session['mid']
				return redirect('login')
			else:	
				is_admin = False
				is_merchant = True
				id = request.session['mid']
				a_values = Merchant.objects.filter(id=id).get()
				name = a_values.full_name
				name = name.capitalize()
				dbpassw = a_values.password
				return render(request, 'change_password.html',{'a_values':a_values,'is_admin':is_admin,'is_merchant':is_merchant,'name':name})
		except Exception as e:
			return redirect('login')	

	def post(self,request):
		try:
			id = request.session['mid']
			if Merchant.objects.filter(id=id,is_blocked=True):
				del request.session['mid']
				return redirect('login')
			else:	
				id = request.session['mid']
				data = request.data
				old_password = data['old_password']
				new_password = data['new_password']
				confirm_password = data['confirm_password']
				is_admin = False
				is_merchant = True
				a_values = Merchant.objects.filter(id=id).get()
				name = a_values.full_name
				name = name.capitalize()
				passw = a_values.password
				iter = 2000
				salt = "random_salt"
				old_hashed_pass = get_base64_hashed(old_password, salt, iter, hashlib.sha256)
				new_hashed_pass = get_base64_hashed(new_password, salt, iter, hashlib.sha256)
				# confirm_hashed_pass = get_base64_hashed(confirm_password, salt, iter, hashlib.sha256)

				if old_hashed_pass == passw:
					Merchant.objects.filter(id=id).update(password=new_hashed_pass)
					return HttpResponse(status=200)
				else:
					return HttpResponse(status=400)
		except Exception as e:
			return redirect('login')	