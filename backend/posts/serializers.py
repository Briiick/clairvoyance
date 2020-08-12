from rest_framework import serializers
from posts.models import Post, GoalUpdate, HabitUpdate
from habits.models import Habit
from goals.models import Goal

class GoalUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoalUpdate
        fields = '__all__'

class HabitUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = HabitUpdate
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    goal_updates = GoalUpdateSerializer(many=True)
    habit_updates = HabitUpdateSerializer(many=True)
    user = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = Post
        fields = '__all__'

    def create(self, validated_data):
        goalUpdates = validated_data.pop('goal_updates')
        habitUpdates = validated_data.pop('habit_updates')
        post = Post.objects.create(**validated_data)
        for habitUpdate_data in habitUpdates:
            HabitUpdate.objects.create(**habitUpdate_data)
        for goalUpdate_data in goalUpdates:
            GoalUpdate.objects.create(**goalUpdate_data)
        return post

    def update(self, instance, validated_data):
        for (key, value) in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        
        return instance