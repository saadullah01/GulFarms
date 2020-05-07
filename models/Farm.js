const mongoose = require('mongoose');
const baseModels = require('./BaseModels');
const Schema = mongoose.Schema;

// Create Schema
const FarmSchema = new Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    description: {type: String},
    animalPresets: [{type: Schema.Types.ObjectId, ref: 'animalPreset'}],
    alerts: [{type: Schema.Types.ObjectId, ref: 'alert'}],
    removed: {type: Boolean, default: false}
})

const AnimalSchema = new Schema({
    name: {type: String, lowercase: true, required: true},
    preset: {type: Schema.Types.ObjectId, ref: 'animalPreset', required: true},
    tag: {type: Number, required: true},
    alive: {type: Boolean, default: true},
    attributes: [{type: Schema.Types.ObjectId, ref: 'attribute'}],
    products: [{type: Schema.Types.ObjectId, ref: 'product'}],    
    parents: {type: Schema.Types.ObjectId, ref: 'attribute'},
    offspring: {type: Schema.Types.ObjectId, ref: 'product'},
    comment: {type: String},
    removed: {type: Boolean, default: false}
});

const BarnSchema = new Schema({
    name: {type: String, lowercase: true, required: true},
    description: {type: String, lowercase:true},
    animals: [{type: Schema.Types.ObjectId, ref: 'animal'}],
    alerts: [{type: Schema.Types.ObjectId, ref: 'alert'}],
    removed: {type: Boolean, default: false}
});


const Farm = mongoose.model('farm', FarmSchema);
const Animal = mongoose.model('animal', AnimalSchema);
const Barn = mongoose.model('barn', BarnSchema);

module.exports = {
    Farm: Farm,
    Animal: Animal,
    Barn: Barn
}