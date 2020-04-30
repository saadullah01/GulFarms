const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const RegisterTokenSchema = new Schema({
    email: {type: String, required: true},
    registerToken: {type: String}
});

RegisterTokenSchema.methods.generateRegisterToken = function () {
    this.registerToken = crypto.randomBytes(20).toString('hex');
};

module.exports = RegisterToken = mongoose.model('registerToken', RegisterTokenSchema);