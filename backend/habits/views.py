from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from api.permissions import IsOwner
from habits.models import Habit
from habits.serializers import HabitSerializer

# Create your views here.
class HabitList(APIView):
    permission_classes = [IsOwner]

    def get(self, request, format=None):
        habits = Habit.objects.filter(user=request.user)
        serializer = HabitSerializer(habits, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = HabitSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
