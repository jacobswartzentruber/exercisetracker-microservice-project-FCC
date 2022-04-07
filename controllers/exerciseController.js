const User = require('../models/user');
const Exercise = require('../models/exercise');

//Handle Exercise create on POST
exports.create_exercise = (req, res, next) => {
    console.log("create exercise");

    let exercise = new Exercise({
        user: req.params.id || req.body._id,
        description: req.body.description,
        duration: req.body.duration,
        date: req.body.date ? req.body.date.replace("-" , "/") : Date.now()
    });

    User.findById(req.params.id, (userErr, user) => {
        if (userErr) return res.json({error: "Could not find user with provided id"});

        exercise.save((exerciseErr, data) => {
                if(exerciseErr) return res.json({error: "Could not save exercise with provided fields"});

                let resObj = {
                    username: user.username,
                    description: data.description,
                    duration: data.duration,
                    date: data.date.toDateString(),
                    _id: user.id
                };

                res.json(resObj);
            });
    });

    
};

//GET all user's exercises in a log
exports.show_log = (req, res, next) => {
    console.log("show log");

    //Create date filter if "from" or "to" queries exist in URL
    let matchObj = {};
    if (req.query.from || req.query.to){
        matchObj.date = {};
        if (req.query.from) matchObj.date.$gte = req.query.from;
        if (req.query.to) matchObj.date.$lte = req.query.to;
    }

    //Find user and filter exercises by queries
    User.findById(req.params.id)
        .populate({
            path: 'logs',
            match: matchObj,
            limit: req.query.limit
        }).exec((err, user) => {
            //Error handling for finding user or processing queries
            if(err) return res.json({error: "Invalid user id or query parameters"});

            //Format logs for clean response JSON
            let formattedLogs = user.logs.map((x) => {
                return {
                    description: x.description,
                    duration: x.duration,
                    date: x.date.toDateString()
                }
            })

            //Return JSON
            let resObj = {
                username: user.username,
                count: user.logs.length,
                log: formattedLogs
            };

            res.json(resObj);
        });
};