from rest_framework import serializers
import datetime
from slp import models
from slp.models import Video, Category, Contest, ContestPlay, EquipmentResources, TechTipsFile, safetyDocumentFile, BuildingDocumentFile

# For multi-language support
from django.utils.translation import gettext_lazy as _
from django.utils.translation import activate


class VideoSerializer(serializers.ModelSerializer):
    reward_point = serializers.SerializerMethodField("get_rewards")
    quiz_status = serializers.SerializerMethodField("get_quiz_status")
    quiz_delete_status = serializers.SerializerMethodField("get_quiz_delete_status")
    video_length = serializers.SerializerMethodField("get_video_length")

    class Meta:
        model = Video
        fields = ["id", "category", "upload_video", "video_name", "video_desc", "reward_point", "quiz_status",
                  "quiz_delete_status", "video_thumbnail", "video_length"]

    def get_rewards(self, data):
        try:
            vid = data.id
            quiz = models.Quiz.objects.get(videoId=models.Video.objects.get(id=vid))
            quiz_points = quiz.points
        except Exception as e:
            quiz_points = 0
        return quiz_points

    def get_quiz_status(self, data):
        vid = data.id
        userId = self.context["user_id"]
        obj = models.QuizResult.objects.filter(quiz_videoId=vid)
        for x in obj:
            if userId == x.played_user.id:
                quiz = models.Quiz.objects.get(videoId=models.Video.objects.get(id=vid))
                quiz_status = quiz.quiz_played
                return quiz_status
        return False

    def get_quiz_delete_status(self,data):
        vid = data.id
        quiz = models.Quiz.objects.filter(videoId=vid)
        for x in quiz:
            return x.is_deleted
        return None

    def get_video_length(self, data):
        return str(datetime.timedelta(seconds=data.video_length))

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ContestSerializer(serializers.ModelSerializer):
    participated = serializers.SerializerMethodField("get_participateduser")

    class Meta:
        model = Contest
        fields = ["id", "contest_name", "contest_image", "contest_startdate", "contest_status", "participated"]

    def get_participateduser(self,data):
        c_uid = data.id
        userId = self.context["user_Id"]
        datas = ContestPlay.objects.filter(contest_id=c_uid)
        for x in datas:
            if x.contest_user.id == userId:
                return True
        return False


class TranslatedContestSerializer(serializers.ModelSerializer):
    activate("es")
    participated = serializers.SerializerMethodField("get_participateduser")
    contest_status = serializers.SerializerMethodField("get_contest_status")

    class Meta:
        model = Contest
        fields = ["id", "contest_name", "contest_image", "contest_startdate", "contest_status", "participated"]

    def get_contest_status(self, data):
        contest_status = str(data.contest_status)
        return _(contest_status)

    def get_participateduser(self,data):
        c_uid = data.id
        userId = self.context["user_Id"]
        datas = ContestPlay.objects.filter(contest_id=c_uid)
        for x in datas:
            if x.contest_user.id == userId:
                return True
        return False

class ContestEachSerializer(serializers.ModelSerializer):
    total_user = serializers.SerializerMethodField("get_totaluser")
    participated = serializers.SerializerMethodField("get_participateduser")
    class Meta:
        model = Contest
        fields = ["contest_name","contest_details","contest_startdate","contest_enddate","contest_point","total_user","participated"]

    def get_totaluser(self,data):
        cid= data.id
        numbers = ContestPlay.objects.filter(contest_id=cid).count()
        return numbers
    def get_participateduser(self,data):
        c_uid = data.id
        userId = self.context["user_Id"]
        datas = ContestPlay.objects.filter(contest_id=c_uid)
        for x in datas:
            if x.contest_user.id == userId:
                return True
        return False

class ContestPlayUserSerializer(serializers.ModelSerializer):
    contest_user_name = serializers.SerializerMethodField("contest_user")
    contest_user_image = serializers.SerializerMethodField("contest_user_profile")
    class Meta:
        model = ContestPlay
        fields = ["contest_user","contest_user_name","contest_user_image","contest_played"]

    def contest_user(self,data):
        datas = data.contest_user
        names = datas.full_name
        return names

    def contest_user_profile(self,data):
        datas = data.contest_user
        image = datas.image.url
        return image


class FileSerializer(serializers.ModelSerializer):
  class Meta():
    model = EquipmentResources
    fields = ('equipment_resources', 'created_at')


class TechFileSerializer(serializers.ModelSerializer):
  class Meta():
    model = TechTipsFile
    fields = ('tech_tips_file', 'created_at')


class safetyDocumentSerializer(serializers.ModelSerializer):
  class Meta():
    model = safetyDocumentFile
    fields = ('safety_document_file', 'created_at')


class BuildingDocumentSerializer(serializers.ModelSerializer):
  class Meta():
    model = BuildingDocumentFile
    fields = ('building_document_file', 'created_at')

class GetAllFilesSerializer(serializers.Serializer):
    equipment = FileSerializer(many=True)
    tech = TechFileSerializer(many=True)
    safety = safetyDocumentSerializer(many=True)
    building = BuildingDocumentSerializer(many=True)