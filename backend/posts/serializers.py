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
    # owner = serializers.ReadOnlyField(source='owner.id')

    class Meta:
        model = Post
        fields = '__all__'

    def create(self, validated_data):
        goalUpdates = validated_data.pop('goalUpdate')
        habitUpdate_data = validated_data.pop('habitUpdate')
        post = Post.objects.create(**validated_data)
        if habitUpdate:
            HabitUpdate.objects.create(post=post, **habitUpdate_data)
        for goalUpdate_data in goalUpdates_data:
            GoalUpdate.objects.create(post=post, **goalUpdate_data)
        return post