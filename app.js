const express = require('express');
// const mongoose = require('mongoose');
// const passport = require("passport");

// Routes
const users = require('./routes/api/users');

// Initialize express
const app = express();

//Middleware
app.use(express.json()); //to support JSON encoded bodies
app.use(express.urlencoded()); //to support url encoded bodies

// ///////// DB Setup //////////s/
// // To Avoid Deprecation Warnings
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);
// // DB Config
// const db = require('./config/keys').mongoURI;
// // Connect to Mongo
// mongoose
//     .connect(db)
//     .then(() => console.log('MongoDB Connected...'))
//     .catch(err => console.log(err));

// // Passport middleware
// app.use(passport.initialize());
// // Passport config
// require("./config/passport")(passport);

// Use Routes
app.use('./api/users', users);

// PORT (Starting Server)
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started at port ${port}`));

module.exports = app;