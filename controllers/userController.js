const User = require('../models/user');

//Display list of all Users
exports.user_list = (req, res, next) => {
    User.find({}, (err, data) => {
        if(err) return res.json({error: "Error compiling user list"});
        res.json(data);
    });
};

//Handle User create on POST
exports.create_user = (req, res, next) => {
    let user = new User({username: req.body.username});
    user.save((err, person) => {
        if(err) return res.json({error: "Error saving user to database"});
        res.json({username: person.username, _id: person._id});
    });
};