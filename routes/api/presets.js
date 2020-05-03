const express = require('express');
const router = express.Router();
const BaseModels = require('../../models/BaseModels')
const FarmModels = require('../../models/Farm');

const FarmRoutes = require('./farms');

const nameToModelMap = {'farm': FarmModels.Farm, 'barn': FarmModels.Barn, 'product': BaseModels.Product}
//Model

// @route POST api/presets/get
// @desc Retrieve a list of all presets
// @access Public




// @route POST api/presets/create
// @desc Create a new alert
// @access Public
router.post("/create", (req, res) => {
    // Form validation
    const { errors, isValid } = { erros: "", isValid: true }; //=============ADD proper validation
    console.log(req.body)
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const preset = new BaseModels.AnimalPreset({
        name: req.body.alertName.toLowerCase(),
        attributes: [],
        products: [],
        barns: []
    })

})
