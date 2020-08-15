from django.shortcuts import render
from rest_framework import generics, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.views import APIView
from api.permissions import IsOwner, IsInObjectTeam
from agreements.models import *
from agreements.serializers import *
from posts.models import Post
from django.shortcuts import get_object_or_404
import datetime
import pytz
import django.utils
from django.db.models import Sum


utc=pytz.UTC

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
    permission_classes = [IsInObjectTeam]
    queryset = Balance.objects.all()
    serializer_class = BalanceSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, **self.kwargs)
        for user in obj.team.users.all():
            current_date = obj.last_checked
            current_date_notz = obj.last_checked.replace(tzinfo=None)
            current_date_weekday = datetime.timedelta(days=current_date.weekday())
            rule = Agreement.objects.get(user=user, team=obj.team)
            if rule.interval == "1W":
                while current_date.replace(tzinfo=None) < (datetime.datetime.now()-datetime.timedelta(days=datetime.datetime.now().weekday()-1)):
                    if not Post.objects.filter(user=user).filter(created_at__range=[str(current_date - current_date_weekday), str(current_date + datetime.timedelta(days=6-current_date.weekday()))]).count() > 0:
                        Transaction.objects.create(user=user, balance=obj, value=rule.value, transaction_date=(current_date + datetime.timedelta(days=6-current_date.weekday())))
                    current_date = current_date + datetime.timedelta(days=7)
            elif rule.interval == "1D":
                for day in range(0, (datetime.datetime.now()-current_date_notz).days):
                    if Post.objects.filter(user=user).filter(created_at=(current_date+datetime.timedelta(days=1))).count() == 0:
                        Transaction.objects.create(user=user, balance=obj, value=rule.value, transaction_date=(current_date + datetime.timedelta(days=day)))
        obj.balance += (obj.balance_transactions.filter(transaction_date__gt=obj.last_checked).aggregate(Sum('value'))['value__sum'] or 0)
        obj.last_checked = django.utils.timezone.now()
        obj.save()
        return obj

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