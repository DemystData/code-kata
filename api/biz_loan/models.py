from django.db import models

class Report(models.Model):
    year = models.PositiveIntegerField()
    month = models.PositiveIntegerField()
    profit_or_loss = models.IntegerField()
    assets_value = models.IntegerField()

    def __str__(self):
        return f"Report for {self.month} & {self.year}"

class AccountingProviderBalanceSheet(models.Model):
    accounting_provider = models.CharField(primary_key = True, max_length = 100)
    balance_sheet = models.ManyToManyField(Report)
    
    def __str__(self):
        return self.name
