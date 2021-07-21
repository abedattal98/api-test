// import User model
const User = require("../models/user.model");

// import jsonwebtoken
jwt = require('jsonwebtoken'),

    // import bcryptjs - hashing function 
bcrypt = require('bcryptjs');

//DEFINE CONTROLLER FUNCTIONS

// User Register function
exports.register = (req, res) => {
    let newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    newUser.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
        }
        user.hash_password = undefined;
        res.status(201).json(user);
    });
};

// User Sign function
exports.signIn = (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.status(401).json({ message: 'Authentication failed. User not found.' });
        } else if (user) {
            if (!user.comparePassword(req.body.password)) {
                res.status(401).json({ message: 'Authentication failed. Wrong password.' });
            } else {
                res.json({
                    token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTfulAPIs')
                });
            }
        }
    });
};

// User Register function
exports.loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized user!' });
    }
};