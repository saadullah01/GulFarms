const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const RegisterTokenSchema = new Schema({
    registerToken: {type: String}
});

ResetTokenSchema.methods.generateRegisterToken = function () {
    this.registerToken = crypto.randomBytes(20).toString('hex');
};

module.exports = ResetToken = mongoose.model('resetToken', ResetTokenSchema);