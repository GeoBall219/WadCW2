const healthAppDAO = require('../models/healthAppModel');
const userDAO = require('../models/userModel')

const db = new healthAppDAO();

db.init();

exports.home_page = (req, res) => {
    db.getAllGoals()
        .then((goals) => {
            res.json(goals);
        })
        .catch((err) => {
            console.log('promise rejected', err);
        })
}

exports.post_new_user = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        res.send(401, 'no user or no password');
        return;
    }

    userDAO.lookup(email, (err, user) => {
        if (user) {
            res.status(401).send("User already exists");
            return;
        }
        userDAO.create(email, password);
        console.log("register user", email, "password", password);
        res.status(201).send("user created successfully")
    });    
}

exports.get_user_goals = (req, res) => {
    db.getGoalsByUser(req.email)
        .then((goals) => {
            res.json(goals);
        })
        .catch((err) => {
            console.log('promise rejected', err);
        })
}

exports.get_user_history = (req, res) => {
    db.getCompletedGoalsByUser(req.email)
        .then((goals) => {
            res.json(goals);
        })
        .catch((err) => {
            console.log('promise rejected', err);
        })
}

exports.post_new_goal = (req, res) => {
    if (!req.email) {
        response.status(400).send("Must be logged in.");
        return;
    }
    db.addGoal(req.email, req.body.targetDate, req.body.targetName, req.body.targetValue, req.body.currentValue, req.body.dateHit);
    res.status(200).send("success")
}

exports.update_user_goal = (req, res) => {
    if (!req.email) {
        response.status(400).send("Must be logged in.");
        return;
    }
    db.updateGoal(req.email, req.body._id, req.body.targetDate, req.body.targetName, req.body.targetValue, req.body.currentValue, req.body.dateHit);
    res.status(200).send("success")
}