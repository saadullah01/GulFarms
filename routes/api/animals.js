const express = require('express');
const router = express.Router();

//Model
const BaseModels = require('../../models/BaseModels');
const FarmModels = require('../../models/Farm');

const nameToModelMap = {'farm': FarmModels.Farm, 'barn': FarmModels.Barn, 'product': BaseModels.Product, 'attribute': BaseModels.Attribute}
const summarize = data => (
    {
        _id:data._id,
        name:data.name
    }
)

//Multipurpose helper functions (hope they work!)
const CreateMultiple = (dataList, dataType) => {
    dataType = dataType.toLowerCase();
    const allData = dataList.map( data => {
        const docInfo = {}
        if(dataType == 'attribute'){
            docInfo.name = data.name;
            docInfo.attributeType = data.attributeType;
            docInfo.keepTrack = data.keepTrack;
        }
        if(dataType == 'product'){
            docInfo.name = data.name;
            docInfo.startingDate = Date(data.startingDate);
            docInfo.keepTrack = data.keepTrack;
            docInfo.alerts = data.alerts;
        }
        if(data.hasOwnProperty('unit')){
            docInfo.unit = data.unit;
        }
        if(data.hasOwnProperty('value')){
            docInfo.isPreset = false;
            docInfo.value = data.value;
        }
        const doc = new nameToModelMap[dataType](docInfo);
        return doc.save().then(doc => doc).catch(err => ({error: err, id: doc._id}));
    });
    return Promise.all(allData).then(data => {
        // console.log("document created: " + data);

        return {message: dataType + "(s) created.", success: true};
    }).catch(err => ({ error: err.error, id: err.id, message: "Error creating " + dataType, success: false }));
}

const ViewOne = (id, dataType) => {
    return nameToModelMap[dataType].findById(id).then(doc => {
        if(!doc){
            return {error: doc, message: "Error finding " + dataType, status: false};
        }
        return doc;
    }).catch(err => ({ error: err, message: "Error finding " + dataType, success: false }));
}

const GetAll = (dataType, presetsOnly) => {
    const filter = presetsOnly ? {isPreset: true} : {};
    return nameToModelMap[dataType].find(filter)
        .then(docs => docs)
        .catch(err => ({ error: err, message: "Error retrieving " + dataType + "s.", success: false }));
}

const EditOne = (data, dataType) => {
    //Incoming body must have all properties for the new values
    const updatedValues = {};
    if(dataType == 'attribute'){
        updatedValues.name = data.name;
        updatedValues.attributeType = data.attributeType;
        updatedValues.keepTrack = data.keepTrack;
    }
    if(dataType == 'product'){
        updatedValues.name = data.name;
        updatedValues.startingDate = Date(data.startingDate);
        updatedValues.keepTrack = data.keepTrack;
        updatedValues.alerts = data.alerts;
    }
    if(data.hasOwnProperty('unit')){
        updatedValues.unit = data.unit;
    }
    if(data.hasOwnProperty('value')){
        updatedValues.isPreset = false;
        updatedValues.value = data.value;
    }
    const model = nameToModelMap[dataType];
    return model.findById(data.id).then( doc => {
        if (!doc) {
            return ({error: err, message: "Error finding " + dataType + " to modify.", success: false});
        }
        if(updatedValues.keepTrack == true){
            doc.PushHistory();
        }
        updatedValues.history = doc.history;
        return new Promise(resolve, reject => {
            model.updateOne({_id: doc._id}, updatedValues, (err, _) => {
                if(err){
                    return reject({error: err, message: "Error updating " + dataType, success: false});
                }
                return resolve({ message: dataType + " modified.", success: true });
            });
        })
    }).catch(err => ({error: err, message: "Error finding " + dataType + " to modify.", success: false}));
}

const RemoveMultiple = (listRemove, dataType) => {

    return nameToModelMap[dataType].find({_id: {$in: listRemove}}).then( docs => {
        if (!docs) {
            return ({ message: "Error finding " + dataType + "(s) to delete.", success: false, error: err });
        }
        const allDeleted = docs.map( doc => doc.remove());
        return Promise.all(allDeleted)
                    .then( _ => ({ message: dataType + "(s) deleted.", success: true }))
                    .catch(err => ({error: err, message: "Error deleting " + dataType + "(s).", success: false}));
    });
}

//===========================================================================
//                                  ATTRIBUTES
//===========================================================================

// @route POST api/animals/attributes/create
// @desc Create one or more new attribute(s)
// @access Public
router.post("/attributes/create", (req, res) => {
    // Form validation
    const { errors, isValid } = { erros: "", isValid: true }; //=============ADD proper validation
    // console.log(req.body)
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    return CreateMultiple(req.body.attributes, 'attribute')
        .then(response => res.status(200).json(response))
        .catch(response => res.status(400).json(response));
    // const allAttributes = req.body.attributes.map( attributeInfo => {

    //     const attribute = new BaseModels.Attribute({
    //         name: attributeInfo.name,
    //         attributeType: attributeInfo.attributeType,
    //         keepTrack: attributeInfo.keepTrack,
    //         value: attributeInfo.value
    //     });
    //     return attribute.save().then(attribute => attribute).catch(err => ({error: err, id: attribute._id}));
    // });
    // Promise.all(allAttributes).then(attributes => {
    //     // console.log("attributes created: " + attributes);
    //     return res.status(200).json({message: "Attribute(s) created.", success: true});
    // }).catch(err => res.status(400).json({ error: err.error, id: err.id, message: "Error creating attribute.", success: false }));
});

// @route POST api/animals/attributes/view-attribute
// @desc Retrieve an attribute from database
// @access Public
router.post("/attributes/view-attribute", (req, res) => {
    // Form validation
    const { errors, isValid } = { erros: "", isValid: true }; //=============ADD proper validation

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    return ViewOne(req.body.id, "attribute")
        .then(attribute => res.status(200).json(attribute))
        .catch(response=> res.status(400).json(response));
    // BaseModels.Attribute.findById(req.body.id)
    //     .then(attribute => {
    //         if(!attribute){
    //             return res.status(404).json({error: attribute, message: "Could not find attribute.", status: false});
    //         }
    //         return res.status(200).json(attribute);
    //     }).catch(err => res.status(400).json({ error: err, message: "Error finding attribute", success: false }));
});

// @route POST api/animas/attributes/get
// @desc Retrieve a list of all attributes
// @access Public
router.post("/attributes/get", (req, res) => {
    //Returns only presets if body.presets == true otherwise only instances
    return GetAll("attribute", req.body.presets)
        .then(attributes => res.status(200).json(attributes))
        .catch(response => res.status(400).json(response));
    
    // BaseModels.Attribute.find({})
    //     .then(attributes => { 
    //         return res.status(200).json(attributes) 
    //     }).catch(err => res.status(400).json({ error: err, message: "Error retrieving attributes", success: false }));
});

// @route POST api/animals/attributes/edit
// @desc Modify an existing attribute
// @access Public
router.post("/attributes/edit", (req, res) => {

    // Form validation
    const { errors, isValid } = { erros: "", isValid: true }; //=============ADD proper validation

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    return EditOne(req.body)
        .then(response => res.status(200).json(response))
        .catch(response => res.status(400).json(response));

    // //Incoming body must have all properties for the new attribute values
    // const updatedValues = {
    //     name: attributeInfo.name,
    //     attributeType: attributeInfo.attributeType,
    //     keepTrack: attributeInfo.keepTrack,
    //     value: attributeInfo.value
    // };

    // BaseModels.Attribute.findById(req.body.id, (err, attribute) => {
    //     if (err) {
    //         return res.status(400).json({ message: "Unknown error occured", success: false, error: err });
    //     }
    //     if (!attribute) {
    //         return res.status(404).json({error: err, message: "Error finding attribute to modify.", success: false});
    //     }
    //     if(updatedValues.keepTrack){
    //         attribute.PushHistory();
    //     }
    //     updatedValues.history = attribute.history;
    //     BaseModels.Attribute.updateOne({_id: attribute._id}, updatedValues, (err, _) => {
    //         if(err){
    //             res.status(404).json({error: err, message: "Error updating attribute.", success: false});
    //         }
    //         return res.status(200).json({ message: "Attribute modified.", success: true });
    //     });
    // }).catch(err => res.status(404).json({error: err, message: "Error finding attribute to modify.", success: false}));
});

// @route POST api/animals/attributes/delete
// @desc Delete attributes matching given IDs
// @access Public
router.post("/attributes/delete", (req, res) => {

    // Form validation
    const { errors, isValid } = { erros: "", isValid: true }; //=============ADD proper validation

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    //Incoming req should have an array of ids to delete attributes
    return RemoveMultiple(req.body.id, "attribute")
        .then(response => res.status(200).json(response))
        .catch(response => res.status(400).json(response));

    // BaseModels.Attribute.find({_id: {$in: req.body.id}}).then( attributes => {
    //     if (!attributes) {
    //         return res.status(404).json({ message: "Error finding attribute(s) to delete.", success: false, error: err });
    //     }
    //     const allDeleted = attributes.map( attribute => attribute.remove());
    //     return Promise.all(allDeleted)
    //                 .then( _ => res.status(200).json({ message: "Attribute(s) deleted.", success: true }))
    //                 .catch(err => res.status(400).json({error: err, message: "Error deleting attribute(s).", success: false}));
    // });
});

//===========================================================================
//                                  PRODUCTS
//===========================================================================

// @route POST api/animals/products/create
// @desc Create one or more new product(s)
// @access Public
router.post("/products/create", (req, res) => {
    // Form validation
    const { errors, isValid } = { erros: "", isValid: true }; //=============ADD proper validation
    // console.log(req.body)
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    return CreateMultiple(req.body.products, 'product')
        .then(response => res.status(200).json(response))
        .catch(response => res.status(400).json(response));
});

// @route POST api/animals/products/view-product
// @desc Retrieve an product from database
// @access Public
router.post("/products/view-product", (req, res) => {
    // Form validation
    const { errors, isValid } = { erros: "", isValid: true }; //=============ADD proper validation

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    return ViewOne(req.body.id, "product")
        .then(product => res.status(200).json(product))
        .catch(response=> res.status(400).json(response));
});

// @route POST api/animas/products/get
// @desc Retrieve a list of all products
// @access Public
router.post("/products/get", (req, res) => {
    //Returns only presets if body.presets == true otherwise only instances
    return GetAll("product", req.body.presets)
        .then(products => res.status(200).json(products))
        .catch(response => res.status(400).json(response)); 
});

// @route POST api/animals/products/edit
// @desc Modify an existing product
// @access Public
router.post("/products/edit", (req, res) => {

    // Form validation
    const { errors, isValid } = { erros: "", isValid: true }; //=============ADD proper validation

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    return EditOne(req.body)
        .then(response => res.status(200).json(response))
        .catch(response => res.status(400).json(response));
});

// @route POST api/animals/products/delete
// @desc Delete products matching given IDs
// @access Public
router.post("/products/delete", (req, res) => {

    // Form validation
    const { errors, isValid } = { erros: "", isValid: true }; //=============ADD proper validation

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    //Incoming req should have an array of ids to delete products
    return RemoveMultiple(req.body.id, "product")
        .then(response => res.status(200).json(response))
        .catch(response => res.status(400).json(response));
});

//===========================================================================
//                               ANIMAL PRESETS
//===========================================================================




module.exports = router;