const express = require('express');
const router = express.Router();

//Model
const BaseModels = require('../../models/BaseModels');
const FarmModels = require('../../models/Farm');

//Modify functions to add alerts
const FarmRoutes = require('./farms');

const nameToModelMap = {'farm': FarmModels.Farm, 'barn': FarmModels.Barn, 'product': BaseModels.Product}

// @route POST api/alerts/create
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

    const alert = new BaseModels.Alert({
        alertName: req.body.alertName.toLowerCase(),
        duration: req.body.duration,
        durationType: req.body.durationType.toLowerCase(),
        linkedTo: req.body.linkedTo,
        linkedModel: req.body.linkedModel.toLowerCase()
    });

    alert.save()
        .then(alert => {

            //Add alert to linked object
            const model = nameToModelMap[alert.linkedModel];
            model.findById(alert.linkedTo).then( doc => {                
                doc.alerts = doc.alerts.push(alert._id);
                console.log("doc " + doc);
                model.updateOne({_id: doc._id}, { doc }).then( doc => {
                    if(!doc){
                        res.status(400).json({error: doc, id: alert._id, message: "Alert created but could not be linked.", success: false});
                    }
                    res.status(200).json({ message: "Alert created.", id: alert._id, success: true });
                }).catch(err => res.status(400).json({error: err, message: "Alert created but could not be linked.", success: false}));
            })
        }).catch(err => res.status(400).json({ error: err, message: "error creating alert.", success: false }));
});

// @route POST api/alerts/view-alert
// @desc Retrieve an alert from database
// @access Public
router.post("/view-alert", (req, res) => {
    // Form validation
    const { errors, isValid } = { erros: "", isValid: true }; //=============ADD proper validation

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    BaseModels.Alert.findById(req.body.id)
        .then(alert => {
            alert.execPopulate('linkedTo').then(alert => {
                res.status(200).json(alert);
            }).catch(err => res.status(400).json({error: err, message: "Error populating alert", success: false}));

        }).catch(err => res.status(400).json({ error: err, message: "error finding alert", success: false }));
});

// @route POST api/alerts/get
// @desc Retrieve a list of all alerts
// @access Public
const giveSummary = (data)=>(
    {
        id:data.id,
        name:data.name
    }
)
router.post("/get", (req, res) => {
    BaseModels.Alert.find({})
        .then(farms => { 
            const farmSummary = farms.map(giveSummary)
            res.status(200).json(farmSummary) 
        })
        .catch(err => res.status(400).json({ error: err, message: "error retrieving farms", success: false }));
});

// @route POST api/farms/edit
// @desc Modify an existing farm
// @access Public
router.post("/edit", (req, res) => {

    // Form validation
    const { errors, isValid } = { erros: "", isValid: true }; //=============ADD proper validation

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    //Incoming body must have all properties for the new farm values
    const updatedValues = {
        name: req.body.name.toLowerCase(),
        location: req.body.location.toLowerCase(),
        description: req.body.description.toLowerCase(),
        animalPresets: req.body.animalPresets,
        alerts: req.body.alerts
    };

    FarmModels.Farm.findByIdAndUpdate({ _id: req.body._id }, updatedValues, { new: true }, (err, farm, _) => {
        if (!farm) {
            return res.status(404).json({ message: "Error finding farm to modify.", success: false, error: err });
        }
        if (err) {
            return res.status(400).json({ message: "Unknown error occured", success: false, error: err });
        }
        return res.status(200).json({ message: "Farm modified.", success: true });
    });
});

// @route POST api/farms/search
// @desc Retrieve a list of all farms matching search substring
//       Match with name or location
// @access Public
router.post("/search", (req, res) => {
    //============================= Validate search name, location etc
    // Form validation
    const { errors, isValid } = { erros: "", isValid: true }; //=============ADD proper validation

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    FarmModels.Farm.find({
        $or: [
            { name: { $regex: req.body.search.toLowerCase() } },
            { location: { $regex: req.body.search.toLowerCase() } }
        ]
    })
        .then(farms => res.status(200).json(farms))
        .catch(err => res.status(400).json({ error: err, message: "error searching farms", success: false }));
});

module.exports = router;