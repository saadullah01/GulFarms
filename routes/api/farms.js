const express = require('express');
const router = express.Router();

//Model
const FarmModels = require('../../models/Farm')

//Helper functions
const giveSummary = (data)=>(
    {
        _id:data._id,
        name:data.name
    }
)


// @route POST api/farms/new
// @desc Create a new farm
// @access Public
router.post("/create", (req, res) => {
    // Form validation
    const { errors, isValid } = { erros: "", isValid: true }; //=============ADD proper validation
    console.log(req.body)
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    //Incoming req must have empty arrays or strings for the not required properties.
    //This can be implemented in the validation function as well.
    const farm = new FarmModels.Farm({
        name: req.body.farmName.toLowerCase(),
        location: req.body.Location.toLowerCase(),
        description: req.body.Description.toLowerCase(),
        animalPresets: [],
        alerts: []
    });
    console.log(farm)
    farm.save()
        .then(farm => res.status(200).json({ message: "Farm created.", success: true,farm:giveSummary(farm) }))
        .catch(err => res.status(400).json({ error: err, message: "error creating new farm.", success: false }));
});

// @route POST api/farms/view-farm
// @desc Retrieve a farm from database
// @access Public
router.post("/view-farm", (req, res) => {
    // Form validation
    const { errors, isValid } = { erros: "", isValid: true }; //=============ADD proper validation

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    FarmModels.Farm.findById(req.body.id)
    .then(farm => {
        farm.populate('animalPresets').execPopulate().then(farm =>{
            const newFarm = farm.toJSON();
            newFarm.animalPresets = newFarm.animalPresets.map( preset => giveSummary(preset));
            return newFarm;
        }).then(farm => res.status(200).json(farm))
        .catch(err => res.status(400).json({ error: err, message: "error adding preset summary to farm", success: false }));
    }).catch(err => res.status(400).json({ error: err, message: "error finding farm", success: false }));
});

// @route POST api/farms/get
// @desc Retrieve a list of all farms
// @access Public
router.post("/get", (req, res) => {
    FarmModels.Farm.find({})
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