from django.contrib import admin
from .models import User

# Register your models here.
class UserDetails(admin.ModelAdmin):
    list_display = ('email', 'username', 'created_at')

admin.site.register(User, UserDetails)