const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateFieldInput = require("../../validation/field");

// User Model
const User = require('../../models/User');

// // @route   GET api/users
// // @desc    Get All Users
// // @access  Public
// router.get('/', (req, res) => {
//     User.find({})
//         .sort({timestamps: -1})
//         .then(users => res.json(users))
// });

// // @route   POST api/users
// // @desc    Create A User
// // @access  Public
// router.post('/', (req, res) => {
//     const newUser = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//     });
//     newUser.save().then(user => res.json(user));
// });

// // @route   DELETE api/users/:id
// // @desc    Delete A User
// // @access  Public
// router.delete('/:id', (req, res) => {
//     User.findOne({"_id": req.params.id})
//         .then(user => user.remove().then(() => res.json({success: true})))
//         .catch(err => res.status(404).json({success: false}));
// });

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
                fname: req.body.firstName,
                lname: req.body.lastName,
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
// @desc user can get request a reset-password link
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
        //
        //
        
        return res.status(200).json({success: true});
    });
})

// @route POST api/users/reset-password
// @desc User can change password for an account
// @access Public - reset link only
router.post("/reset-password", (req, res) => {
    const {errors, isValid} = validateFieldInput.password(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Find user by email
    const email = "jojo@jojo.com" //get email by matching reset-password links

    User.findOneAndUpdate({ email: email }, {password: req.body.password}, {new: true}, user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ email: "Email not found" });
        }
        if(user.password != req.body.password)
        {
            return res.status(400).json({password: "Password reset failed"})
        }
        return res.status(200).json({success: true});
    });

})

module.exports = router;