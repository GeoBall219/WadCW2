const nedb = require('nedb');

class healthApp {
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
        }
    }

    init() {
        this.db.insert({
            user: 'George',
            category: 'fitness',
            target_date: '07/05/2023',
            target_name: 'Go running',
            target_value: '10',
            current_value: '5'
        })
        this.db.insert({
            user: 'George',
            category: 'Health',
            target_date: '07/05/2023',
            target_name: 'Eat fruit',
            target_value: '15',
            current_value: '7'
        })
        this.db.insert({
            user: 'George',
            category: 'Health',
            target_date: '07/05/2023',
            target_name: 'Eat fruit',
            target_value: '15',
            current_value: '7',
            date_hit: '07/05/2023'
        })
        
    }

    getAllGoals() {
        return new Promise((resolve, reject) => {
            this.db.find({}, (err, goals) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(goals);
                    console.log('getGoalsByUser returns:', goals)
                }
            })
        })
    }

    addGoal(user, targetDate, targetName, targetValue, currentValue, dateHit) {
        var goal = {
            user: user,
            category: 'Health',
            target_date: targetDate,
            target_name: targetName,
            target_value: targetValue,
            current_value: currentValue
        }
        this.db.insert(goal, (err, doc) => {
            if (err) {
                console.log('Error inserting document', subject);
            } else {
                console.log('document inserted into the database', doc);
            }
        })
    }

    updateGoal(user, id, targetDate, targetName, targetValue, currentValue, dateHit) {
        var goal = {
            user: user,
            category: 'Health',
            target_date: targetDate,
            target_name: targetName,
            target_value: targetValue,
            current_value: currentValue
        }
        console.log(goal)
        this.db.update({_id: id}, goal, {}, (err, doc) => {
            if (err) {
                console.log('Error inserting document', subject);
            } else {
                console.log('document inserted into the database', doc);
            }
        })
    }

    getGoalsByUser(user) {
        return new Promise((resolve, reject) => {
            this.db.find({$and: [{'user': user}, {'date_hit': {$exists:false}}]}, (err, goals) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(goals);
                    console.log('getGoalsByUser returns:', goals)
                }
            })
        })
    }

    getCompletedGoalsByUser(user) {
        return new Promise((resolve, reject) => {
            this.db.find({ $and: [{'user': user}, {'date_hit': {$exists:true}}]}, (err, goals) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(goals);
                    console.log('getGoalsByUser returns:', goals)
                }
            })
        })
    }
}

module.exports = healthApp;