from rest_framework import serializers
from slp import models


class ProductSerializers(serializers.ModelSerializer):
    merchant_id = serializers.SerializerMethodField('get_merchant_name')

    class Meta:
        model = models.Product
        fields = ["merchant_id", "product_name"]

    @staticmethod
    def get_merchant_name(data):
        merchant_id = data.merchant_id
        merchant = models.Merchant.objects.get(id=int(merchant_id))
        return merchant.full_name


class ProductAddPointsRequestSerializer(serializers.ModelSerializer):
    merchant_name = serializers.SerializerMethodField('get_merchant_name')
    product_name = serializers.SerializerMethodField('get_product_name')
    created_at = serializers.SerializerMethodField('get_created_at')

    class Meta:
        model = models.ProductAddPointsRequest
        fields = ['merchant_name', 'product_name', 'additional_points', 'payment_status', 'created_at']

    def get_merchant_name(self, data):
        merchant_id = data.product.merchant_id
        merchant = models.Merchant.objects.get(id=int(merchant_id))
        return merchant.full_name

    def get_product_name(self, data):
        return data.product.product_name

    def get_created_at(self, data):
        return str(data.created_at)[:19]


class ExtendedProductAddPointsRequestSerializer(ProductAddPointsRequestSerializer):
    requested_contractor_name = serializers.SerializerMethodField('get_contractor_name')

    class Meta:
        model = models.ProductAddPointsRequest
        fields = ['id', 'requested_contractor_name', 'merchant_name', 'product_name', 'additional_points',
                  'payment_status', 'request_status', 'created_at']

    @staticmethod
    def get_contractor_name(data): return data.requested_contractor.full_name


class DetailedTasksSerializer(serializers.ModelSerializer):
    assigned_user_name = serializers.SerializerMethodField('get_assigned_user_name')
    assigned_job_name = serializers.SerializerMethodField('get_assigned_job_name')
    attachment = serializers.SerializerMethodField('get_attachments')

    class Meta:
        model = models.Task
        fields = ['id', 'assigned_user_id', 'assigned_user_name', 'assigned_job_id', 'assigned_job_name','title', 'description',
                  'location', 'task_status', 'attachment']

    @staticmethod
    def get_assigned_user_name(data): return data.assigned_user.full_name

    @staticmethod
    def get_assigned_job_name(data): return data.assigned_job.job_category_name

    @staticmethod
    def get_attachments(data):
        ls = []
        attachments = data.attachment
        for attachment in attachments:
            print()
            if attachment.extension() == '.pdf':
                ls.append({'url': str(attachment.attachment.url), 'type': 'pdf'})
            else:
                ls.append({'url': str(attachment.attachment.url), 'type': 'image'})
        return ls


class TasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Task
        fields = ['id', 'assigned_user_id', 'assigned_job_id', 'title' ,'description', 'task_status']


class TaskAddPointsRequestSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField('get_user_name')
    job_name = serializers.SerializerMethodField('get_job_name')
    created_at = serializers.SerializerMethodField('get_created_at')

    class Meta:
        model = models.TaskAddPointsRequest
        fields = ['user_name', 'job_name', 'additional_points', 'payment_status', 'created_at']


    @staticmethod
    def get_user_name(data): return data.task.assigned_user.full_name

    @staticmethod
    def get_job_name(data): return data.task.assigned_job.job_category_name    

    def get_created_at(self, data):
        return str(data.created_at)[:19]



class ExtendedTaskAddPointsRequestSerializer(TaskAddPointsRequestSerializer):
    requested_contractor_name = serializers.SerializerMethodField('get_contractor_name')

    class Meta:
        model = models.TaskAddPointsRequest
        fields = ['id', 'requested_contractor_name', 'user_name', 'job_name', 'additional_points',
                  'payment_status', 'request_status', 'created_at']

    @staticmethod
    def get_contractor_name(data): return data.requested_contractor.full_name                
