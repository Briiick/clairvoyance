from django.db import models
from users.models import User, Team
from habits.models import HabitUpdate
from goals.models import GoalUpdate

# Create your models here.
class Post(models.Model):
    user = models.ForeignKey(User, models.CASCADE, related_name='user_posts')
    team = models.ForeignKey(Team, models.CASCADE, related_name='team_posts')
    title = models.TextField()
    general_update = models.TextField()
    future_tasks = models.TextField(blank=True)
    goal_updates = models.ManyToManyField(GoalUpdate, blank=True)
    habit_updates = models.ManyToManyField(HabitUpdate, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.title)