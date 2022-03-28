from django.shortcuts import render, redirect
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
import os
from contractor.serializers import ProductAddPointsRequestSerializer
from userapi import validations
from slp import models
from userapi import serializers

class Dashboard(APIView):
    """
    Contractor Dashboard which will get the count of Users, Products, Jobs, Tasks and Due Bills.
    """

    def get(self, request):
        """
            Contractor Dashboard GET API which will get the count of Users, Products, Jobs, Tasks and Due Bills.
        """
        try:
            is_contractor, dashboard_class = True, True

            cid = request.session['cid']
            if models.Contractor.objects.filter(id=cid,is_blocked=True):
                del request.session['cid']
                return redirect('contractor/login/')
            else:
                contractor = models.Contractor.objects.filter(id=cid).get()
                full_name, contractor_company = contractor.full_name.capitalize(), contractor.company_name.lower()

                count_users = models.User.objects.filter(company_name=contractor_company).all().count()
                products_count = models.Product.objects.all().count()
                job_count = models.JobCategory.objects.filter(contractor=contractor, is_deleted=False).count()
                task_count = models.Task.objects.filter(contractor=contractor, is_deleted=False).count()

                # data = models.ProductAddPointsRequest.objects.filter(requested_contractor=contractor)
                data = models.TaskAddPointsRequest.objects.filter(requested_contractor=contractor)
                fees = sum([x.amount_to_pay for x in data if x.payment_status == 'Unpaid'])

                return render(request, "Dashboard.html",
                            {'dashboard_class': dashboard_class, 'is_contractor': is_contractor,
                            'count_users': count_users, 'name': full_name, 'products_count': products_count,
                            'job_count': job_count, 'task_count': task_count, "fees": fees})
        except Exception as e:
            print('Exception in Contractor Dashboard : ', e)
            return redirect('contractor/login/')


def users(request):
    try:
        is_admin = False
        is_contractor = True

        cid = request.session['cid']
        if models.Contractor.objects.filter(id=cid,is_blocked=True):
            del request.session['cid']
            return redirect('contractor/login/')
        else:
            contractor = models.Contractor.objects.filter(id=cid).get()
            full_name = contractor.full_name
            name = full_name.capitalize()
            print('name capitalize==============', name)
            contractor_company = contractor.company_name.lower()
            users = models.User.objects.filter(company_name=contractor_company)
            print("data : ", users)

            company_namelist = []
            full_namelist = []
            emaillist = []
            is_blockedlist = []
            user_idlist = []

            for user in users:
                u_full_name = user.full_name
                print('u_full_name', u_full_name)
                full_namelist.append(u_full_name)
                email = user.email
                emaillist.append(email)
                company_name = user.company_name
                company_namelist.append(company_name)
                is_blocked = user.is_blocked
                is_blockedlist.append(is_blocked)
                user_id = user.id
                print('user_id', user_id)
                user_idlist.append(user_id)
            comb = zip(full_namelist, emaillist, company_namelist, is_blockedlist, user_idlist)
            user_class = True
            return render(request, 'contractor_panel_user_list.html',
                        {'contractor_users_class': user_class, "data": comb, "is_admin": is_admin,
                        'is_contractor': is_contractor,
                        'name': name})
    except Exception as e:
        print('Exception in user-list', e)
        return redirect('login_error')


def view_user(request, user_id):
    try:
        print('in try user')
        is_admin, is_contractor, user_class = False, True, True

        cid = request.session['cid']
        if request.method == "POST":
            print('in post----')
            user = models.User.objects.filter(id=int(user_id)).get()
            print('user-----------',user.points)
        if models.Contractor.objects.filter(id=cid,is_blocked=True):
            del request.session['cid']
            return redirect('contractor/login/')
        else:
            contractor = models.Contractor.objects.filter(id=cid).get()
            name = contractor.full_name.capitalize()

            user = models.User.objects.filter(id=int(user_id)).get()

            full_name = user.full_name
            split_name = full_name.split(' ')
            # print("split_name : ", split_name)
            first_name = split_name[0]
            last_name = split_name[1]
            # print("before referr")
            referred_by = user.referred_by
            if referred_by is None:
                referred = "None"
            else:
                referred = models.User.objects.filter(id=referred_by).get()
                referred = referred.full_name

            created_at_list, reward_points_list, is_splitted_list, reward_type_list, qr_code_id_list, points_type_list, \
            admin_reason_list = [], [], [], [], [], [], []

            referred_by_query = models.UserRewards.objects.filter(user_id_id=user_id).exists()

            if referred_by_query:
                referred_by_data = models.UserRewards.objects.filter(user_id_id=user_id).all()
                for data in referred_by_data:
                    created_at, reward_points, is_splitted, reward_type, qr_code_id, points_type, admin_reason = \
                        data.created_at, data.reward_points, data.is_splitted, data.reward_type, data.qr_code_id, \
                        data.points_type, data.admin_reason

                    created_at_list.append(created_at)
                    reward_points_list.append(reward_points)
                    is_splitted_list.append(is_splitted)
                    reward_type_list.append(reward_type)
                    qr_code_id_list.append(qr_code_id)
                    points_type_list.append(points_type)
                    admin_reason_list.append(admin_reason)

            else:
                created_at_list = ''
                reward_points_list = ''
                is_splitted_list = ''
                reward_type_list = ''
                qr_code_id_list = ''
                points_type_list = ''
                admin_reason_list = ''
                comb = ''
                # print('reward does not exist')

            comb = zip(created_at_list, reward_points_list, is_splitted_list, reward_type_list, qr_code_id_list,
                    points_type_list, admin_reason_list)

            lifetime_points = validations.user_lifetime_points(user)

            tasks = models.Task.objects.filter(contractor=contractor, assigned_user=user)
            # QR scann history
            queryset = models.UserRewards.objects.all().filter(originally_scanned=True, qr_status="Completed", user_id = int(user_id))
            serializer = serializers.ScannedQRSerializer(queryset, many=True)
            # print('11111111111',serializer.data)  
            data = serializer.data
            ls = [dict(x) for x in data]
            # print(ls)
            for x in ls:
                ans = dict(x.get("user_id"))
                x['user_id'] = ans
                ans = dict(x.get("qr_code"))
                x['qr_code'] = ans

                qr = x["qr_code"]["qr_image"]
                fdir, fname = os.path.split(qr)
                ff = fname.split('.')
                x["qr_code"]["qr_image"] = ff[0]

            # print("new ls : ", ls)
            ls = sorted(ls, key=lambda i: i['created_at'], reverse=True)
            context = {
                'first_name': first_name, 'last_name': last_name, 'name': name, 'email': user.email, 'phone': user.phone,
                "image": user.img_thumbnail, 'company_name': user.company_name, 'available_points': user.points,
                'lifetime_earned_points': lifetime_points, 'referred': referred, 'referral_code': user.referral_code,
                'is_admin': is_admin, 'is_contractor': is_contractor, 'add_line1': user.address.add_line1,
                'add_line2': user.address.add_line2, 'city': user.address.city, 'state': user.address.state,
                'country': user.address.country, 'zip_code': user.address.zip_code, 'is_blocked': user.is_blocked,
                'user_id': user_id, 'points': user.points, 'contractor_users_class': user_class, 'comb': comb, "tasks": tasks,
                "data": ls
            }
            return render(request, 'contractor_panel_user_details.html', context)
    except Exception as e:
        print('login_error in view_list', e)
        return redirect('login_error')


def add_points(request):
    try:
        print('in post try')
        is_admin, is_contractor, user_class = False, True, True
    except Exception as e:
        print('no except',e)

def qr_details(request, id):
    is_admin, is_contractor, user_class = False, True, True
    queryset = models.UserRewards.objects.get(id=id)
    serializer = serializers.ScannedQRSerializer(queryset)

    print("data : ", serializer.data)
    try:
        data = serializer.data
        # ls = [dict(x) for x in data]
        # print(ls)

        cid = request.session['cid']
        if models.Contractor.objects.filter(id=cid,is_blocked=True):
            del request.session['cid']
            return redirect('contractor/login/')
        else:
            contractor = models.Contractor.objects.filter(id=cid).get()
            name = contractor.full_name.capitalize()

            # print("dispute : ", (data.get("dispute_requests")))
            from json import loads, dumps
            dispute = data.get("dispute_requests")
            for x in dispute:
                y = loads(dumps(x))
                ind = dispute.index(x)
                dispute[ind] = y
            # print("dispute_requests : ", data['dispute_requests'])
            user_id = dict(data.get("user_id"))
            data['user_id'] = user_id

            qr_code = dict(data.get("qr_code"))
            data['qr_code'] = qr_code

            qr = data["qr_code"]["qr_image"]
            fdir, fname = os.path.split(qr)
            ff = fname.split('.')
            data["qr_code"]["qr_image"] = ff[0]

            # ls = sorted(ls, key=lambda i: i['id'], reverse=True)
            # print("new ls : ", data)

    except Exception as e:
        print("exception : ", e)
    else:
        return render(request, 'qr-code-history.html', context={"data": data, 'is_admin': is_admin, "is_contractor": is_contractor,
                                                                'name':name, 'contractor_users_class': user_class})


class ProductList(APIView):
    def get(self, request):
        try:
            cid = request.session['cid']
            if models.Contractor.objects.filter(id=cid,is_blocked=True):
                del request.session['cid']
                return redirect('contractor/login/')
            else:
                contractor = models.Contractor.objects.filter(id=cid).get()
                full_name = contractor.full_name
                full_name = full_name.capitalize()

                is_contractor = True
                products = models.Product.objects.filter(is_deleted=False).all()
                pname_list = []
                total_points_list = []
                pid_list = []
                merchant_names = []
                for product in products:
                    product_name = product.product_name
                    pname_list.append(product_name)

                    total_points = product.total_points
                    total_points_list.append(total_points)

                    pid = product.id
                    pid_list.append(pid)

                    merchant_id = product.merchant_id
                    merchant = models.Merchant.objects.get(id=int(merchant_id))
                    merchant_name = merchant.full_name
                    merchant_names.append(merchant_name)

                combo = zip(merchant_names, pname_list, total_points_list, pid_list)
                product_list_class = True
                return render(request, 'product_list.html',
                            {'product_list_class': product_list_class, 'is_contractor': is_contractor, 'name': full_name,
                            'contractor_combo': combo})
        except Exception as e:
            print('Exception-->', e)
            return redirect('contractor/login/')


class ProductDetails(APIView):
    def get(self, request, product_id):
        try:
            is_contractor = True

            tech_list, app_list, safety_list, video_list, certificate_list, vname_list, techname_list, safename_list, \
            appname_list, certificatename_list = [], [], [], [], [], [], [], [], [], []

            cid = request.session['cid']
            if models.Contractor.objects.filter(id=cid,is_blocked=True):
                del request.session['cid']
                return redirect('contractor/login/')
            else:
                contractor = models.Contractor.objects.filter(id=cid).get()
                full_name = contractor.full_name
                full_name = full_name.capitalize()

                products = models.Product.objects.filter(id=product_id).all()
                for product in products:

                    merchant_id = int(product.merchant_id)
                    merchant = models.Merchant.objects.get(id=merchant_id)
                    merchant_name = merchant.full_name

                    video_link = product.video_link
                    for i in range(0, len(video_link)):
                        v2 = video_link[i].video_id
                        vname = str(v2).split('/')
                        vname_list.append(vname[2])
                        video_list.append(v2)

                    tech1 = product.technical_datasheet
                    for i in range(0, len(tech1)):
                        tech2 = tech1[i].tech_datasheet
                        techname = str(tech2).split('/')
                        techname_list.append(techname[2])
                        tech_list.append(tech2)

                    app1 = product.application_guideline
                    for i in range(0, len(app1)):
                        app2 = app1[i].app_datasheet
                        appname = str(app2).split('/')
                        appname_list.append(appname[2])
                        app_list.append(app2)

                    safety1 = product.safety_datasheet
                    for i in range(0, len(safety1)):
                        safety2 = safety1[i].safe_datasheet
                        safename = str(safety2).split('/')
                        safename_list.append(safename[2])
                        safety_list.append(safety2)

                    certificate1 = product.certificate
                    for i in range(0, len(certificate1)):
                        certificate2 = certificate1[i].certificate_file
                        certificatename = str(certificate2).split('/')
                        certificatename_list.append(certificatename[2])
                        certificate_list.append(certificate2)

                    certificateImg1 = product.certificate_img
                    for i in range(0, len(certificateImg1)):
                        certificateImg2 = certificateImg1[i].certificate_file
                        certificateImgName = str(certificateImg2).split('/')
                        certificatename_list.append(certificateImgName[2])
                        certificate_list.append(certificateImg2)

                product_class = True

                video_combo = zip(video_list, vname_list)
                tech_combo = zip(tech_list, techname_list)
                app_combo = zip(app_list, appname_list)
                safety_combo = zip(safety_list, safename_list)
                certificate_combo = zip(certificate_list, certificatename_list)

                context = {
                    'merchant_name': merchant_name,
                    'video_combo': video_combo,
                    'tech_combo': tech_combo,
                    'app_combo': app_combo,
                    'safety_combo': safety_combo,
                    'certificate_combo': certificate_combo,
                    'is_contractor': is_contractor,
                    'name': full_name,
                    # 'total_points':total_points,
                    'product_list_class': product_class,
                    'product': product
                }
                return render(request, 'contractor_panel_view_product.html', context)
        except Exception as e:
            print('Exception-->', e)
            return redirect('contractor/login/')


@api_view(["GET"])
def get_charge_accordingly_points(request):
    try:
        print(request.session['cid'], request.GET)
        data = request.GET
        points = data['points']
        admin_settings = models.AdminSettings.objects.get(id=1)
        contractor_panel_no_of_points_to_one_usd = admin_settings.contractor_panel_no_of_points_to_one_usd

        returned_dollar = int(points) / contractor_panel_no_of_points_to_one_usd

        return Response(status=status.HTTP_200_OK, data={"returned_dollar": returned_dollar})
    except Exception as e:
        print("Exception while charging prediction for contractor : ", e)
        return Response(status=status.HTTP_400_BAD_REQUEST, data={})


@api_view(["POST"])
def product_add_points(request):
    try:
        cid = request.session['cid']
        contractor = models.Contractor.objects.filter(id=cid).get()
        full_name = contractor.full_name
        full_name = full_name.capitalize()

        data = request.data
        addln_points = data['addln_points']
        expected_bill = data['expected_bill']
        pid = data['product_id']

        print(addln_points, expected_bill, pid)
        product = models.Product.objects.get(id=pid)
        models.ProductAddPointsRequest.objects.create(requested_contractor=contractor, product=product,
                                                      additional_points=addln_points, monthly_changes=expected_bill)

        return Response(status=status.HTTP_200_OK, data={"returned_dollar": addln_points})
    except Exception as e:
        print("Exception while charging prediction for contractor : ", e)
        return Response(status=status.HTTP_400_BAD_REQUEST, data={})


@api_view(["POST"])
def add_points_user_account(request):
    try:
        # cid = request.session['cid']
        # contractor = models.Contractor.objects.filter(id=cid).get()
        # full_name = contractor.full_name
        # full_name = full_name.capitalize()

        data = request.data
        print('data----',data)
        addln_points = data['addln_points']
        # expected_bill = data['expected_bill']
        # pid = data['product_id']

        print(addln_points)
        user = models.User.objects.filter(id=int(user_id)).get()
        # product = models.Product.objects.get(id=pid)
        # models.ProductAddPointsRequest.objects.create(requested_contractor=contractor, product=product,
        #                                               additional_points=addln_points, monthly_changes=expected_bill)

        return Response(status=status.HTTP_200_OK, data={"returned_dollar": addln_points})
    except Exception as e:
        print("Exception while Adding Points to user Account : ", e)
        return Response(status=status.HTTP_400_BAD_REQUEST, data={})

def due_bills_html(request):
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

            data = models.ProductAddPointsRequest.objects.filter(requested_contractor=contractor)
            fees = sum([x.monthly_changes for x in data if x.payment_status == 'Unpaid'])

            context = {'is_contractor': True, 'name': full_name, 'due_bills_class': True, 'fees': fees}
            return render(request, 'contractor_bills_due.html', context=context)
    except Exception as e:
        print("Exception while listing due bills : ", e)
        return redirect('contractor/login/')


@api_view(["GET"])
def due_bills(request):
    """
    GET api for getting data for Due Bills HTML page Data Table from Ajax Call.
    :param request: cid in request.session.
    :return: Json object of containing data parameter of value list of Due Bills as below
    {
    "data": [{
            "merchant_name": "JD",
            "product_name": "Demo",
            "additional_points": 234,
            "payment_status": "Declined",
            "created_at": "2020-01-16 06:13:54"
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
        data = models.ProductAddPointsRequest.objects.filter(requested_contractor=contractor)
        ser_data = ProductAddPointsRequestSerializer(data, many=True)
        res = {"data": ser_data.data}
        return Response(data=res)
    except Exception as e:
        print("Exception while listing due bills : ", e)
        return Response(status=status.HTTP_400_BAD_REQUEST, data={})
