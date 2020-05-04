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

const summarize = data => (
    {
        _id:data._id,
        name:data.name
    }
);

//Multipurpose helper functions (hope they work!)
const CreateMultiple = (dataList, dataType) => {
    dataType = dataType.toLowerCase();
    const allData = dataList.map( data => {
        const docInfo = {};
        if(dataType == 'attribute'){
            docInfo.name = data.name;
            docInfo.attributeType = data.attributeType;
            docInfo.keepTrack = data.keepTrack;
            docInfo.options = docInfo.attributeType != 'option' ? [] : data.options
        }
        if(dataType == 'product'){
            docInfo.name = data.name;
            docInfo.duration = data.duration;
            docInfo.durationType = data.durationType;
            docInfo.keepTrack = true;
        }
        if(data.hasOwnProperty('unit')){
            docInfo.unit = data.unit;
        }
        if(data.hasOwnProperty('value')){
            docInfo.isPreset = false;
            docInfo.value = data.value;
        }
        
        const doc = new nameToModelMap[dataType](docInfo);
        if(dataType == 'product' && docInfo.isPreset == false){
            doc.alerts.push(doc._id);
            doc.alerts = doc.SetCycle();
        }
        return doc.save().then(doc => doc).catch(err => ({error: err, id: doc._id}));
    });
    return Promise.all(allData).then(docs => {
        console.log("documents created: ", docs.map(doc => doc.toJSON()));
    
        return ({
            message: dataType + "(s) created.",
            created: docs.map(doc => (doc._id)),
            success: true
        });
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
        updatedValues.options = updatedValues.attributeType != 'option' ? [] : data.options
    }
    if(dataType == 'product'){
        updatedValues.name = data.name;
        updatedValues.keepTrack = true;
        updatedValues.duration = data.duration
        updatedValues.durationType = data.durationType
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
        if(dataType == 'product' && docInfo.isPreset == false){
            doc.alerts = doc.UpdateCycle();
        }
        updatedValues.history = doc.history; //probabaly not needed, here as a precaution
        return new Promise( (resolve, reject) => {
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
    console.log("Request @ api/animals/ : {\n");
    for(key in req.body){
        console.log(key, ": ", req.body[key]);
    }
    console.log("}");
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
});

// @route POST api/animals/attributes/view-attribute
// @desc Retrieve an attribute from database
// @access Public
router.post("/attributes/view-attribute", (req, res) => {
    console.log("Request @ api/animals/ : {\n");
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
    return ViewOne(req.body.id, "attribute")
        .then(attribute => res.status(200).json(attribute))
        .catch(response=> res.status(400).json(response));
});

// @route POST api/animas/attributes/get
// @desc Retrieve a list of all attributes
// @access Public
router.post("/attributes/get", (req, res) => {
    console.log("Request @ api/animals/ : {\n");
    for(key in req.body){
        console.log(key, ": ", req.body[key]);
    }
    console.log("}");
    //Returns only presets if body.presets == true otherwise only instances
    return GetAll("attribute", req.body.presets)
        .then(attributes => res.status(200).json(attributes))
        .catch(response => res.status(400).json(response));
});

// @route POST api/animals/attributes/edit
// @desc Modify an existing attribute
// @access Public
router.post("/attributes/edit", (req, res) => {
    console.log("Request @ api/animals/ : {\n");
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

    return EditOne(req.body, "attribute")
        .then(response => res.status(200).json(response))
        .catch(response => res.status(400).json(response));

});

// @route POST api/animals/attributes/delete
// @desc Delete attributes matching given IDs
// @access Public
router.post("/attributes/delete", (req, res) => {
    console.log("Request @ api/animals/ : {\n");
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
    //Incoming req should have an array of ids to delete attributes
    return RemoveMultiple(req.body.id, "attribute")
        .then(response => res.status(200).json(response))
        .catch(response => res.status(400).json(response));
});

//===========================================================================
//                                  PRODUCTS
//===========================================================================

// @route POST api/animals/products/create
// @desc Create one or more new product(s)
// @access Public
router.post("/products/create", (req, res) => {
    console.log("Request @ api/animals/ : {\n");
    for(key in req.body){
        console.log(key, ": ", req.body[key]);
    }
    console.log("}");
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
    console.log("Request @ api/animals/ : {\n");
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
    return ViewOne(req.body.id, "product")
        .then(product => res.status(200).json(product))
        .catch(response=> res.status(400).json(response));
});

// @route POST api/animas/products/get
// @desc Retrieve a list of all products
// @access Public
router.post("/products/get", (req, res) => {
    console.log("Request @ api/animals/ : {\n");
    for(key in req.body){
        console.log(key, ": ", req.body[key]);
    }
    console.log("}");
    //Returns only presets if body.presets == true otherwise only instances
    return GetAll("product", req.body.presets)
        .then(products => res.status(200).json(products))
        .catch(response => res.status(400).json(response)); 
});

// @route POST api/animals/products/edit
// @desc Modify an existing product
// @access Public
router.post("/products/edit", (req, res) => {
    console.log("Request @ api/animals/ : {\n");
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

    return EditOne(req.body, "product")
        .then(response => res.status(200).json(response))
        .catch(response => res.status(400).json(response));
});

// @route POST api/animals/products/delete
// @desc Delete products matching given IDs
// @access Public
router.post("/products/delete", (req, res) => {
    console.log("Request @ api/animals/ : {\n");
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
    //Incoming req should have an array of ids to delete products
    return RemoveMultiple(req.body.id, "product")
        .then(response => res.status(200).json(response))
        .catch(response => res.status(400).json(response));
});

//===========================================================================
//                               ANIMAL PRESETS
//===========================================================================

// @route POST api/animals/create-preset
// @desc Create one or more new product(s)
// @access Public
router.post("/create-preset", (req, res) => {
    for (key in req.body) {
        console.log(key,": ", req.body[key]);
    }
    
    console.log("Request @ api/animals/ : {\n");
    for(key in req.body){
        console.log(key, ": ", req.body[key]);
    }
    console.log("}");
    // Form validation
    const { errors, isValid } = { erros: "", isValid: true }; //=============ADD proper validation
    // console.log(req.body)
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    // console.log(JSON.stringify(req.body));
    req.body.attributes = req.body.attributes[0];
    req.body.products = req.body.products[0];

    const animalPreset = new BaseModels.AnimalPreset({
        name: req.body.name,
        attributes: [],
        products: [],
        barns: req.body.barns,
        trackOffspring: req.body.trackOffspring,
        linkParents: req.body.linkParents
    });
    
    //Retrieve existing presets for offspring product or parents attribute
    //otherwise create new ones below
    //
    // to be implemented
    
    //Create product/attribute to link parents or track offspring
    if(animalPreset.linkParents == true){
        const parentsAttribute = {
            name: "parents",
            attributeType: "string",
            keepTrack: false
        };
        req.body.attributes.push(parentsAttribute);
        // console.log("new attributes: " + JSON.stringify(req.body.attributes));
    }
    if(animalPreset.trackOffspring == true){
        const offspringProduct = {
            name: "offspring",
            unit: "number of offspring",
            keepTrack: false
        };
        if(req.body.hasOwnProperty('duration')){
            offspringProduct.duration = req.body.duration; //ofspring duration
            offspringProduct.durationType = req.body.durationType; //duration type
        }
        req.body.products.push(offspringProduct);
        // console.log("new products: " + req.body.products);
    }

    return CreateMultiple(req.body.attributes, "attribute")
    .then(attributes => ({attributes: attributes.created}))
    .then(object => CreateMultiple(req.body.products, "product")
        .then(products => ({attributes: object.attributes, products: products.created}))
    ).then(object => {
        animalPreset.attributes = object.attributes;
        animalPreset.products = object.products;
        return animalPreset.save().then( preset => {
            //Add preset's id to farm
            return FarmModels.Farm.findById(req.body.farmId).then(farm => {
                farm.animalPresets = farm.animalPresets.push(preset._id)
                return farm.save();
            })
            .then(() => res.status(200).json({message: "Animal preset created.", id: preset._id, name: preset.name, success: true}))
            .catch(err => res.status(400).json({error: err, message: "Error linking animal preset to farm.", success: false}));
        }).catch(err => res.status(400).json({error: err, message: "Error saving animal preset.", success: false}));
    }).catch(err => res.status(400).json({error: err, message: "Error creating animal preset.", success: false}));
});


// @route POST api/animals/view-preset
// @desc View an animal preset
// @access Public
router.post("/view-preset", (req, res) => {
    console.log("Request @ api/animals/ : {\n");
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
    return ViewOne(req.body.id, "animalPreset")
        .then(animalPreset => res.status(200).json(animalPreset))
        .catch(response=> res.status(400).json(response));
});

// @route POST api/animals/get-preset
// @desc Retrieve a list of all animal presets
// @access Public
router.post("/get-preset", (req, res) => {
    console.log("Request @ api/animals/ : {\n");
    for(key in req.body){
        console.log(key, ": ", req.body[key]);
    }
    console.log("}");

    return GetAll("animalPreset", false)
        .then(animalPreset => res.status(200).json(animalPreset))
        .catch(response => res.status(400).json(response)); 
});

// @route POST api/animals/edit-preset
// @desc Modify an existing preset
// @access Public
router.post("/edit-preset", (req, res) => {
    console.log("Request @ api/animals/ : {\n");
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

    //Incoming body must have all properties for the new animal preset values
    const updatedValues = {
        name: req.body.name,
        attributes: req.body.attributes,
        products: req.body.products,
        barns: req.body.barns

        //To be implemented
        // trackOffspring: req.body.trackOffspring,
        // linkParents: req.body.linkParents
    };

    BaseModels.AnimalPreset.findByIdAndUpdate({ _id: req.body._id }, updatedValues, { new: true }, (err, animalPreset, _) => {
        if (!animalPreset) {
            return res.status(404).json({ message: "Error finding animal preset to modify.", success: false, error: err });
        }
        if (err) {
            return res.status(400).json({ message: "Unknown error occured", success: false, error: err });
        }
        return res.status(200).json({ message: "Animal preset modified.", success: true });
    });
}); 

// @route POST api/animals/delete-preset
// @desc Delete presets matching given IDs
// @access Public
router.post("/delete-preset", (req, res) => {
    console.log("Request @ api/animals/ : {\n");
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
    //Incoming req should have a property for id to delete preset
    return RemoveMultiple(req.body.id, "animalPreset")
        .then(response => res.status(200).json(response))
        .catch(response => res.status(400).json(response));
});

module.exports = router;