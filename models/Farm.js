const mongoose = require('mongoose');
const baseModels = require('./BaseModels');
const Schema = mongoose.Schema;

// Create Schema
const FarmSchema = new Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    description: {type: String},
    animalPresets: [{type: Schema.Types.ObjectId, ref: 'animalPreset'}],
    alerts: [{type: Schema.Types.ObjectId, ref: 'alert'}]
})

const AnimalSchema = new Schema({
    preset: [{type: Schema.Types.ObjectId, ref: 'animalPreset', required: true}],
    publicID: {type: Number, unique: true, required: true},
    alive: {type: Boolean},
    selfAttributes: [{type: Schema.Types.ObjectId, ref: 'attribute'}],
    selfProducts: [{type: Schema.Types.ObjectId, ref: 'product'}],
    comment: {type: String},
    productsRecord: [{type: String}]
});

const BarnSchema = new Schema({
    name: {type: String, lowercase: true, required: true},
    animals: [{type: Schema.Types.ObjectId, ref: 'animal'}],
    alerts: [{type: Schema.Types.ObjectId, ref: 'alert'}]
});


const Farm = mongoose.model('farm', FarmSchema);
const Animal = mongoose.model('animal', AnimalSchema);
const Barn = mongoose.model('barn', BarnSchema);

module.exports = {
    Farm: Farm,
    Animal: Animal,
    Barn: Barn
}