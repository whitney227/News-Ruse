// Dependencies
var express= require("express");
var router = express.Router();
var headline = require("../controllers/headline");


//Home Page Route
router.get('/', headline.index);

//Get All Saved Articles
router.get("/saved", headline.savedArticles);

//Get Article to add Note
router.get("/article/:id", headline.getArticle);

//Save Article Route
router.post("/saved/:id", headline.saveArticle);

//Unsave Article Route
router.post("/unsaved/:id", headline.unsaveArticle);

//Get Note by Id Route
router.get('/getNote/:id', headline.getNote);

//Save Note Route
router.post("/addNote/:articleId", headline.addNote);

//Delete Note Route
router.delete('/deleteNote/:noteId/:articleId', headline.deleteNote);


module.exports = router;