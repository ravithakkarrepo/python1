from contractor.views import contractor
from django.contrib import admin
from slp.models import Category, Video, Question, Quiz, Merchant, QRCode, Product, User, UserRewards, Admin, \
    AdminSettings, AdminPoints, Banner,Contest, Contractor, Address,MachineTypes,SubstrateTypes, EquipmentResources, \
    TechTipsFile, safetyDocumentFile, BuildingDocumentFile

# Register your models here.
admin.site.register(Category)
admin.site.register(Video)
admin.site.register(Question)
admin.site.register(Quiz)
admin.site.register(Merchant)
admin.site.register(QRCode)
admin.site.register([Product,EquipmentResources,TechTipsFile,safetyDocumentFile,BuildingDocumentFile])
admin.site.register(User)
admin.site.register(UserRewards)
admin.site.register(Admin)
admin.site.register(AdminSettings)
admin.site.register(AdminPoints)
admin.site.register([Banner,Contest, Contractor, Address,MachineTypes,SubstrateTypes])

