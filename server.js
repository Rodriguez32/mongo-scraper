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

//Set Handlebars.
// var exphbs = require("express-handlebars");

// app.engine("handlebars", exphbs({
//     defaultLayout: "main"}));
// app.set("view engine", "handlebars");



// Database configuration with mongoose

mongoose.connect("mongodb://localhost/mongoscraper", { useNewUrlParser: true });
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// mongoose.connect(MONGODB_URI);

// Show any mongoose errors
// db.on("error", function(error) {
//   console.log("Mongoose Error: ", error);
// });

// Once logged in to the db through mongoose, log a success message
// db.once("open", function() {
//   console.log("Mongoose connection successful.");
// });

// Routes

//GET requests to render Handlebars pages
// app.get("/", function(req, res) {
//   Article.find({"saved": false}, function(error, data) {
//     var hbsObject = {
//       article: data
//     };
//     console.log(hbsObject);
//     res.render("home", hbsObject);
//   });
// });

// app.get("/saved", function(req, res) {
//   Article.find({"saved": true}).populate("notes").exec(function(error, articles) {
//     var hbsObject = {
//       article: articles
//     };
//     res.render("saved", hbsObject);
//   });
// });

// A GET route for scraping the New York Times website
app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://www.nytimes.com/").then(function(response) {
    
    var $ = cheerio.load(response.data);

    
    $("article h2").each(function(i, element) {
      
      var result = {};

      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          return res.json(err);
        });
    });
    res.send("Scrape Complete");
  });
});

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  db.Article.find({})
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function(req, res) {
 
  db.Article.findOne({ _id: req.params.id })
    .populate("note")
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {
  
  db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});


// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });