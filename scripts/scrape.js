var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {
    
    request("https://theskimm.com/news/daily-skimm").then(function(response){
        var $ = cheerio.load(response.data);
        
        // An empty array to save the data that will get scraped
        var articles = [];
        
        // Use cheerio to find the title, link, and summary of each article
        $("a.card").each(function(i, element) {
            var headline = $(element).children("span").text().trim();
            var link = "https://theskimm.com" + $(element).attr("href");
            var summary = $(element).children("p").text().trim();

            if(headline && summary){
              var headlineNeat = headline.replace(/^\s+|\s+$/g, '').trim();
              var summaryNeat = summary.replace(/^\s+|\s+$/g, '').trim();
              // save as an object that gets pushed to the articless array
              var dataToAdd = {
                  headline: headlineNeat,
                  link: link,
                  summary, summaryNeat
                }; 
                articles.push(dataToAdd);   
            };
        });
        cb(articles);
    })
};
module.exports = scrape;