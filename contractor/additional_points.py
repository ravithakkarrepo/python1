from django.shortcuts import render, redirect
from push_notifications.models import GCMDevice
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from contractor.serializers import ExtendedProductAddPointsRequestSerializer,ExtendedTaskAddPointsRequestSerializer
from slp import models


def additional_points(request):
    try:
        id = request.session['aid']
        a = models.Admin.objects.filter(id=id).get()
        full_name = a.full_name
        name = full_name.capitalize()
        print('name capitalize : ', name)

        queryset = models.ProductAddPointsRequest.objects.all()
        serializer = ExtendedProductAddPointsRequestSerializer(queryset, many=True)

        print(serializer)
        data = serializer.data
        ls = [dict(x) for x in data]

        ls = sorted(ls, key=lambda i: i['created_at'], reverse=True)
        print(ls)

        return render(request, 'addnl-points-request.html',
                      context={"data": ls, "is_admin": True, "additional_points_class": True, 'name': name})
    except Exception as e:
        print('Exception in additional_points : ', e)
        return redirect('login_error')


@api_view(['POST'])
def additional_points_request_resolved(request, add_points_request_id):
    try:
        dispute = models.ProductAddPointsRequest.objects.get(id=add_points_request_id)

        data = request.data
        flag = data['type']
        if flag == "Resolved":
            dispute.product.total_points += dispute.additional_points
            dispute.product.save()

            dispute.request_status = "Resolved"
            dispute.payment_status = "Paid"
            dispute.save()

        elif flag == "Declined":
            dispute.request_status = "Declined"
            dispute.payment_status = "Declined"
            dispute.save()

        res_data = {"status_code": 200, "status": "success", "message": "status changed", "data": {}}
        return Response(data=res_data, status=status.HTTP_200_OK)
    except Exception as e:
        print("Exception while resolving request : ", e)
        res_data = {"status_code": 400, "status": "fail", "message": "something went wrong", "data": {}}
        return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
        

#Task additional points 
def task_additional_points(request):
    try:
        id = request.session['aid']
        a = models.Admin.objects.filter(id=id).get()
        full_name = a.full_name
        name = full_name.capitalize()
        print('name capitalize :11111 ', name)

        queryset = models.TaskAddPointsRequest.objects.all()
        serializer = ExtendedTaskAddPointsRequestSerializer(queryset, many=True)

        print('serializer111111111',serializer)
        data = serializer.data
        ls = [dict(x) for x in data]

        ls = sorted(ls, key=lambda i: i['created_at'], reverse=True)
        print('ls111111111111111!:::::::',ls)

        return render(request, 'task-addnl-points-request.html',
                      context={"data": ls, "is_admin": True, "task_additional_points_class": True, 'name': name})
    except Exception as e:
        print('Exception in additional_points : ', e)
        return redirect('login_error')


@api_view(['POST'])
def task_additional_points_request_resolved(request, add_points_request_id):
    try:
        dispute = models.TaskAddPointsRequest.objects.get(id=add_points_request_id)

        data = request.data
        flag = data['type']
        if flag == "Resolved":
            dispute.additional_points
            dispute.task.save()

            dispute.request_status = "Resolved"
            dispute.payment_status = "Paid"
            dispute.save()
            taskData = models.Task.objects.get(id=dispute.task.id)
            userData = models.User.objects.get(id=taskData.assigned_user.id)
            
            userData.points += dispute.additional_points
            # userData.tempPoints = 0
            userData.save()

            models.UserRewards.objects.create(user_id=userData, task_add_points_request=dispute,
                                              reward_name="Earned Points", reward_type="Job Points",
                                              reward_points=dispute.additional_points, points_type="Credit")

            not_msg = f"Congratulations, You have earned {int(dispute.additional_points)} points from doing a task."
            models.Notification.objects.create(user_id=userData, points=int(dispute.additional_points),
                                               notification_msg=not_msg)
            tokens = [x.device_fcm_token for x in userData.device]
            fcm_device = GCMDevice.objects.create(registration_id=tokens[-1], cloud_message_type="FCM")
            fcm_device.send_message(f"Congratulations, You have earned {int(dispute.additional_points)} points from doing a task.")

        elif flag == "Declined":
            dispute.request_status = "Declined"
            dispute.payment_status = "Declined"
            dispute.save()

        res_data = {"status_code": 200, "status": "success", "message": "status changed", "data": {}}
        return Response(data=res_data, status=status.HTTP_200_OK)
    except Exception as e:
        print("Exception while resolving request : ", e)
        res_data = {"status_code": 400, "status": "fail", "message": "something went wrong", "data": {}}
        return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
