// require dependencies
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var logger = require("morgan");
var exphbs= require("express-handlebars");

var PORT = process.env.PORT || 3000;
// Require routes and use
var routes = require("./config/routes");

// Initialize Express
var app = express();

// import routes
app.use("/", routes);

// Make public a static folder
app.use(express.static(__dirname + "public"));

// Connect Handlebars to Express app
app.engine("handlebars",exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// use morgan for debug logging
app.use(logger("dev"));

// use bodyParser in our app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// local db connection
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsdb";
// mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

mongoose.connect("mongodb://user1:password1@ds129484.mlab.com:29484/heroku_ds085w99");
var db = mongoose.connection;

// export the db
module.exports =db;

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});



