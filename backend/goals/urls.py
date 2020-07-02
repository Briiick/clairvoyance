from django.urls import path
from goals import views

urlpatterns = [
	path('', views.GoalList.as_view()),
]