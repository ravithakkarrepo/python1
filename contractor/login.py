import hashlib
from django.http import HttpResponse
from django.shortcuts import redirect, render
from rest_framework.views import APIView
from jake import get_base64_hashed

from slp import models


class Login(APIView):
    def get(self, request):
        try:
            if 'cid' in request.session:
                return redirect('contractor/dashboard')
            else:
                email = ''
                password = ''
                remember_me_on = ''
                contractor_login = True
                if 'email' in request.session:
                    email = request.session['email']
                if 'password' in request.session:
                    password = request.session['password']
                if 'remember_me_on' in request.session:
                    remember_me_on = request.session['remember_me_on']
                return render(request, 'contractor_login.html',
                              {'contractor_login': contractor_login, 'email': email, 'password': password,
                               'remember_me_on': remember_me_on})
        except Exception as e:
            print('Exception-->', e)
            return HttpResponse(status=404)

    def post(self, request):
        try:
            is_contractor = False
            data = request.data
            print(data)
            remember_me = ''
            remember_me_on = False
            email = data['email']
            password = data['password']
            print(email, password)
            if 'remember_me' in data:
                print('if')
                remember_me = data['remember_me']
            else:
                print('else')
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
            print(email, hashed_pass)
            if models.Contractor.objects.filter(email=email, password=hashed_pass).exists():
                if models.Contractor.objects.filter(email=email, is_blocked=True):
                    error = 'You are blocked. Please Contact to Admin here.! (allfoamtech@gmail.com)'
                    if 'email' in request.session:
                        email = request.session['email']
                    if 'password' in request.session:
                        password = request.session['password']
                    if 'remember_me_on' in request.session:
                        remember_me_on = request.session['remember_me_on']
                    return render(request, 'contractor_login.html', {'error': error, 'email': email, 'password': password,
                                                               'remember_me_on': remember_me_on})
                else:
                    c = models.Contractor.objects.filter(email=email).get()
                    request.session['cid'] = c.id
                    print("c.id : ", c.id)
                    print('request cid : ', request.session['cid'])
                    return redirect('contractor/dashboard')
            else:
                error = 'Invalid Email or Password'
                contractor_login = True
                if 'email' in request.session:
                    email = request.session['email']
                if 'password' in request.session:
                    password = request.session['password']
                if 'remember_me_on' in request.session:
                    remember_me_on = request.session['remember_me_on']
                return render(request, 'contractor_login.html',
                              {'error': error, 'remember_me_on': remember_me_on, 'email': email, 'password': password,
                               'contractor_login': contractor_login})
        except Exception as e:
            print('Exception-->', e)
            return redirect('contractor/login/')


class Logout(APIView):
    def get(self, request):
        print('logout')
        try:
            print(request.session['cid'])
            del request.session['cid']
            return redirect('contractor/login/')
        except Exception as e:
            print('Exception in contractor logout : ', e)
            return redirect('contractor/login/')
