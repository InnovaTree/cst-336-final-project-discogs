/**
 * Require Packages
 */

require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const fetch = require("node-fetch");
const mysql = require("mysql");
const pool = require("./middleware/dbpool.js");
const session = require("express-session");

/**
 * Initialize App
 */

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SES_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

/**
 * API Keys are held in .env
 * Sample Request:
 * https://api.discogs.com/database/search?q=${query}&key=${API_KEY}&secret=${API_SECRET}
 */

const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;

/**
 * Functions
 */

const dbTest = require("./middleware/dbtest");
const executeSQL = require("./middleware/executeSQL");
const isAuthenticated = require("./middleware/isAuthenticated");
const login = require("./middleware/login");
const signUp = require("./middleware/signup");
const getUserID = require("./middleware/getUserID");
const { restart } = require("nodemon");

/**
 * Page Routes
 */

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/dashboard", isAuthenticated, (req, res) => {
  res.render("dashboard", { username: req.session.username });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const [result, message] = await login(req);
  if (result) {
    req.session.authenticated = true;
    req.session.username = req.body.username;
    req.session.userid = await getUserID(req);
    console.log(`User Logged In: ${req.session.username}`);
    res.redirect("dashboard");
  } else {
    res.send(message);
  }
});

app.get("/logout", isAuthenticated, (req, res) => {
  console.log(`User Logged Off: ${req.session.username}`);
  req.session.destroy();
  res.redirect("/");
});

app.get("/search", async (req, res) => {
  let url = `https://api.discogs.com/database/search?query=${req.query.query}&type=release`;
  let response = await fetch(url, {
    headers: { Authorization: `Discogs key=${apiKey}, secret=${apiSecret}` },
  });
  let data = await response.json();
  res.render("results", { pageInfo: data.pagination, results: data.results });
});

app.get("/search/:searchId", async (req, res) => {
  let url = `https://api.discogs.com/releases/${req.params.searchId}`;
  let response = await fetch(url, {
    headers: { Authorization: `Discogs key=${apiKey}, secret=${apiSecret}` },
  });
  let data = await response.json();
  res.render("album", {results: data});
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  if (await signUp(req)) {
    req.session.authenticated = true;
    req.session.username = req.body.username;
    req.session.userid = await getUserID(req);
    console.log(`Created Account: ${req.session.username}`);
    res.redirect("dashboard");
  } else {
    res.redirect("/");
  }
});

/**
 * API Routes
 */

/**
 * Listener
 */

app.listen(3000, () => {
  console.log("Server started. Listening on port 3000...");
  dbTest();
});
