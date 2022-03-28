from django.http import HttpResponse
from pyexcel_xlsx import get_data as xlsx_get
from django.utils.datastructures import MultiValueDictKeyError
from rest_framework import status
from rest_framework.views import APIView
from upc import models


class ParseExcel(APIView):
    def post(self, request, format=None):
        try:
            data = xlsx_get('slp/media/UPC_data_sheet.xlsx')
            print("Start of Data Entry")

            Products = data.get('Products')
            for product in Products[1:]:
                models.Product.objects.create(product_name=product[0])
            print("Successfully added Products")

            Machines = data.get('Machines')
            for machine in Machines[1:]:
                models.MachineType.objects.create(machine_name=machine[0])
            print("Successfully added Machines")

            MixingChamber = data.get('MixingChamber')
            for mixing in MixingChamber[1:]:
                models.MixingChamberSize.objects.create(mixing_size=mixing[0])
            print("Successfully added MixingChambers")

            e20_machine = models.MachineType.objects.get(machine_name="E-20")
            h20_35_machine = models.MachineType.objects.get(machine_name="H-20/35")
            e30_machine = models.MachineType.objects.get(machine_name="E-30")
            h30_machine = models.MachineType.objects.get(machine_name="H-30")
            h40_machine = models.MachineType.objects.get(machine_name="H-40")
            h50_machine = models.MachineType.objects.get(machine_name="H-50")
            ph2_machine = models.MachineType.objects.get(machine_name="PH-2")
            ph25_machine = models.MachineType.objects.get(machine_name="PH-25")
            ph40_machine = models.MachineType.objects.get(machine_name="PH-40")
            ph55_machine = models.MachineType.objects.get(machine_name="PH-55")

            ls = []
            SprayTypes1 = data.get('WallSprayType')
            SprayTypes2 = data.get('CeilingsSprayType')
            ls.append(SprayTypes1)
            ls.append(SprayTypes2)

            for SprayTypes in ls:
                spray_type = SprayTypes[0][0]
                for types in SprayTypes[2:]:
                    mixing = models.MixingChamberSize.objects.get(mixing_size=types[0])
                    if types[1] != 'n/a':
                        models.SprayingType.objects.create(spray_type=spray_type, mixing_size=mixing,
                                                           machine_type=e20_machine, pressure_set_temp=types[1])
                    else:
                        models.SprayingType.objects.create(spray_type=spray_type, mixing_size=mixing,
                                                           machine_type=e20_machine)
                    models.SprayingType.objects.create(spray_type=spray_type, mixing_size=mixing,
                                                       machine_type=h20_35_machine, pressure_set_temp=types[2])
                    models.SprayingType.objects.create(spray_type=spray_type, mixing_size=mixing,
                                                       machine_type=e30_machine, pressure_set_temp=types[3])
                    models.SprayingType.objects.create(spray_type=spray_type, mixing_size=mixing,
                                                       machine_type=h30_machine, pressure_set_temp=types[4])
                    models.SprayingType.objects.create(spray_type=spray_type, mixing_size=mixing,
                                                       machine_type=h40_machine, pressure_set_temp=types[5])
                    models.SprayingType.objects.create(spray_type=spray_type, mixing_size=mixing,
                                                       machine_type=h50_machine, pressure_set_temp=types[6])
                    models.SprayingType.objects.create(spray_type=spray_type, mixing_size=mixing,
                                                       machine_type=ph2_machine, pressure_set_temp=types[7])
                    models.SprayingType.objects.create(spray_type=spray_type, mixing_size=mixing,
                                                       machine_type=ph25_machine, pressure_set_temp=types[8])
                    models.SprayingType.objects.create(spray_type=spray_type, mixing_size=mixing,
                                                       machine_type=ph40_machine, pressure_set_temp=types[9])
                    models.SprayingType.objects.create(spray_type=spray_type, mixing_size=mixing,
                                                       machine_type=ph55_machine, pressure_set_temp=types[10])
            print("Successfully added SprayTypes Wall Ceilings")

            abside = data.get('ABSide')
            for line in abside[1:]:
                models.ASideTemp.objects.create(a_side_temp=line[0])
                models.BSideTemp.objects.create(b_side_temp=line[1])
            print("Successfully added AB Side")

            hoses = data.get('HoseSet')
            for hose in hoses[1:]:
                models.HoseTemp.objects.create(hose_temp=hose[0])
            print("Successfully added Hose Side")

            temps = data.get('0to100Temps')
            for temp in temps:
                models.SubstrateTemp.objects.create(subs_temp=temp[0])
                models.StartingDrumTemp.objects.create(start_drum_temp=temp[0])
                models.HumidityLevel.objects.create(humidity_level=temp[0])
            print("Successfully added Substrate, StartingDrum, Humidity")

            speeds = data.get('SprayingSpeed')
            for speed in speeds[1:]:
                models.SprayingSpeed.objects.create(spraying_speed=speed[0], temperature_change=speed[1])
                models.HoseTypeInsulated.objects.create(hose_type=speed[2], temperature_change=speed[3])
            print("Successfully added Spraying Speed")

            layers = data.get('Layers')
            for layer in layers[1:]:
                models.HoseIn.objects.create(hose_in=layer[0], temperature_change=speed[1])
                models.SprayLayers.objects.create(layer=layer[2], temperature_change=layer[3])
            print("Successfully added Spray Layers")

            SubstrateTypes = data.get('SubstrateType')
            for SubstrateType in SubstrateTypes[1:]:
                models.SubstrateType.objects.create(substrate_type=SubstrateType[0],
                                                    percentage_to_yield=SubstrateType[1]/100,
                                                    temperature_change=SubstrateType[2])
            print("Successfully added Substrate type")

            sheets = []
            sheets.append(data.get('AllProductsUpdated'))
            # sheets.append(data.get('UPC 500 Max'))
            # sheets.append(data.get('UPC 500 OCX'))
            # sheets.append(data.get('UPC 1.7 Regular'))
            # sheets.append(data.get('UPC 1.7 Summer'))
            # sheets.append(data.get('UPC 1.7 Winter'))
            # sheets.append(data.get('UPC 1.7 Super Winter'))
            # sheets.append(data.get('UPC 2.0 Regular'))
            # sheets.append(data.get('UPC 2.0 Summer'))
            # sheets.append(data.get('UPC 2.0 Winter'))
            # sheets.append(data.get('UPC 2.0 Super Winter'))

            for sheet in sheets:
                for x in sheet[1:]:
                    product = models.Product.objects.get(product_name=str(x[0]).strip())

                    m0 = models.MixingChamberSize.objects.get(mixing_size="-00")
                    m1 = models.MixingChamberSize.objects.get(mixing_size="-01")
                    m2 = models.MixingChamberSize.objects.get(mixing_size="-02")
                    m3 = models.MixingChamberSize.objects.get(mixing_size="-03")

                    if x[2] != 'n/a':
                        a_00 = models.ASideTemp.objects.get(a_side_temp=x[2])
                    else:
                        a_00 = None
                    if x[3] != 'n/a':
                        a_01 = models.ASideTemp.objects.get(a_side_temp=x[3])
                    else:
                        a_01 = None
                    if x[4] != 'n/a':
                        a_02 = models.ASideTemp.objects.get(a_side_temp=x[4])
                    else:
                        a_02 = None

                    if x[5] != 'n/a':
                        a_03 = models.ASideTemp.objects.get(a_side_temp=x[5])
                    else:
                        a_03 = None

                    if x[6] != 'n/a':
                        b_00 = models.BSideTemp.objects.get(b_side_temp=x[6])
                    else:
                        b_00 = None
                    if x[7] != 'n/a':
                        b_01 = models.BSideTemp.objects.get(b_side_temp=x[7])
                    else:
                        b_01 = None
                    if x[8] != 'n/a':
                        b_02 = models.BSideTemp.objects.get(b_side_temp=x[8])
                    else:
                        b_02 = None

                    if x[9] != 'n/a':
                        b_03 = models.BSideTemp.objects.get(b_side_temp=x[9])
                    else:
                        b_03 = None

                    if x[10] != 'n/a':
                        h_00 = models.HoseTemp.objects.get(hose_temp=x[10])
                    else:
                        h_00 = None
                    if x[11] != 'n/a':
                        h_01 = models.HoseTemp.objects.get(hose_temp=x[11])
                    else:
                        h_01 = None
                    if x[12] != 'n/a':
                        h_02 = models.HoseTemp.objects.get(hose_temp=x[12])
                    else:
                        h_02 = None

                    if x[13] != 'n/a':
                        h_03 = models.HoseTemp.objects.get(hose_temp=x[13])
                    else:
                        h_03 = None

                    models.AmbientTemp.objects.create(ambient_temp=int(x[1]), product=product,
                                                      mixing_chamber_size=m0, a_side_temp=a_00, b_side_temp=b_00,
                                                      hose_temp=h_00)
                    models.AmbientTemp.objects.create(ambient_temp=int(x[1]), product=product,
                                                      mixing_chamber_size=m1, a_side_temp=a_01, b_side_temp=b_01,
                                                      hose_temp=h_01)
                    models.AmbientTemp.objects.create(ambient_temp=int(x[1]), product=product,
                                                      mixing_chamber_size=m2, a_side_temp=a_02, b_side_temp=b_02,
                                                      hose_temp=h_02)
                    models.AmbientTemp.objects.create(ambient_temp=int(x[1]), product=product,
                                                      mixing_chamber_size=m3, a_side_temp=a_03, b_side_temp=b_03,
                                                      hose_temp=h_03)

                    if x[14] != "n/a":
                        models.BoardFeet.objects.create(ambient_temp=int(x[1]), product=product, mixing_chamber_size=m0, board_feet=float(x[14]))
                    else:
                        models.BoardFeet.objects.create(ambient_temp=int(x[1]), product=product, mixing_chamber_size=m0)

                    if x[15] != "n/a":
                        models.BoardFeet.objects.create(ambient_temp=int(x[1]), product=product, mixing_chamber_size=m1, board_feet=float(x[15]))
                    else:
                        models.BoardFeet.objects.create(ambient_temp=int(x[1]), product=product, mixing_chamber_size=m1)

                    if x[16] != "n/a":
                        models.BoardFeet.objects.create(ambient_temp=int(x[1]), product=product, mixing_chamber_size=m2, board_feet=float(x[16]))
                    else:
                        models.BoardFeet.objects.create(ambient_temp=int(x[1]), product=product, mixing_chamber_size=m2)

                    if x[17] != "n/a":
                        models.BoardFeet.objects.create(ambient_temp=int(x[1]), product=product, mixing_chamber_size=m3, board_feet=float(x[17]))
                    else:
                        models.BoardFeet.objects.create(ambient_temp=int(x[1]), product=product, mixing_chamber_size=m3)

                    if x[18] != "n/a":
                        models.Density.objects.create(ambient_temp=int(x[1]), product=product, mixing_chamber_size=m0, density=float(x[18]))
                    else:
                        models.Density.objects.create(ambient_temp=int(x[1]), product=product, mixing_chamber_size=m0)

                    if x[19] != "n/a":
                        models.Density.objects.create(ambient_temp=int(x[1]), product=product, mixing_chamber_size=m1, density=float(x[19]))
                    else:
                        models.Density.objects.create(ambient_temp=int(x[1]), product=product, mixing_chamber_size=m1)

                    if x[20] != "n/a":
                        models.Density.objects.create(ambient_temp=int(x[1]), product=product, mixing_chamber_size=m2, density=float(x[20]))
                    else:
                        models.Density.objects.create(ambient_temp=int(x[1]), product=product, mixing_chamber_size=m2)

                    if x[21] != "n/a":
                        models.Density.objects.create(ambient_temp=int(x[1]), product=product, mixing_chamber_size=m3, density=float(x[21]))
                    else:
                        models.Density.objects.create(ambient_temp=int(x[1]), product=product, mixing_chamber_size=m3)

            print("Successfully Added Boardfeet, Density, A,B and Hose side")

            # Creating Question objects
            p = models.Product.objects.all()
            s=models.SprayFoamType.objects.create()
            for x in p:
                s.product_value.add(x)
            print("Successfully added SprayFoamType question")

            m=models.MachineType.objects.all()
            sm = models.SprayMachineType.objects.create()
            for x in m:
                sm.machine_type_value.add(x)
            print("Successfully added SprayMachineType question")

            mm = models.MixingChamberSize.objects.all()
            mx = models.SprayMixingChamber.objects.create()
            for x in mm:
                mx.mixing_chamber_size.add(x)
            print("Successfully added SprayMixingChamber question")

            ls = [models.SprayingType.objects.filter(spray_type="Wall").first(),
                  models.SprayingType.objects.filter(spray_type="Ceiling").first()]
            stt = models.SprayType.objects.create()
            for x in ls:
                stt.spray_type_value.add(x)
            print("Successfully added SprayType question")

            temp_list = [models.AmbientTemp.objects.filter(ambient_temp=x).first() for x in
                         (x for x in range(0, 101, 5))]
            att = models.AmbientTemperature.objects.create()
            for x in temp_list:
                att.ambient_temp_value.add(x)
            print("Successfully added AmbientTemperature question")

            st = models.SubstrateTemp.objects.all()
            ss = models.SubstrateTemperature.objects.create()
            for x in st:
                ss.substrate_temp_value.add(x)
            print("Successfully added SubstrateTemperature question")

            conditions = [models.Condition.objects.create(difference=5, change_in_heaters=3),
                          models.Condition.objects.create(difference=20, change_in_heaters='Warning')]
            drum = models.StartingDrumTemperature.objects.create()
            for x in models.StartingDrumTemp.objects.all():
                drum.starting_temp_value.add(x)
            for x in conditions:
                drum.conditions.add(x)
            print("Successfully added StartingDrumTemperature question")

            st = models.HumidityLevel.objects.all()
            ss = models.SprayHumidityLevel.objects.create()
            for x in st:
                ss.humidity_value.add(x)
            print("Successfully added SprayHumidityLevel question")

            st = models.SprayingSpeed.objects.all()
            ss = models.SpeedOfSpraying.objects.create()
            for x in st:
                ss.spraying_speed_value.add(x)
            print("Successfully added SpeedOfSpraying question")

            st = models.HoseTypeInsulated.objects.all()
            ss = models.HoseInsulated.objects.create()
            for x in st:
                ss.hose_type_insulated_value.add(x)
            print("Successfully added HoseInsulated question")

            st = models.HoseIn.objects.all()
            ss = models.SprayHoseIn.objects.create()
            for x in st:
                ss.hose_in_value.add(x)
            print("Successfully added SprayHoseIn question")

            st = models.SubstrateType.objects.all()
            ss = models.Substrate.objects.create()
            for x in st:
                ss.substrate_type_value.add(x)
            print("Successfully added Substrate question")

            st = models.SprayLayers.objects.all()
            ss = models.Layers.objects.create()
            for x in st:
                ss.spray_layers.add(x)
            print("Successfully added Layers question")

            return HttpResponse(status=status.HTTP_200_OK)

        except MultiValueDictKeyError as e:
            print("Exception : ", e)
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
