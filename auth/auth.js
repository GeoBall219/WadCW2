const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    userModel.lookup(email, (err, user) => {
        if (err) {
            console.log('error looking up user', err);
            return res.status(401).send();
        }
        if (!user) {
            console.log("user ", email, " not found");
            return res.status(401).send();
        }
        // compare provided password with stored password
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let payload = { email: user.email};
                let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "24h"});
                res.cookie("jwt", accessToken);
                return res.status(200).send({message: "Logged in successfully", accessToken});
            } else {
                return res.status(401).send("Incorrect username or password");
            }
        })
    })
}

exports.verify = (req, res, next) => {
    console.log(req.cookies)
    let accessToken = req.cookies.jwt;
    if (!accessToken) {
        return res.status(403).send();
    }
    let payload;
    try {
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        console.log(payload)
        req.email = payload.email
        next();
    } catch (e) {
        // if an error occurred return request anauthorised error
        res.status(401).send();
    }
}