from django.db import models
from users.models import User, Team
from habits.models import Habit
from goals.models import Goal

# Create your models here.
class Post(models.Model):
    user = models.ForeignKey(User, models.CASCADE, related_name='user_posts')
    team = models.ForeignKey(Team, models.CASCADE, related_name='team_posts')
    title = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.title)

class GoalUpdate(models.Model):
    user = models.ForeignKey(User, models.CASCADE, related_name='user_goal_updates')
    post = models.ForeignKey(Post, models.CASCADE, related_name='post_goal_updates')
    goal = models.ForeignKey(Goal, models.CASCADE, related_name='goal_updates')
    progress = models.FloatField(blank=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.title)

class HabitUpdate(models.Model):
    user = models.ForeignKey(User, models.CASCADE, related_name='user_habit_updates')
    post = models.ForeignKey(Post, models.CASCADE, related_name='post_habit_updates', blank=True, null=True)
    habit = models.ForeignKey(Habit, models.CASCADE, related_name='habit_updates')
    value = models.FloatField(blank=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.title)