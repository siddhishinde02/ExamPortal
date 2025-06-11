const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const app = express();
const db = require("./config/db");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve CSS and static assets

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views")); // Path to your views folder

// Routes
const userRoutes = require("./routes/regrouts");
app.use("/", userRoutes);

// Export the app
module.exports = app;
