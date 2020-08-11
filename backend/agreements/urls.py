from django.urls import path
from agreements import views

urlpatterns = [
	path('', views.AgreementsList.as_view()),
    path('<int:pk>', views.AgreementDetails.as_view()),
    path('balance/<int:pk>', views.BalanceDetails.as_view()),
    path('transactions/', views.TransactionsList.as_view()),
    path('transactions/<int:pk>', views.TransactionDetails.as_view()),
]