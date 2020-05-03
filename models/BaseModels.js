const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//https://mongoosejs.com/docs/populate.html

const AlertSchema = new Schema({
    alertName: {type: String, required: true},
    duration: {type: Number, required: true},
    durationType: {type: String, enum: ["year", "month", "week", "day"], required: true},
    linkedTo: {type: Schema.Types.ObjectId, refPath: "linkedModel", required: true},
    linkedModel: {type: String, enum: ['farm', 'barn', 'product'], required: true} //Onchange: Update nameToModelMap in routes/api/alerts.js
});

const AttributeSchema = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    keepTrack: {type: Boolean, required: true}
}, {timestamps: false});

const ProductSchema = new Schema({
    name: {type: String, required: true},
    startingDate: {type: Date, required: true},
    unit: {type: String, enum: ["Numerical, String"], required: true}, //Update these types
    keepTrack: {type: Boolean, required: true},
    alerts: {type: Schema.Types.ObjectId, ref: 'alert'}
}, {timestamps: false});

const AnimalPresetSchema = new Schema({
    name: {type: String, required: true},
    attributes: [{type: Schema.Types.ObjectId, ref: 'attribute'}],
    products: [{type: Schema.Types.ObjectId, ref: 'product'}],
    barns: [{type: Schema.Types.ObjectId, ref: 'barn'}]
});

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