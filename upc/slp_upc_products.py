from django.http import HttpResponse
from rest_framework import status
from rest_framework.views import APIView

from slp.models import Merchant, Product as SlpProduct
from upc.models import Product as UpcProduct


class SLPUPCProducts(APIView):
    def post(self, request):
        try:
            upc_products = UpcProduct.objects.all()
            merchant = Merchant.objects.first()
            for upc_product in upc_products:
                SlpProduct.objects.create(product_name=upc_product.product_name, merchant_id=merchant.id,
                                          technical_datasheet=[], application_guideline=[], safety_datasheet=[],
                                          video_link=[], certificate=[], certificate_img=[], equipment=[],
                                          equipment_img=[], industry=[], industry_img=[], building=[], building_img=[],
                                          quality=[], quality_img=[])

            return HttpResponse(status=status.HTTP_200_OK)
        except Exception as e:
            print('Exception : ', e)
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
