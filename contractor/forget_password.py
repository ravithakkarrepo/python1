from AllFoamTech import settings
import hashlib

from django.core import mail
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from rest_framework.views import APIView
from django.contrib.sites.shortcuts import get_current_site

from jake import get_base64_hashed
from slp import models


class ForgotPassword(APIView):
    def post(self, request):
        try:
            print('forgot_password')
            email = request.POST.get('email')
            print('email->', email)
            if models.Contractor.objects.filter(email=email, is_deleted=False, is_blocked=False).exists():
                contractor = models.Contractor.objects.filter(email=email, is_deleted=False, is_blocked=False).get()
                contractor_id = contractor.id

                current_site = get_current_site(request)
                domain = current_site.domain

                print("domain : ", domain)

                url = f"http://{domain}/contractor/reset/password/{contractor_id}"
                print("url : ", url)
                is_contractor = True
                subject = 'Reset Password for Contractor'
                html_message = render_to_string('mail.html', {'url': url, 'contractor_id': contractor_id,
                                                              'is_contractor': is_contractor})
                plain_message = strip_tags(html_message)
                from_email = settings.DEFAULT_FROM_EMAIL
                to = email
                mail.send_mail(subject, plain_message, from_email, [to], html_message=html_message)
                print('mail-->', mail)
                return HttpResponse(status=200)
            else:
                print('Email is wrong')
                return False
        except Exception as e:
            print('Exception-->', e)
            return redirect('contractor/login/')


class ResetPassword(APIView):
    def get(self, request, contractor_id):
        try:
            is_admin = False
            is_contractor = True

            current_site = get_current_site(request)
            domain = current_site.domain

            if models.Contractor.objects.filter(id=contractor_id).exists():
                url = f"http://{domain}/contractor/reset/password/{contractor_id}"
                return render(request, 'reset_password.html',
                              {'id': contractor_id, "url": url, 'is_admin': is_admin, 'is_contractor': is_contractor})
            return HttpResponse(status=200)

        except Exception as e:
            print('Exception-->', e)
            return redirect('contractor/login/')

    def post(self, request, contractor_id):
        try:
            data = request.data
            new_password = data['new_password']
            iter = 2000
            salt = "random_salt"
            hashed_pass = get_base64_hashed(new_password, salt, iter, hashlib.sha256)
            print('hashed_pass-------', hashed_pass)
            models.Contractor.objects.filter(id=contractor_id).update(password=hashed_pass)
            return redirect('contractor/login/')
        except Exception as e:
            print('Exception-->', e)
            return redirect('contractor/login/')


class ChangePassword(APIView):
    def get(self, request):
        try:
            is_admin = False
            is_contractor = True
            print('ChangePassword get merchant')
            cid = request.session['cid']
            contractor = models.Contractor.objects.filter(id=cid).get()
            name = contractor.full_name
            name = name.capitalize()
            dbpassw = contractor.password
            print('dbpassw----', dbpassw)
            return render(request, 'change_password.html',
                          {'a_values': contractor, 'is_admin': is_admin, 'is_contractor': is_contractor, 'name': name})
        except Exception as e:
            print('Exception-->', e)
            return redirect('login')

    def post(self, request):
        try:
            print('ChangePassword post merchant')
            cid = request.session['cid']
            data = request.data
            old_password = data['old_password']
            new_password = data['new_password']
            confirm_password = data['confirm_password']
            is_admin = False
            is_contractor = True
            contractor = models.Contractor.objects.filter(id=cid).get()
            name = contractor.full_name
            name = name.capitalize()
            passw = contractor.password
            iter = 2000
            salt = "random_salt"
            old_hashed_pass = get_base64_hashed(old_password, salt, iter, hashlib.sha256)
            new_hashed_pass = get_base64_hashed(new_password, salt, iter, hashlib.sha256)
            # confirm_hashed_pass = get_base64_hashed(confirm_password, salt, iter, hashlib.sha256)

            if old_hashed_pass == passw:
                models.Contractor.objects.filter(id=cid).update(password=new_hashed_pass)
                return HttpResponse(status=200)
            else:
                print("Password incorrect")
                return HttpResponse(status=400)
        except Exception as e:
            print('Exception-->', e)
            return redirect('contractor/login/')
