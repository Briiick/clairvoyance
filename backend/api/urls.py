from django.urls import include, path

urlpatterns = [
	path('users/', include('rest_auth.urls')),
    path('users/registration/', include('rest_auth.registration.urls')),
    path('habits/', include('habits.urls')),
    path('goals/', include('goals.urls')),
    path('posts/', include('posts.urls')),
    path('teams/', include('users.urls')),
    path("users/o/", include('socialLogin.urls')),
]