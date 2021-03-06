// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var ArticleSchema = new Schema({
  
  title: {
    type: String,
    required: true
  },
  summary: {
      type: String,
      required: true
  },
  link: {
    type: String,
    required: true
  },
  saved: {
      type: Boolean,
      default: false
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "note"
  }
});

// Create the article model with the ArticleSchema
var Article = mongoose.model("article", ArticleSchema);

// Export the module
module.exports = Article;