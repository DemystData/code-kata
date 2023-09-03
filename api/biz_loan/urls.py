from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_all_balance_sheets),
    path('getBalanceSheet/<str:acc_provider>/', views.get_balance_sheet_for_provider),
    path('add/', views.add_record_balance_sheet),
    path('getOutcomeFor/', views.get_outcome_for),
]