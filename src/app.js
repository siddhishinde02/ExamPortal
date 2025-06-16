const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

let app = express();
app.set("view engine", "ejs");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const session = require("express-session");

app.use(express.static("public"))

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


app.use(
  session({
    secret: "mySecretKey", // any secret key
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
  })
);

// Correct path to your route file
let userRoutes = require("../src/routes/regrouts.js");
app.use("/",userRoutes);

/*siddhis's code*/


// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// require("dotenv").config();
const path = require("path");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static('public'));

// EJS Setup
// app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));


// Routes
// const userRoutes = require("./routes/regrouts");
app.use("/", userRoutes);

module.exports = app;



const userRoutes = require("./routes/regrouts");
app.use("/", userRoutes);

// Export the app
module.exports = app;

