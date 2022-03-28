from rest_framework import mixins, viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from contractor.serializers import DetailedTasksSerializer, TasksSerializer
from slp import models

# For multi-language support
from django.utils.translation import gettext_lazy as _
from django.utils.translation import activate

from userapi import validations


def get_check(request):
    res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
    print('request langugae : ', res_lan)

    if res_lan == "es":
        activate('es')

    token = request.GET.get('access_token', '')
    if token == '':
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return res_data
    try:
        user, token_list = validations.get_user_obj(token)
        res_data = {"status_code": 200, "status": "success", "message": _("request successfully checked"), "data":
            {"user": user, "token": token, "res_lan": res_lan}}
        return res_data
    except Exception as e:
        print("Exception : ", e)
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return res_data


def post_check(request):
    res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
    print('request langugae : ', res_lan)

    if res_lan == "es":
        activate('es')

    try:
        data, token = validations.check_request(request, 'token')
        print("Data : ", data, "\nToken : ", token)
    except Exception as e:
        print(e)
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return res_data
    try:
        user, token_list = validations.get_user_obj(token)
        res_data = {"status_code": 200, "status": "success", "message": _("request successfully checked"), "data":
            {"user": user, "token": token, "res_lan": res_lan}}
        return res_data
    except Exception as e:
        print(e)
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return res_data


class TasksViewSet(viewsets.GenericViewSet):

    queryset = models.Task.objects.all()
    serializer_class = DetailedTasksSerializer

    def list(self, request, *args, **kwargs):
        res = get_check(request)
        data = res['data']

        if res['status_code'] != 200:
            return Response(data=res, status=status.HTTP_401_UNAUTHORIZED)

        user, token, res_lan, status_code = data['user'], data['token'], data['res_lan'], res['status_code']
        print(user, token, res_lan)

        if res_lan == "es":
            activate('es')

        queryset = self.filter_queryset(self.get_queryset().filter(assigned_user=user))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = TasksSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = TasksSerializer(queryset, many=True)

        res_data = {"status_code": 200, "status": "success", "message": _("Successfully retrieved data"),
                    "data": serializer.data}
        return Response(data=res_data, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        try:
            res = get_check(request)
            data = res['data']

            if res['status_code'] != 200:
                return Response(data=res, status=status.HTTP_401_UNAUTHORIZED)

            user, token, res_lan, status_code = data['user'], data['token'], data['res_lan'], res['status_code']

            if res_lan == "es":
                activate('es')

            instance = self.get_object()
            print('instance : ', instance)
            serializer = self.get_serializer(instance)
            res_data = {"status_code": 200, "status": "success", "message": _("Successfully retrieved data"),
                        "data": serializer.data}
            return Response(data=res_data, status=status.HTTP_200_OK)
        except Exception as e:
            print('Exception while getting specific task : ', e)
            res_data = {"status_code": 400, "status": "fail", "message": _("BAD REQUEST. Server Problem"), "data": {}}
            return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        try:
            res = post_check(request)
            data = res['data']

            if res['status_code'] != 200:
                return Response(data=res, status=status.HTTP_401_UNAUTHORIZED)

            user, token, res_lan, status_code = data['user'], data['token'], data['res_lan'], res['status_code']

            if res_lan == "es":
                activate('es')

            task_status = request.data.get("task_status")
            print("task_status : ", task_status)

            instance = self.get_object()
            serializer = TasksSerializer(instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            if getattr(instance, '_prefetched_objects_cache', None):
                # If 'prefetch_related' has been applied to a queryset, we need to forcibly invalidate the prefetch cache
                # on the instance.
                instance._prefetched_objects_cache = {}
            res_data = {"status_code": 200, "status": "success", "message": _("Data Updated Successfully"),
                        "data": serializer.data}
            return Response(data=res_data, status=status.HTTP_200_OK)
        except Exception as e:
            print("Exception in edit status: ", e)
            res_data = {"status_code": 400, "status": "fail", "message": _("BAD REQUEST. Server Problem"), "data": {}}
            return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_only_pending_user_specific_tasks(request):
    try:
        res = get_check(request)
        data = res['data']

        if res['status_code'] != 200:
            return Response(data=res, status=status.HTTP_401_UNAUTHORIZED)

        user, token, res_lan, status_code = data['user'], data['token'], data['res_lan'], res['status_code']

        if res_lan == "es":
            activate('es')

        queryset = models.Task.objects.filter(assigned_user=user, task_status="To Do")

        serializer = TasksSerializer(queryset, many=True)

        res_data = {"status_code": 200, "status": "success", "message": _("Successfully retrieved data"),
                    "data": serializer.data}
        return Response(data=res_data, status=status.HTTP_200_OK)

    except Exception as e:
        print("Exception in get_only_pending_user_specific_tasks : ", e)
        res_data = {"status_code": 400, "status": "fail", "message": _("BAD REQUEST. Server Problem"), "data": {}}
        return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def map_qr_to_task(request, task_id, qr_id):
    try:
        res = get_check(request)
        data = res['data']

        if res['status_code'] != 200:
            return Response(data=res, status=status.HTTP_401_UNAUTHORIZED)

        user, token, res_lan, status_code = data['user'], data['token'], data['res_lan'], res['status_code']

        if res_lan == "es":
            activate('es')

        task = models.Task.objects.get(id=task_id)

        obj = models.QRTasksMapping.objects.filter(task=task)
        if obj:
            res_data = {"status_code": 400, "status": "fail",
                        "message": _("This task is already assigned to another QR code."), "data": {}}
            return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)

        models.QRTasksMapping.objects.create(task=task, qr_code=models.QRCode.objects.get(id=qr_id))

        task.task_status = "Running"
        task.save()

        res_data = {"status_code": 200, "status": "success",
                    "message": _("Task assigned to user and started successfully"), "data": {}}
        return Response(data=res_data, status=status.HTTP_200_OK)

    except Exception as e:
        print("Exception in map_qr_to_task : ", e)
        res_data = {"status_code": 400, "status": "fail", "message": _("BAD REQUEST. Server Problem"), "data": {}}
        return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
