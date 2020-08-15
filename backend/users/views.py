from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from api.permissions import IsOwner, IsInTeam
from users.models import Team
from users.serializers import TeamSerializer
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.
class TeamList(APIView):
    permission_classes = [IsOwner]

    def get(self, request, format=None):
        teams = request.user.team_list.all()
        serializer = TeamSerializer(teams, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TeamSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TeamDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsInTeam]
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']