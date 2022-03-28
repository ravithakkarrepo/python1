"""
URLPatterns for Admin Panel itself.
"""

from django.urls import path
from contractor.additional_points import additional_points, additional_points_request_resolved, task_additional_points, \
    task_additional_points_request_resolved
from slp_admin.add_product import AddProduct, Product_list, ViewProduct, DeleteProduct, EditProduct, delete_file, \
    merchant_product
from . import views, video_api, video, cms, contest, qr_codes_xlsx
from .add_product import FileView, GetAllFileList, GetFiles

from userapi import quiz, products, giftbitAPI, leaderboard, dispute_request, qr_list
from django.conf.urls.static import static
from django.conf import settings
from django.conf.urls import url

from contractor.views import contractor_list, contractor, ContractorResetPassword, view_contractor, block_contractor

urlpatterns = [
  path('', views.Login_page.as_view(), name="login_page"),
  path('logout/', views.logout, name='logout'),
  path('login_error/', views.login_error, name='login_error'),
  path('dashboard/', views.dashboard, name="dashboard"),
  path('user_list/', views.user_list, name='user_list'),
  path('view_list/<str:user_id>/', views.view_list, name='view_list'),
  path('ublock/<int:user_id>/', views.ublock, name='ublock'),
  path('merchant_list/', views.merchant_list, name='merchant_list'),
  path('add_merchant/', views.add_merchant, name='add_merchant'),
  path('activation_link/<str:token_id>/', views.ActivationLink, name='activation_link'),
  path('reward/<str:user_id>/', views.Reward_Points_Management, name='reward'),
  path('merchant_details/<str:user_id>/', views.merchant_details, name='merchant_details'),
  path('merchant_block/<str:user_id>/', views.merchant_block, name='merchant_block'),
  path('product', Product_list.as_view(), name='product'),
  path('merchant_delete/<str:user_id>/', views.merchant_delete, name='merchant_delete'),
  path('product/', AddProduct.as_view(), name='product/'),
  path('add_banner/', views.add_banner, name="add_banner"),
  path('banner_list/', views.banner_list, name="banner_list"),
  path('banner_delete/<str:id>/', views.banner_delete, name="banner_delete"),
  path('banner_edit/<str:id>', views.banner_edit.as_view(), name="banner_edit"),
  path('banner_edit/<str:id>/', views.banner_edit.as_view(), name="banner_edit/"),
  path('banner_status/<str:id>/', views.banner_status, name="banner_status"),

  path('quiz_list/', views.quiz_list, name='quiz_list'),
  path('add_ques/', views.add_ques, name='add_ques'),
  path('quiz_delete/<str:id>/', views.quiz_delete, name='quiz_delete'),
  path('view_questions/<str:id>/', views.view_questions, name='view_questions'),
  path('delete_questions/<str:id>/', views.delete_questions, name='delete_questions'),
  path('edit_questions/<str:id>/', views.edit_questions.as_view(), name='edit_questions'),
  path('product/<int:id>', ViewProduct.as_view(), name="product"),
  path('product/<int:id>/', DeleteProduct.as_view(), name="product/"),

  # APIs for React-Native app
  # path("video_submit", video_api.video_postAPI, name='video_api'),  # Not usable
  # path("category_submit", video_api.category_postAPI, name="category_api_demo"),  # Not usable

  path("video_list", video_api.video_getAPI),
  path("category_list", video_api.category_getAPI, name="category_list"),
  path('quiz_list', quiz.quiz_getAPI),
  path("quiz_question/<int:videoId>", quiz.quiz_video, name="quiz_video"),
  path("quiz_complete_res", quiz.quiz_finshed_res),
  path("product_list_app", products.product_list),
  path("product_list_each/<int:id>", products.product_list_dyn),
  path("giftbit/<int:id>", giftbitAPI.giftbit_api),

  path('_product/<int:id>/', EditProduct.as_view(), name="_product/"),
  path("reset_password/<int:id>/", views.ResetPassword.as_view(), name="reset_password/"),
  path("change_password", views.change_password.as_view(), name="change_password"),
  path("change_password/", views.change_password.as_view(), name="change_password/"),
  path('pass_update/<str:token_id>/', views.pass_update, name='pass_update'),
  path('contact_us/', views.contact_us, name='contact_us'),
  path('contact_us/resolved/<int:id>/', views.contact_us_resolved, name='contact_us/resolved/'),
  path('delete_file/<str:file_name>/<int:id>', delete_file, name='delete_file'),
  path('m_product/<int:id>', merchant_product, name="m_product/"),

  path("category", video_api.category_display, name="category_display"),
  path("add_category", video_api.category_add, name="category_add"),
  path("delete_category/<int:id>", video_api.del_category, name="del_category"),

  path("videos", video.video_table, name="video_table"),
  path("video_add", video.video_add_table, name="video_add_table"),
  path("add_video", video.add_new_video, name="add_new_video"),
  path("video_delete/<int:id>", video.del_video, name="del_video"),
  path("edit_video/<int:id>", video.edit_video_page, name="edit_video"),
  path("update_update/<int:id>", video.update_video_page, name="update"),

  path('leaderboard/', leaderboard.leaderboard, name='leaderboard/'),
  path('dispute/requests/', dispute_request.dispute_request, name='dispute/requests/'),
  path('dispute/resolved/<int:id>/', dispute_request.dispute_resolved, name='dispute/resolved/'),
  # path('add_product_post', add_product_post, name="add_product_post")
  path('qrcodes/', qr_list.qr_list, name='qrcodes/'),
  path('qrcodes/<int:id>', qr_list.qr_details, name='qrcodes/'),


  path('qrCodesXLSX/', qr_codes_xlsx.GetQRCodeXLSX.as_view(), name='qrCodesXLSX/'),

  path("Adminsettings", video.setting_admin, name="settings_admin"),
  path("dollar_settings", video.setting_dollar, name="setting_dollar"),
  path("bonus_settings", video.settings_bonus, name="settings_bonus"),
  path("user_eligibility_points", video.settings_eligibilty_points, name="eligibility_points"),

  path("contractor/points/one/dollar", video.contractor_panel_points_to_1_dollar,
       name="contractor_panel_points_to_1_dollar"),
  path("support_point", video.support_point, name="support_point"),

  path("cmslist", cms.cms_table, name="cmslist"),
  path("addcms", cms.add_cms, name="add_cms"),
  path("editcms/<int:id>", cms.edit_cms, name="edit_cms"),
  path("deletecms/<int:id>", cms.delete_cms, name="delete_cms"),
  path("each_cms/<int:id>", cms.each_cms, name="each_cms"),
  path("quiz_ans/<int:videoId>", quiz.quiz_ans),
  path("quiz_show_result/<int:quiz_videoId>", quiz.quiz_show_result),
  path("notification/<int:id>", products.notification_getAPI),
  path("giftbitData", giftbitAPI.giftbitLog, name="giftbitData"),
  path("contestList", contest.contest_list, name="contestList"),
  path("add_contest", contest.add_contest, name="add_contest"),
  path("contest_details/<int:id>", contest.contest_details, name="contest_details"),
  path('contest_edit/<str:id>', contest.contest_edit.as_view(), name="contest_edit"),
  path('contest_edit/<str:id>/', contest.contest_edit.as_view(), name="contest_edit/"),
  # path("contest_play",contest.contest_play,name="contest_play"),
  path('contest_view_list/<str:id>_<str:user_id>/', views.contest_view_list, name='contest_view_list'),
  # path("delete_contest/<int:id>",contest.delete_contest,name="deleteContest"),
  path("contest_list/<int:id>", contest.ContestgetAPI),
  path("participate", contest.participate),
  path("contest/<int:id>", contest.one_contest),
  path("contest_user/<int:contest_id>", contest.contest_user),
  path("delete_contest/<int:id>", contest.delete_contest, name="deleteContest/"),
  path("contest_user_board/<int:contest_id>", contest.contest_user_board),

  # path("post_cms",cms.post_cms),
  # path("disp_ck",video.disp_ck,name="disp_ck"),
  # path("data_ck",video.ck,name="data_ck")
  # path("quiz_data",quiz.quiz_data),
  # path('video_get_api', include(router.urls)),
  # path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))

  path("contractors", contractor_list, name="contractors"),
  path("contractors/<int:contractor_id>", view_contractor, name="contractors/"),
  path("contractors/add/", contractor, name="contractors/add/"),
  path("reset_password/contractor/<int:contractor_id>", ContractorResetPassword.as_view(),
       name="reset_password/contractor/"),
  path("contractors/block/<int:contractor_id>", block_contractor, name="contractors/block/"),
  path("contest_user_board_admin/<int:contest_id>", contest.contest_user_board_admin),

  path("products/points/requests", additional_points, name='additional_points'),
  path("products/points/requests/resolve/<int:add_points_request_id>",
       additional_points_request_resolved, name='additional_points/resolve/'),

  path("task/points/requests", task_additional_points, name='task_additional_points'),
  path("task/points/requests/resolve/<int:add_points_request_id>", task_additional_points_request_resolved,
       name='task_additional_points/resolve/'),

  path("get_contest_list", contest.get_contest_list),
  path('', views.Login_page.as_view(), name="login_page"),


   path('file/upload', FileView.as_view(), name='file_upload'),
   path('allfiles/', GetAllFileList, name='allfiles'),
   path('files/', GetFiles, name='get_files'),


] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_URL)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
