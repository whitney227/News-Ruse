var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
var commentSchema = new Schema({
  _headlineId: {
    type: Schema.Types.ObjectId,
    ref:"Article"
  },
  commentText: String
});

// This creates our model from the above schema, using mongoose's model method
var Comment = mongoose.model("Comment", commentSchema);

// Export the Note model
module.exports = Comment;