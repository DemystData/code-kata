from rest_framework import serializers
from .models import Report, AccountingProviderBalanceSheet

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ['year', 'month', 'profit_or_loss', 'assets_value']

class AccountingProviderBalanceSheetSerializer(serializers.ModelSerializer):
    balance_sheet = ReportSerializer(many=True)

    class Meta:
        model = AccountingProviderBalanceSheet
        fields = ['accounting_provider', 'balance_sheet']

    def create(self, validated_data):
        balance_sheet_data = validated_data.pop('balance_sheet')
        accounting_provider, created = AccountingProviderBalanceSheet.objects.get_or_create(**validated_data)

        reports = [Report.objects.create(**report_data) for report_data in balance_sheet_data]
        accounting_provider.balance_sheet.set(reports)

        return accounting_provider

