// Required packages
var express = require("express");
var expresshbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// Port that the application will use
var PORT = process.env.PORT || 3000;

// Initialize express
var app = express();

// Models for articles and notes
var db = require("./models");

// The content is stored in the public directory
app.use(express.static("public"));

// Log requests
app.use(logger("dev"));

// JSON and handlebars
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", expresshbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

