const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttributeSchema = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    keepTrack: {type: Boolean, required: true}
});

const ProductSchema = new Schema({
    name: {type: String, required: true},
    startingDate: {type: Date, required: true},
    unit: {type: String, enum: ["Numerical, String"], required: true}, //Update these types
    keepTrack: {type: Boolean, required: true},
    alerts: {type: String} //========================================= ADD ALERTS
});

const AnimalPresetSchema = new Schema({
    name: {type: String, required: true},
    attributes: [{type: Schema.Types.ObjectId, ref: 'AttributeSchema'}],
    products: [{type: Schema.Types.ObjectId, ref: 'ProductSchema'}],
    barns: [{type: Schema.Types.ObjectId, ref: 'BarnSchema'}]
});

const Attribute = mongoose.model('attribute', AttributeSchema);
const Product = mongoose.model('product', ProductSchema);
const AnimalPreset = mongoose.model('animalPreset', AnimalPresetSchema);

module.exports = {
    Attribute: Attribute,
    Product: Product,
    AnimalPreset: AnimalPreset
}