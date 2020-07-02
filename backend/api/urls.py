from django.urls import include, path

urlpatterns = [
	path('accounts/', include('rest_auth.urls')),
    path('habits/', include('habits.urls')),
    path('goals/', include('goals.urls')),
]