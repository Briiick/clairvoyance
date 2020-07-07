from django.db import models
from users.models import User
# from posts.models import Post

# Create your models here.
class Goal(models.Model):
    GOAL_STATUS = (("P","In Progress"),("D","Done"),("N","Not Started"))

    user = models.ForeignKey(User, models.CASCADE, related_name='user_goals')
    title = models.TextField()
    description = models.TextField()
    progress = models.FloatField(default=0)
    status = models.CharField(choices=GOAL_STATUS, max_length=20, default="N")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return str(self.title)

class GoalUpdate(models.Model):
    user = models.ForeignKey(User, models.CASCADE, related_name='user_goal_updates')
    # post = models.ForeignKey(Post, models.CASCADE, related_name='post_goal_updates')
    goal = models.ForeignKey(Goal, models.CASCADE, related_name='goal_updates')
    progress = models.FloatField(blank=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.content)