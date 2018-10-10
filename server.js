// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");

var request = require("request");
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models

var db = require("./models");

// Define Port
var PORT = process.env.PORT || 3000;

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

// Set Handlebars.
// var exphbs = require("express-handlebars");

// app.engine("handlebars", exphbs({
//     defaultLayout: "main"}));
// app.set("view engine", "handlebars");



// Database configuration with mongoose

mongoose.connect("mongodb://localhost/mongoscraper", { useNewUrlParser: true });


// Show any mongoose errors
// db.on("error", function(error) {
//   console.log("Mongoose Error: ", error);
// });

// Once logged in to the db through mongoose, log a success message
// db.once("open", function() {
//   console.log("Mongoose connection successful.");
// });

// Routes





// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });