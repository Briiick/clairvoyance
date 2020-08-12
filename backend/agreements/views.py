from django.shortcuts import render
from rest_framework import generics, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.views import APIView
from api.permissions import IsOwner, IsInTeam
from agreements.models import *
from agreements.serializers import *

# Create your views here.
class AgreementsList(APIView):
    permission_classes = [IsOwner]

    def get(self, request, format=None):
        team_id = request.GET.get('team')
        if team_id and request.user.team_set.filter(id=team_id).exists():
            agreements = Agreement.objects.filter(team=team_id)
            serializer = AgreementSerializer(agreements, many=True)
            return Response(serializer.data)
        elif team_id and not request.user.team_set.filter(id=team_id).exists():
            return Response("You are not part of the team.", status=status.HTTP_400_BAD_REQUEST)
        agreements = Agreement.objects.filter(user=request.user)
        serializer = AgreementSerializer(agreements, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = AgreementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class AgreementDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwner]
    queryset = Agreement.objects.all()
    serializer_class = AgreementSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']

class BalanceDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwner]
    queryset = Balance.objects.all()
    serializer_class = BalanceSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']

class TransactionsList(APIView):
    permission_classes = [IsOwner]

    def get(self, request, format=None):
        team_id = request.GET.get('team')
        if team_id and request.user.team_set.filter(id=team_id).exists():
            transactions = Transaction.objects.filter(balance__team__id=team_id)
            serializer = TransactionSerializer(transactions, many=True)
            return Response(serializer.data)
        elif team_id and not request.user.team_set.filter(id=team_id).exists():
            return Response("You are not part of the team.", status=status.HTTP_400_BAD_REQUEST)
        transactions = Transaction.objects.filter(user=request.user)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TransactionDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwner]
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']