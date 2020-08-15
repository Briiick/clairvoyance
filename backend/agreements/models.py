from django.db import models
from django.db.models import Sum
from users.models import User, Team
import django.utils

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
    balance = models.FloatField(default=0)
    last_defaulted = models.DateTimeField(blank=True)
    last_checked = models.DateTimeField(default=django.utils.timezone.now)

    # def get_current_balance(self):
    #    total_transactions = self.balance_transactions.filter(transaction_date___gt=self.last_checked).aggregate(Sum('value'))
    #    return self.balance + total_transactions

# Creates Single Transaction Model
class Transaction(models.Model):
    balance = models.ForeignKey(Balance, models.CASCADE, related_name='balance_transactions')
    user = models.ForeignKey(User, models.CASCADE, related_name='user_transactions')
    value = models.FloatField()
    transaction_date = models.DateTimeField(default=django.utils.timezone.now)
    updated_at = models.DateTimeField(auto_now=True)