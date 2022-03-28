"""
URLPatterns for userapi app. Some views are imported from contractor app which is relevant to user and end up using in
React-Native app.
"""
from django.urls import path
from contractor import user_apis
from userapi import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('tasks', user_apis.TasksViewSet)

urlpatterns = [
    path('register/', views.RegisterUser.as_view()),                # User Registration, POST /user/register/
    path('login/', views.UserLogin.as_view()),                      # User login, POST /user/login/
    path('dashboard', views.MobileDashboard.as_view()),             # UserDashboard after login, GET /user/dashboard
    path('data', views.GetUser.as_view()),                          # User data after login, GET /user/data
    path('referral', views.referral_code),                          # User referral code after login, GET /user/referral
    path('company', views.CompanyName.as_view()),                   # company list in registration, GET /user/company
    path('password/', views.ForgetPassword.as_view()),              # Forget Password, POST /user/password/
    path('edit/', views.EditUser.as_view()),                        # Edit User data after login, PUT /user/edit/
    path('logout/', views.UserLogout.as_view()),                    # User logout, POST /user/logout/
    path('qr/scan/', views.ScanQR.as_view()),                       # Scan QR Code after login, POST /user/qr/scan/
    path('product/activation/', views.ProductActivation.as_view()),  # Store prod act ans,POST /user/product/activation/
    path('qr/cancel/', views.cancel),                               # For QR Cancel click, POST /user/qr/cancel/
    path('dont/split/', views.dont_split),                          # Don't split points to user, POST /user/dont/split/
    path('filter', views.get_users_for_specific_company),           # Getting user list after prod act, GET /user/filter
    path('split/point/', views.Split.as_view()),                    # Split points to user, POST /user/split/point/
    path('notification', views.get_bell_notifications),             # Notification on Bell icon, GET /user/notification
    path('rewards', views.get_rewards),                             # rewards history, GET /user/rewards
    path('qr/history', views.get_qr_history),                       # qr history, GET /user/qr/history
    path('qr/history/<int:user_rewards_id>', views.get_specific_qr_details),  # Particular qr data
    path('merchant', views.merchant_list),                          # Merchant List, GET /user/merchant
    path('merchant/products', views.merchant_specific_product_list),  # Merchant specific product list
    path('merchant/products/<int:product_id>', views.merchant_specific_product_details),  # specific product details
    path('support/request/', views.support_request),                # User support request, POST /user/support/request/
    path('leaderboard', views.leader_board),                        # User leader board, GET /user/leaderboard
    path('dispute/', views.dispute_request),                        # User dispute request, POST /user/dispute/
    path('pass_update/<str:token_id>', views.pass_update, name="user/pass_update/"),  # when click on link given in mail
    path('machines', views.get_machine_types),
    path('substrate', views.get_substrate_types),
    path('to-do/tasks', user_apis.get_only_pending_user_specific_tasks),  # Only pending Tasks after Scan QR Code
    path('task/<int:task_id>/qr/<int:qr_id>', user_apis.map_qr_to_task),  # to map qr with task

]

urlpatterns += router.urls
