// require dependencies
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware
// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));


// TODO
// ****************************
// Connect to Mongo DB
// ****************************

// Routes

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
            var link = $(element).attr("href");
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

// Route for getting all Articles from the db
app.get("/articles", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
        .then(function(dbArticle) {
            // if able to find Articles, send them back to the client
            res.json(dbArticle);
        })
        .catch(function(err) {
            // if an error occurred, send it to the client
            res.json(err);
        });
});

// TODO
// ********************************************
// Route for grabbing a specific Article by id
// Then populate it with it's note
// ********************************************

// TODO
// ******************************************************
// Route for saving/updating an Aritcle's associated Note
// ******************************************************

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});



