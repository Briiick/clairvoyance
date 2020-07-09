from django.urls import path
from posts import views

urlpatterns = [
	path('', views.PostsList.as_view()),
  	path('<int:pk>/', views.PostsDetails.as_view()),
]