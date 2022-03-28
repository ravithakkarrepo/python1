from django.shortcuts import redirect, render
from rest_framework import status
from rest_framework.decorators import api_view

# For multi-language support
from django.utils.translation import gettext_lazy as _
from django.utils.translation import activate
from rest_framework.response import Response

from slp.models import Admin
from upc.models import UPCUserRating
from userapi import validations


@api_view(["POST"])
def rating(request):
    res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
    print('request langugae : ', res_lan)

    if res_lan == "es":
        activate('es')
        pass

    try:
        data, token = validations.check_request(request, 'token')
        print("Data : ", data, "\nToken : ", token)
    except Exception as e:
        print(e)
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
    try:
        user, token_list = validations.get_user_obj(token)
    except Exception as e:
        print(e)
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

    try:
        rating = int(data['rating'])

        if rating not in range(1, 6):
            res_data = {"status_code": 401, "status": "fail", "message": _("Rating must in between 1 to 5."),
                        "data": {}}
            return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)

        rate, created = UPCUserRating.objects.get_or_create(user=user)
        rate.rating = rating
        rate.save()

        ret_data = {"status": "success", "status_code": 200, "message": "User rating submitted successfully",
                    "data": {}}
        return Response(data=ret_data, status=status.HTTP_200_OK)
    except Exception as e:
        print("Exception : ", e)
        ret_data = {"status": "fail", "status_code": 400, "message": "Something went wrong", "data": {}}
        return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)


def user_ratings_admin_panel(request):
    try:
        is_admin, is_merchant, rating_class = True, False, True

        name = Admin.objects.get(id=request.session['aid']).full_name.capitalize()
        data = UPCUserRating.objects.all().order_by('-updated_at')

        return render(request, 'upc_ratings.html',
                      {"is_admin": is_admin, 'is_merchant': is_merchant, 'name': name, 'data': data,
                       'rating_class': rating_class})
    except Exception as e:
        print(e)
        return redirect('login_error')
