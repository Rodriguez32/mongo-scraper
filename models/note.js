// Require mongoose
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;

// Create the Note Schema
var NoteSchema = new Schema({
  body: {
    type: String
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: "article"
  }
});

// Create the Note model with the NoteSchema
var Note = mongoose.model("note", NoteSchema);

// Export the Note model
module.exports = Note;