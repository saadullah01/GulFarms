const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const passport = require("passport");
const path =require('path');

// Routes
const users = require('./routes/api/users');
const farms = require('./routes/api/farms');
const barns = require('./routes/api/barns');
const alerts = require('./routes/api/alerts');
const remove = require('./routes/api/remove');
const animals = require('./routes/api/animals');
const finances = require('./routes/api/finances');

// Initialize express
const app = express();

//Middleware
app.use(express.json()); //to support JSON encoded bodies
// app.use(express.urlencoded()); //to support url encoded bodies

//======== DB Setup =======
// To Avoid Deprecation Warnings
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
// DB Config
const db = require('./config/keys').mongoURI;
// Connect to Mongo
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log("Error connecting to database:", err));

// // Passport middleware
// app.use(passport.initialize());
// // Passport config
// require("./config/passport")(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/farms', farms);
app.use('/api/barns', barns);
app.use('/api/alerts', alerts);
app.use('/api/remove', remove);
app.use('/api/animals', animals);
app.use('/api/finances',finances)
//in production




if(process.env.NODE_ENV === 'production'){
    // app.use(express.static(path.resolve(__dirname,'client','build','index.html')));
    // app.use('*',(req,res)=>{
    //     res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    // });
    const root = path.join(__dirname, 'client', 'build')
    app.use(express.static(root));
    app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
    })
}

// PORT (Starting Server)
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started at port ${port}`));

module.exports = app;