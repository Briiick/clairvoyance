from rest_framework import serializers
from goals.models import Goal

class GoalSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = Goal
        fields = '__all__'