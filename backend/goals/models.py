from django.db import models
from users.models import User

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