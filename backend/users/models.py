# Loads Abstract User Model
from django.contrib.auth.models import AbstractUser
from django.db import models

# Creates User Model
class User(AbstractUser):
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.email)
