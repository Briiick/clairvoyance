# Loads Abstract User Model
from django.contrib.auth.models import AbstractUser
from django.db import models

# Creates User Model
class User(AbstractUser):
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.email)

# Creates Team Model
class Team(models.Model):
    name = models.CharField(max_length=120, unique=True)
    description = models.TextField()
    # logo = models.ImageField(blank=True)
    users = models.ManyToManyField(User, related_name="team_list")

    def __str__(self):
        return str(self.name)

# Creates Manager for Adding Users to Team
class TeamManager(models.Manager):
    use_for_related_fields = True

    def add_user(self, user, team):
        team.user_set.add(user)

    def remove_user(self, user, team):
        team.user_set.remove(user)