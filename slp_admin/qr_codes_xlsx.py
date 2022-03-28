import os
from io import BytesIO
from collections import OrderedDict
from django.http import HttpResponse
from rest_framework import status
from rest_framework.views import APIView
from slp import models
from userapi import serializers
from pyexcel_xlsx import save_data


class GetQRCodeXLSX(APIView):
    def get(self, request):
        try:
            queryset = models.UserRewards.objects.all().filter(originally_scanned=True, qr_status="Completed").order_by(
                '-updated_at')
            serializer = serializers.ScannedQRSerializer(queryset, many=True)

            ls = [[x['created_at'], os.path.split(x["qr_code"]["qr_image"])[1].split('.')[0], x['user_id']['email'],
                   x['user_id']['company_name'],
                   f'Humidity: {x["qr_code"]["humidity"]}, Wind Speed: {x["qr_code"]["wind_speed"]}, Temperature: {x["qr_code"]["temp"]}',
                   x["qr_code"]["scanned_location"], x['product_activation_questions']['a_side_batch'],
                   x['product_activation_questions']['a_side_set_temp'],
                   x['product_activation_questions']['b_side_set_temp'],
                   x['product_activation_questions']['hose_set_temp'],
                   x['product_activation_questions']['pressure_set'],
                   x['product_activation_questions']['mixing_chamber_size'],
                   x['product_activation_questions']['start_drum_temp']]
                  for x in
                  serializer.data]

            header = [['Date Time', 'QR Id', 'User Email', 'Company Name', 'Whether Information', 'Location',
                       'A Side Batch', 'A Side Set Temp', 'B Side Set Temp', 'Hose Set Temp', 'Pressure Set',
                       'Mixing Chamber Size', 'Start Drum Temp']]
            header.extend(ls)

            data = OrderedDict()
            data.update({"QR Codes": header})
            save_data("slp/media/QR Codes Product Data.xlsx", data)

            excel = open("slp/media/QR Codes Product Data.xlsx", "rb")
            output = BytesIO(excel.read())
            out_content = output.getvalue()
            output.close()
            response = HttpResponse(out_content,
                                    content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            response['Content-Disposition'] = 'attachment; filename=QR Codes Product Data.xlsx'
            return response
        except Exception as e:
            print("Exception : ", e)
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
