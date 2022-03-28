import os

from django.shortcuts import render, redirect
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from slp import models
from userapi import serializers
from push_notifications.models import APNSDevice, GCMDevice

from userapi.validations import define_html_paragraph


def dispute_request(request):
    try:
        id = request.session['aid']
        a = models.Admin.objects.filter(id=id).get()
        full_name = a.full_name
        name = full_name.capitalize()
        print('name capitalize==============',name)
        queryset = models.DisputeRequest.objects.all()
        serializer = serializers.DisputeRequestSerializer(queryset, many=True)

        print(serializer)
        data = serializer.data
        ls = [dict(x) for x in data]

        ls = sorted(ls, key=lambda i: i['created_at'], reverse=True)
        print(ls)

        for x in ls:
            qr = x.get('qr_id')
            qr_img = qr.qr_image.url
            fdir, fname = os.path.split(qr_img)
            ff = fname.split('.')
            x['qr_name'] = ff[0]

        for data in ls:
            msg = data.get("message")

            answer = define_html_paragraph(msg=msg)
            data["message"] = answer
        print(ls)

        return render(request, 'dispute-request.html', context={"data": ls, "is_admin": True,"disputerequest_class": True,'name':name})
    except Exception as e:
        print('Exception in user-list',e)
        return redirect('login_error')

@api_view(['POST'])
def dispute_resolved(request, id):
    # data = request.data.dict()
    # print("data : ", data)

    # qr_id = data.get('qr_id')
    # qr = models.QRCode.objects.get(id=qr_id)
    # email = data.get('email')
    fcm_list = []
    dispute = models.DisputeRequest.objects.get(id=id)
    dispute.dispute_status = "Resolved"
    dispute.save()
    user_id = dispute.user_id
    print("======>",user_id.device)
    data = user_id.device
    for x in data:
        print("===========>",x.device_fcm_token)
        fcm_list.append(x.device_fcm_token)
    gcm_reg_id = fcm_list[-1]
    fcm_device = GCMDevice.objects.create(registration_id=gcm_reg_id, cloud_message_type="FCM")
    data = fcm_device.send_message("Dispute request resolved by Admin")
    print("data===>",data)
    msg = f"Congratulations, Your dispute request resolved by Admin."
    models.Notification.objects.create(user_id=user_id, notification_msg=msg, points=0)
    userrewards = models.UserRewards.objects.get(id=dispute.opposite_user_userrewards_id_id)
    userrewards.dispute_status = "Resolved"
    userrewards.save()

    res_data = {"status_code": 200, "status": "success", "message": "status changed",
                "data": {}}
    return Response(data=res_data, status=status.HTTP_200_OK)
