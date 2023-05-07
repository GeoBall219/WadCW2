const nedb = require('nedb');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserDAO {
    constructor(dbFilePath) {
        if (dbFilePath) {
            //embedded
            this.db = new nedb({
                filename: dbFilePath,
                autoload: true
            });
        } else {
            //in memory
            this.db = new nedb();
        }
    }

    // for the demo the password is the bcrypt of the user name
    init() {
        this.db.insert({
            email: 'Peter@Peter.com',
            password:
                '$2b$10$I82WRFuGghOMjtu3LLZW9OAMrmYOlMZjEEkh.vx.K2MM05iu5hY2C'
        });
        this.db.insert({
            user: 'Ann',
            password:
                '$2b$10$bnEYkqZM.MhEF/LycycymOeVwkQONq8kuAUGx6G5tF9UtUcaYDs3S'
        });
        return this;
    }
    
    create(email, password) {
        const that = this;
        bcrypt.hash(password, saltRounds).then( (hash) => {
            var entry = {
                email: email,
                password: hash,
            };
            that.db.insert(entry, (err) => {
                if (err) {
                    console.log("Can't insert user: ", username);
                }
            });
        });
    }

    lookup(email, cb) {
        this.db.find({ 'email': email }, (err, entries) => {
            if (err) {
                return cb(null, null);
            } else {
                if (entries.length == 0) {
                    return cb(null, null);
                }
                return cb(null, entries[0]);
            }
        });
    }
}
const dao = new UserDAO();
dao.init();
module.exports = dao;