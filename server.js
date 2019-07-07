// require dependencies
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var logger = require("morgan");
var exphbs= require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require('./models');

var PORT = 3000;
// Require routes and use
var routes = require("./config/routes");

// Initialize Express
var app = express();

// import routes
app.use("/", routes);

// A GET route for scraping the Daily Skimm website
app.get("/scrape", function (req, res) {
  // First, use axios to grab the body of the HTML 
  axios.get("https://theskimm.com/news/daily-skimm").then(function(response){
      var $ = cheerio.load(response.data);
      
      // An empty array to save the data that will get scraped
      var results = [];
      
      // Use cheerio to find the title, link, and summary of each article
      $("a.card").each(function(i, element) {
          var title = $(element).children("span").text();
          var link = "https://theskimm.com" + $(element).attr("href");
          var summary = $(element).children("p").text();
          
          // save as an object that gets pushed to the results array
          results.push({
              title: title,
              link: link,
              summary, summary
          });

          // Create a new Article using the results array built from scraping
          db.Article.create(results)
              .then(function(dbArticle) {
                  //  view the added results in the console
                  console.log(dbArticle);
              })
              .catch(function(err) {
                  // If an error occured, log it
                  console.log(err);
              });
      });
      // Send a message to the client
      res.send("Scrape Complete")
  });
});

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
mongoose.connect("mongodb://localhost:27017/newsdb", { useNewUrlParser: true });

// // mongoose.connect("mongodb://user1:password1@ds129484.mlab.com:29484/heroku_ds085w99");
// var db = mongoose.connection;

// // export the db
// module.exports =db;

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});



