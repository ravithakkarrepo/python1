import shutil
import requests
from django.http import HttpResponse
from pyexcel_xlsx import get_data as xlsx_get
from django.utils.datastructures import MultiValueDictKeyError
from rest_framework import status
from rest_framework.views import APIView
from upc import models
from concurrent.futures import ProcessPoolExecutor
from django.core.files.storage import default_storage
import pymongo

# To delete data from AWS S3 Bucket
from AllFoamTech.settings import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_STORAGE_BUCKET_NAME, MEDIA_URL
import boto3

session = boto3.Session(
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
)
s3 = session.resource('s3')

ll = {'-00': [2, 6, 10, 14, 18], '-01': [3, 7, 11, 15, 19], '-02': [4, 8, 12, 16, 20],
      '-03': [5, 9, 13, 17, 21]}

mongoClient = pymongo.MongoClient('mongodb://localhost:27017/all_foam_tech')
# mongoClient = pymongo.MongoClient('mongodb://localhost:27017/AllFoamTech')


# def threading_fun(row):
#     """
#     This function is developed using django's ORM queries, which was taking much time in execution. So I've developed
#     a new way in which we can fire query of mongo directly from pymongo and it's quite speedy in execution. See
#     new_threading_fun function for more details.
#     """
#     for x, y in ll.items():
#         try:
#             ambient = models.AmbientTemp.objects.get(ambient_temp=int(row[1]),
#                                                      product__product_name=row[0].strip(),
#                                                      mixing_chamber_size__mixing_size=x)
#             ambient.a_side_temp = models.ASideTemp.objects.get_or_create(a_side_temp=int(row[y[0]]))[0] if \
#                 row[y[0]] != 'n/a' and row[y[0]] != '' else None
#             ambient.b_side_temp = models.BSideTemp.objects.get_or_create(b_side_temp=int(row[y[1]]))[0] if \
#                 row[y[1]] != 'n/a' and row[y[1]] != '' else None
#             ambient.hose_temp = models.HoseTemp.objects.get_or_create(hose_temp=row[y[2]])[0] if row[y[
#                 2]] != 'n/a' and row[y[2]] != '' else None
#             ambient.save()
#
#             board = models.BoardFeet.objects.get(ambient_temp=int(row[1]),
#                                                  product__product_name=row[0].strip(),
#                                                  mixing_chamber_size__mixing_size=x)
#             board.board_feet = float(row[y[3]]) if row[y[3]] != 'n/a' and row[y[3]] != '' else None
#             board.save()
#
#             den = models.Density.objects.get(ambient_temp=int(row[1]),
#                                              product__product_name=row[0].strip(),
#                                              mixing_chamber_size__mixing_size=x)
#             den.density = float(row[y[4]]) if row[y[4]] != 'n/a' and row[y[4]] != '' else None
#             den.save()
#         except Exception as e:
#             print(e)
#             return e


def new_threading_fun(row):
    """
    This function is replacement of threading_fun function. In this we've used direct pymongo queries which is fast in
    execution. It'll take max 20 seconds to update whole xlsx sheet with reply.
    Where as older one was taking 60-70 seconds for execution.
    """
    db = mongoClient['AllFoamTech']
    for x, y in ll.items():
        try:
            if row[y[0]] == 'n/a' or row[y[0]] == "":
                aside_id = None
            else:
                aside_id = [x['id'] for x in db['upc_asidetemp'].find({'a_side_temp': int(row[y[0]])})]
                if aside_id:
                    aside_id = aside_id[0]
                else:
                    aside_id = models.ASideTemp.objects.create(a_side_temp=int(row[y[0]])).id

            if row[y[1]] == 'n/a' or row[y[1]] == "":
                bside_id = None
            else:
                bside_id = [x['id'] for x in db['upc_bsidetemp'].find({'b_side_temp': int(row[y[1]])})]
                if bside_id:
                    bside_id = bside_id[0]
                else:
                    bside_id = models.BSideTemp.objects.create(b_side_temp=int(row[y[1]])).id

            if row[y[2]] == 'n/a' or row[y[2]] == "":
                hose_id = None
            else:
                hose_id = [x['id'] for x in db['upc_hosetemp'].find({'hose_temp': str(row[y[2]]).strip()})]
                if hose_id:
                    hose_id = hose_id[0]
                else:
                    hose_id = models.HoseTemp.objects.create(hose_temp=str(row[y[2]]).strip()).id

            product_id = [x['id'] for x in db['upc_product'].find({'product_name': row[0].strip()})][0]
            mixing_id = [x['id'] for x in db['upc_mixingchambersize'].find({'mixing_size': x})][0]

            db['upc_ambienttemp'].update_one(
                filter={"ambient_temp": int(row[1]), "product_id": product_id, "mixing_chamber_size_id": mixing_id},
                update={"$set": {"a_side_temp_id": aside_id, "b_side_temp_id": bside_id,
                                 "hose_temp_id": hose_id}})

            board_feet = float(row[y[3]]) if row[y[3]] != 'n/a' and row[y[3]] != '' else None
            db['upc_boardfeet'].update_one(
                filter={"ambient_temp": int(row[1]), "product_id": product_id, "mixing_chamber_size_id": mixing_id},
                update={"$set": {"board_feet": board_feet}})

            density = float(row[y[4]]) if row[y[4]] != 'n/a' and row[y[4]] != '' else None
            db['upc_density'].update_one(
                filter={"ambient_temp": int(row[1]), "product_id": product_id, "mixing_chamber_size_id": mixing_id},
                update={"$set": {"density": density}})
        except Exception as e:
            print(e)
            return e


class UpdateExcel(APIView):
    def post(self, request):
        try:
            excel_file = request.FILES.get('files')

            if (str(excel_file).split('.')[-1]) == "xlsx":
                data = xlsx_get(excel_file)

                sheets = [data.get('WallSprayType'), data.get('CeilingsSprayType')]
                for sheet in sheets:
                    for row in sheet[2:]:
                        for i, x in enumerate(sheet[1][1:], start=1):
                            objects = models.SprayingType.objects.get(spray_type=sheet[0][0],
                                                                      mixing_size__mixing_size=row[0],
                                                                      machine_type__machine_name=x)
                            objects.pressure_set_temp = int(row[i]) if row[i] != 'n/a' and row[i] != '' else None
                            objects.save()

                spraying_speed = data.get('SprayingSpeed')
                for row in spraying_speed[1:]:
                    models.SprayingSpeed.objects.filter(spraying_speed=row[0]).update(temperature_change=int(row[1]))
                    models.HoseTypeInsulated.objects.filter(hose_type=row[2]).update(temperature_change=int(row[3]))

                layers = data.get('Layers')
                for row in layers[1:]:
                    models.HoseIn.objects.filter(hose_in=row[0]).update(temperature_change=int(row[1]))
                    models.SprayLayers.objects.filter(layer=row[2]).update(temperature_change=int(row[3]))

                substrate_type = data.get('SubstrateType')
                for row in substrate_type[1:]:
                    models.SubstrateType.objects.filter(substrate_type=row[0]).update(
                        percentage_to_yield=float(row[1]) / 100, temperature_change=int(row[2]))

                all_products_updated = data.get('AllProductsUpdated')
                with ProcessPoolExecutor() as executor:
                    result = executor.map(new_threading_fun, all_products_updated[1:])

                # If no error in the return list, then list is empty
                error_list = [item for item in result if item is not None]
                if error_list:  # Checking if list is not empty, then an error has occurred and have to return 400
                    return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

            s3.Object(AWS_STORAGE_BUCKET_NAME, "media/" + 'UPC_data_update_sheet.xlsx').delete()
            default_storage.save('UPC_data_update_sheet.xlsx', excel_file)

            url = f'{MEDIA_URL}UPC_data_update_sheet.xlsx'
            response = requests.get(url, stream=True)
            with open(f'./slp/media/UPC_data_update_sheet.xlsx', 'wb') as out_file:
                shutil.copyfileobj(response.raw, out_file)

            return HttpResponse(status=status.HTTP_200_OK)

        except MultiValueDictKeyError as e:
            print("Exception : ", e)
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
