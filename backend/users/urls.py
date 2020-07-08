from django.urls import path
from users import views

urlpatterns = [
	path('', views.TeamList.as_view()),
]