const express = require('express');
const router = express.Router();

//Model
const BaseModels = require('../../models/BaseModels');
const FarmModels = require('../../models/Farm');

const nameToModelMap = {
    'farm': FarmModels.Farm, 
    'barn': FarmModels.Barn,
    'product': BaseModels.Product,
    'attribute': BaseModels.Attribute,
    "animalPreset": BaseModels.AnimalPreset
};

const ToggleRemoved = (id, removed, reason, comment, dataType) => {
    const validRemovalTypes = ["farm", "barn", "animal"];
    if(validRemovalTypes.includes(dataType) == false){
        return Promise.reject({status: 400, res:{error: "Incorrect dataType", message: "Removing " + dataType + " is not allowed"}})
    }
    
    if(dataType == "farm" || dataType == "barn"){
        reason = "other";
    }
    reason = ["death", "sold", "entry-error"].includes(reason) ? reason : "other";
    comment = comment == "" ? "Dil kya tha" : comment;
    const updatedValues = {$set: {removed: removed}};

    return new Promise((resolve, reject) => {
        //Mark document as removed
        return nameToModelMap[dataType].findByIdAndUpdate({_id: id}, updatedValues, {new: true} ,(err, doc) => {
            if(err){
                return reject({status: 400, res:{error: err, message: "Unknown error occured"}});
            }
            if(!doc){
                return reject({status: 404, res:{error: err, message: "Could not find " + dataType + " to remove"}});
            }
            return resolve(doc);
        })
    }).then(removedDoc => {
        //Add removed doc to removed list if remove is true otherwise delete it from list
        if(remove == true){
            const removedItem = new BaseModels.RemovedItem({
                name: removedDoc.name,
                removedLink: removedDoc._id,
                removedModel: dataType,
                removedOn: Date.now(),
                reason: reason,
                removalComment: comment
            })
            return removedItem.save().then(_ => removedDoc)
            .catch(err => reject({status: 400, res:{error: err, message: "Error saving removed item."}}))
        }
        else if(remove == false){
            return new Promise((resolve, reject) => {
                const filter = {removedModel: dataType, removedLink: removedDoc._id};
                BaseModels.RemovedItem.findOneAndRemove(filter, (err, item) => {
                    if(err){
                        return reject({status: 400, res:{error: err, message: "Unknown error occured"}});
                    }
                    if(!item){
                        return reject({status: 404, res:{error: err, message: "Could not find deleted record to remove"}});
                    }
                    return resolve(removedDoc);
                })
            })
        }
    }).catch(err => Promise.reject(
        {
            status: err.hasOwnProperty('status') ? err.status : 400,
            res: err.hasOwnProperty('res') ? err.res : {error: err, message: "Uknown error occured. Could not remove " + dataType}
        }
    ));
}


// @route POST api/remove/get
// @desc get a list of all removed items
// @access Public
router.post("/farm", (req, res) => {
    console.log("Request @ api/remove/farm : {\n");
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

    //Mark or unmark removed
    BaseModels.RemovedItem.find(),then(documents => {
        if(!documents){
            return Promise.resolve([]);
        }
        return documents;
    })
    .then(farm => res.status(200).json(farm))
    .catch(err => res.status(err.hasOwnProperty('status') ? err.status : 400).json(err.hasOwnProperty('res') ? err.res : err));
});

// @route POST api/remove/farm
// @desc mark a farm as removed or unremoved
// @access Public
router.post("/farm", (req, res) => {
    console.log("Request @ api/remove/farm : {\n");
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

    //Expected data
    // id, removed, reason, comment

    //Mark or unmark removed
    ChangeRemoved(req.body.id, req.body.removed, req.body.reason, req.body.removalComment, "farm")
    .then(farm => res.status(200).json(farm))
    .catch(err => res.status(err.hasOwnProperty('status') ? err.status : 400).json(err.hasOwnProperty('res') ? err.res : err));
});

// @route POST api/remove/barn
// @desc mark a barn as removed or unremoved
// @access Public
router.post("/barn", (req, res) => {
    console.log("Request @ api/remove/barn : {\n");
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

    //Expected data
    // id, removed, reason, comment

    //Mark or unmark removed
    ChangeRemoved(req.body.id, req.body.removed, req.body.reason, req.body.removalComment, "barn")
    .then(barn => res.status(200).json(barn))
    .catch(err => res.status(err.hasOwnProperty('status') ? err.status : 400).json(err.hasOwnProperty('res') ? err.res : err));
});

// @route POST api/remove/animal
// @desc mark an animal as removed or unremoved
// @access Public
router.post("/animal", (req, res) => {
    console.log("Request @ api/remove/animal : {\n");
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

    //Expected data
    // id, removed, reason, comment

    //Mark or unmark removed
    ToggleRemoved(req.body.id, req.body.removed, req.body.reason, req.body.comment, "animal")
    .then(animal => res.status(200).json(animal))
    .catch(err => res.status(err.hasOwnProperty('status') ? err.status : 400).json(err.hasOwnProperty('res') ? err.res : err));
});

module.exports = router;