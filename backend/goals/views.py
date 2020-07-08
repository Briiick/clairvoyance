from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from api.permissions import IsOwner
from goals.models import Goal
from goals.serializers import GoalSerializer

# Create your views here.
class GoalList(APIView):
    permission_classes = [IsOwner]

    def get(self, request, format=None):
        print(request.user)
        goals = Goal.objects.filter(user=request.user)
        serializer = GoalSerializer(goals, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = GoalSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
