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
    // console.debug("dataList: ", JSON.stringify(dataList));
    if(!Array.isArray(dataList) || !dataList.length)
    {   
        console.debug("empty");
        return Promise.resolve({id: [], net: 0});
    }
    dataType = dataType.toLowerCase();
    const allDocs = dataList.map(data => {
        // console.debug("Creating doc: ", JSON.stringify(data));
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
        // console.debug("Created doc: ", doc.toJSON());
        return doc.save().then(doc => doc).catch(err => ({status: 400, res:{error: err, message: "Error saving " + dataType, success: false}}));
    })
    return Promise.all(allDocs).then(docs => {
        const created = {
            id: docs.map(doc => doc._id)
        };
        if(dataType == 'record'){
            if(!docs)
                // console.debug("!docs")
            if(docs == [])
                // console.debug("[]")
            // console.debug("Reducing:", JSON.stringify(docs));
            created.net = 0;
            for(x in docs){
                // console.debug("x: ", JSON.stringify(x))
                created.net += docs[x].amount;
            }
            // console.debug("reduced net: ", created.net);
        }
        return created;
    }).catch(err => ({status: 400, res:{error: err, message: "Error creating " + dataType, success: false}}));
};

const DeleteRecord = (recordId) => {
    // console.debug("deleting id: ", recordId);
    return new Promise((resolve, reject) => {
        Finance.Record.findByIdAndDelete(recordId, (err, record) => {
            if(err){
                return reject({status: 400, res:{error: "Unknown", message: "Error deleting record", success: false}})
            }
            if(!record){
                // console.debug("could not find id")
                return reject({status: 404, res:{error: "ID", message: "Invalid record ID to delete", success: false}})
            }
            // console.debug("deleted: ", record)
            return resolve(record.amount);
        })
    }).catch(err => ({status: 400, res:{error: err, message: "Error deleting record", success: false}}))
}

// @route POST api/finances/create
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

// @route POST api/finances/get
// @desc Create a new finance sheet
// @access Public
router.post("/get", (req, res) => {
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

// @route POST api/finances/records/create
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
    return CreateMultiple(recordsInfo.income, 'record')
    .then( incomeCreated => CreateMultiple(recordsInfo.expense, 'record')
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
                // console.debug("incomeCreated: ", JSON.stringify(incomeCreated));
                // console.debug("expenseCreated: ", JSON.stringify(expenseCreated));
                finance.netIncome += incomeCreated.net;
                finance.netExpense += expenseCreated.net;
                finance.incomeList = finance.incomeList.concat(incomeCreated.id);
                finance.expenseList = finance.expenseList.concat(expenseCreated.id);
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

// @route POST api/finances/records/delete
// @desc delete one or more new records
// @access Public
router.post("/records/delete", (req, res) => {
    console.log("Request @ api/finances/records/delete : {\n");
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
    Finance.Finance.findById(req.body.id).then(finance => {
        if(!finance){
            return Promise.reject({status: 404, res:{error: "ID", message: "Invalid ID, no finance sheet found to delete records.", success: false}})
        }
        return finance;
    }).then(finance => {
        // console.debug("recordsInfo: ", recordsInfo);
        //Delete income records
        const income = recordsInfo.income.map(record => DeleteRecord(record));
        const incomeDeleted = Promise.all(income).then(income => {
            for(x in income){
                netDeltaIncome += income[x];
            }
            // console.debug("incomeDeleted: ", netDeltaIncome);
            return netDeltaIncome;
        });
        //Delete expense records
        const expense = recordsInfo.expense.map(record => DeleteRecord(record));
        const expenseDeleted = Promise.all(expense).then(expense => {
            for(x in expense){
                netDeltaExpense += expense[x];
            }
            return netDeltaExpense;
        });
        return Promise.all([incomeDeleted, expenseDeleted]).then(_ => {
            //Remove from income and expense list of finance sheet
            // console.debug("net:", netDeltaIncome, " ", netDeltaExpense);
            finance.netIncome -= netDeltaIncome;
            finance.netExpense -= netDeltaExpense;
            finance.incomeList.filter(x => !recordsInfo.income.includes(x));
            finance.expenseList.filter(x => !recordsInfo.expense.includes(x));
            finance.markModified('incomeList');
            finance.markModified('expenseList');
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