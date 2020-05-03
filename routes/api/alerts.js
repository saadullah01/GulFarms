const express = require('express');
const router = express.Router();

//Model
const BaseModels = require('../../models/BaseModels');
const FarmModels = require('../../models/Farm');

//Modify functions to add alerts
const FarmRoutes = require('./farms');

const nameToModelMap = {'farm': FarmModels.Farm, 'barn': FarmModels.Barn, 'product': BaseModels.Product}
const summarize = data => (
    {
        _id:data._id,
        name:data.name
    }
)

// @route POST api/alerts/create
// @desc Create a new alert
// @access Public
router.post("/create", (req, res) => {
    // Form validation
    const { errors, isValid } = { erros: "", isValid: true }; //=============ADD proper validation
    // console.log(req.body)
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const allAlerts = req.body.alerts.map( alertInfo => {

        const alert = new BaseModels.Alert({
            name: alertInfo.name.toLowerCase(),
            duration: alertInfo.duration,
            durationType: alertInfo.durationType.toLowerCase(),
            linkedTo: alertInfo.linkedTo,
            linkedModel: alertInfo.linkedModel.toLowerCase()
        });
        return alert.save().then(alert => alert).catch(err => ({error: err, id: alert._id}));
    });
    Promise.all(allAlerts).then(alerts => {
        // console.log("alerts created: " + alerts);

        //Add alerts to linked object
        const model = nameToModelMap[alerts[0].linkedModel];
        model.findById(alerts[0].linkedTo).then( doc => {                
            // console.log("doc before " + doc);
            model.updateOne({_id: doc._id}, {alerts: doc.alerts.concat(alerts)}, (err, _) => {
                if(err){
                    // console.log("error: " + err);
                    
                    return res.status(400).json({error: err, message: "Unknown error while updating linked document.", status: false});
                }
                
                return res.status(200).json({ message: "Alert(s) created.", id: alerts.filter(element => element._id), success: true });
            });
         }).catch(err => res.status(404).json({ error: err, message: "Error finding linked document.", success: false }));
    }).catch(err => res.status(400).json({ error: err.error, id: err.id, message: "Error creating alert.", success: false }));
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
            if(!alert){
                return res.status(404).json({error: alert, message: "Could not find alert.", status: false});
            }
            
            alert.populate('linkedTo').execPopulate().then(alert => {
                const newAlert = alert.toJSON();
                newAlert.linkedTo = summarize(newAlert.linkedTo);
                return res.status(200).json(newAlert);
            }).catch(err => res.status(400).json({error: err, message: "Error populating alert", success: false}));
        }).catch(err => res.status(400).json({ error: err, message: "Error finding alert", success: false }));
});

// @route POST api/alerts/get
// @desc Retrieve a list of all alerts
// @access Public
router.post("/get", (req, res) => {
    BaseModels.Alert.find({})
        .then(alerts => { 
            return res.status(200).json(alerts) 
        })
        .catch(err => res.status(400).json({ error: err, message: "Error retrieving alerts", success: false }));
});

// @route POST api/alerts/edit
// @desc Modify an existing alert
// @access Public
router.post("/edit", (req, res) => {

    // Form validation
    const { errors, isValid } = { erros: "", isValid: true }; //=============ADD proper validation

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    //Incoming body must have all properties for the new alert values
    const updatedValues = {
        name: req.body.name.toLowerCase(),
        duration: req.body.duration,
        durationType: req.body.durationType.toLowerCase(),
        linkedTo: req.body.linkedTo,
        linkedModel: req.body.linkedModel.toLowerCase()
    };

    BaseModels.Alert.findByIdAndUpdate({ _id: req.body._id }, updatedValues, { new: true }, (err, alert, _) => {
        if (!alert) {
            return res.status(404).json({ message: "Error finding alert to modify.", success: false, error: err });
        }
        if (err) {
            return res.status(400).json({ message: "Unknown error occured", success: false, error: err });
        }
        return res.status(200).json({ message: "Alert modified.", success: true });
    });
});

// @route POST api/farms/delete
// @desc Delete alerts matching given IDs
// @access Public
router.post("/delete", (req, res) => {

    // Form validation
    const { errors, isValid } = { erros: "", isValid: true }; //=============ADD proper validation

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    //Incoming req should have an array of ids to delete alerts

    BaseModels.Alert.find({_id: {$in: req.body.id}}).then( alerts => {
        if (!alerts) {
            return res.status(404).json({ message: "Error finding alert(s) to delete.", success: false, error: err });
        }
        alerts.map( alert => alert.remove());
        return res.status(200).json({ message: "Alerts deleted.", success: true });
    });
});

// // @route POST api/farms/search
// // @desc Retrieve a list of all farms matching search substring
// //       Match with name or location
// // @access Public
// router.post("/search", (req, res) => {
//     //============================= Validate search name, location etc
//     // Form validation
//     const { errors, isValid } = { erros: "", isValid: true }; //=============ADD proper validation

//     // Check validation
//     if (!isValid) {
//         return res.status(400).json(errors);
//     }
//     FarmModels.Farm.find({
//         $or: [
//             { name: { $regex: req.body.search.toLowerCase() } },
//             { location: { $regex: req.body.search.toLowerCase() } }
//         ]
//     })
//         .then(farms => res.status(200).json(farms))
//         .catch(err => res.status(400).json({ error: err, message: "error searching farms", success: false }));
// });

module.exports = router;