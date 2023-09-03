from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Report, AccountingProviderBalanceSheet
from .serializers import AccountingProviderBalanceSheetSerializer, ReportSerializer
from rest_framework import status
import json
from django.http import JsonResponse

@api_view(['GET'])
def get_all_balance_sheets(request):
    try:
        balance_sheets = AccountingProviderBalanceSheet.objects.all()
        serialized_balance_sheets = AccountingProviderBalanceSheetSerializer(balance_sheets, many=True)
        return Response(serialized_balance_sheets.data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_balance_sheet_for_provider(request, acc_provider):
    try:
        balance_sheets = AccountingProviderBalanceSheet.objects.filter(accounting_provider=acc_provider)
        serialized_sheets = AccountingProviderBalanceSheetSerializer(balance_sheets, many=True)
        return Response(serialized_sheets.data)
    except AccountingProviderBalanceSheet.DoesNotExist:
        return Response({"message": "Accounting provider not found"}, status=404)

@api_view(['POST'])
def add_record_balance_sheet(request):
    try:
        serializer = AccountingProviderBalanceSheetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def get_outcome_for(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            buisness_name = data.get('buisness_name')
            loan_amount = data.get('loan_amount')
            last_year_profit_loss = data.get('last_year_profit_loss')
            last_year_avg_assets = data.get('last_year_avg_assets')


            pre_assessment_value = 20

            if last_year_avg_assets > loan_amount:
                pre_assessment_value = 100
            elif last_year_profit_loss > 0:
                pre_assessment_value = 60 

            response_data = {
                'buisnessName': buisness_name,
                'preAssessmentValue': pre_assessment_value
            }

            return JsonResponse(response_data, status=200)

        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)
         