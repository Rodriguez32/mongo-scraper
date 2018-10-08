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
var Note = require("./models/note");
var Article = require("./models/article")

// Define Port
var PORT = 3000;

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

// Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });




// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });