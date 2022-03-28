from django.urls import path
from contractor import login, forget_password, dashboard, edit_profile
from contractor import views

urlpatterns = [
    path('', login.Login.as_view(), name='contractor/login/'),
    path('login/', login.Login.as_view(), name='contractor/login/'),
    path('forgot/password/', forget_password.ForgotPassword.as_view(), name="contractor/forgot/password/"),
    path('reset/password/<int:contractor_id>', forget_password.ResetPassword.as_view(),
         name="contractor/reset/password/"),
    path('dashboard', dashboard.Dashboard.as_view(), name="contractor/dashboard"),
    path('users', dashboard.users, name="contractor/users"),
    path('users/<int:user_id>', dashboard.view_user, name="contractor/users/"),
    path('points/', dashboard.add_points, name="contractor/points/"),

    path('con_qrcode/<int:id>', dashboard.qr_details, name='con_qrcode/'),

    path('products', dashboard.ProductList.as_view(), name="contractor/products"),
    path('products/<int:product_id>', dashboard.ProductDetails.as_view(), name="contractor/products/"),
    path('profile', edit_profile.EditProfile.as_view(), name="contractor/profile"),
    path('profile/', edit_profile.EditProfile.as_view(), name="contractor/profile/"),
    path('change/password', forget_password.ChangePassword.as_view(), name="contractor/change/password"),
    path('change/password/', forget_password.ChangePassword.as_view(), name="contractor/change/password/"),
    path('logout/', login.Logout.as_view(), name='contractor/logout/'),

    path("jobs", views.job_list, name="jobs"),
    path("add_job_category", views.add_jobs, name="add_job_category"),
    path("task", views.task_list, name="task"),
    path("add_task", views.add_task, name="add_task"),
    path("task_delete/<int:id>/", views.delete_task, name="task_delete/"),

    path("task_details/<int:id>/", views.task_details, name="task_details/"),

    path("prediction/points/usd", dashboard.get_charge_accordingly_points, name="contractor/prediction/points/usd"),
    path("prediction/points/usd/", dashboard.product_add_points, name="contractor/prediction/points/usd/"),
    path("add/points/user/", dashboard.add_points_user_account, name="contractor/add/points/user/"),


    path("due/bills", dashboard.due_bills_html, name="contractor/due/bills"),
    path("bills", dashboard.due_bills, name="get_bills"),

    path("task/points/usd", views.get_charge_according_to_points, name="contractor/task/points/usd"),
    path("task/points/usd/", views.task_add_points, name="contractor/task/points/usd/"),

    path("task/due/bills", views.task_due_bills_html, name="contractor/task/due/bills"),
    path("task/bills", views.task_due_bills, name="get_bills"),

]
