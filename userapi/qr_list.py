import os

from django.shortcuts import render,redirect

from slp import models
from userapi import serializers


def qr_list(request):
    print('qr_list')
    try:
        print('try qr_list')
        queryset = models.UserRewards.objects.all().filter(originally_scanned=True, qr_status="Completed")
        serializer = serializers.ScannedQRSerializer(queryset, many=True)

        print('11111111111',serializer.data)  
        id = request.session['aid']
        a = models.Admin.objects.filter(id=id).get()
        full_name = a.full_name
        name = full_name.capitalize()
        print('name capitalize==============', name)
        data = serializer.data
        ls = [dict(x) for x in data]
        print(ls)
        for x in ls:
            ans = dict(x.get("user_id"))
            x['user_id'] = ans
            ans = dict(x.get("qr_code"))
            x['qr_code'] = ans

            qr = x["qr_code"]["qr_image"]
            fdir, fname = os.path.split(qr)
            ff = fname.split('.')
            x["qr_code"]["qr_image"] = ff[0]

        print("new ls : ", ls)
        ls = sorted(ls, key=lambda i: i['created_at'], reverse=True)
        return render(request, 'qr-codes.html', context={"data": ls, "is_admin": True, "qrcode_class": True,'name':name})

    except Exception as e:
        print('Exception in qr-list',e)
        return redirect('login_error')
        # res_data = {"status_code": 200, "status": "success", "message": "leader board list arrived",
        #             "data": data}
        # return Response(data=res_data, status=status.HTTP_200_OK)


def qr_details(request, id):
    queryset = models.UserRewards.objects.get(id=id)
    serializer = serializers.ScannedQRSerializer(queryset)

    # print("data : ", serializer.data)
    try:
        data = serializer.data
        # ls = [dict(x) for x in data]
        # print(ls)

        id = request.session['aid']
        a = models.Admin.objects.filter(id=id).get()
        full_name = a.full_name
        name = full_name.capitalize()

        print("dispute : ", (data.get("dispute_requests")))
        from json import loads, dumps
        dispute = data.get("dispute_requests")
        for x in dispute:
            y = loads(dumps(x))
            ind = dispute.index(x)
            dispute[ind] = y
        print("dispute_requests : ", data['dispute_requests'])
        user_id = dict(data.get("user_id"))
        data['user_id'] = user_id

        qr_code = dict(data.get("qr_code"))
        data['qr_code'] = qr_code

        qr = data["qr_code"]["qr_image"]
        fdir, fname = os.path.split(qr)
        ff = fname.split('.')
        data["qr_code"]["qr_image"] = ff[0]

        # ls = sorted(ls, key=lambda i: i['id'], reverse=True)
        print("new ls : ", data)

    except Exception as e:
        print("exception : ", e)
    else:
        return render(request, 'qr-code-history.html', context={"data": data, "is_admin": True, "qrcode_class": True,
                                                                'name':name})
