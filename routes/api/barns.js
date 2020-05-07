const express = require('express');
const router = express.Router();

//Model
const BaseModels = require('../../models/BaseModels');
const FarmModels = require('../../models/Farm');

const summarize = data => (
    {
        _id:data._id,
        name:data.name
    }
);

const nameToModelMap = {
    'farm': FarmModels.Farm, 
    'barn': FarmModels.Barn,
    'product': BaseModels.Product,
    'attribute': BaseModels.Attribute,
    "animalPreset": BaseModels.AnimalPreset
};

// @route POST api/barns/create
// @desc Create a new barn
// @access Public
router.post("/create", (req, res) => {
    console.log("Request @ api/barns/ : {\n");
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
    const docInfo = {
        name: "",
        description: "",
        animals: [],
        alerts: []
    };
    for(key in docInfo){
        if(req.body.hasOwnProperty(key)){
            docInfo[key] = req.body[key];
        }
    }

    const barn = new FarmModels.Barn(docInfo);
    
    //Find animal preset to add barn to
    BaseModels.AnimalPreset.findById(req.body.id)
    .then(animalPreset => {
        return barn.save().then(barn => {
            //Add barn to preset
            animalPreset.barns.push(barn._id);
            return new Promise((resolve, reject) => {
                //Update preset
                BaseModels.AnimalPreset.findByIdAndUpdate(animalPreset._id, {barns: animalPreset.barns}, {new: true}, (err, animalPreset) => {
                    if(err){
                        return reject({status: 400, res:{ message: "Error updating linked preset.", success: false, error: err }})
                    }
                    if(!animalPreset){
                        return reject({status: 404, res: { message: "Error updating linked preset.", success: false, error: err }})
                    }
                    return resolve({status: 200, res: {message: "Barn created successfully.", success: true, created: barn}});
                })
            });
        })
        // .catch(err => ({status: 400, res:{ message: "Error saving barn.", success: false, error: err }}))
    })
    .then(response => res.status(response.status).json(response.res))
    // .catch(err => res.status(err.hasOwnProperty('status') ? err.status : 400).json(err.hasOwnProperty('res') ? err.res : err));
});
                                        
// @route POST api/barns/view
// @desc view a barn matching given id
// @access Public
router.post("/view", (req, res) => {
    console.log("Request @ api/barns/ : {\n");
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

    FarmModels.Barn.findById(req.body.id)
    .then(barn => {
        if(!barn){
            Promise.reject({status: 404, res: { message: "Error finding barn.", success: false, error: err }})
        }
        return barn.populate('animals').populate('alerts').execPopulate()
        .then(barn => {
            const notRemoved = [];
            const animals = barn.animals.map((animal, i) => {
                if(animal.removed == false)
                    notRemoved.push(i);
                return animal.populate('attributes').populate('products').execPopulate()
            });
            return Promise.all(animals).then(animals => {
                const barn2 = barn.toJSON();
                barn2.animals = notRemoved.map(i => animals[i]);
                return barn2;
            })})
        // .catch(err => ({status: 400, res:{ message: "Error populating barn.", success: false, error: err }}))
    }).then(barn => res.status(200).json(barn))
    // .catch(err => res.status(err.hasOwnProperty('status') ? err.status : 404).json(err.hasOwnProperty('res') ? err.res : err)); 
});

module.exports = router;