const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

//Password reset guide from 
//https://medium.com/mesan-digital/tutorial-3b-how-to-add-password-reset-to-your-node-js-authentication-api-using-sendgrid-ada54c8c0d1f

const ResetTokenSchema = new Schema({
    email: {type: String, required: true},
    resetPasswordToken: {type: String, required: false},
    resetPasswordExpires: {type: Date, required: false}
});

ResetTokenSchema.methods.generateResetToken = function () {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

module.exports = ResetToken = mongoose.model('resetToken', ResetTokenSchema);