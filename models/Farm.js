const mongoose = require('mongoose');
const baseModels = require('./BaseModels');
const Schema = mongoose.Schema;

// Create Schema
const FarmSchema = new Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    description: {type: String},
    animalPresets: [AnimalPreset],
    alerts: {} //========================================= ADD ALERTS
})

const AnimalSchema = new Schema({
    alive: {type: Boolean},
    preset: [AnimalPreset],
    selfAttributes: [Attribute],
    selfProducts: [Product],
    comment: {type: String},
    productsRecord: [{type: String}]
});

const BarnSchema = new Schema({
    id: {type: String, required: true},
    animals: [{type: Schema.Types.ObjectId, ref: 'AnimalSchema'}],
    alerts: {} //========================================= ADD ALERTS
});


const Farm = mongoose.model('farm', FarmSchema);
const Animal = mongoose.model('animal', AnimalSchema);
const Barn = mongoose.model('barn', BarnSchema);

module.exports = {
    Farm: Farm,
    Animal: Animal,
    Barn: Barn
}