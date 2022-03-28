import os
import sys

from PIL import Image
from django.shortcuts import render, redirect
from rest_framework.views import APIView

from slp import models

import io
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile


class EditProfile(APIView):
    def get(self, request):
        try:
            if 'cid' in request.session:
                print('get_edit_profile')
                cid = request.session['cid']
                contractor = models.Contractor.objects.filter(id=cid).get()

                full_name = contractor.full_name
                full_name = full_name.capitalize()

                is_contractor = True
                is_admin = False

                company_name = contractor.company_name
                if company_name is None:
                    company_name = ""

                # zip_code = contractor.address.zip_code
                # if zip_code is None:
                #     zip_code = ""

                return render(request, 'contractor_edit_profile.html',
                              {'value': contractor, 'is_admin': is_admin, 'is_contractor': is_contractor,
                               'name': full_name,
                               'company_name': company_name})
            else:
                return redirect('contractor/login/')
        except Exception as e:
            print('Exception : ', e)
            return redirect('contractor/login/')

    def post(self, request):
        try:
            cid = request.session['cid']
            contractor = models.Contractor.objects.filter(id=cid).get()
            full_name = contractor.full_name
            full_name = full_name.capitalize()

            data = request.data
            file = request.FILES
            full_name_edit = data['full_name']
            if (full_name_edit != '' and full_name_edit != contractor.full_name and full_name_edit is not None) or \
                (data['contact_name1'] != '' and data['contact_name1'] != contractor.contact_name and data['contact_name1'] is not None) or \
                (data['contact_name2'] != '' and data['contact_name2'] != contractor.contact_name2 and data['contact_name2'] is not None) or \
                (data['email2'] != '' and data['email2'] != contractor.email2 and data['email2'] is not None) or \
                (data['address'] != '' and data['address'] != contractor.address.add_line1 and data['address'] is not None) or \
                (data['address2'] != '' and data['address2'] != contractor.address.add_line2 and data['address2'] is not None):
                contractor.full_name = full_name_edit
                contractor.contact_name = data['contact_name1']
                contractor.contact_name2 = data['contact_name2']
                contractor.email2 = data['email2']
                contractor.address.add_line1 = data['address']
                contractor.address.add_line2 = data['address2']
                models.Address.objects.filter(contractor_id=cid).update(add_line1=data['address'], add_line2=data['address2'])
                contractor.save()
            phone = data['phone']
            if (phone != '' and phone != str(contractor.phone) and phone is not None) or \
                (data['phone2'] != '' and data['phone2'] != str(contractor.phone2) and data['phone2'] is not None):
                contractor.phone = phone
                contractor.phone2 = data['phone2']
                contractor.save()

            add_dict = {}
            add_dict['add_line1'] = data['address']
            
            if data['image'] == '':
                print('image null')
            else:
                image = request.FILES['image']
                print('image-->', image, type(image))

                size = (300, 300)
                fdir, fname = os.path.split(str(image))
                print(fdir, fname)
                ls = fname.split('.')
                formt = ls[-1].upper()
                print(formt)
                if formt == 'JPG':
                    fname = ls[0] + '.png'
                    ls[-1] = 'png'

                im = Image.open(image)
                im.thumbnail(size)

                im.save(f'./slp/media/thumb_{fname}', ls[-1].upper())
                print('ls===========ls===========', ls[-1])

                imageTemproary = Image.open(f'./slp/media/thumb_{fname}')
                outputIoStream = BytesIO()
                imageTemproary.resize((1005, 360))
                imageTemproary.save(outputIoStream, format=ls[-1], quality=60)
                outputIoStream.seek(0)
                uploadedImage = InMemoryUploadedFile(outputIoStream, 'ImageField',
                                                     f"%s.{ls[-1]}" % image.name.split('.')[0],
                                                     f'image/{ls[-1]}', sys.getsizeof(outputIoStream), None)
                image = uploadedImage

                os.remove(f'./slp/media/thumb_{fname}')

                contractor.image = image
                contractor.save()

            profile_edit = "Your profile updated successfully!"
            values = models.Contractor.objects.filter(id=cid).get()

            is_contractor = True
            is_admin = False

            return render(request, 'contractor_edit_profile.html',
                          {'profile_edit': profile_edit, 'is_admin': is_admin, 'is_contractor': is_contractor,
                           'name': full_name, 'value': values})
        except Exception as e:
            print('Exception-->', e)
            return redirect('contractor/login/')
