from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from upc.serializers import SprayFoamTypeSerializer, SprayMachineTypeSerializer,SprayMixingChamberSerializer, SprayTypeSerializer, AmbientTemperatureSerializer, SubstrateTemperatureSerializer, StartingDrumTemperatureSerializer, SprayHumidityLevelSerializer, SpeedOfSprayingSerializer, HoseInsulatedSerializer, SprayHoseInSerializer, SubstrateSerializer, LayersSerializer
from upc import models
from rest_framework.parsers import MultiPartParser, JSONParser
from AllFoamTech.settings import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_STORAGE_BUCKET_NAME
import boto3
from userapi import validations
from django.shortcuts import render, redirect
from slp import models as slp_model

session = boto3.Session(
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
)
s3 = session.resource('s3')

# For multi-language support
from django.utils.translation import gettext_lazy as _
from django.utils.translation import activate


@api_view(['GET'])
def get_ques(request):
    res_lan = request.META.get('HTTP_ACCEPT_LANGUAGE')
    print('request langugae : ', res_lan)

    if res_lan == "es":
        activate('es')
        pass

    token = request.GET.get('access_token', '')
    if token == '':
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
    try:
        user, token_list = validations.get_user_obj(token)
    except Exception as e:
        print(e)
        res_data = {"status_code": 401, "status": "fail", "message": _("Invalid Access Token"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)

    try:
        serializer_list = []

        spray_foam_type = models.SprayFoamType.objects.all()
        print('spray_foam_type',spray_foam_type)
        serializer = SprayFoamTypeSerializer(spray_foam_type, many=True)
        print("serializer.data  : ", serializer.data)
        serializer_data = serializer.data[0]
        serializer_data['qid'] = 1
        serializer_list.append(serializer_data)

        spray_machine_type = models.SprayMachineType.objects.all()
        serializer1 = SprayMachineTypeSerializer(spray_machine_type, many=True)
        serializer_data1 = serializer1.data[0]
        serializer_data1['qid'] = 2
        serializer_list.append(serializer_data1)

        spray_mixing_chamber = models.SprayMixingChamber.objects.all()
        serializer2 = SprayMixingChamberSerializer(spray_mixing_chamber, many=True)
        serializer_data2 = serializer2.data[0]
        serializer_data2['qid'] = 3

        serializer_list.append(serializer_data2)

        spray_type = models.SprayType.objects.all()
        serializer3 = SprayTypeSerializer(spray_type, many=True)
        serializer_data3 = serializer3.data[0]
        serializer_data3['qid'] = 4

        serializer_list.append(serializer_data3)

        ambient_temperature = models.AmbientTemperature.objects.all()
        serializer4 = AmbientTemperatureSerializer(ambient_temperature, many=True)
        serializer_data4 = serializer4.data[0]
        serializer_data4['qid'] = 5
        serializer_list.append(serializer_data4)

        substrate_temperature = models.SubstrateTemperature.objects.all()
        serializer5 = SubstrateTemperatureSerializer(substrate_temperature, many=True)
        serializer_data5 = serializer5.data[0]
        serializer_data5['qid'] = 6
        serializer_list.append(serializer_data5)

        starting_drum_temperature = models.StartingDrumTemperature.objects.all()
        serializer6 = StartingDrumTemperatureSerializer(starting_drum_temperature, many=True)
        serializer_data6 = serializer6.data[0]
        serializer_data6['qid'] = 7
        serializer_list.append(serializer_data6)

        spray_humidity_level = models.SprayHumidityLevel.objects.all()
        serializer7 = SprayHumidityLevelSerializer(spray_humidity_level, many=True)
        serializer_data7 = serializer7.data[0]
        serializer_data7['qid'] = 8
        serializer_list.append(serializer_data7)

        speed_of_spraying = models.SpeedOfSpraying.objects.all()
        serializer8 = SpeedOfSprayingSerializer(speed_of_spraying, many=True)
        serializer_data8 = serializer8.data[0]
        serializer_data8['qid'] = 9
        serializer_list.append(serializer_data8)

        hose_insulated = models.HoseInsulated.objects.all()
        serializer9 = HoseInsulatedSerializer(hose_insulated, many=True)
        serializer_data9 = serializer9.data[0]
        serializer_data9['qid'] = 10
        serializer_list.append(serializer_data9)

        hose_in = models.SprayHoseIn.objects.all()
        serializer10 = SprayHoseInSerializer(hose_in, many=True)
        serializer_data10 = serializer10.data[0]
        serializer_data10['qid'] = 11
        serializer_list.append(serializer_data10)

        substrate = models.Substrate.objects.all()
        serializer11 = SubstrateSerializer(substrate, many=True)
        serializer_data11 = serializer11.data[0]
        serializer_data11['qid'] = 12
        serializer_list.append(serializer_data11)

        layers = models.Layers.objects.all()
        serializer12 = LayersSerializer(layers, many=True)
        serializer_data12 = serializer12.data[0]
        serializer_data12['qid'] = 13
        serializer_list.append(serializer_data12)

        print('serializer list:: ',serializer_list)
    except Exception as e:
        print("Exception while fetching questions : ",e)
        res_data = {"status_code": 401, "status": "fail", "message": _("Something went wrong"), "data": {}}
        return Response(data=res_data, status=status.HTTP_401_UNAUTHORIZED)
    else:
        data = {"status_code": 200, "status": "success", "message": _("Questions fetched successfully"),
                "data": serializer_list}
        return Response(data=data, status=status.HTTP_200_OK)


@api_view(["POST"])
def submit_questions(request):
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
        spray_foam_type, pressure_temp, a_side, b_side, hose_side, board_feet, density, notes = "", "", "", "", "", \
                                                                                                "", "", ""
        data = request.data.get('options')
        for question in data:
            qid = question.get('qid')

            if qid == 1:
                spray_foam_type = question.get('selected_option')

            if qid == 2:
                machine_type = question.get('selected_option')
                machine_obj = models.MachineType.objects.get(machine_name=machine_type)
            if qid == 3:
                mixing_chamber = question.get('selected_option')
                mixing_chamber_obj = models.MixingChamberSize.objects.get(mixing_size=mixing_chamber)
            if qid == 4:
                spray_type = question.get('selected_option')
                spray_type_obj = models.SprayingType.objects.get(spray_type=spray_type, mixing_size=mixing_chamber_obj,
                                                                 machine_type=machine_obj)
                pressure_temp = spray_type_obj.pressure_set_temp

            if qid == 5:
                spray_foam_obj = models.Product.objects.get(product_name=spray_foam_type)
                ambient_temp = int(question.get('selected_option'))
                ambient_temp_obj = models.AmbientTemp.objects.get(ambient_temp=ambient_temp, product=spray_foam_obj,
                                                                  mixing_chamber_size=mixing_chamber_obj)

                try:
                    a_side = ambient_temp_obj.a_side_temp.a_side_temp
                except Exception as e:
                    print("Exception in qid 5 in a side : ", e)
                    a_side = None
                try:
                    b_side = ambient_temp_obj.b_side_temp.b_side_temp
                except Exception as e:
                    print("Exception in qid 5 in b side : ", e)
                    b_side = None
                try:
                    hose_side = int(ambient_temp_obj.hose_temp.hose_temp)
                except Exception as e:
                    print("Exception in qid 5 in hose side : ", e)
                    hose_side = None

                try:
                    board_feet_obj = models.BoardFeet.objects.get(ambient_temp=ambient_temp, product=spray_foam_obj,
                                                                  mixing_chamber_size=mixing_chamber_obj)
                    board_feet = board_feet_obj.board_feet
                except Exception as e:
                    print("Exception in qid 5 in board feet : ", e)
                    board_feet = None

                try:
                    density_obj = models.Density.objects.get(ambient_temp=ambient_temp, product=spray_foam_obj,
                                                             mixing_chamber_size=mixing_chamber_obj)
                    density = density_obj.density
                except Exception as e:
                    print("Exception in qid 5 in density : ", e)
                    density = None

            if qid == 6:
                substrate_temp = question.get('selected_option')
                print("substrate_temp : ", substrate_temp)

                if substrate_temp != '' or not None:
                    spray_foam_obj = models.Product.objects.get(product_name=spray_foam_type)
                    ambient_temp = substrate_temp
                    ambient_temp_obj = models.AmbientTemp.objects.get(ambient_temp=ambient_temp, product=spray_foam_obj,
                                                                      mixing_chamber_size=mixing_chamber_obj)

                    try:
                        a_side = ambient_temp_obj.a_side_temp.a_side_temp
                    except Exception as e:
                        print("Exception in qid 6 in a side : ", e)
                        a_side = None
                    try:
                        b_side = ambient_temp_obj.b_side_temp.b_side_temp
                    except Exception as e:
                        print("Exception in qid 6 in b side : ", e)
                        b_side = None
                    try:
                        hose_side = int(ambient_temp_obj.hose_temp.hose_temp)
                    except Exception as e:
                        print("Exception in qid 6 in hose side : ", e)
                        hose_side = None

                    try:
                        board_feet_obj = models.BoardFeet.objects.get(ambient_temp=ambient_temp,
                                                                      product=spray_foam_obj,
                                                                      mixing_chamber_size=mixing_chamber_obj)
                        board_feet = board_feet_obj.board_feet
                    except Exception as e:
                        print("Exception in qid 6 in board feet : ", e)
                        board_feet = None

                    try:
                        density_obj = models.Density.objects.get(ambient_temp=ambient_temp, product=spray_foam_obj,
                                                                 mixing_chamber_size=mixing_chamber_obj)
                        density = density_obj.density
                    except Exception as e:
                        print("Exception in qid 6 in density : ", e)
                        density = None

            if qid == 7:
                starting_drum_temp = int(question.get('selected_option'))
                print("starting_drum_temp : ", starting_drum_temp)

                question_str = question.get('question')

                drum = models.StartingDrumTemperature.objects.get(question=question_str)

                recommended_starting_drum_temp = int(drum.recommended_starting_drum_temp)
                conditions = drum.conditions.all()
                print("conditions : ", conditions)
                for condition in conditions:

                    if (recommended_starting_drum_temp - starting_drum_temp) > int(condition.difference):
                        if condition.change_in_heaters != "Warning":
                            if a_side is not None:
                                a_side += int(condition.change_in_heaters)
                            if b_side is not None:
                                b_side += int(condition.change_in_heaters)
                        else:
                            a_side, b_side, hose_side = None, None, None

                            notes = condition.warning_message

            if qid == 8:
                question_str = question.get('question')
                humidity_level = int(question.get('selected_option'))
                print("humidity_level : ", humidity_level)

                humidity_obj = models.SprayHumidityLevel.objects.get(question=question_str)
                # print("ambient_temp : ", int(humidity_obj.recommended_ambient_temp))

                if humidity_level > int(humidity_obj.recommended_humidity_temp) and \
                        ambient_temp <= int(humidity_obj.recommended_ambient_temp):
                    print("a_side : ", a_side)

                    if a_side is not None:
                        a_side += int(humidity_obj.increased_temp)

            if qid == 9:
                question_str = question.get('question')

                spraying_speed = str(question.get('selected_option'))
                speed_obj = models.SpeedOfSpraying.objects.get(question=question_str)

                if hose_side is not None:
                    for x in speed_obj.spraying_speed_value.all():
                        if spraying_speed == x.spraying_speed:
                            hose_side += int(x.temperature_change)

            if qid == 10:
                question_str = question.get('question')

                insulated = question.get('selected_option')
                insulated_obj = models.HoseInsulated.objects.get(question=question_str)

                if hose_side is not None:
                    for x in insulated_obj.hose_type_insulated_value.all():
                        if insulated == x.hose_type:
                            hose_side += int(x.temperature_change)

            if qid == 11:
                question_str = question.get('question')

                hose_type = question.get('selected_option')
                hosein_obj = models.SprayHoseIn.objects.get(question=question_str)

                if hose_side is not None:
                    for x in hosein_obj.hose_in_value.all():
                        if hose_type == x.hose_in:
                            hose_side += int(x.temperature_change)

            if qid == 12:
                question_str = question.get('question')

                substrate_type = question.get('selected_option')
                substrate_obj = models.Substrate.objects.get(question=question_str)

                if a_side and b_side and hose_side is not None:
                    for x in substrate_obj.substrate_type_value.all():
                        if substrate_type == x.substrate_type:
                            a_side += x.temperature_change
                            b_side += x.temperature_change
                            hose_side += x.temperature_change

                substrate_type_obj = models.SubstrateType.objects.get(substrate_type=substrate_type)
                if board_feet is not None:
                    board_feet *= (1 - substrate_type_obj.percentage_to_yield)
                if density is not None:
                    density *= (1 - substrate_type_obj.percentage_to_yield)

            if qid == 13:
                question_str = question.get('question')

                layer = int(question.get('selected_option'))
                layer_obj = models.Layers.objects.get(question=question_str)

                for x in layer_obj.spray_layers.all():
                    if int(x.layer) == layer:
                        if board_feet is not None:
                            board_feet *= (1-(x.temperature_change/100))
                        if density is not None:
                            density *= (1-(x.temperature_change/100))

        ret_data = {"status": "success", "status_code": 200, "message": "Predicted Dashboard Retrieved Successfully",
                    "data": {"spray_foam_type": spray_foam_type, "pressure_temp": pressure_temp, "a_side": a_side,
                             "b_side": b_side, "hose_side": hose_side, "board_feet": board_feet, "density": density,
                             "notes": notes}}
        return Response(data=ret_data, status=status.HTTP_200_OK)
    except Exception as e:
        print("Exception : ", e)
        ret_data = {"status": "fail", "status_code": 400, "message": "Something went wrong while UPC dashboard prediction",
                    "data": {}}
        return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

def admin_settings(request):
    try:
        print('inide try')
        id = request.session['aid']
        a = slp_model.Admin.objects.filter(id=id).get()
        name = a.full_name
        name = name.capitalize()

        drum_temp = models.StartingDrumTemperature.objects.last()
        recommended_temp = drum_temp.recommended_starting_drum_temp

        data = models.Condition.objects.first()
        cond_difference = data.difference
        cond_change_in_heaters = data.change_in_heaters
        cond_warning_message = data.warning_message

        condition = models.Condition.objects.last()
        cond_difference1 = condition.difference
        cond_change_in_heaters1 = condition.change_in_heaters
        cond_warning_message1 = condition.warning_message

        spray_level = models.SprayHumidityLevel.objects.last()
        humidity_temp = spray_level.recommended_humidity_temp
        ambient_temp = spray_level.recommended_ambient_temp
        increased_temp = spray_level.increased_temp

        # spraying_speed = models.SpeedOfSpraying.objects.last()
        # fast_temp = spraying_speed.fast_increased_temp
        # slow_temp = spraying_speed.slow_decreased_temp

        # insulated_hose = models.HoseInsulated.objects.last()
        # well_temp = insulated_hose.well_insulated_decreased_temp
        # poor_temp = insulated_hose.poorly_insulated_increased_temp

        # hose_in = models.SprayHoseIn.objects.last()
        # sun_or_hot_temp = hose_in.sun_or_hot_asphalt_decreased_temp
        # rain_or_snow_temp = hose_in.rain_or_snow_increased_temp

        # substrate_type = models.Substrate.objects.last()
        # metal_temp = substrate_type.metal_increased_temp
        # concrete_temp = substrate_type.concrete_increased_temp

        # layer = models.Layers.objects.last()
        # get_percentage_to_yield = layer.percentage_to_yield
        return render(request, "upc_settings.html",
                      {"recommended_temp": recommended_temp, "cond_difference": cond_difference,
                       "cond_change_in_heaters": cond_change_in_heaters, "cond_warning_message": cond_warning_message,
                       "cond_difference1": cond_difference1, "cond_change_in_heaters1": cond_change_in_heaters1,
                       "cond_warning_message1": cond_warning_message1, "humidity_temp": humidity_temp,
                       "ambient_temp": ambient_temp, "increased_temp": increased_temp,
                       # "fast_temp": fast_temp,
                       # "slow_temp": slow_temp, "well_temp": well_temp, "poor_temp": poor_temp,
                       # "sun_or_hot_temp": sun_or_hot_temp, "rain_or_snow_temp": rain_or_snow_temp,
                       # "metal_temp": metal_temp, "concrete_temp": concrete_temp,
                       # "get_percentage_to_yield": get_percentage_to_yield,
                       "upc_class": True, "is_admin": True,
                       "name": name})
    except Exception as e:
        print("exception in admin settings",e)    


def setting(request):
    try:
        drum_temp = models.StartingDrumTemperature.objects.last()
        recommended_temp = drum_temp.recommended_starting_drum_temp
        if request.method=="POST":
            temp = request.POST.get("recommended_starting_drum_temp")
            # recommended temp post
            models.StartingDrumTemperature.objects.filter(id=1).update(recommended_starting_drum_temp=temp)
        return render(request,"upc_settings.html",{"recommended_temp":recommended_temp,"drum_temp_updated": True})
    except Exception as e:
        print('exception in setting::',e)
        return render(request,"upc_settings.html") 

def conditions1(request):
    try:
        # condition = models.Condition.objects.all()
        # for data in condition:
        data = models.Condition.objects.first()
        print('condition difference:: ',data.difference , "data change_in_heaters::",data.change_in_heaters,"data warning_message",data.warning_message)
        cond_difference = data.difference
        cond_change_in_heaters = data.change_in_heaters
        cond_warning_message = data.warning_message
        if request.method=="POST":
            print("-------",request.POST)
            difference = request.POST.get("difference")
            print('difference  00000000',difference)
            change_in_heaters = request.POST.get("change_in_heaters")
            print('change_in_heaters  00000000',change_in_heaters)
            warning_message = request.POST.get("warning_message")
            print('warning_message  00000000',warning_message)
            if difference != '':
                data.difference = difference
            if change_in_heaters != '':
                data.change_in_heaters = change_in_heaters
            if warning_message != '':
                data.warning_message = warning_message
            data.save()
        return render(request,"upc_settings.html",{"cond_difference":cond_difference,"cond_change_in_heaters":cond_change_in_heaters,"cond_warning_message":cond_warning_message,"data1":True,"is_admin":True})
    except Exception as e:
        print('Exception in starting_drum_temp',e)
        return render(request,"upc_settings.html")   

def condition2(request):
    try:
        # condition = models.Condition.objects.all()
        # for data in condition:
        condition = models.Condition.objects.last()
        print('condition difference:: ',condition.difference , "condition change_in_heaters::",condition.change_in_heaters,"condition warning_message",condition.warning_message)
        cond_difference1 = condition.difference
        cond_change_in_heaters1 = condition.change_in_heaters
        cond_warning_message1 = condition.warning_message
        if request.method=="POST":
            print("-------",request.POST)
            difference1 = request.POST.get("difference")
            print('difference  00000000',difference1)
            change_in_heaters1 = request.POST.get("change_in_heaters")
            print('change_in_heaters  00000000',change_in_heaters1)
            warning_message1 = request.POST.get("warning_message")
            print('warning_message  00000000',warning_message1)
            if difference1 != '':
                condition.difference = difference1
            if change_in_heaters1 != '':
                condition.change_in_heaters = change_in_heaters1
            if warning_message1 != '':
                condition.warning_message = warning_message1
            condition.save()
        return render(request,"upc_settings.html",{"cond_difference1":cond_difference1,"cond_change_in_heaters1":cond_change_in_heaters1,"cond_warning_message1":cond_warning_message1,"data0":True,"is_admin":True})
    except Exception as e:
        print('Exception in starting_drum_temp',e)
        return render(request,"upc_settings.html")         

def spray_humidity_level(request):
    try:
        spray_level = models.SprayHumidityLevel.objects.last()
        humidity_temp = spray_level.recommended_humidity_temp
        ambient_temp = spray_level.recommended_ambient_temp
        get_increased_temp = spray_level.increased_temp
        if request.method=="POST":
            recommended_humidity_temp = request.POST.get("recommended_humidity_temp")
            recommended_ambient_temp = request.POST.get("recommended_ambient_temp")
            post_increased_temp = request.POST.get("increased_temp")
            if recommended_humidity_temp != '':
                spray_level.recommended_humidity_temp = recommended_humidity_temp
            if recommended_ambient_temp != '':
                spray_level.recommended_ambient_temp = recommended_ambient_temp
            if post_increased_temp != '':
                spray_level.increased_temp = post_increased_temp
            spray_level.save()
        return render(request,"upc_settings.html",{"humidity_temp":humidity_temp,"ambient_temp":ambient_temp,"get_increased_temp":get_increased_temp,"data":True})    

    except Exception as e:
        print('Exception in spray_humidity_level',e)
        return render(request,"upc_settings.html")

def speed_of_spraying(request):
    try:
        spraying_speed = models.SpeedOfSpraying.objects.last()
        fast_temp = spraying_speed.fast_increased_temp
        slow_temp = spraying_speed.slow_decreased_temp
        if request.method=="POST":
            fast_increased_temp = request.POST.get("fast_increased_temp")
            slow_decreased_temp = request.POST.get("slow_decreased_temp")
            if fast_increased_temp != '':
                spraying_speed.fast_increased_temp = fast_increased_temp
            if slow_decreased_temp != '':
                spraying_speed.slow_decreased_temp = slow_decreased_temp
            spraying_speed.save()
        return render(request,"upc_settings.html",{"fast_temp":fast_temp,"slow_temp":slow_temp,"data2":True})    

    except Exception as e:
        print('Exception in speed_of_spraying',e)
        return render(request,"upc_settings.html")

def hose_insulated(request):
    try:
        insulated_hose = models.HoseInsulated.objects.last()
        well_temp = insulated_hose.well_insulated_decreased_temp
        print('well_temp ::',well_temp)
        poor_temp = insulated_hose.poorly_insulated_increased_temp
        print('poor_temp::',poor_temp)
        if request.method=="POST":
            well_insulated_decreased_temp = request.POST.get("well_insulated_decreased_temp")
            print('well_insulated_decreased_temp ::',well_insulated_decreased_temp)
            poorly_insulated_increased_temp = request.POST.get("poorly_insulated_increased_temp")
            print('poorly_insulated_increased_temp ::',poorly_insulated_increased_temp)
            if well_insulated_decreased_temp != '':
                insulated_hose.well_insulated_decreased_temp = well_insulated_decreased_temp
            if poorly_insulated_increased_temp != '':
                insulated_hose.poorly_insulated_increased_temp = poorly_insulated_increased_temp
            insulated_hose.save()
        return render(request,"upc_settings.html",{"well_temp":well_temp,"poor_temp":poor_temp,"data3":True})    

    except Exception as e:
        print('Exception in hose_insulated',e)
        return render(request,"upc_settings.html") 

def spray_hose_in(request):
    try:
        hose_in = models.SprayHoseIn.objects.last()
        sun_or_hot_temp = hose_in.sun_or_hot_asphalt_decreased_temp
        print('sun_or_hot_temp ::',sun_or_hot_temp)
        rain_or_snow_temp = hose_in.rain_or_snow_increased_temp
        print('rain_or_snow_temp::',rain_or_snow_temp)
        if request.method=="POST":
            sun_or_hot_asphalt_decreased_temp = request.POST.get("sun_or_hot_asphalt_decreased_temp")
            print('sun_or_hot_asphalt_decreased_temp ::',sun_or_hot_asphalt_decreased_temp)
            rain_or_snow_increased_temp = request.POST.get("rain_or_snow_increased_temp")
            print('rain_or_snow_increased_temp ::',rain_or_snow_increased_temp)
            if sun_or_hot_asphalt_decreased_temp != '':
                hose_in.sun_or_hot_asphalt_decreased_temp = sun_or_hot_asphalt_decreased_temp
            if rain_or_snow_increased_temp != '':
                hose_in.rain_or_snow_increased_temp = rain_or_snow_increased_temp
            hose_in.save()
        return render(request,"upc_settings.html",{"sun_or_hot_temp":sun_or_hot_temp,"rain_or_snow_temp":rain_or_snow_temp,"data4":True})    

    except Exception as e:
        print('Exception in hose_in',e)
        return render(request,"upc_settings.html")

def substrate(request):
    try:
        substrate_type = models.Substrate.objects.last()
        metal_temp = substrate_type.metal_increased_temp
        print('metal_temp ::',metal_temp)
        concrete_temp = substrate_type.concrete_increased_temp
        print('concrete_temp::',concrete_temp)
        if request.method=="POST":
            metal_increased_temp = request.POST.get("metal_increased_temp")
            print('metal_increased_temp ::',metal_increased_temp)
            concrete_increased_temp = request.POST.get("concrete_increased_temp")
            print('concrete_increased_temp ::',concrete_increased_temp)
            if metal_increased_temp != '':
                substrate_type.metal_increased_temp = metal_increased_temp
            if concrete_increased_temp != '':
                substrate_type.concrete_increased_temp = concrete_increased_temp
            substrate_type.save()
        return render(request,"upc_settings.html",{"metal_temp":metal_temp,"concrete_temp":concrete_temp,"data5":True})    

    except Exception as e:
        print('Exception in substrate_type',e)
        return render(request,"upc_settings.html")

def Layers(request):
    try:
        layer = models.Layers.objects.last()
        get_percentage_to_yield = layer.percentage_to_yield
        print('get_percentage_to_yield ::',get_percentage_to_yield)
        if request.method=="POST":
            percentage_to_yield = request.POST.get("percentage_to_yield")
            print('percentage_to_yield ::',percentage_to_yield)
            if percentage_to_yield != '':
                layer.percentage_to_yield = percentage_to_yield
            layer.save()
        return render(request,"upc_settings.html",{"get_percentage_to_yield":get_percentage_to_yield,"data6":True})    

    except Exception as e:
        print('Exception in layer',e)
        return render(request,"upc_settings.html")        