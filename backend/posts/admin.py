from django.contrib import admin
from posts.models import Post, GoalUpdate, HabitUpdate

# Register your models here.
admin.site.register(Post)
admin.site.register(GoalUpdate)
admin.site.register(HabitUpdate)
