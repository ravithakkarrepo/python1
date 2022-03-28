"""
URLPatterns for UPC app.
"""
from django.urls import path
from upc import views, xlsx, user_rating, update_xlsx_sheet, handsone_view
from upc.slp_upc_products import SLPUPCProducts

urlpatterns = [
    path("upload/xlsx/", xlsx.ParseExcel.as_view()),  # Store temps in db, Only for Dev's Use, POST upc/upload/xlsx/
    path("update/xlsx/", update_xlsx_sheet.UpdateExcel.as_view()),  # update temps in db, Only for Dev's Use, POST upc/update/xlsx/
    path("slpUpcProducts/", SLPUPCProducts.as_view()),  # Store temps in db, Only for Dev's Use, POST upc/upload/xlsx/

    path("questions", views.get_ques, name="get_ques"),  # To get questions for Dashboard Prediction GET upc/questions
    path("questions/submit/", views.submit_questions),  # Submit & get question prediction POST upc/questions/submit/

    path("userRatig/", user_rating.rating),  # Submit user rating POST upc/userRatig/

    # To update settings of UPC. Particular end point for particular field update.
    path('admin_settings', views.admin_settings, name="admin_settings"),
    path('setting', views.setting, name="setting"),
    path('conditions', views.conditions1, name="conditions"),
    path('condition', views.condition2, name="condition"),
    path('spray_level', views.spray_humidity_level, name="spray_level"),
    path('spraying_speed', views.speed_of_spraying, name="spraying_speed"),
    path('insulated_hose', views.hose_insulated, name="insulated_hose"),
    path('hose_in_spray', views.spray_hose_in, name="hose_in_spray"),
    path('substrate_type', views.substrate, name="substrate_type"),
    path('layer', views.Layers, name="layer"),

    path('ratings', user_rating.user_ratings_admin_panel, name="upc/ratings"),

    path('viewData', handsone_view.handsone_view, name="upc/viewData"),

]
