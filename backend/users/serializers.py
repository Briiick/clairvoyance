from rest_framework import serializers
from rest_auth.models import TokenModel
from rest_auth.serializers import UserDetailsSerializer
from rest_framework.authtoken.models import Token
from agreements.serializers import *

from users.models import Team, User

class TeamSerializer(serializers.ModelSerializer):
    balance = BalanceSerializer(source='team_balance', many=True, default=None)
    agreements = AgreementSerializer(source='team_agreements', many=True, default=None)

    class Meta:
        model = Team
        fields = '__all__'