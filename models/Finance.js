const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const FinanceSchema = new Schema({
    metric: {type: String, required: true},
    netIncome: {type: Double},
    netExpenese: {type: Double},
    incomesList: [{type: Schema.Types.ObjectId, ref: 'record'}],
    expensesList: [{type: Schema.Types.ObjectId, ref: 'record'}]
});

const RecordSchema = new Schema({
    name: {type: String, required: true},
    quantity: {type: Double, required: true},
    quantityMetric: {type: String, required: true},
    amount: {type: Double, required: true},
    description: {type: String}
});

const Finance = mongoose.model('finance', FinanceSchema);
const Record = mongoose.model('record', RecordSchema);

module.exports = {
    Finance: Finance,
    Record: Record
}