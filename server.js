const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose');
//const router = express.Router();

app.use(cors())

//Middleware to parse request body
app.use(express.json());
app.use(express.urlencoded({extended: "false"}));

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, (err) => {
  if (err) console.log("MongoDB connection error");
});

//Import models
const User = require('./models/user');

//Routing
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const apiRouter = require('./routes/apiRoutes');

app.use('/api', apiRouter);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
