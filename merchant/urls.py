from django.urls import path
from . import views

urlpatterns = [
    path('', views.Login.as_view(), name='login'),
    path('login/', views.Login.as_view(), name='login/'),
    path('logout_', views.Logout.as_view(), name='logout_'),
    path('dashboard_merchant', views.m_dashboard.as_view(), name="dashboard_"),
    path('product_merchant', views.Product_list.as_view(), name='product_'),
    path('batch', views.Batch_list.as_view(), name='batch'),
    path('batch/', views.AddBatch.as_view(), name='batch/'),

    path('qr/<int:qid>', views.add_qr, name="qr"),
    path('qr/<int:bid>/', views.download_qr, name="qr/"),
    path('product_details/<int:id>', views.view_product, name="product_"),
    path('profile', views.EditProfile.as_view(), name="profile"),
    path('profile/', views.EditProfile.as_view(), name="profile/"),
    path('forgot_password', views.forgot_password.as_view(), name="forgot_password"),
    path('reset_password_/<int:id>/', views.Reset_Password.as_view(), name="reset_password_/"),
    path('changePassword', views.change_password.as_view(), name="changePassword"),
    path('changePassword/', views.change_password.as_view(), name="changePassword/"),

]
