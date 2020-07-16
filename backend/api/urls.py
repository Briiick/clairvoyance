from django.urls import include, path
from django.conf.urls import url

urlpatterns = [
	path('users/', include('rest_auth.urls')),
    path('users/registration/', include('rest_auth.registration.urls')),
    path('habits/', include('habits.urls')),
    path('goals/', include('goals.urls')),
    path('posts/', include('posts.urls')),
    path('teams/', include('users.urls')),
    path('social/', include('socialLogin.urls')),
]