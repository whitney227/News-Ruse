// Server routes

// bring in scrape function
var scrape = require("../scripts/scrape");

// Bring in articles and comments from the controller
var articlesController = require("../controllers/articles");
var commentsController = require("../controllers/comments");

module.exports = function(router) {
    // This route renders the homepage
    router.get("/", function(req, res) {
        res.render("home");
    });

    // This route renders the saved page
    router.get("/saved", function(req, res) {
        res.render("saved");
    });

    router.get("/api/fetch", function(req, res) {
        articlesController.fetch(function(err, docs) {
            if (!docs || docs.insertedCount === 0) {
                res.json({
                    message: "No new articles today. Check back tomorrow!"
                });
            }
            else{
                res.json({
                    message: "Added " + docs.insertedCount + " new articles!"
                });
            }
        });
    });
    router.get("/api/headlines", function(req, res) {
        var query = {};
        if (req.query.saved) {
            query = req.query;
        }

        articlesController.get(query, function(data){
            res.json(data);
        });
    });
    router.delete("/api/headlines/:id", function(req, res){
        var query ={};
        query.id = req.params.id;
        articlesController.delete(query, function(err, data){
            res.json(data);
        });
    });
    router.patch("/api/headlines", function(req, res) {
        articlesController.update(req.body, function(err, data){
            res.json(data);
        });
    });
    router.get("/api/comments/:headline_id?", function(req, res){
        var query ={};
        if (req.params.headline_id) {
            query._id = req.params.headline_id;
        }
        commentsController.get(query, function(err, data){
            res.json(data);
        });
    });
    router.delete("/api/comments/:id", function(req, res){
        var query = {};
        query._id = req.params.id;
        commentsController.delete(query, function( err, data){
            res.json(data);
        });
    });
    router.post("/api/comments", function(req, res){
        commentsController.save(req.body, function(data){
            res.json(data);
        });
    });
}