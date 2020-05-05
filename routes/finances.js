const express = require('express');
const router = express.Router();

const FinanceModels = require('../../models/Finance');

const sum = (array => array.reduce((acc, n) => acc + n.amount))

router.post("trial", (req, res) => {
    console.log(req.body)
    console.log(res.body)
    //add all finances in this
    const allData = {
        metric: "kg",
        incomeList: [
            { name: "Milk", amount: 20000 },
            { name: "Wool", amount: 10000 },
            { name: "Feed", amount: 30000 }
        ],
        expenseList: [
            { name: "Milk", amount: 20000 },
            { name: "Wool", amount: 10000 },
            { name: "Feed", amount: 30000 }
        ]
    }
    allData["netIncome"] = sum(allData.incomeList)
    allData["netExpenses"] = sum(allData.expenseList)
    return 0
})

module.exports = router;