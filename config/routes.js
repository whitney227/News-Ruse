// Dependencies
var express= require("express");
var app = express();
var headline = require("../controllers/headline");


//Home Page Route
app.get('/', headline.index);

//Get All Saved Articles
app.get("/saved", headline.savedArticles);

//Get Article to add Note
app.get("/article/:id", headline.getArticle);

//Save Article Route
app.post("/saved/:id", headline.saveArticle);

//Unsave Article Route
app.post("/unsaved/:id", headline.unsaveArticle);

//Get Note by Id Route
app.get('/getNote/:id', headline.getNote);

//Save Note Route
app.post("/addNote/:articleId", headline.addNote);

//Delete Note Route
app.delete('/deleteNote/:noteId/:articleId', headline.deleteNote);


module.exports = app;