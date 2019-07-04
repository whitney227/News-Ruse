var request = require("request");
var cheerio = require("cheerio");
var db = require("../models");

exports.scrapeSkimm =function(req, res) {
    
    request("https://theskimm.com/news/daily-skimm").then(function(response){
        var $ = cheerio.load(response.data);
        var result = {};
        
        // Use cheerio to find the title, link, and summary of each article
        $("a.card").each(function(i, element) {
            result.headline= $(element).children("span").text().trim();
            result.link = "https://theskimm.com" + $(element).attr("href");
            result.summary = $(element).children("p").text().trim();

            db.Article.create(result)
            .then(function(dbArticle){
                // console.log(dbArticle);
            })
            .catch(function(error) {
                console.log("Error Scrapping News");
            });    
        });
        res.redirect("/")
    });
};
