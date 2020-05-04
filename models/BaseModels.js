const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

//https://mongoosejs.com/docs/populate.html

const AlertSchema = new Schema({
    name: {type: String, lowercase: true, required: true},
    duration: {type: Number, required: true},
    durationType: {type: String, lowercase: true, enum: ["year", "month", "week", "day"], required: true},
    due: {type: Date, default: Date.now()},
    linkedTo: {type: Schema.Types.ObjectId, refPath: "linkedModel", required: true},
    linkedModel: {type: String, lowercase: true, enum: ['farm', 'barn', 'product', 'animal'], required: true} //Onchange: Update nameToModelMap in routes/api/alerts.js
});

const AttributeSchema = new Schema({
    name: {type: String, lowercase: true, required: true},
    attributeType: {type: String, lowercase: true, enum: ['string', 'number', 'bool'], required: true},
    value: {}, //can insert anything
    unit: {type: String, lowercase: true, default: ""},
    isPreset: {type: Boolean, default: true},
    keepTrack: {type: Boolean, required: true},
    history: [{
        name: {type: String, lowercase: true, required: true},
        attributeType: {type: String, lowercase: true, enum: ['string', 'number', 'bool'], required: true},
        value: {},
        unit: {type: String, lowercase: true},
        updatedAt: {type: Date, required: true}
    }]
}, {timestamps: true});

const ProductSchema = new Schema({
    name: {type: String, lowercase: true, required: true},
    startingDate: {type: Date, required: true},
    value: {}, //can insert anything
    unit: {type: String, lowercase: true, default: ""},
    isPreset: {type: Boolean, default: true},
    keepTrack: {type: Boolean, required: true},
    alerts: [{type: Schema.Types.ObjectId, ref: 'alert'}],
    history: [{
        name: {type: String, lowercase: true, required: true},
        startingDate: {type: Date, required: true},
        value: {},
        unit: {type: String, lowercase: true, default: ""},
        updatedAt: {type: Date, required: true}
    }]
}, {timestamps: true});

const AnimalPresetSchema = new Schema({
    name: {type: String, lowercase: true, required: true},
    attributes: [{type: Schema.Types.ObjectId, ref: 'attribute'}],
    products: [{type: Schema.Types.ObjectId, ref: 'product'}],
    barns: [{type: Schema.Types.ObjectId, ref: 'barn'}],
    trackOffspring: {type: Boolean, required: true},
    linkParents: {type: Boolean, required: true}
});

//Schema methods
AlertSchema.methods.Snooze = function(snoozeFor) {
    const type = this.durationType[0] == 'm' ? 'M' : this.durationType[0];
    this.due = moment(Date.now()).add(snoozeFor, type).toDate();
};

AttributeSchema.methods.PushHistory = function() {
    if(this.isPreset){
        return;
    }
    this.history.push({
        name: this.name,
        attributeType: this.attributeType,
        value: this.value,
        unit: this.unit,
        updatedAt: Date.now()
    });
};

ProductSchema.methods.PushHistory = function() {
    if(this.isPreset){
        return;
    }
    this.history.push({
        name: this.name,
        startingDate: this.startingDate,
        value: this.value,
        unit: this.unit,
        updatedAt: Date.now()
    });
};

// AttributeSchema.pre('findByIdAndUpdate', () => {
//     this.model.findOne(this.getQuery())
//     .then(doc => doc.PushHistory().set({history: doc.history}));
// });

// ProductSchema.pre('findByIdAndUpdate', () => {
//     this.model.findOne(this.getQuery())
//     .then(doc => doc.PushHistory().set({history: doc.history}));
// });

const Alert = mongoose.model('alert', AlertSchema);
const Attribute = mongoose.model('attribute', AttributeSchema);
const Product = mongoose.model('product', ProductSchema);
const AnimalPreset = mongoose.model('animalPreset', AnimalPresetSchema);

module.exports = {
    Alert: Alert,
    Attribute: Attribute,
    Product: Product,
    AnimalPreset: AnimalPreset
}