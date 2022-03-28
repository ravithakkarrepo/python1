import datetime, hashlib
import os

from bson import ObjectId
from django.core import mail
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from rest_framework.views import APIView
from jake import get_base64_hashed
from slp import models
from AllFoamTech import settings
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.sites.shortcuts import get_current_site

from contractor.serializers import TaskAddPointsRequestSerializer


def contractor_list(request):
    """
    For Contractor List Page in Admin Panel
    """
    try:
        is_admin, is_contractor = True, False
        c_id_list, full_namelist, company_namelist, email_list, phone_list = [], [], [], [], []

        id = request.session['aid']
        a_values = models.Admin.objects.filter(id=id).get()
        name = a_values.full_name.capitalize()

        contractors = models.Contractor.objects.all()
        for contractor in contractors:
            c_id_list.append(contractor.id)
            full_namelist.append(contractor.full_name)
            company_namelist.append(contractor.company_name)
            email_list.append(contractor.email)
            phone_list.append(contractor.phone)
        data = zip(c_id_list, full_namelist, company_namelist, email_list, phone_list)
        contractor_class = True
        return render(request, 'contractor_list.html', {'data': data, "is_admin": is_admin, 'name': name,
                                                        'contractor_class': contractor_class,
                                                        'is_contractor': is_contractor})
    except Exception as e:
        print('Exception in Contractor List Page : ', e)
        return redirect('login_error')


# For Adding New Contractor in Admin Panel
def contractor(request):
    is_admin, is_contractor = True, False
    date = str(datetime.datetime.now())
    try:
        success, not_success, already_exists, duplicate_company_name = False, False, False, False

        id = request.session['aid']
        values = models.Admin.objects.filter(id=id).get()
        name = values.full_name
        name = name.capitalize()

        if request.method == 'POST':
            # full_name = request.POST.get('full_name')
            company_name = request.POST.get('company_name')
            contact_name = request.POST.get('contact_name1')
            address = request.POST.get('address1')
            email = request.POST.get('email1')
            phone = request.POST.get('phone1')
            contact_name2 = request.POST.get('contact_name2')
            address2 = request.POST.get('address2')
            email2 = request.POST.get('email2')
            phone2 = request.POST.get('phone2')
            
            token_id = str(ObjectId())
            if models.Contractor.objects.filter(email=email).exists():
                already_exists = True
            elif company_name.lower().strip() in [(x.company_name).lower() for x in models.Contractor.objects.all()]:
                duplicate_company_name = True

            else:
                add = models.Address.objects.create()
                print('add----',add)
                contractor = models.Contractor.objects.create(full_name=company_name, company_name=company_name, contact_name=contact_name, email=email, phone=phone,
                                                              address=add, token_id=token_id, contact_name2=contact_name2, email2=email2, phone2=phone2)

                print('contractor0----',contractor)
                models.Address.objects.filter(id=add.id).update(contractor_id=contractor.id, add_line1=address, add_line2=address2)
                contractor.address = models.Address.objects.get(id=add.id)
                contractor.save()

                subject = 'Contractor Activation Link for Sprayer Loyalty Program'
                current_site = get_current_site(request)
                domain = current_site.domain
                url = f"http://{domain}/reset_password/contractor/{contractor.id}"
                html_message = render_to_string('new_mail.html',
                                                {'url': url, 'is_contractor': is_contractor, "is_admin": is_admin,
                                                 'first_name': company_name, 'token_id': token_id})
                plain_message = strip_tags(html_message)
                from_email = settings.DEFAULT_FROM_EMAIL
                to = email
                mail.send_mail(subject, plain_message, from_email, [to], html_message=html_message)
                print(';mail',mail)
                if mail and contractor:
                    success = True
                else:
                    not_success = True
        contractor_class = True
        return render(request, 'add_contractor.html',
                      {'loader': True, 'contractor_class': contractor_class, 'is_admin': is_admin,
                       'is_contractor': is_contractor, 'date': date, 'name': name, 'success': success,
                       'not_success': not_success, 'already_exists': already_exists, 'duplicate_company_name':
                           duplicate_company_name})
    except Exception as e:
        print('Exception in Add Contractor : ', e)
        return redirect('login_error')


# For Contractor Set Password, in GET method, the mail page will display AND in POST method, password will be set
class ContractorResetPassword(APIView):
    def get(self, request, contractor_id):
        try:
            is_admin, is_contractor = False, True
            if models.Contractor.objects.filter(id=contractor_id, is_activated=False).exists():
                current_site = get_current_site(request)
                domain = current_site.domain
                url = f"http://{domain}/reset_password/contractor/{contractor_id}"
                return render(request, 'reset_password.html',
                              {'contractor_id': contractor_id, "url": url, 'is_admin': is_admin,
                               'is_contractor': is_contractor})
            else:
                return render(request, '404.html')

        except Exception as e:
            print('Exception in GET ContractorResetPassword : ', e)
            return HttpResponse(status=404)

    def post(self, request, contractor_id):
        try:
            data = request.data
            new_password = data['new_password']
            iter = 2000
            salt = "random_salt"
            hashed_pass = get_base64_hashed(new_password, salt, iter, hashlib.sha256)
            models.Contractor.objects.filter(id=contractor_id).update(password=hashed_pass, is_activated=True)
            return redirect('contractor/login/')
        except Exception as e:
            print('Exception in POST ContractorResetPassword : ', e)
            return HttpResponse(status=404)


def view_contractor(request, contractor_id):
    try:
        is_admin, is_contractor = True, False

        a_id = request.session['aid']
        a = models.Admin.objects.filter(id=a_id).get()
        name = a.full_name
        name = name.capitalize()

        contractor = models.Contractor.objects.filter(id=contractor_id).get()

        users = models.User.objects.all().filter(company_name=contractor.company_name.lower())

        contractor_class = True
        context = {'is_admin': is_admin, 'is_contractor': is_contractor, 'name': name,
                   'contractor_class': contractor_class, 'contractor': contractor, 'users': users}

        return render(request, 'view_contractor.html', context)
    except Exception as e:
        print('Exception in contractor details page : ', e)
        return redirect('login_error')


def block_contractor(request, contractor_id):
    try:
        contractor = models.Contractor.objects.filter(id=contractor_id).get()
        is_blocked = contractor.is_blocked
        if is_blocked:
            contractor.is_blocked = False
            contractor.save()
        else:
            contractor.is_blocked = True
            contractor.save()
    except Exception as e:
        print("Exception in block contractor : ", e)
        return redirect('contractors')
    return redirect('contractors/', contractor_id=contractor_id)


def job_list(request):
    try:
        cid = request.session['cid']
        print('con id',cid)
        if models.Contractor.objects.filter(id=cid,is_blocked=True):
            del request.session['cid']
            return redirect('contractor/login/')
        else:
            contractor = models.Contractor.objects.filter(id=cid).get()
            full_name = contractor.full_name.capitalize()

            job_list = models.JobCategory.objects.filter(contractor=contractor, is_deleted=False)

            return render(request, 'job_list.html',
                        {"is_contractor": True, "name": full_name, "job_list_class": True, "job_list": job_list})
    except Exception as ex:
        print('Exception in job list page : ', ex)
        return redirect('contractor/login/')


def add_jobs(request):
    try:
        already_exists, job_add = False, False
        cid = request.session['cid']
        if models.Contractor.objects.filter(id=cid,is_blocked=True):
            del request.session['cid']
            return redirect('contractor/login/')
        else:
            contractor = models.Contractor.objects.filter(id=cid).get()
            name = contractor.full_name.capitalize()

            if request.method == 'POST':
                job_category_name = request.POST.get('job_category_name').strip()
                status = request.POST.get('status')
                if models.JobCategory.objects.filter(job_category_name__iexact=job_category_name).exists():
                    already_exists = True
                else:
                    models.JobCategory.objects.create(job_category_name=job_category_name, contractor=contractor,
                                                    status=status)
                    job_add = True
                return render(request, 'job_list.html',
                            {"is_contractor": True, "already_exists": already_exists, "job_add": job_add, "name": name,
                            "job_list_class": True})
    except Exception as ex:
        print('Exception in add job page : ', ex)
        return redirect('contractor/login/')


def task_list(request):
    try:
        cid = request.session['cid']
        if models.Contractor.objects.filter(id=cid,is_blocked=True):
            del request.session['cid']
            return redirect('contractor/login/')
        else:
            task_ids = []
            contractor = models.Contractor.objects.filter(id=cid).get()
            name = contractor.full_name
            name = name.capitalize()
            contractor_company = contractor.company_name.lower()
            users = models.User.objects.filter(company_name=contractor_company)
            job_choice = models.JobCategory.objects.filter(contractor=contractor, status='active')
            # print("users :", users)
            task = models.Task.objects.filter(contractor=contractor, is_deleted=False)
            # print('task=====', task)
            task_ids = [x.id for x in task]
            print("task_ids  :",task_ids)

            qr_ids = []
            qr_created_at_list = []
            scanned_location_list = []
            weather_info_list = []
            qr_product_name_list = []
            for x in task_ids:
                print("x :",x)
                if models.QRTasksMapping.objects.filter(task=models.Task.objects.get(id=x)).exists():
                    print('2')
                    qr = models.QRTasksMapping.objects.get(task=models.Task.objects.get(id=x))

                    img = qr.qr_code.qr_image.url
                    fdir, fname = os.path.split(img)
                    ff = fname.split('.')
                    qr_ids.append(ff[0])

                    qr_created_at = qr.qr_code.created_at
                    qr_created_at_list.append(qr_created_at)

                    qr_product_id = qr.qr_code.product_id
                    qr_product_name = models.Product.objects.get(id=int(qr_product_id))
                    qr_product_name_list.append(qr_product_name.product_name)

                    scanned_location = qr.qr_code.scanned_location
                    scanned_location_list.append(scanned_location)

                    weather_info = qr.qr_code.whether_info
                    weather_info_list.append(weather_info)

                else:
                    print('NA')
                    qr_ids.append('NA')
                    qr_created_at_list.append('NA')
                    qr_product_name_list.append('NA')
                    scanned_location_list.append('NA')
                    weather_info_list.append('NA')

            comb = zip(task,task_ids,qr_ids,qr_created_at_list,qr_product_name_list,scanned_location_list,weather_info_list)
            return render(request, 'task_list.html',
                        {"is_contractor": True, "name": name, "task_class": True, "job_choice": job_choice,
                        "users": users, "comb": comb, "qr_ids": qr_ids})
    except Exception as e:
        print('------Exception---in list task page-------', e)
        return redirect('contractor/login/')


def add_task(request):
    try:
        add_task = False
        cid = request.session['cid']
        if models.Contractor.objects.filter(id=cid,is_blocked=True):
            del request.session['cid']
            return redirect('contractor/login/')
        else:
            contractor = models.Contractor.objects.filter(id=cid).get()
            name = contractor.full_name
            name = name.capitalize()
            job_choice = models.JobCategory.objects.all()
            print("job :::",job_choice)
            # task = models.Task.objects.all()
            if request.method=="POST":
                print('---11111111111111111111--',request.POST, request.FILES)
                print('2nd print after post',request.FILES.getlist('attachment'))
                title = request.POST.get("title")
                print('title', title, type(title))
                assigned_user = request.POST.get("assigned_user")
                print('assigned_user', assigned_user, type(assigned_user))
                assigned_job = request.POST.get("assigned_job")
                print('assigned_job', assigned_job, type(assigned_job))
                description = request.POST.get("description")
                print('description', description, type(description))

                assigned_user_object = models.User.objects.get(id=assigned_user)
                print("assigned_user_object = ", assigned_user_object, type(assigned_user_object))
                assigned_job_object = models.JobCategory.objects.get(id=assigned_job)
                print("assigned_job_object = ", assigned_job_object, type(assigned_job_object))

                attachment_create_list = []

                for count_attachment in range(0, len(request.FILES)):
                    for file_d_attachment in request.FILES.getlist("attachment_file_" + str(count_attachment)):
                        attachment_file = file_d_attachment
                        print('file name----', attachment_file)
                        attachment_object = models.TaskAttachment(attachment=attachment_file)
                        attachment_object.save()
                        attachment_create_list.append(attachment_object)

                task = models.Task.objects.create(contractor=contractor, title=title,assigned_user=assigned_user_object,
                                                assigned_job=assigned_job_object, description=description, attachment=[])
                print('task', task)

                task.attachment = attachment_create_list
                task.save()
                add_task = True
                print('add_task123----', add_task)
            return render(request, 'task_list.html',
                        {"is_contractor": True, "name": name, "task_class": True, "job_choice": job_choice,
                        "add_task": add_task})
    except Exception as ex:
        print('------Exception---in add task page-------', ex)
        return redirect('contractor/login/')


def delete_task(request, id):
    print('task_delete')
    try:
        task_delete = {}
        task_del = []
        task_id = id
        task_find = models.Task.objects.filter(id=task_id)
        print('task_find-->>>>>>', task_find)
        for data in task_find:
            print('yyyyyyyyyyyyyyyyy', data.is_deleted)
            task_delete['is_deleted'] = data.is_deleted
            task_del.append(task_delete)
            print('wwwwwwwwwwww', task_del)
            models.Task.objects.filter(id=task_id, is_deleted=False).update(is_deleted=True)
        return redirect('task')
    except Exception as ex:
        print(ex)
        return render(request=request, template_name='task_list.html', context={'error': True})


def task_details(request, id):
    try:
        task_id = id
        cid = request.session['cid']
        if models.Contractor.objects.filter(id=cid, is_blocked=True):
            del request.session['cid']
            return redirect('contractor/login/')
        else:
            contractor = models.Contractor.objects.filter(id=cid).get()
            name = contractor.full_name.capitalize()
            details = models.Task.objects.get(id=task_id)
            productData = ''

            if models.QRTasksMapping.objects.filter(task=details).exists():
                mapping = models.QRTasksMapping.objects.get(task=details)
                if models.UserRewards.objects.filter(user_id=details.assigned_user, qr_code=mapping.qr_code,
                                                     originally_scanned=True, qr_status="Completed").exists():
                    productData = models.UserRewards.objects.get(user_id=details.assigned_user, qr_code=mapping.qr_code,
                                                                 originally_scanned=True, qr_status="Completed").product_activation_questions
            return render(request, 'task_details.html', {"is_contractor": True, "name": name, "details": details,
                                                         "task_class": True, "productData": productData})
    except Exception as ex:
        print('------Exception---in task_details page-------', ex)
        return redirect('contractor/login/')


@api_view(["GET"])
def get_charge_according_to_points(request):
    try:
        print(request.session['cid'], request.GET)
        data = request.GET
        points = data['points']
        tid = data['tid']
        print("points :",points)
        taskData = models.Task.objects.get(id=int(tid))
        userData = models.User.objects.get(id=taskData.assigned_user.id)
        admin_settings = models.AdminSettings.objects.get(id=1)
        contractor_panel_no_of_points_to_one_usd = admin_settings.contractor_panel_no_of_points_to_one_usd
        returned_dollar = int(points) / contractor_panel_no_of_points_to_one_usd
        userData.tempPoints = returned_dollar
        userData.save()
        return Response(status=status.HTTP_200_OK, data={"returned_dollar": returned_dollar})
    except Exception as e:
        print("Exception while charging prediction for contractor : ", e)
        return Response(status=status.HTTP_400_BAD_REQUEST, data={})


@api_view(["POST"])
def task_add_points(request):
    try:
        cid = request.session['cid']
        contractor = models.Contractor.objects.filter(id=cid).get()
        full_name = contractor.full_name
        full_name = full_name.capitalize()

        data = request.data
        addtln_points = data['addtln_points']
        expected_bill = data['expected_bill']
        pid = data['task_id']

        print(addtln_points, expected_bill, pid)
        task = models.Task.objects.get(id=pid)
        models.TaskAddPointsRequest.objects.create(requested_contractor=contractor, task=task,additional_points=addtln_points, amount_to_pay=expected_bill)

        return Response(status=status.HTTP_200_OK, data={"returned_dollar": addtln_points})
    except Exception as e:
        print("Exception while charging prediction for contractor : ", e)
        return Response(status=status.HTTP_400_BAD_REQUEST, data={})


def task_due_bills_html(request):
    """
    HTML page rendering view function for Due Bills in page in Contractor Panel.
    """
    try:
        cid = request.session['cid']
        if models.Contractor.objects.filter(id=cid,is_blocked=True):
            del request.session['cid']
            return redirect('contractor/login/')
        else:
            contractor = models.Contractor.objects.filter(id=cid).get()
            full_name = contractor.full_name.capitalize()

            data = models.TaskAddPointsRequest.objects.filter(requested_contractor=contractor)
            fees = sum([x.amount_to_pay for x in data if x.payment_status == 'Unpaid'])

            context = {'is_contractor': True, 'name': full_name, 'task_due_bills_class': True, 'fees': fees}
            return render(request, 'contractor_task_bills_due.html', context=context)
    except Exception as e:
        print("Exception while listing task due bills : ", e)
        return redirect('contractor/login/')


@api_view(["GET"])
def task_due_bills(request):
    """
    GET api for getting data for Due Bills HTML page Data Table from Ajax Call.
    :param request: cid in request.session.
    :return: Json object of containing data parameter of value list of Due Bills as below
    {
    "data": [{
            "user_name": "naina gerwani",
            "job_name": "Solulab",
            "additional_points": 12345,
            "payment_status": "Unpaid",
            "created_at": "2020-01-22 12:10:03"
        }]
    }
    """
    try:
        try:
            cid = request.session['cid']
        except Exception as e:
            print("Exception while fetching due bills data in GET api : ", e)
            res_data = {"status_code": 400, "status": "fail", "message": "Contractor is not logged in browser.", "data": {}}
            return Response(status=status.HTTP_400_BAD_REQUEST, data=res_data)

        contractor = models.Contractor.objects.get(id=cid)
        data = models.TaskAddPointsRequest.objects.filter(requested_contractor=contractor)
        print('data views::',data)
        ser_data = TaskAddPointsRequestSerializer(data, many=True)
        print('ser_data:: ',ser_data)
        res = {"data": ser_data.data}
        print('result:::',res)
        return Response(data=res)
    except Exception as e:
        print("Exception while listing due bills : ", e)
        return Response(status=status.HTTP_400_BAD_REQUEST, data={})
