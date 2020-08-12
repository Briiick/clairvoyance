from django.contrib import admin
from agreements.models import *

# Register your models here.
admin.site.register(Agreement)
admin.site.register(Balance)
admin.site.register(Transaction)