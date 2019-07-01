// require dependencies
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var expressHandlebars= require("express-handlebars");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

//set up express router
var router = express.Router();

// require routes file and pass to router object
require("./config/routes")(router);

// Make public a static folder
app.use(express.static(__dirname + "/public"));

// Connect Handlebars to Express app
app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// use bodyParser in our app
app.use(bodyParser.urlencoded({
  extended: false
}));

// send requests through our router middleware
app.use(router);

// Connect to the Mongo DB
var db = process.env.MONGODB_URI || "mongodb://localhost/newsdb";
//mongoose.connect(process.env.MONGODB_URI || "mongodb://user1:password1@ds129484.mlab.com:29484/heroku_ds085w99" || "mongodb://localhost:27017/newsdb");
mongoose.connect(db, { useNewUrlParser: true });

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});



