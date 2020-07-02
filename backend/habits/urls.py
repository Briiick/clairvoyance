from django.urls import path
from habits import views

urlpatterns = [
	path('', views.HabitList.as_view()),
]