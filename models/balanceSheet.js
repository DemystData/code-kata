import { Schema, model, models } from 'mongoose';

const balanceSheetSchema = new Schema({
    _id: String,
    businessName: String,
    accountingProvider: String,
    balanceSheet: [
        {
        year: Number,
        month: Number,
        profitOrLoss: Number,
        assetsValue: Number
        }
    ]
});

const  BalanceSheet = models.BalanceSheet || model("BalanceSheet", balanceSheetSchema, 'balance_sheet');

export default BalanceSheet;