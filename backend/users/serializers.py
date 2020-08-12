from rest_framework import serializers
from rest_auth.models import TokenModel
from rest_auth.serializers import UserDetailsSerializer
from rest_framework.authtoken.models import Token
from agreements.serializers import *
from rest_auth.serializers import UserDetailsSerializer


from users.models import Team, User

class TeamSerializer(serializers.ModelSerializer):
    balance = BalanceSerializer(source='team_balance', many=True, default=None)
    agreements = AgreementSerializer(source='team_agreements', many=True, default=None)

    class Meta:
        model = Team
        fields = '__all__'

class CustomUserDetailsSerializer(UserDetailsSerializer):
    team_list = TeamSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'team_list', 'email' )