const express = require("express");
const router = express.Router();

//Require controller modules
const user_controller = require("../controllers/userController");
const exercise_controller = require("../controllers/exerciseController");

/// USER ROUTES ///

//GET users
router.get('/users', user_controller.user_list);

//POST request for creating a user
router.post('/users', user_controller.create_user);

/// EXERCISE ROUTES ///

//POST request for creating an exercise
router.post('/users/:id/exercises', exercise_controller.create_exercise);

//GET request to show user's logs
router.get('/users/:id/logs', exercise_controller.show_log);

module.exports = router;