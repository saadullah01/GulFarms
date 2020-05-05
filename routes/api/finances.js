const express = require('express');
const router = express.Router();

//Model
const Finance = require('../../models/Finance');

const nameToModelMap = {"record": Finance.Record, "finance": Finance.Finance};
const summarize = data => (
    {
        _id:data._id,
        name:data.name
    }
);
//Helper functions
const CreateMultiple = (dataList, dataType) => {
    dataType = dataType.toLowerCase();
    const allDocs = dataList.map(data => {
        const docInfo = {};
        if(dataType == 'record'){
            docInfo.name = data.name;
            docInfo.quantity = data.quantity;
            docInfo.quantityMetric = data.quantityMetric;
            docInfo.amount = data.amount;
            docInfo.amountMetric = data.amountMetric;
            if(data.hasOwnProperty('description') == true){
                docInfo.description = data.description;
            }
        }
        if(dataType == 'finance'){
            docInfo.name = data.name;
            docInfo.metric = data.metric;
            docInfo.netIncome = 0;
            docInfo.netExpense = 0;
            docInfo.incomeList = [];
            docInfo.expenseList = [];
        }
        const doc = new nameToModelMap[dataType](docInfo);
        return doc.save().catch(err => ({status: 400, res:{error: err, message: "Error saving " + dataType, success: false}}));
    })
    return Promise.all(allDocs).then(docs => {
        const created = {
            id: docs.map(doc => doc._id)
        };
        if(dataType == 'record' && docs != []){
            created.net = docs.reduce((x, y) => x.amount + y.amount);
        }
        return created;
    }).catch(err => ({status: 400, res:{error: err, message: "Error creating " + dataType, success: false}}));
};

const DeleteRecord = (recordId) => {
    return Finance.Record.findByIdAndDelete(recordId).then(record => {
        if(!record){
            return Promise.reject({status: 404, res:{error: "ID", message: "Invalid ID, no record found to delete", success: false}})
        }
        return record.amount;
    }).catch(err => ({status: 400, res:{error: err, message: "Error deleting record", success: false}}))
}

// @route POST api/finance/create
// @desc Create a new finance sheet
// @access Public
router.post("/create", (req, res) => {
    console.log("Request @ api/finance/create : {\n");
    for(key in req.body){
        console.log(key, ": ", req.body[key]);
    }
    console.log("}");

    // Form validation
    const { errors, isValid } = { erros: "", isValid: true }; //=============ADD proper validation
    
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    //Expecting fields name and metric
    CreateMultiple([req.body], 'finance')
    .then(financeCreated => (
        {
            status: 200,
            res:{
                created: financeCreated.id,
                message:"Successfully created new finance sheet.",
                success: true
            }
        }
    )).then(response => res.status(response.status).json(response.res))
    .catch(err => res.status(err.hasOwnProperty('status') ? err.status : 400).json(err.hasOwnProperty('res') ? err.res : err));
});

// @route POST api/finance/get
// @desc Create a new finance sheet
// @access Public
router.post("/create", (req, res) => {
    console.log("Request @ api/finance/get : {\n");
    for(key in req.body){
        console.log(key, ": ", req.body[key]);
    }
    console.log("}");

    // Form validation
    const { errors, isValid } = { erros: "", isValid: true }; //=============ADD proper validation
    
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    //Expecting field id for finance sheet
    Finance.Finance.findById(req.body.id).then(finance => {
        if(!finance){
            return Promise.reject({status: 404, res:{error: "ID", message: "Invalid ID, no finance sheet found.", success: false}})
        }
        return finance.populate('incomeList').execPopulate()
        .then(finance => finance.populate('expenseList').execPopulate())
        .then(finance => ({
            status: 200,
            res:{ finance }
        })).catch(err => ({status: 400, res:{error: err, message: "Error populating finance sheet", success: false}}))
    }).then(response => res.status(response.status).json(response.res))
    .catch(err => res.status(err.hasOwnProperty('status') ? err.status : 400).json(err.hasOwnProperty('res') ? err.res : err));
});

// @route POST api/finance/records/create
// @desc Create one or more new records
// @access Public
router.post("/records/create", (req, res) => {
    console.log("Request @ api/finance/records/create : {\n");
    for(key in req.body){
        console.log(key, ": ", req.body[key]);
    }
    console.log("}");

    // Form validation
    const { errors, isValid } = { erros: "", isValid: true }; //=============ADD proper validation
    
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    //Expecting records for income as income: [] and expense: []
    //Expecting finance id to add records to
    const recordsInfo = {income: [], expense: []};
    let netDeltaIncome = 0, netDeltaExpense = 0;
    if(req.body.hasOwnProperty('income')){
        recordsInfo.income = req.body.income;
    }
    if(req.body.hasOwnProperty('expense')){
        recordsInfo.expense = req.body.expense;
    }

    //Create records
    return CreateMultiple(req.body.income, 'record')
    .then( incomeCreated => CreateMultiple(req.body.expense, 'record')
        .then(expenseCreated => {
            netDeltaIncome = incomeCreated.net;
            netDeltaExpense = expenseCreated.net;
            recordsInfo.income = incomeCreated.id;
            recordsInfo.expense = expenseCreated.id;
            //Add records and delta to finance
            return Finance.Finance.findById(req.body.id).then(finance => {
                if(!finance){
                    return Promise.reject({status: 404, res:{error: "ID", message: "Invalid ID, no finance sheet found.", success: false}})
                }
                finance.netIncome += incomeCreated.net;
                finance.netExpense += expenseCreated.net;
                finance.incomeList.push(incomeCreated.id);
                finance.expenseList.push(expenseCreated.id);
                return finance.save().then(_ => ({
                    status: 200,
                    res:{
                        created: recordsInfo,
                        message:"Successfully added new records to finance sheet.",
                        success: true
                    }
                }).catch(err => ({status: 400, res:{error: err, message: "Error saving finance sheet", success: false}}))
            )})
        }).catch(err => res.status(err.hasOwnProperty('status') ? err.status : 400).json(err.hasOwnProperty('res') ? err.res : err))
    
    ).then(response => res.status(response.status).json(response.res))
    .catch(err => res.status(err.hasOwnProperty('status') ? err.status : 400).json(err.hasOwnProperty('res') ? err.res : err));
});

// @route POST api/finance/records/delete
// @desc delete one or more new records
// @access Public
router.post("/records/delete", (req, res) => {
    console.log("Request @ api/finance/records/delete : {\n");
    for(key in req.body){
        console.log(key, ": ", req.body[key]);
    }
    console.log("}");

    // Form validation
    const { errors, isValid } = { erros: "", isValid: true }; //=============ADD proper validation
    
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    //Expecting records for income as income: [] and expense: []
    //Expecting finance id to delete records from
    const recordsInfo = {income: [], expense: []};
    let netDeltaIncome = 0, netDeltaExpense = 0;
    if(req.body.hasOwnProperty('income')){
        recordsInfo.income = req.body.income;
    }
    if(req.body.hasOwnProperty('expense')){
        recordsInfo.expense = req.body.expense;
    }

    //Find finance sheet to delete records of
    Finance.Finance.findById(finance => {
        if(!finance){
            return Promise.reject({status: 404, res:{error: "ID", message: "Invalid ID, no finance sheet found to delete records.", success: false}})
        }
        return finance;
    }).then(finance => {
        //Delete income records
        const income = recordsInfo.income.map(record => DeleteRecord(record));
        const incomeDeleted = Promise.all(income).then(deleted => 
            netDeltaIncome = income.reduce((x,y) => x + y)
        )
        //Delete expense records
        const expense = recordsInfo.expense.map(record => DeleteRecord(record));
        const expenseDeleted = Promise.all(expense).then(deleted => 
            netDeltaexpense = expense.reduce((x,y) => x + y)
        )
        return Promise.all([incomeDeleted, expenseDeleted]).then(_ => {
            //Remove from income and expense list of finance sheet
            finance.netIncome -= netDeltaIncome;
            finance.netExpense -= netDeltaexpense;
            finance.incomeList = finance.incomeList.filter(x => !recordsInfo.income.includes(x));
            finance.expenseList = finance.expenseList.filter(x => !recordsInfo.expense.includes(x));
            return finance.save().then(finance => ({
                status: 200,
                res:{
                    message:"Successfully deleted records from finance sheet.",
                    success: true
                }
            })).catch(err => ({status: 400, res:{error: err, message: "Error saving finance sheet", success: false}}))
        })
    }).then(response => res.status(response.status).json(response.res))
    .catch(err => res.status(err.hasOwnProperty('status') ? err.status : 400).json(err.hasOwnProperty('res') ? err.res : err));
});

module.exports = router;