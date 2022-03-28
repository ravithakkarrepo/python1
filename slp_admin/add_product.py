from django.shortcuts import render, redirect
from django.http import HttpResponse
from rest_framework.views import APIView
from slp.mongo import *
from slp.models import *
from bson.objectid import ObjectId
from .serializers import FileSerializer, TechFileSerializer, safetyDocumentSerializer, BuildingDocumentSerializer, GetAllFilesSerializer
import os
import sys
from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.http.response import JsonResponse

def merchant_product(request,id):
	pid = id
	is_merchant = False
	is_admin = True
	tech_list = []
	app_list = []
	safety_list = []
	certificate_list = []
	video_list = []
	vname_list = []
	techname_list = []
	safename_list = []
	appname_list = []
	certificatename_list = []
	objectId = request.session['aid']
	values = Admin.objects.filter(id=objectId).get()
	full_name = values.full_name
	full_name = full_name.capitalize()
	product = Product.objects.filter(id=pid,is_deleted=False).get()
	merchant_name = Merchant.objects.get(id=product.merchant_id,is_deleted=False,is_blocked=False)
	merchant_name = merchant_name.full_name
	video_link = product.video_link
	for i in range(0,len(video_link)):
		v2 = video_link[i].video_id
		vname = str(v2).split('/')
		vname_list.append(vname[2])
		video_list.append(v2)
	tech1 = product.technical_datasheet
	for i in range(0,len(tech1)):
		tech2 = tech1[i].tech_datasheet
		techname = str(tech2).split('/')
		techname_list.append(techname[2])
		tech_list.append(tech2)
	app1 = product.application_guideline
	for i in range(0,len(app1)):
		app2 = app1[i].app_datasheet
		appname = str(app2).split('/')
		appname_list.append(appname[2])
		app_list.append(app2)
	safety1 = product.safety_datasheet
	for i in range(0,len(safety1)):
		safety2 = safety1[i].safe_datasheet
		safename = str(safety2).split('/')
		safename_list.append(safename[2])
		safety_list.append(safety2)
	certificate1 = product.certificate
	for i in range(0,len(certificate1)):
		certificate2 = certificate1[i].certificate_file
		certificatename = str(certificate2).split('/')
		certificatename_list.append(certificatename[2])
		certificate_list.append(certificate2)
	certificateImg1 = product.certificate_img
	for i in range(0,len(certificateImg1)):
		certificateImg2 = certificateImg1[i].certificate_file
		certificateImgName = str(certificateImg2).split('/')
		certificatename_list.append(certificateImgName[2])
		certificate_list.append(certificateImg2)
	merchant_product_class = True

	video_combo = zip(video_list,vname_list)
	tech_combo = zip(tech_list,techname_list)
	app_combo = zip(app_list,appname_list)
	safety_combo = zip(safety_list,safename_list)
	certificate_combo = zip(certificate_list, certificatename_list)

	context = {
		'merchant_name':merchant_name,
		'video_combo':video_combo,
		'tech_combo':tech_combo,
		'app_combo':app_combo,
		'safety_combo':safety_combo,
		'certificate_combo':certificate_combo,
		'is_admin':is_admin,
		'is_merchant':is_merchant,
		'name':full_name,
		'merchant_product_class':merchant_product_class,
		'product':product
	}
	return render(request,'merchant_detail_product.html',context)
	
class Product_list(APIView):
	def get(self,request):
		try:
			edit_product = False				
			id = request.session['aid']
			values = Admin.objects.filter(id=id).get()
			full_name = values.full_name
			full_name = full_name.capitalize()
			is_admin = True
			products = Product.objects.filter(is_deleted=False).all()
			pname_list=[]
			total_points_list = []
			initial_point_list = []
			image_list = []
			pid_list =[]
			merchant_name_list = []
			for p in products:
				merchant_id = p.merchant_id
				data = Merchant.objects.filter(id=int(merchant_id),is_deleted=False,is_blocked=False).all()
				for d in data:
					merchant_name = d.full_name
					merchant_name_list.append(merchant_name)

				product_name = p.product_name
				pname_list.append(product_name)
				total_points = p.total_points
				total_points_list.append(total_points)
				pid = p.id
				pid_list.append(pid)
			combo = zip(pname_list,total_points_list,merchant_name_list,pid_list)
			product_list_class = True
			edit_product = True
			return render(request,'product_list.html',{'product_list_class':product_list_class,'is_admin':is_admin,'name':full_name,'admin_combo':combo,"edit_product":edit_product})
		except Exception as e:
			print('exception----',e)
			return redirect('login_error')
			

class AddProduct(APIView):
	def get(self,request):
		try:
			id = request.session['aid']
			values = Admin.objects.filter(id=id).get()
			full_name = values.full_name
			full_name = full_name.capitalize()
			merchants = Merchant.objects.filter(is_activated=True,is_deleted=False,is_blocked=False).all()
			merchant_name = []
			merchant_email = []
			merchant_id = []
			for merchant in merchants:
				merchant_name.append(merchant.full_name)
				merchant_email.append(merchant.email)
				merchant_id.append(merchant.id)
			merchant_combo = zip(merchant_id,merchant_email,merchant_name)
			is_merchant = False
			is_admin = True
			return render(request,'add_product.html',{'product_list_class' : True,'merchant_combo':merchant_combo,
				'name':full_name,'is_merchant':is_merchant,'is_admin':is_admin,'loader':True,
				'substrate':SubstrateTypes.objects.all(), 'machine':MachineTypes.objects.all()})
		except Exception as e:
			return redirect('login_error')
			

	def post(self,request):
		try:
			data = request.data
			file = request.FILES
			print('file : ', file)
			is_merchant = False
			is_admin = True
			video_list = []
			tech_list = []
			app_list = []
			safety_list = []
			id = request.session['aid']
			values = Admin.objects.filter(id=id).get()
			full_name = values.full_name
			full_name = full_name.capitalize()
			merchants = Merchant.objects.all()
			merchant_name = []
			merchant_email = []
			merchant_id = []
			for merchant in merchants:
				merchant_name.append(merchant.full_name)
				merchant_email.append(merchant.email)
				merchant_id.append(merchant.id)
			merchant_combo = zip(merchant_id,merchant_email,merchant_name)
			if data['merchant_id'] == '0':
				error = True
				return render(request, 'add_product.html',
							  {'product_list_class': True, 'merchant_combo': merchant_combo, 'name': full_name,
							   'is_merchant': is_merchant, 'is_admin': is_admin, 'error': error})
			else:
				merchant_id = data['merchant_id']
			product_name = data['product_name']
			if Product.objects.filter(product_name=product_name).exists():
				product_name_error = True
				return render(request, 'add_product.html',
							  {'product_list_class': True, 'merchant_combo': merchant_combo, 'name': full_name,
							   'is_merchant': is_merchant, 'is_admin': is_admin, 'product_name_error': product_name_error})
			desc = data['product_description']
			a_side_batch = data['a_side_batch']
			b_side_set_temp = data['b_side_set_temp']
			a_side_set_temp = data['a_side_set_temp']
			hose_set_temp = data['hot_set_temp']
			mixing_chamber_size = data['mixing_chamber_size']
			pressure_set = data['pressure_set']
			starting_drum_temperature = data['starting_drum_temperature']
			qr_code_scan = data['qr_code_scan_rewards']
			a_side_batch_point = data['a_side_batch_rewards']
			a_side_set_temp_point = data['a_side_set_temp_rewards']
			b_side_set_temp_point = data['b_side_set_temp_rewards']
			hose_set_temp_point = data['hot_set_temp_rewards']
			pressure_set_point = data['pressure_set_rewards']
			mixing_chamber_size_point = data['mixing_chamber_size_rewards']
			photo_of_installed_foam = data['photo_installed_foam']
			starting_drum_temperature_point = data['starting_drum_temperature_point']
			machine_type = data['machine_type']
			substrate_type = data['substrate_type']
			substrate_temp = data['substrate_temp']
			substrate_moisture= data['substrate_moisture']
			safety_warning = data['safety_warning']
			mechanical_used = data['mechanical_used']
			sprayer_fresh = data['sprayer_fresh']
			complete_spray = data['complete_spray']
			total_points = data['total_points']
			substrate_type_obj = SubstrateTypes.objects.get(substrate_type=substrate_type)
			machine_type_obj = MachineTypes.objects.get(machine_type=str(machine_type))
			
			app_create_list = []
			tech_create_list = []
			safe_create_list = []
			video_create_list = []
			tech_create_id = []
			video_create_id = []
			app_create_id = []
			product_create_list, product_create_list_img, product_create_id = [], [], []
			# tech_tips_create_list, tech_tips_create_list_img, tech_tips_create_id = [], [], []
			# safety_create_list, safety_create_list_img, safety_create_id = [], [], []
			# building_create_list, building_create_list_img, building_create_id = [], [], []
			job_site_create_list, job_site_create_list_img, job_site_create_id = [], [], []
			# equipment_create_list, equipment_create_list_img, equipment_create_id = [], [], []

			# for count_v in range(0,len(file)):
			# 	for file_d in file.getlist("video_"+str(count_v)):
			# 		video_files = file_d
			# 		video_create = ProductVideo(video_id=video_files)
			# 		video_create.save()
			# 		video_create_list.append(video_create)
			# 		video_create_id.append(video_create.id)
			
			##### FOR UPC PRODUCT RESOURCES #######
			for count_product in range(0,len(file)):
				for file_d_certificate in file.getlist("certificate_file_"+str(count_product)):
					certificate_file = file_d_certificate
					extension = str(certificate_file).split('.')
					print('extensions of upc',extension)
					if extension[1] == 'png' or extension[1] == 'jpg' or extension[1] == 'jpeg':
						print('in product image')
						certificate_create_img = UPCProductResourcesImg(product_resource_file=certificate_file)
						certificate_create_img.save()
						product_create_list_img.append(certificate_create_img)
						product_create_id.append(certificate_create_img.id)
						print('product image success')

					if extension[1] == 'pdf':
						print('in pdf product')
						certificate_create = UPCProductResources(product_resource_file=certificate_file)
						certificate_create.save()
						product_create_list.append(certificate_create)
						product_create_id.append(certificate_create.id)
						print('product pdf image success')


			##### FOR TECH TIPS #######
			# for count_tech_tips in range(0,len(file)):
			# 	for file_d_certificate in file.getlist("industry_file_"+str(count_tech_tips)):
			# 		certificate_file = file_d_certificate
			# 		extension = str(certificate_file).split('.')
			# 		if extension[1] == 'png' or extension[1] == 'jpg' or extension[1] == 'jpeg':
			# 			certificate_create_img = TechTipsImg(tech_tips_file=certificate_file)
			# 			certificate_create_img.save()
			# 			tech_tips_create_list_img.append(certificate_create_img)
			# 			tech_tips_create_id.append(certificate_create_img.id)
			# 			print('tech tips image success')


			# 		if extension[1] == 'pdf':
			# 			certificate_create = TechTips(tech_tips_file=certificate_file)
			# 			certificate_create.save()
			# 			tech_tips_create_list.append(certificate_create)
			# 			tech_tips_create_id.append(certificate_create.id)
			# 			print('tech tips pdf image success')


			# ##### FOR SAFETY RESOURCES ######
			# for count_safety in range(0,len(file)):
			# 	for file_d_certificate in file.getlist("safety_datasheet_files_"+str(count_safety)):
			# 		certificate_file = file_d_certificate
			# 		extension = str(certificate_file).split('.')
			# 		if extension[1] == 'png' or extension[1] == 'jpg' or extension[1] == 'jpeg':
			# 			certificate_create_img = SafetyImg(safety_file=certificate_file)
			# 			certificate_create_img.save()
			# 			safety_create_list_img.append(certificate_create_img)
			# 			safety_create_id.append(certificate_create_img.id)

			# 		if extension[1] == 'pdf':
			# 			certificate_create = Safety(safety_file=certificate_file)
			# 			certificate_create.save()
			# 			safety_create_list.append(certificate_create)
			# 			safety_create_id.append(certificate_create.id)
			
			# ###### FOR BUILDING RESOURCES ######			
			# for count_building in range(0,len(file)):
			# 	for file_d_certificate in file.getlist("building_file_"+str(count_building)):
			# 		certificate_file = file_d_certificate
			# 		extension = str(certificate_file).split('.')
			# 		if extension[1] == 'png' or extension[1] == 'jpg' or extension[1] == 'jpeg':
			# 			certificate_create_img = BuildingImg(building_file=certificate_file)
			# 			certificate_create_img.save()
			# 			building_create_list_img.append(certificate_create_img)
			# 			building_create_id.append(certificate_create_img.id)
			# 			print('building image success')


			# 		if extension[1] == 'pdf':
			# 			certificate_create = Building(building_file=certificate_file)
			# 			certificate_create.save()
			# 			building_create_list.append(certificate_create)
			# 			building_create_id.append(certificate_create.id)
			# 			print('building pdf success')


			##### FOR JOB SITE RESOURCES #####
			for count_job_site in range(0,len(file)):
				for file_d_certificate in file.getlist("quality_file_"+str(count_job_site)):
					certificate_file = file_d_certificate
					extension = str(certificate_file).split('.')
					if extension[1] == 'png' or extension[1] == 'jpg' or extension[1] == 'jpeg':
						certificate_create_img = JobSiteImg(job_file=certificate_file)
						certificate_create_img.save()
						job_site_create_list_img.append(certificate_create_img)
						job_site_create_id.append(certificate_create_img.id)
						print('job site image success')


					if extension[1] == 'pdf':
						certificate_create = JobSite(job_file=certificate_file)
						certificate_create.save()
						job_site_create_list.append(certificate_create)
						job_site_create_id.append(certificate_create.id)
						print('job site pdf success')


			###### FOR EQUIPMENT RESOURCES #####
			# for count_equipment in range(0,len(file)):
			# 	for file_d_certificate in file.getlist("equipment_file_"+str(count_equipment)):
			# 		certificate_file = file_d_certificate
			# 		extension = str(certificate_file).split('.')
			# 		if extension[1] == 'png' or extension[1] == 'jpg' or extension[1] == 'jpeg':
			# 			certificate_create_img = EquipmentImg(equipment_file=certificate_file)
			# 			certificate_create_img.save()
			# 			equipment_create_list_img.append(certificate_create_img)
			# 			equipment_create_id.append(certificate_create_img.id)
			# 			print('equipments image success')


			# 		if extension[1] == 'pdf':
			# 			certificate_create = Equipment(equipment_file=certificate_file)
			# 			certificate_create.save()
			# 			equipment_create_list.append(certificate_create)
			# 			equipment_create_id.append(certificate_create.id)
			# 			print('equipment pdf success')



			# for count in range(0,len(file)):
			# 	for file_d in file.getlist("technical_datasheet_files_"+str(count)):
			# 		technical_datasheet_files = file_d
			# 		print('technical_datasheet_files: ', technical_datasheet_files, Technical.objects.filter(tech_datasheet=technical_datasheet_files))
			# 		tech_create = Technical(tech_datasheet=technical_datasheet_files)
			# 		tech_create.save()
			# 		tech_create_list.append(tech_create)
			# 		tech_create_id.append(tech_create.id)
			
			# for count_app in range(0,len(file)):
			# 	for file_d_app in file.getlist("application_guideline_files_"+str(count_app)):
			# 		application_guideline_files = file_d_app
			# 		app_create = Application(app_datasheet=application_guideline_files)
			# 		app_create.save()
			# 		app_create_list.append(app_create)
			# 		app_create_id.append(app_create.id)

			# for count_safety in range(0,len(file)):
			# 	for file_d_safety in file.getlist("safety_datasheet_files_"+str(count_safety)):
			# 		safety_datasheet_files = file_d_safety
			# 		safe_create = Safety(safe_datasheet=safety_datasheet_files)
			# 		safe_create.save()
			# 		safe_create_list.append(safe_create)

			product_image = request.data['product_image']
			if product_image == '':
				print('without image uploaf')
				file_data = Product.objects.create(
					merchant_id=merchant_id,
					product_name=product_name,
					total_points=total_points,
					description=desc,
					initial_point=qr_code_scan,
					a_side_batch=a_side_batch,
					a_side_set_temp=a_side_set_temp,
					b_side_set_temp=b_side_set_temp,
					hose_set_temp=hose_set_temp,
					pressure_set=pressure_set,
					mixing_chamber_size=mixing_chamber_size,
					start_drum_temp=starting_drum_temperature,
					a_side_batch_point=a_side_batch_point,
					a_side_set_temp_point=a_side_set_temp_point,
					b_side_set_temp_point=b_side_set_temp_point,
					hose_set_temp_point=hose_set_temp_point,
					pressure_set_point=pressure_set_point,
					mixing_chamber_size_point=mixing_chamber_size_point,
					image_point=photo_of_installed_foam,
					start_drum_temp_point=starting_drum_temperature_point,
					machine_type=machine_type_obj,
					substrate_type=substrate_type_obj,
					substrate_temp=substrate_temp,
					substrate_moisture=substrate_moisture,
					saftey_warning_signs_posted=safety_warning,
					mechanical_ventilation_used=mechanical_used,
					sprayer_using_fresh_air=sprayer_fresh,
					complete_after_spraying=complete_spray,
					# video_link=video_create_list,
					# technical_datasheet=tech_create_list,
					# application_guideline=app_create_list,
					# safety_datasheet=safe_create_list,
					# certificate=certificate_create_list,
					# certificate_img=certificate_create_list_img,
					product_resources=product_create_list,
					product_resources_img=product_create_list_img,
					# tech_tips=tech_tips_create_list,
					# tech_tips_img=tech_tips_create_list_img,
					# safety=safety_create_list,
					# safety_img=safety_create_list_img,
					# building=building_create_list,
					# building_img=building_create_list_img,
					job_site=job_site_create_list,
					job_site_img=job_site_create_list_img,
					# equipment=equipment_create_list,
					# equipment_img=equipment_create_list_img
				)
				print('success',file_data)
			else:
				image = request.FILES['product_image']

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
				file_data = Product.objects.create(
						merchant_id=merchant_id,
						product_name=product_name,
						total_points=total_points,
						description=desc,
						initial_point=qr_code_scan,
						a_side_batch=a_side_batch,
						a_side_set_temp=a_side_set_temp,
						b_side_set_temp=b_side_set_temp,
						hose_set_temp=hose_set_temp,
						pressure_set=pressure_set,
						mixing_chamber_size=mixing_chamber_size,
						start_drum_temp=starting_drum_temperature,
						image=image,
						a_side_batch_point=a_side_batch_point,
						a_side_set_temp_point=a_side_set_temp_point,
						b_side_set_temp_point=b_side_set_temp_point,
						hose_set_temp_point=hose_set_temp_point,
						pressure_set_point=pressure_set_point,
						mixing_chamber_size_point=mixing_chamber_size_point,
						image_point=photo_of_installed_foam,
						start_drum_temp_point=starting_drum_temperature_point,
						machine_type=machine_type_obj,
						substrate_type=substrate_type_obj,
						substrate_temp=substrate_temp,
						substrate_moisture=substrate_moisture,
						saftey_warning_signs_posted=safety_warning,
						mechanical_ventilation_used=mechanical_used,
						sprayer_using_fresh_air=sprayer_fresh,
						complete_after_spraying=complete_spray,
						# video_link=video_create_list,
						# technical_datasheet=tech_create_list,
						# application_guideline=app_create_list,
						# safety_datasheet=safe_create_list,
						product_resources=product_create_list,
						product_resources_img=product_create_list_img,
						# tech_tips=tech_tips_create_list,
						# tech_tips_img=tech_tips_create_list_img,
						# safety=safety_create_list,
						# safety_img=safety_create_list_img,
						# building=building_create_list,
						# building_img=building_create_list_img,
						job_site=job_site_create_list,
						job_site_img=job_site_create_list_img,
						# equipment=equipment_create_list,
						# equipment_img=equipment_create_list_img
						# certificate=certificate_create_list,
						# certificate_img=certificate_create_list_img,
						# equipment=equipment_create_list,
						# equipment_img=equipment_create_list_img,
						# industry=industry_create_list,
						# industry_img=industry_create_list_img,
						# building=building_create_list,
						# building_img=building_create_list_img,
						# quality=quality_create_list,
						# quality_img=quality_create_list_img
				)
			products = Product.objects.filter(is_deleted=False).all()
			pname_list=[]
			total_points_list = []
			initial_point_list = []
			image_list = []
			pid_list =[]
			merchant_name_list = []
			for p in products:
				merchant_id = p.merchant_id
				data = Merchant.objects.filter(id=int(merchant_id)).all()
				for d in data:
					merchant_name = d.full_name
					merchant_name_list.append(merchant_name)

				product_name = p.product_name
				pname_list.append(product_name)
				total_points = p.total_points
				total_points_list.append(total_points)
				pid = p.id
				pid_list.append(pid)
					
			combo = zip(pname_list,total_points_list,merchant_name_list,pid_list)
			product_list_class = True
			return render(request,'product_list.html',{'admin_combo':combo,'product_list_class':product_list_class,'add':True,'name':full_name,'is_merchant':is_merchant,'is_admin':is_admin})
		except Exception as e:
			print('exception',e)
			return HttpResponse(status=400)

class ViewProduct(APIView):
	def get(self,request,id):
		try:
			pid = id

			is_merchant = False
			is_admin = True
			product_resource_name_list, product_resource_list, equipment_name_list, equipment_list = [], [], [], []
			tech_tips_name_list, tech_tips_list, job_site_name_list, job_site_list = [], [], [], []
			safety_name_list, safety_list, building_name_list,building_list = [], [], [], []
			objectId = request.session['aid']
			values = Admin.objects.get(id=objectId)
			full_name_a = values.full_name
			full_name_a = full_name_a.capitalize()
			product = Product.objects.filter(id=pid).all()

			for p in product:
				merchant = p.merchant_id
				values1 = Merchant.objects.get(id=int(merchant))

				merchant_name = values1.full_name

				#### FOR UPC PRODUCT RESOURCES ######
				product_resources1 = p.product_resources
				if product_resources1 is not None:
					for i in range(0,len(product_resources1)):
						product_resources2 = product_resources1[i].product_resource_file
						product_resource_name = str(product_resources2).split('/')
						product_resource_name_list.append(product_resource_name[2])
						product_resource_list.append(product_resources2)
				product_resourcesImg1 = p.product_resources_img
				if product_resourcesImg1 is not None:
					for i in range(0,len(product_resourcesImg1)):
						product_resourcesImg2 = product_resourcesImg1[i].product_resource_file
						product_resourcesImgName = str(product_resourcesImg2).split('/')
						product_resource_name_list.append(product_resourcesImgName[2])
						product_resource_list.append(product_resourcesImg2)
				
				##### FOR TECH TIPS RESOURCES ######
				# tech_tips1 = p.tech_tips
				# if tech_tips1 is not None:
				# 	for i in range(0, len(tech_tips1)):
				# 		tech_tips2 = tech_tips1[i].tech_tips_file
				# 		tech_tipsname = str(tech_tips2).split('/')
				# 		tech_tips_name_list.append(tech_tipsname[2])
				# 		tech_tips_list.append(tech_tips2)
				# tech_tipsImg1 = p.tech_tips_img
				# if tech_tipsImg1 is not None:
				# 	for i in range(0, len(tech_tipsImg1)):
				# 		tech_tipsImg2 = tech_tipsImg1[i].tech_tips_file
				# 		tech_tipsImgName = str(tech_tipsImg2).split('/')
				# 		tech_tips_name_list.append(tech_tipsImgName[2])
				# 		tech_tips_list.append(tech_tipsImg2)

				# ##### FOR SAFETY DOCUMENTS #######
				# safety1 = p.safety
				# if safety1 is not None:
				# 	for i in range(0, len(safety1)):
				# 		safety2 = safety1[i].safety_file
				# 		safetyname = str(safety2).split('/')
				# 		safety_name_list.append(safetyname[2])
				# 		safety_list.append(safety2)
				# safetyImg1 = p.safety_img
				# if safetyImg1 is not None:
				# 	for i in range(0, len(safetyImg1)):
				# 		safetyImg2 = safetyImg1[i].safety_file
				# 		safetyImgName = str(safetyImg2).split('/')
				# 		safety_name_list.append(safetyImgName[2])
				# 		safety_list.append(safetyImg2)

				# ##### FOR BUILDING DOCUMENTS #######
				# building1 = p.building
				# if building1 is not None:
				# 	for i in range(0, len(building1)):
				# 		building2 = building1[i].building_file
				# 		buildingname = str(building2).split('/')
				# 		building_name_list.append(buildingname[2])
				# 		building_list.append(building2)
				# buildingImg1 = p.building_img
				# if buildingImg1 is not None:
				# 	for i in range(0, len(buildingImg1)):
				# 		buildingImg2 = buildingImg1[i].building_file
				# 		buildingImgName = str(buildingImg2).split('/')
				# 		building_name_list.append(buildingImgName[2])
				# 		building_list.append(buildingImg2)

				##### FOR JOB SITE RESOURCES #######
				job_site1 = p.job_site
				if job_site1 is not None:
					for i in range(0, len(job_site1)):
						job_site2 = job_site1[i].job_file
						job_sitename = str(job_site2).split('/')
						job_site_name_list.append(job_sitename[2])
						job_site_list.append(job_site2)
				job_siteImg1 = p.job_site_img
				if job_siteImg1 is not None:
					for i in range(0, len(job_siteImg1)):
						job_siteImg2 = job_siteImg1[i].job_file
						job_siteImgName = str(job_siteImg2).split('/')
						job_site_name_list.append(job_siteImgName[2])
						job_site_list.append(job_siteImg2)

				# equipment1 = p.equipment
				# if equipment1 is not None:
				# 	for i in range(0, len(equipment1)):
				# 		equipment2 = equipment1[i].equipment_file
				# 		equipmentname = str(equipment2).split('/')
				# 		equipment_name_list.append(equipmentname[2])
				# 		equipment_list.append(equipment2)
				# equipmentImg1 = p.equipment_img
				# if equipmentImg1 is not None:
				# 	for i in range(0, len(equipmentImg1)):
				# 		equipmentImg2 = equipmentImg1[i].equipment_file
				# 		equipmentImgName = str(equipmentImg2).split('/')
				# 		equipment_name_list.append(equipmentImgName[2])
				# 		equipment_list.append(equipmentImg2)

			product_class = True

			# video_combo = zip(video_list,vname_list)
			# tech_combo = zip(tech_list,techname_list)
			# app_combo = zip(app_list,appname_list)
			# safety_combo = zip(safety_list,safename_list)
			product_combo = zip(product_resource_list, product_resource_name_list)
			# tech_tips_combo = zip(tech_tips_list, tech_tips_name_list)
			# safety_combo = zip(safety_list, safety_name_list)
			# building_combo = zip(building_list, building_name_list)
			job_site_combo = zip(job_site_list,job_site_name_list)
			# equipment_combo = zip(equipment_list,equipment_name_list)


			context = {
				'merchant_name':merchant_name,
				# 'video_combo':video_combo,
				# 'tech_combo':tech_combo,
				# 'app_combo':app_combo,
				# 'safety_combo':safety_combo,
				# 'certificate_combo':certificate_combo,
				# 'equipment_combo': equipment_combo,
				# 'industry_combo': industry_combo,
				# 'building_combo': building_combo,
				# 'quality_combo': quality_combo,
				'product_combo': product_combo,
				# 'tech_tips_combo':tech_tips_combo,
				# 'safety_combos': safety_combo,
				# 'building_combo': building_combo,
				'job_site_combo': job_site_combo,
				# 'equipment_combo': equipment_combo,
				'is_admin':is_admin,
				'is_merchant':is_merchant,
				'name':full_name_a,
				'product_list_class':product_class,
				'product':product
			}
			return render(request,'view_product.html',context)
		except Exception as e:
			print('exception in view product',e)
			return redirect('login_error')
			

class DeleteProduct(APIView):
	def get(self,request,id):
		try:
			pid = id
			Product.objects.filter(id=pid).update(is_deleted=True)
			Batch.objects.filter(product_id=str(pid)).update(is_deleted=True)
			
			product_list_class = True
			is_admin = True
			id = request.session['aid']
			values = Admin.objects.filter(id=id).get()
			full_name = values.full_name
			full_name = full_name.capitalize()

			products = Product.objects.filter(is_deleted=False).all()
			pname_list=[]
			total_points_list = []
			initial_point_list = []
			image_list = []
			pid_list =[]
			merchant_name_list = []
			for p in products:
				merchant_id = p.merchant_id
				data = Merchant.objects.filter(id=int(merchant_id)).get()
				merchant_name = data.full_name
				merchant_name_list.append(merchant_name)

				product_name = p.product_name
				pname_list.append(product_name)
				total_points = p.total_points
				total_points_list.append(total_points)
				pid = p.id
				pid_list.append(pid)
					
			combo = zip(pname_list,total_points_list,merchant_name_list,pid_list)
			return HttpResponse(status=200)
		except Exception as e:
			return redirect('login_error')
			

class EditProduct(APIView):
	def get(self,request,id):
		try:
			pid = id
			id = request.session['aid']
			values = Admin.objects.filter(id=id).get()
			full_name = values.full_name
			full_name = full_name.capitalize()
			products = Product.objects.filter(id=pid).get()
			selected_merchant_id = products.merchant_id
			product_id = pid

			product_name_error = request.GET.get('product_name_error', False)

			#### FOR UPC PRODUCT RESOURCES ######
			product_resources_name_list, product_resources_list, product_resources_id_list = [], [], []
			product_resources = products.product_resources
			for i in range(0,len(product_resources)):
				product_resources2 = product_resources[i].product_resource_file
				product_resources3 = UPCProductResources.objects.filter(product_resource_file=product_resources2).get()
				product_resources3_id = product_resources3.id
				product_resourcesname = str(product_resources2).split('/')
				product_resources_name_list.append(product_resourcesname[2])
				product_resources_list.append(product_resources2)
				product_resources_id_list.append(product_resources3_id)

			product_resources_img = products.product_resources_img
			for i in range(0,len(product_resources_img)):
				product_resources_img2 = product_resources_img[i].product_resource_file
				product_resources_img3 = UPCProductResourcesImg.objects.filter(product_resource_file=product_resources_img2).get()
				product_resources_img3_id = product_resources_img3.id
				product_resources_imgname = str(product_resources_img2).split('/')
				product_resources_name_list.append(product_resources_imgname[2])
				product_resources_list.append(product_resources_img2)
				product_resources_id_list.append(product_resources_img3_id)
			
			# #### FOR TECH TIPS RESOURCES ######
			# tech_tips_name_list, tech_tips_list, tech_tips_id_list = [], [], []
			# tech_tips = products.tech_tips
			# if tech_tips is not None:
			# 	for i in range(0, len(tech_tips)):
			# 		tech_tips2 = tech_tips[i].tech_tips_file
			# 		tech_tips3 = TechTips.objects.filter(tech_tips_file=tech_tips2).get()
			# 		tech_tips3_id = tech_tips3.id
			# 		tech_tipsname = str(tech_tips2).split('/')
			# 		tech_tips_name_list.append(tech_tipsname[2])
			# 		tech_tips_list.append(tech_tips2)
			# 		tech_tips_id_list.append(tech_tips3_id)

			# tech_tips_img = products.tech_tips_img
			# if tech_tips_img is not None:
			# 	for i in range(0, len(tech_tips_img)):
			# 		tech_tips_img2 = tech_tips_img[i].tech_tips_file
			# 		tech_tips_img3 = TechTipsImg.objects.filter(tech_tips_file=tech_tips_img2).get()
			# 		tech_tips_img3_id = tech_tips_img3.id
			# 		tech_tips_imgname = str(tech_tips_img2).split('/')
			# 		tech_tips_name_list.append(tech_tips_imgname[2])
			# 		tech_tips_list.append(tech_tips_img2)
			# 		tech_tips_id_list.append(tech_tips_img3_id)
			
			# #### FOR SAFETY RESOURCES ######
			# safety_name_list, safety_list, safety_id_list = [], [], []
			# safety = products.safety
			# if safety is not None:
			# 	for i in range(0,len(safety)):
			# 		safety2 = safety[i].safety_file
			# 		safety3 = Safety.objects.filter(safety_file=safety2).get()
			# 		safety3_id = safety3.id
			# 		safename = str(safety2).split('/')
			# 		safety_name_list.append(safename[2])
			# 		safety_list.append(safety2)
			# 		safety_id_list.append(safety3_id)

			# safety_img = products.safety_img
			# if safety_img is not None:
			# 	for i in range(0,len(safety_img)):
			# 		safety_img2 = safety_img[i].safety_file
			# 		safety_img3 = SafetyImg.objects.filter(safety_file=safety_img2).get()
			# 		safety_img3_id = safety_img3.id
			# 		safename = str(safety_img2).split('/')
			# 		safety_name_list.append(safename[2])
			# 		safety_list.append(safety_img2)
			# 		safety_id_list.append(safety_img3_id)


			# ##### FOR BUILDING DOCUMENTS #######
			# building_name_list, building_list, building_id_list = [], [], []
			# building = products.building
			# if building is not None:
			# 	for i in range(0, len(building)):
			# 		building2 = building[i].building_file
			# 		building3 = Building.objects.filter(building_file=building2).get()
			# 		building3_id = building3.id
			# 		buildingname = str(building2).split('/')
			# 		building_name_list.append(buildingname[2])
			# 		building_list.append(building2)
			# 		building_id_list.append(building3_id)

			# building_img = products.building_img
			# if building_img is not None:
			# 	for i in range(0, len(building_img)):
			# 		building_img2 = building_img[i].building_file
			# 		building_img3 = BuildingImg.objects.filter(building_file=building_img2).get()
			# 		building_img3_id = building_img3.id
			# 		building_imgname = str(building_img2).split('/')
			# 		building_name_list.append(building_imgname[2])
			# 		building_list.append(building_img2)
			# 		building_id_list.append(building_img3_id)

			##### FOR JOB SITE RESOURCES #######
			job_site_name_list, job_site_list, job_site_id_list = [], [], []
			job_site = products.job_site
			if job_site is not None:
				for i in range(0, len(job_site)):
					job_site2 = job_site[i].job_file
					job_site3 = JobSite.objects.filter(job_file=job_site2).get()
					job_site3_id = job_site3.id
					job_sitename = str(job_site2).split('/')
					job_site_name_list.append(job_sitename[2])
					job_site_list.append(job_site2)
					job_site_id_list.append(job_site3_id)

			job_site_img = products.job_site_img
			if job_site_img is not None:
				for i in range(0, len(job_site_img)):
					job_site_img2 = job_site_img[i].job_file
					job_site_img3 = JobSiteImg.objects.filter(job_file=job_site_img2).get()
					job_site_img3_id = job_site_img3.id
					job_site_imgname = str(job_site_img2).split('/')
					job_site_name_list.append(job_site_imgname[2])
					job_site_list.append(job_site_img2)
					job_site_id_list.append(job_site_img3_id)

			# #### FOR EQUIPMENT RESOURCES ######
			# equipment_name_list, equipment_list, equipment_id_list = [], [], []
			# equipment = products.equipment
			# if equipment is not None:
			# 	for i in range(0, len(equipment)):
			# 		equipment2 = equipment[i].equipment_file
			# 		equipment3 = Equipment.objects.filter(equipment_file=equipment2).get()
			# 		equipment3_id = equipment3.id
			# 		equipmentname = str(equipment2).split('/')
			# 		equipment_name_list.append(equipmentname[2])
			# 		equipment_list.append(equipment2)
			# 		equipment_id_list.append(equipment3_id)

			# equipment_img = products.equipment_img
			# if equipment_img is not None:
			# 	for i in range(0, len(equipment_img)):
			# 		equipment_img2 = equipment_img[i].equipment_file
			# 		equipment_img3 = EquipmentImg.objects.filter(equipment_file=equipment_img2).get()
			# 		equipment_img3_id = equipment_img3.id
			# 		equipment_imgname = str(equipment_img2).split('/')
			# 		equipment_name_list.append(equipment_imgname[2])
			# 		equipment_list.append(equipment_img2)
			# 		equipment_id_list.append(equipment_img3_id)

			product_combo = zip(product_resources_name_list, product_resources_list, product_resources_id_list)
			# tech_tips_combo = zip(tech_tips_list, tech_tips_name_list, tech_tips_id_list)
			# safety_combo = zip(safety_list, safety_name_list, safety_id_list)
			# building_combo = zip(building_list, building_name_list, building_id_list)
			job_site_combo = zip(job_site_list, job_site_name_list, job_site_id_list)
			# equipment_combo = zip(equipment_list, equipment_name_list, equipment_id_list)

			is_merchant = False
			is_admin = True
			merchants = Merchant.objects.all()
			merchant_name = []
			merchant_id = []
			for merchant in merchants:
				merchant_name.append(merchant.full_name)
				merchant_id.append(merchant.id)
			merchant_combo = zip(merchant_id,merchant_name)
			context = {
				'name':full_name,
				'merchant_combo':merchant_combo,
				'is_merchant':is_merchant,
				'is_admin':is_admin,
				'merchant_id':merchant_id,
				'product_id':product_id,
				# 'tech_combo':tech_combo,
				# 'video_combo':video_combo,
				# 'app_combo':app_combo,
				# 'safety_combo':safety_combo,
				# 'certificate_combo':certificate_combo,
				# 'equipment_combo': equipment_combo,
				# 'industry_combo': industry_combo,
				# 'building_combo': building_combo,
				# 'quality_combo': quality_combo,
				'product_combo': product_combo,
				# 'tech_tips_combo':tech_tips_combo,
				# 'safety_combos': safety_combo,
				# 'building_combo': building_combo,
				'job_site_combo': job_site_combo,
				# 'equipment_combo': equipment_combo,
				'selected_merchant_id':selected_merchant_id,
				'product_list_class' : True,
				'loader':True,
				'products':products,
				'product_name_error': product_name_error,
				'substrate':SubstrateTypes.objects.all(),
				'machine':MachineTypes.objects.all()

			}
			return render(request, 'edit_product.html', context)
		except Exception as e:
			print('exception in edit product',e)
			return redirect('login_error')
			

	def post(self,request,id):
		try:
			data = request.data
			print('data-------',data)
			file = request.FILES
			is_merchant = False
			is_admin = True
			video_list = []
			tech_list = []
			app_list = []
			safety_list = []
			aid = request.session['aid']
			values = Admin.objects.filter(id=aid).get()
			products = Product.objects.filter(id=id).get()
			# technical = Technical.objects.filter(id=id).all()
			# application = Application.objects.filter(id=id).all()
			safety = Safety.objects.filter(id=id).all()
			# productvideo = ProductVideo.objects.filter(id=id).all()
			full_name = values.full_name
			full_name = full_name.capitalize()
			merchants = Merchant.objects.all()
			merchant_name = []
			merchant_id = []
			product_name = data['product_name'].strip()
			if products.product_name != product_name:
				if Product.objects.filter(product_name=product_name).exists():
					return redirect(f'/_product/{id}/?product_name_error=True', args={'product_name_error': True})

			for merchant in merchants:
				merchant_name.append(merchant.full_name)
				merchant_id.append(merchant.id)
			merchant_combo = zip(merchant_id,merchant_name)
			if data['merchant_id'] != '':
				merchant_id = data['merchant_id']
				products.merchant_id = merchant_id

			if product_name != '':
				products.product_name = product_name
			desc = data['product_description']
			if desc != '':
				products.description = desc
			a_side_batch = data['a_side_batch']
			if a_side_batch != '':
				products.a_side_batch = a_side_batch
			b_side_set_temp = data['b_side_set_temp']
			if b_side_set_temp != '':
				products.b_side_set_temp = b_side_set_temp
			a_side_set_temp = data['a_side_set_temp']
			if a_side_set_temp != '':
				products.a_side_set_temp = a_side_set_temp
			hose_set_temp = data['hot_set_temp']
			if hose_set_temp != '':
				products.hose_set_temp = hose_set_temp
			mixing_chamber_size = data['mixing_chamber_size']
			if mixing_chamber_size != '':
				products.mixing_chamber_size = mixing_chamber_size
			pressure_set = data['pressure_set']
			if pressure_set != '':
				products.pressure_set = pressure_set
			starting_drum_temperature = data['starting_drum_temperature']
			if starting_drum_temperature != '':
				products.start_drum_temp = starting_drum_temperature
			machine = data['machine_type']
			if machine != '':
				machine_type_obj = MachineTypes.objects.get(machine_type=machine)
				products.machine_type = machine_type_obj
			substrate = data['substrate_type']
			if substrate != '':
				substrate_obj = SubstrateTypes.objects.get(substrate_type=substrate)
				products.substrate_type = SubstrateTypes.objects.get(substrate_type=substrate)
			substrate_temp = data['substrate_temp']
			if substrate_temp != '':
				products.substrate_temp = substrate_temp
			substrate_moisture = data['substrate_moisture']
			if substrate_moisture != '':
				products.substrate_moisture = substrate_moisture	
			safety_warning = data['safety_warning']
			if safety_warning != '':
				products.saftey_warning_signs_posted = safety_warning
			mechanical_used = data['mechanical_used']
			if mechanical_used != '':
				products.mechanical_ventilation_used = mechanical_used
			sprayer_fresh = data['sprayer_fresh']
			if sprayer_fresh != '':
				products.sprayer_using_fresh_air = sprayer_fresh
			complete_spray = data['complete_spray']
			if complete_spray != '':
				products.complete_after_spraying = complete_spray
			qr_code_scan = data['qr_code_scan_rewards']
			if qr_code_scan != '':
				products.qr_code_scan = qr_code_scan
			a_side_batch_point = data['a_side_batch_rewards']
			if a_side_batch_point != '':
				products.a_side_batch_point = a_side_batch_point
			a_side_set_temp_point = data['a_side_set_temp_rewards']
			if a_side_set_temp_point != '':
				products.a_side_set_temp_point = a_side_set_temp_point
			b_side_set_temp_point = data['b_side_set_temp_rewards']
			if b_side_set_temp_point != '':
				products.b_side_set_temp_point = b_side_set_temp_point
			hose_set_temp_point = data['hot_set_temp_rewards']
			if hose_set_temp_point != '':
				products.hose_set_temp_point = hose_set_temp_point
			pressure_set_point = data['pressure_set_rewards']
			if pressure_set_point != '':
				products.pressure_set_point = pressure_set_point
			mixing_chamber_size_point = data['mixing_chamber_size_rewards']
			if mixing_chamber_size_point != '':
				products.mixing_chamber_size_point = mixing_chamber_size_point
			photo_of_installed_foam = data['photo_installed_foam']
			if photo_of_installed_foam != '':
				products.photo_of_installed_foam = photo_of_installed_foam
			start_drum_temp_point = data['starting_drum_temperature_point']
			if start_drum_temp_point != '':
				products.start_drum_temp_point = start_drum_temp_point
			total_points = data['total_points']
			if total_points != '':
				products.total_points = total_points
			image = request.data['product_image']
			if image == '':
				image = products.image
				products.image = image
			else:
				image = request.FILES['product_image']
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
				products.image = image
			# app_create_list = []
			# tech_create_list = []
			# video_create_list = []
			# safe_create_list, safe_create_img_list, safe_create_img, safe_create = [], [], '', ''
			product_create_list, product_create_img_list, product_create_img, product_create = [], [], '', ''
			# equipment_create_list, equipment_create_img_list, equipment_create, equipment_create_img = [], [], '', ''
			# tech_tips_create_list, tech_tips_create_img_list, tech_tips_create, tech_tips_create_img = [], [], '', ''
			# building_create_list, building_create_img_list, building_create, building_create_img = [], [], '', ''
			job_create_list, job_create_img_list, job_create, job_create_img = [], [], '', ''

			# tech_create = ''
			# video_create = ''
			# app_create = ''
			# safe_create = ''
			for k in data:
				if data[k] != '':

					# if k.startswith('safety_datasheet_files_'):
					# 	extension = str(data[k]).split('.')
					# 	if extension[1] == 'png' or extension[1] == 'jpg' or extension[1] == 'jpeg':
					# 		safe_create_img = SafetyImg(safety_file=data[k])
					# 		safe_create_img.save()
					# 		if safe_create_img != '':
					# 			safe_create_img_list.append(safe_create_img)

					# 	if extension[1] == 'pdf':
					# 		safe_create = Safety(safety_file=data[k])
					# 		safe_create.save()
					# 		if safe_create != '':
					# 			safe_create_list.append(safe_create)

					if k.startswith('certificate_file_'):
						extension = str(data[k]).split('.')

						if extension[1] == 'png' or extension[1] == 'jpg' or extension[1] == 'jpeg':
							product_create_img = UPCProductResourcesImg(product_resource_file=data[k])
							product_create_img.save()
							if product_create_img != '':
								product_create_img_list.append(product_create_img)

						if extension[1] == 'pdf':
							product_create = UPCProductResources(product_resource_file=data[k])
							product_create.save()
							if product_create != '':
								product_create_list.append(product_create)

					# if k.startswith('equipment_file_'):
					# 	extension = str(data[k]).split('.')

					# 	if extension[1] == 'png' or extension[1] == 'jpg' or extension[1] == 'jpeg':
					# 		equipment_create_img = EquipmentImg(equipment_file=data[k])
					# 		equipment_create_img.save()
					# 		if equipment_create_img != '':
					# 			equipment_create_img_list.append(equipment_create_img)

					# 	if extension[1] == 'pdf':
					# 		equipment_create = Equipment(equipment_file=data[k])
					# 		equipment_create.save()
					# 		if equipment_create != '':
					# 			equipment_create_list.append(equipment_create)

					# if k.startswith('industry_file_'):
					# 	extension = str(data[k]).split('.')

					# 	if extension[1] == 'png' or extension[1] == 'jpg' or extension[1] == 'jpeg':
					# 		tech_tips_create_img = TechTipsImg(tech_tips_file=data[k])
					# 		tech_tips_create_img.save()
					# 		if tech_tips_create_img != '':
					# 			tech_tips_create_img_list.append(tech_tips_create_img)

					# 	if extension[1] == 'pdf':
					# 		tech_tips_create = TechTips(tech_tips_file=data[k])
					# 		tech_tips_create.save()
					# 		if tech_tips_create != '':
					# 			tech_tips_create_list.append(tech_tips_create)

					# if k.startswith('building_file_'):
					# 	extension = str(data[k]).split('.')

					# 	if extension[1] == 'png' or extension[1] == 'jpg' or extension[1] == 'jpeg':
					# 		building_create_img = BuildingImg(building_file=data[k])
					# 		building_create_img.save()
					# 		if building_create_img != '':
					# 			building_create_img_list.append(building_create_img)

					# 	if extension[1] == 'pdf':
					# 		building_create = Building(building_file=data[k])
					# 		building_create.save()
					# 		if building_create != '':
					# 			building_create_list.append(building_create)

					if k.startswith('quality_file_'):
						extension = str(data[k]).split('.')

						if extension[1] == 'png' or extension[1] == 'jpg' or extension[1] == 'jpeg':
							job_create_img = JobSiteImg(job_file=data[k])
							job_create_img.save()
							if job_create_img != '':
								job_create_img_list.append(job_create_img)

						if extension[1] == 'pdf':
							job_create = JobSite(job_file=data[k])
							job_create.save()
							if job_create != '':
								job_create_list.append(job_create)

			# if products.technical_datasheet is not None:
			# 	for t in products.technical_datasheet:
			# 		tech_create_list.append(t)
			# products.technical_datasheet = tech_create_list

			# if products.video_link is not None:
			# 	for v in products.video_link:
			# 		video_create_list.append(v)
			# products.video_link = video_create_list

			# if products.safety_img is not None:
			# 	for a in products.safety_img:
			# 		safe_create_img_list.append(a)
			# products.safety_img = safe_create_img_list

			# if products.safety is not None:
			# 	for s in products.safety:
			# 		safe_create_list.append(s)
			# products.safety = safe_create_list

			if products.product_resources_img is not None:
				for c_img in products.product_resources_img:
					product_create_img_list.append(c_img)
			products.product_resources_img = product_create_img_list

			if products.product_resources is not None:
				for c in products.product_resources:
					product_create_list.append(c)
			products.product_resources = product_create_list

			# if products.equipment_img is not None:
			# 	for c_img in products.equipment_img:
			# 		equipment_create_img_list.append(c_img)
			# products.equipment_img = equipment_create_img_list

			# if products.equipment is not None:
			# 	for c in products.equipment:
			# 		equipment_create_list.append(c)
			# products.equipment = equipment_create_list

			# if products.tech_tips_img is not None:
			# 	for c_img in products.tech_tips_img:
			# 		tech_tips_create_img_list.append(c_img)
			# products.tech_tips_img = tech_tips_create_img_list

			# if products.tech_tips is not None:
			# 	for c in products.tech_tips:
			# 		tech_tips_create_list.append(c)
			# products.tech_tips = tech_tips_create_list

			# if products.building_img is not None:
			# 	for c_img in products.building_img:
			# 		building_create_img_list.append(c_img)
			# products.building_img = building_create_img_list

			# if products.building is not None:
			# 	for c in products.building:
			# 		building_create_list.append(c)
			# products.building = building_create_list

			if products.job_site_img is not None:
				for c_img in products.job_site_img:
					job_create_img_list.append(c_img)
			products.job_site_img = job_create_img_list

			if products.job_site is not None:
				for c in products.job_site:
					job_create_list.append(c)
			products.job_site = job_create_list

			products.save()
			products_1 = Product.objects.filter(is_deleted=False).all()
			pname_list=[]
			total_points_list = []
			initial_point_list = []
			image_list = []
			pid_list =[]
			merchant_name_list = []
			for p in products_1:
				merchant_id = p.merchant_id
				data_1 = Merchant.objects.filter(id=int(merchant_id)).all()
				for d in data_1:
					merchant_name_1 = d.full_name
					merchant_name_list.append(merchant_name_1)

				product_name_1 = p.product_name
				pname_list.append(product_name_1)
				total_points_1 = p.total_points
				total_points_list.append(total_points_1)
				pid_1 = p.id
				pid_list.append(pid_1)
					
			combo_1 = zip(pname_list,total_points_list,merchant_name_list,pid_list)
			product_list_class = True
			return render(request,'product_list.html',{'admin_combo':combo_1,'product_list_class':product_list_class,'edit':True,'name':full_name,'is_merchant':is_merchant,'is_admin':is_admin})
		except Exception as e:
			print(e)
			return HttpResponse(status=400)

def delete_file(request,file_name,id):
	from AllFoamTech.settings import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_STORAGE_BUCKET_NAME
	import boto3

	session = boto3.Session(
		aws_access_key_id=AWS_ACCESS_KEY_ID,
		aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
	)
	s3 = session.resource('s3')

	
	# if SafetyImg.objects.filter(id=id).exists() and file_name == 'safe':
	# 	s_img = SafetyImg.objects.filter(id=id).get()
	# if Safety.objects.filter(id=id).exists() and file_name == 'safe':
	# 	s = Safety.objects.filter(id=id).get()
	if UPCProductResources.objects.filter(id=id).exists() and file_name == 'certificate':
		c = UPCProductResources.objects.filter(id=id).get()
	if UPCProductResourcesImg.objects.filter(id=id).exists() and file_name == 'certificate':
		c_img = UPCProductResourcesImg.objects.filter(id=id).get()
	# if Equipment.objects.filter(id=id).exists() and file_name == 'equipment':
	# 	e = Equipment.objects.filter(id=id).get()
	# if EquipmentImg.objects.filter(id=id).exists() and file_name == 'equipment':
	# 	e_img = EquipmentImg.objects.filter(id=id).get()
	# if TechTips.objects.filter(id=id).exists() and file_name == 'industry':
	# 	i = TechTips.objects.filter(id=id).get()
	# if TechTipsImg.objects.filter(id=id).exists() and file_name == 'industry':
	# 	i_img = TechTipsImg.objects.filter(id=id).get()
	# if Building.objects.filter(id=id).exists() and file_name == 'building':
	# 	b = Building.objects.filter(id=id).get()
	# if BuildingImg.objects.filter(id=id).exists() and file_name == 'building':
		b_img = BuildingImg.objects.filter(id=id).get()
	if JobSite.objects.filter(id=id).exists() and file_name == 'quality':
		q = JobSite.objects.filter(id=id).get()
	if JobSiteImg.objects.filter(id=id).exists() and file_name == 'quality':
		q_img = JobSiteImg.objects.filter(id=id).get()
	products = Product.objects.all()
	for pro in products:
		
		# if SafetyImg.objects.filter(id=id).exists() and file_name == 'safe':
		# 	safeImageList = pro.safety
		# 	for safe in safeImageList:
		# 		if safe.safety_file == s.safety_file:
		# 			pro_id = pro.id
		# if Safety.objects.filter(id=id).exists() and file_name == 'safe':
		# 	safeList = pro.safety_img
		# 	for safe in safeList:
		# 		if safe.safety_file == s.safety_file:
		# 			pro_id = pro.id

		if UPCProductResources.objects.filter(id=id).exists() and file_name == 'certificate':
			product_resources_List = pro.product_resources
			print('product_resources_List-----------',product_resources_List)
			for cert in product_resources_List:
				if cert.product_resource_file == c.product_resource_file:
					pro_id = pro.id
		if UPCProductResourcesImg.objects.filter(id=id).exists() and file_name == 'certificate':
			product_resources_image_List = pro.product_resources_img
			for cert_img in product_resources_image_List:
				if cert_img.product_resource_file == c_img.product_resource_file:
					pro_id = pro.id

		# if Equipment.objects.filter(id=id).exists() and file_name == 'equipment':
		# 	equipmentList = pro.equipment
		# 	if equipmentList is not None:
		# 		for cert in equipmentList:
		# 			if cert.equipment_file == e.equipment_file:
		# 				pro_id = pro.id
		# if EquipmentImg.objects.filter(id=id).exists() and file_name == 'equipment':
		# 	equipmentImageList = pro.equipment_img
		# 	if equipmentImageList is not None:
		# 		for cert_img in equipmentImageList:
		# 			if cert_img.equipment_file == e_img.equipment_file:
		# 				pro_id = pro.id

		# if TechTips.objects.filter(id=id).exists() and file_name == 'industry':
		# 	tech_tips_List = pro.tech_tips
		# 	print('tech tips list--------------------',tech_tips_List)
		# 	if tech_tips_List is not None:
		# 		for cert in tech_tips_List:
		# 			if cert.tech_tips_file == i.tech_tips_file:
		# 				pro_id = pro.id
		# if TechTipsImg.objects.filter(id=id).exists() and file_name == 'industry':
		# 	techTipsImageList = pro.tech_tips_img
		# 	if techTipsImageList is not None:
		# 		for cert_img in techTipsImageList:
		# 			if cert_img.tech_tips_file == i_img.tech_tips_file:
		# 				pro_id = pro.id

		# if Building.objects.filter(id=id).exists() and file_name == 'building':
		# 	buildingList = pro.building
		# 	if buildingList is not None:
		# 		for cert in buildingList:
		# 			if cert.building_file == b.building_file:
		# 				pro_id = pro.id
		# if BuildingImg.objects.filter(id=id).exists() and file_name == 'building':
		# 	buildingImageList = pro.building_img
		# 	if buildingImageList is not None:
		# 		for cert_img in buildingImageList:
		# 			if cert_img.building_file == b_img.building_file:
		# 				pro_id = pro.id

		if JobSite.objects.filter(id=id).exists() and file_name == 'quality':
			jobSiteList = pro.job_site
			if jobSiteList is not None:
				for cert in jobSiteList:
					if cert.job_file == q.job_file:
						pro_id = pro.id
		if JobSiteImg.objects.filter(id=id).exists() and file_name == 'quality':
			jobSiteImageList = pro.job_site_img
			if jobSiteImageList is not None:
				for cert_img in jobSiteImageList:
					if cert_img.job_file == q_img.job_file:
						pro_id = pro.id
	p = Product.objects.filter(id=pro_id).get()

	# if SafetyImg.objects.filter(id=id).exists() and file_name == 'video':
	# 	for p1 in range(0,len(p.safety_img)):
	# 		if s.safety_file.url == str(p.safety_img[p1]):
	# 			ls = p.safety_img
	# 			dt = ls[p1]
	# 			s3.Object(AWS_STORAGE_BUCKET_NAME, "media/" + str(s.safety_file)).delete()
	# 			ls.remove(dt)
	# 			s.delete()
	# 			break
	# if Safety.objects.filter(id=id).exists() and file_name == 'safe':
	# 	for p1 in range(0,len(p.safety)):
	# 		if s.safety_file.url == str(p.safety[p1]):
	# 			ls = p.safety
	# 			dt = ls[p1]
	# 			s3.Object(AWS_STORAGE_BUCKET_NAME, "media/" + str(s.safety_file)).delete()
	# 			ls.remove(dt)
	# 			s.delete()
	# 			break
	if UPCProductResources.objects.filter(id=id).exists() and file_name == 'certificate':
		for p1 in range(0,len(p.product_resources)):
			if c.product_resource_file.url == str(p.product_resources[p1]):
				ls = p.product_resources
				dt = ls[p1]
				s3.Object(AWS_STORAGE_BUCKET_NAME, "media/" + str(c.product_resource_file)).delete()
				ls.remove(dt)
				c.delete()
				break
	if UPCProductResourcesImg.objects.filter(id=id).exists() and file_name == 'certificate':
		for p1_img in range(0,len(p.product_resources_img)):
			if c_img.product_resource_file.url == str(p.product_resources_img[p1_img]):
				ls = p.product_resources_img
				dt = ls[p1_img]
				s3.Object(AWS_STORAGE_BUCKET_NAME, "media/" + str(c_img.product_resource_file)).delete()
				ls.remove(dt)
				c_img.delete()
				break
	# if Equipment.objects.filter(id=id).exists() and file_name == 'equipment':
	# 	for p1 in range(0,len(p.equipment)):
	# 		if e.equipment_file.url == str(p.equipment[p1]):
	# 			ls = p.equipment
	# 			dt = ls[p1]
	# 			s3.Object(AWS_STORAGE_BUCKET_NAME, "media/" + str(e.equipment_file)).delete()
	# 			ls.remove(dt)
	# 			e.delete()
	# 			break
	# if EquipmentImg.objects.filter(id=id).exists() and file_name == 'equipment':
	# 	for p1_img in range(0,len(p.equipment_img)):
	# 		if e_img.equipment_file.url == str(p.equipment_img[p1_img]):
	# 			ls = p.equipment_img
	# 			dt = ls[p1_img]
	# 			s3.Object(AWS_STORAGE_BUCKET_NAME, "media/" + str(e_img.equipment_file)).delete()
	# 			ls.remove(dt)
	# 			e_img.delete()
	# 			break
	# if TechTips.objects.filter(id=id).exists() and file_name == 'industry':
	# 	for p1 in range(0,len(p.tech_tips)):
	# 		if i.tech_tips_file.url == str(p.tech_tips[p1]):
	# 			ls = p.tech_tips
	# 			dt = ls[p1]
	# 			s3.Object(AWS_STORAGE_BUCKET_NAME, "media/" + str(i.tech_tips_file)).delete()
	# 			ls.remove(dt)
	# 			i.delete()
	# 			break
	# if TechTipsImg.objects.filter(id=id).exists() and file_name == 'industry':
	# 	for p1_img in range(0,len(p.tech_tips_img)):
	# 		if i_img.tech_tips_file.url == str(p.tech_tips_img[p1_img]):
	# 			ls = p.tech_tips_img
	# 			dt = ls[p1_img]
	# 			s3.Object(AWS_STORAGE_BUCKET_NAME, "media/" + str(i_img.tech_tips_file)).delete()
	# 			ls.remove(dt)
	# 			i_img.delete()
	# 			break
	# if Building.objects.filter(id=id).exists() and file_name == 'building':
	# 	for p1 in range(0,len(p.building)):
	# 		if b.building_file.url == str(p.building[p1]):
	# 			ls = p.building
	# 			dt = ls[p1]
	# 			s3.Object(AWS_STORAGE_BUCKET_NAME, "media/" + str(b.building_file)).delete()
	# 			ls.remove(dt)
	# 			b.delete()
	# 			break
	# if BuildingImg.objects.filter(id=id).exists() and file_name == 'building':
	# 	for p1_img in range(0,len(p.building_img)):
	# 		if b_img.building_file.url == str(p.building_img[p1_img]):
	# 			ls = p.building_img
	# 			dt = ls[p1_img]
	# 			s3.Object(AWS_STORAGE_BUCKET_NAME, "media/" + str(b_img.building_file)).delete()
	# 			ls.remove(dt)
	# 			b_img.delete()
	# 			break
	if JobSite.objects.filter(id=id).exists() and file_name == 'quality':
		for p1 in range(0,len(p.job_site)):
			if q.job_file.url == str(p.job_site[p1]):
				ls = p.job_site
				dt = ls[p1]
				s3.Object(AWS_STORAGE_BUCKET_NAME, "media/" + str(q.job_file)).delete()
				ls.remove(dt)
				q.delete()
				break
	if JobSiteImg.objects.filter(id=id).exists() and file_name == 'quality':
		for p1_img in range(0,len(p.job_site_img)):
			if q_img.job_file.url == str(p.job_site_img[p1_img]):
				ls = p.job_site_img
				dt = ls[p1_img]
				s3.Object(AWS_STORAGE_BUCKET_NAME, "media/" + str(q_img.job_file)).delete()
				ls.remove(dt)
				q_img.delete()
				break
	p.save()		
	return redirect('_product/', id=pro_id)

from rest_framework.parsers import MultiPartParser, FormParser

class FileView(APIView):
	# print('class call')
	parser_classes = (MultiPartParser, FormParser)
	
	def get(self,request):
		print('in get')
		is_merchant = False
		is_admin = True
		objectId = request.session['aid']
		values = Admin.objects.filter(id=objectId).get()
		full_name = values.full_name
		full_name = full_name.capitalize()
		context = {
		'is_admin':is_admin,
		'is_merchant':is_merchant,
		'name':full_name
	}
		return render(request, 'add_file.html',context)

	def post(self, request, *args, **kwargs):
		print('in post',request.data)
		if request.data['file_name'] == 'equipment':
			print('in equipment')
			file_serializer = FileSerializer(data=request.data)
			if file_serializer.is_valid():
				file_serializer.save()
				msg = "Equipment File has been added successfully"
				return HttpResponse(status=201, content=msg)
				# return Response(file_serializer.data, status=status.HTTP_201_CREATED)
			else:
				msg = "Something went wrong, Please try again"
				return HttpResponse(status=400, content=msg)
				# return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
		if request.data['file_name'] == 'tech_tips_file':
			print('in tech tips')
			file_serializer = TechFileSerializer(data=request.data)
			if file_serializer.is_valid():
				file_serializer.save()
				msg = "Tech Tips File has been added successfully"
				return HttpResponse(status=201, content=msg)
				# return Response(file_serializer.data, status=status.HTTP_201_CREATED)
			else:
				msg = "Something went wrong, Please try again"
				return HttpResponse(status=400, content=msg)
				# return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
		if request.data['file_name'] == 'safety_file':
			print('in safety')
			file_serializer = safetyDocumentSerializer(data=request.data)
			if file_serializer.is_valid():
				file_serializer.save()
				msg = "Safety Document has been added successfully"
				return HttpResponse(status=201, content=msg)
				# return Response(file_serializer.data, status=status.HTTP_201_CREATED)
			else:
				msg = "Something went wrong, Please try again"
				return HttpResponse(status=400, content=msg)
				# return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
		else:
			print('in building')
			file_serializer = BuildingDocumentSerializer(data=request.data)
			if file_serializer.is_valid():
				file_serializer.save()
				msg = "Buiding Document has been added successfully"
				return HttpResponse(status=201, content=msg)
				# return Response(file_serializer.data, status=status.HTTP_201_CREATED)
			else:
				msg = "Something went wrong, Please try again"
				return HttpResponse(status=400, content=msg)
				# return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from collections import namedtuple

Timeline = namedtuple('Timeline', ('equipment', 'tech', 'safety', 'building'))
@api_view(['GET'])
def GetAllFileList(request):
	try:
		files = Timeline(equipment = EquipmentResources.objects.all(),
		tech = TechTipsFile.objects.all(),
		safety = safetyDocumentFile.objects.all(),
		building = BuildingDocumentFile.objects.all())

		serializer = GetAllFilesSerializer(files)
		return Response(serializer.data)
	except Exception as e:
		return HttpResponse(status=404, content="Files not found")


def GetFiles(request):
	is_merchant = False
	is_admin = True
	objectId = request.session['aid']
	values = Admin.objects.filter(id=objectId).get()
	full_name = values.full_name
	full_name = full_name.capitalize()
	equipment = EquipmentResources.objects.all()
	equipment_serializer = FileSerializer(equipment, many=True)
	tech = TechTipsFile.objects.all()
	tech_serializer = TechFileSerializer(tech, many=True)
	safety = safetyDocumentFile.objects.all()
	safety_serializer = safetyDocumentSerializer(safety, many=True)
	building = BuildingDocumentFile.objects.all()
	building_serializer = BuildingDocumentSerializer(building, many=True)

	context = {
		'is_admin':is_admin,
		'is_merchant':is_merchant,
		'name':full_name,
		'equipment':equipment_serializer.data,
		'tech':tech_serializer.data,
		'safety':safety_serializer.data,
		'building':building_serializer.data
	}
	return render(request, 'get_files.html',context)