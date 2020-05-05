const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const FinanceSchema = new Schema({
    name: {type: String, lowercase: true, required: true},
    metric: {type: String, required: true},
    netIncome: {type: Number, min: 0},
    netExpense: {type: Number, min: 0},
    incomeList: [{type: Schema.Types.ObjectId, ref: 'record'}],
    expenseList: [{type: Schema.Types.ObjectId, ref: 'record'}]
});

const RecordSchema = new Schema({
    name: {type: String, lowercase: true, required: true},
    quantity: {type: Number, min: 0, required: true},
    quantityMetric: {type: String, required: true},
    amount: {type: Number, min: 0, required: true},
    amountMetric: {type: String, required: true},
    description: {type: String}
});

const Finance = mongoose.model('finance', FinanceSchema);
const Record = mongoose.model('record', RecordSchema);

module.exports = {
    Finance: Finance,
    Record: Record
}