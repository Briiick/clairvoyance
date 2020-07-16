from django.db import models
from users.models import User
# from posts.models import Post

# Create your models here.
class Habit(models.Model):
    HABIT_TYPE = (("T","Timed"),("B","Boolean"))

    user = models.ForeignKey(User, models.CASCADE, related_name='user_habits')
    title = models.TextField()
    description = models.TextField()
    habit_type = models.CharField(choices=HABIT_TYPE, max_length=20, default="T")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.title)

class HabitUpdate(models.Model):
    user = models.ForeignKey(User, models.CASCADE, related_name='user_habit_updates')
    # post = models.ForeignKey(Post, models.CASCADE, related_name='post_habit_updates', blank=True, null=True)
    habit = models.ForeignKey(Habit, models.CASCADE, related_name='habit_updates')
    value = models.FloatField(blank=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.content)
