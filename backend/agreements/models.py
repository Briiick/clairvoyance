from django.db import models
from users.models import User, Team

# Create your models here.
# Creates Agreement Model to Log Agreements
class Agreement(models.Model):
    AGREEMENT_CHOICES = (("1W","Once Per Week"),("1D","Every Day"),("N","Never"))

    user = models.ForeignKey(User, models.CASCADE, related_name='user_agreements')
    team = models.ForeignKey(Team, models.CASCADE, related_name='team_agreements')
    value = models.FloatField(default=0)
    interval = models.CharField(choices=AGREEMENT_CHOICES, max_length=20, default="N")

# Creates Balance Model
class Balance(models.Model):
    team = models.ForeignKey(Team, models.CASCADE, related_name='team_balance')
    last_defaulted = models.DateTimeField(blank=True)
    last_checked = models.DateTimeField(auto_now_add=True)

# Creates Single Transaction Model
class Transaction(models.Model):
    balance = models.ForeignKey(Balance, models.CASCADE, related_name='balance_transactions')
    user = models.ForeignKey(User, models.CASCADE, related_name='user_transactions')
    value = models.FloatField()
    transaction_date = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)