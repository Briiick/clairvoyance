from django.urls import path
from socialLogin import views

urlpatterns = [
	path('', views.SocialLoginView.as_view()),
]