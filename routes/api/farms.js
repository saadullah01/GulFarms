const express = require('express');
const router = express.Router();

// User Model
const Farm = require('../../models/Farm')

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    console.log(`Recieved new register request for: ${req.body.email}`);
    
    // Check validation
    if (!isValid) {
        console.log("error is ",errors)
        return res.status(400).json(errors);
    }

    // Error Checks and Register User
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => res.status(200).json(user))
                    .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    console.log("New login req for email:", req.body.email);
    
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ email: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                        success: true,
                        token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ password: "Password incorrect" });
            }
        });
    });
});

// @route POST api/users/forgot-password
// @desc user can request a reset-password link
// @access Public
router.post("/forgot-password", (req, res) => {
    const {errors, isValid} = validateFieldInput.email(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    const email = req.body.email;

    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ email: "Email not found" });
        }
        
        //Send a reset-password link to user's email address
        ResetToken.findOne({ email: email }).then( token => {
            if(!token) {
                const newToken = new ResetToken({email: email});
                newToken.save().catch( err => console.log("Error creating new reset token", err));
                token = newToken;
            }
            token.generateResetToken();
            token.save().then(token => {
                //Temporary until development completes
                ResetToken.findOne({email: "API"}).then( key => {
                    const apiKey = key.resetPasswordToken; 
                    
                    sgMail.setApiKey(apiKey);
                    // send email
                    let link = "http://" + req.headers.host + "/reset-password/" + token.resetPasswordToken;
                    const mailOptions = {
                        to: token.email,
                        from: keys.sendgridEMAIL,
                        subject: "Reset Password Request",
                        text: `Assalam O Alaikum ${user.firstName} \n 
                        Please click on the following link ${link} to reset your password. \n\n 
                        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
                    };
                    
                    sgMail.send(mailOptions, (error, result) => {
                        if (error) return res.status(400).json({error, message: error.message});
                        
                        return res.status(200).json({message: 'A reset email has been sent to ' + user.email + '.', success: true});
                    });
                    
                });
            }).catch(err => res.status(400).json({err, message: 'Failed to email reset token.', success: false}));
        
        });//.catch(err => res.status(400).json({error: err, message: 'Failed to send reset token.', success: false})); 
    });
});

// @route POST api/users/reset-password/resetToken
// @desc User can change password for an account
// @access Public - reset link only
router.post("/reset-password/:token", (req, res) => {
    const {errors, isValid} = validateFieldInput.password(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Find user's token
    const token = req.params.token;
    let email = "" //get email by matching reset-password links
    ResetToken.findOne({ resetPasswordToken: token, resetPasswordExpires: {$gt: Date.now()} })
    .then( token => {
        if(!token){
            return res.status(404).json({message: "Password token is invalid or has expired."});
        }
        email = token.email;
        token.remove();

        // Hash password before saving in database
        let newPass = ""
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) throw err;
                newPass = hash;
            });
        });

        //Find user and update password
        User.findOneAndUpdate({ email }, {password: newPass}, {new: true}, (err, user, _) => {
            // Check if user exists
            if (!user) {
                return res.status(404).json({ email: "Email " + email + " not found" });
            }
            if(user.password != newPass)
            {
                return res.status(400).json({message: "Password reset failed", success: false});
            }
            return res.status(200).json({message: "Password has been changed", success: true});
        });
    }).catch(err => console.log(err));
    

})

module.exports = router;