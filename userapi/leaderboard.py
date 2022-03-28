from django.shortcuts import render,redirect

from slp import models
from userapi import serializers


def leaderboard(request):
    
    try:
        queryset = models.User.objects.all()
        serializer = serializers.LeaderUserSerializer(queryset, many=True)
        print(serializer)
        id = request.session['aid']
        a = models.Admin.objects.filter(id=id).get()
        full_name = a.full_name
        name = full_name.capitalize()
        print('name capitalize==============',name)
        data = serializer.data
        ls = [dict(x) for x in data]
        print(ls)
        ls = sorted(ls, key=lambda i: i['points'], reverse=True)
        return render(request, 'Leader-board.html', context={"data": ls, "is_admin": True, "leaderboard_class": True,'name':name})
    except Exception as e:
        print('Exception in leaderboard-list',e)
        return redirect('login_error')
        # res_data = {"status_code": 400, "status": "fail", "message": "internal server error",
        #             "data": {}}
        # return Response(data=res_data, status=status.HTTP_400_BAD_REQUEST)
        
        # res_data = {"status_code": 200, "status": "success", "message": "leader board list arrived",
        #             "data": data}
        # return Response(data=res_data, status=status.HTTP_200_OK)
