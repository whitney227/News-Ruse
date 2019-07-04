var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true,
    unique: true
  },
  // link is required and of type String
  link:{
    type: String,
    required: true,
    unique: true,
  },
    // `summary` is required and of type String
    summary: {
    type: String,
    required: true
  },
  // 'saved' is a boolean defaulted to false unless user saves article
  saved: {
    type: Boolean,
    default: false
  },
  note: [{
    // Store objectIds in the array
    type:  Schema.Types.ObjectId,
    // objectIds refer to the ids in the Note model
    ref: "Note"
  }]  
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;