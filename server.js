var express = require("express");
var expresshbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 3000;
var MONGODB = process.env.MONGODB || "mongodb://localhost/articleScraper";

// Initialize Express
var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));
app.engine("handlebars", expresshbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
var routes = require("./controllers/article_controller.js");
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(MONGODB, { useNewUrlParser: true, useFindAndModify: false });

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
