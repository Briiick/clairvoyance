from rest_framework import serializers
from agreements.models import Agreement, Balance, Transaction

class AgreementSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')
    
    class Meta:
        model = Agreement
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = Transaction
        fields = '__all__'

class BalanceSerializer(serializers.ModelSerializer):
    transactions = TransactionSerializer(source='balance_transactions', many=True)

    class Meta:
        model = Balance
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.last_defaulted = validated_data.get('last_defaulted', instance.last_defaulted)
        instance.save()

        return instance