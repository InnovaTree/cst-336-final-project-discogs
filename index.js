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
const validateAlbum = require("./middleware/validateAlbum");
const validateUpdateCol = require("./middleware/validateUpdateCol");
const validateUpdateWsh = require("./middleware/validateUpdateWsh");

/**
 * Page Routes
 */

// Index. Authentication status is passed because nav-bar displays
// different elements based on user authentication.
app.get("/", (req, res) => {
  res.render("index", { authenticated: req.session.authenticated });
});

// User Dashboard. Displays associated username. Userid was passed
// for an unimplemented feature, but not necessary.
app.get("/dashboard", isAuthenticated, (req, res) => {
  const { authenticated, userid, username } = req.session;
  res.render("dashboard", {
    authenticated: authenticated,
    username: username,
    userid: userid,
  });
});

// Login Screen.
app.get("/login", (req, res) => {
  res.render("login", { authenticated: req.session.authenticated });
});

// Login Screen. Post Route. Sets session variables on success.
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

// Logout. Redirects to index.
app.get("/logout", isAuthenticated, (req, res) => {
  console.log(`User Logged Off: ${req.session.username}`);
  req.session.destroy();
  res.redirect("/");
});

// Review page. Queries Discogs API for albumID passed as parameter
// and passes data to review.ejs. Placeholder image is used if none
// supplied in response.
app.get("/review/:albumId", isAuthenticated, async (req, res) => {
  let url = `https://api.discogs.com/releases/${req.params.albumId}`;
  let response = await fetch(url, {
    headers: { Authorization: `Discogs key=${apiKey}, secret=${apiSecret}` },
  });
  let data = await response.json();
  let imageURL ="https://via.placeholder.com/300";
  let image = data.images ? data.images[0].resource_url : imageURL;
  res.render("review", {
    authenticated: req.session.authenticated,
    title: data.title,
    image: image,
    albumid: req.params.albumId,
  });
});

// Search. Queries Discogs API for parameters passed by search form. Passes data to results.ejs.
app.get("/search", isAuthenticated, async (req, res) => {
  let url = `https://api.discogs.com/database/search?${req.query.type}=${req.query.query}&type=release`;
  let response = await fetch(url, {
    headers: { Authorization: `Discogs key=${apiKey}, secret=${apiSecret}` },
  });
  let data = await response.json();

  res.render("results", {
    authenticated: req.session.authenticated,
    pageInfo: data.pagination,
    results: data.results,
  });
});

// Album page. Queries Discogs API for detailed information regarding
// a specific release and passes data to album.ejs.
app.get("/search/:searchId", isAuthenticated, async (req, res) => {
  let url = `https://api.discogs.com/releases/${req.params.searchId}`;
  let response = await fetch(url, {
    headers: { Authorization: `Discogs key=${apiKey}, secret=${apiSecret}` },
  });
  let data = await response.json();
  res.render("album", { authenticated: req.session.authenticated, results: data });
});

// Signup page.
app.get("/signup", (req, res) => {
  res.render("signup", { authenticated: req.session.authenticated });
});

// Signup. Post Route. Redirects to dashboard on success and index on failure.
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

// Album API. Adds record to album table if one does not exist.
app.get("/api/album/add", async (req, res) => {
  const { albumid, title, image } = req.query;
  let match = await validateAlbum.isPresent(albumid);
  if (!match) {
    await validateAlbum.addAlbum(albumid, title, image);
  }
  res.send(match);
});

// Collection API. Retrieves all albumids associated with a userid.
app.get("/api/collection/getcollection", async (req, res) => {
  let userid = req.session.userid;
  let sql = "SELECT albumid FROM collection WHERE userid = ?";
  let params = [userid];
  let rows = await executeSQL(sql, params);
  res.send(rows);
});

// Collection API. Retrieves albumid, title and image associated
// with a userid.
app.get("/api/collection/getdetailed", async (req, res) => {
  let userid = req.session.userid;
  let sql = `
    SELECT a.albumid, title, image FROM collection c
    LEFT JOIN album a ON a.albumid = c.albumid
    WHERE userid = ?
  `;
  let params = [userid];
  let rows = await executeSQL(sql, params);
  res.send(rows);
});

// Collection API. Adds or removes records associated with a
// given userid from the collection table.
app.get("/api/collection/update", async (req, res) => {
  let sql;
  let params;
  let userid = req.session.userid;
  let albumid = req.query.albumid;
  let action = req.query.action;
  let inCollection = await validateUpdateCol(userid, albumid);

  // "add": add record if album is not present in collection
  // "delete" : remove record if album is present in collection
  if (action == "add" && !inCollection) {
    sql = "INSERT INTO collection (userid, albumid) VALUES (?, ?)";
    params = [userid, albumid];
    let rows = await executeSQL(sql, params);
    res.send(rows);
  } else if (action == "delete" && inCollection) {
    sql = "DELETE FROM collection WHERE albumid =? AND userid = ?";
    params = [albumid, userid];
    let rows = await executeSQL(sql, params);
    res.send(rows);
  }
});

// Review API. Retrieve all reviews associated with an albumid.
app.get("/api/review/getalbum", async (req, res) => {
  let albumid = req.query.albumid;
  let sql = `
    SELECT u.userid, username, reviewtext 
    FROM review w
    LEFT JOIN user u
    ON w.userid = u.userid
    WHERE albumid = ?`;
  let params = [albumid];
  let rows = await executeSQL(sql, params);
  res.send(rows);
});

// Review API. Retrieve all reviews, albumids, titles and images
// and contents of a review associated with a userid.
app.get("/api/review/getdetailed", async (req, res) => {
  let userid = req.session.userid;
  let sql = `
    SELECT a.albumid, title, image, reviewtext FROM review r
    LEFT JOIN album a ON a.albumid = r.albumid
    WHERE userid = ?
  `;
  let params = [userid];
  let rows = await executeSQL(sql, params);
  res.send(rows);
});

// Review API. Retrieve albumids and contents of reviews
// associated with a userid.
app.get("/api/review/getuser", async (req, res) => {
  let userid = req.session.userid;
  let sql = `
    SELECT albumid, reviewtext
    FROM review
    WHERE userid = ?;`;
  let params = [userid];
  let rows = await executeSQL(sql, params);
  res.send(rows);
});

// Review API. Adds deletes or modifies records in the
// review table.
app.post("/api/review/update", async (req, res) => {
  let action = req.body.action;
  let userid = req.session.userid;
  let albumid = req.body.albumid;
  let reviewtext = req.body.reviewtext;
  let sql;
  let params;

  if (action == "add") {
    sql = `INSERT INTO review (userid, albumid, reviewtext) VALUES (?,?,?)`;
    params = [userid, albumid, reviewtext];
    let rows = await executeSQL(sql, params);
    res.send(rows);
  } else if (action == "delete") {
    sql = `DELETE FROM review WHERE userid = ? and albumid =?`;
    let params = [userid, albumid];
    let rows = await executeSQL(sql, params);
    res.send(rows);
  } else if (action == "modify") {
    sql = `
    UPDATE review
    SET reviewtext = ?
    WHERE userid = ? AND albumid = ?
    `;
    params = [reviewtext, userid, albumid];
    let rows = await executeSQL(sql, params);
    res.send(rows);
  }
});

// Wishlist API. Retrieves albumid, title, image of records
// in wishlist table corresponding to given userid.
app.get("/api/wishlist/getdetailed", async (req, res) => {
  let userid = req.session.userid;
  let sql = `
    SELECT a.albumid, title, image FROM wishlist w
    LEFT JOIN album a ON a.albumid = w.albumid
    WHERE userid = ?
  `;
  let params = [userid];
  let rows = await executeSQL(sql, params);
  res.send(rows);
});

// Wishlist API. Retrieves albumids from wishlist table associated
// with given userid.
app.get("/api/wishlist/getwishlist", async (req, res) => {
  let sql = "SELECT albumid FROM wishlist WHERE userid = ?";
  let params = [req.session.userid];
  let rows = await executeSQL(sql, params);
  res.send(rows);
});

// Wishlist API. Adds and removes records from the wishlist
// table associated with a given userid.
app.get("/api/wishlist/update", async (req, res) => {
  let sql;
  let params;
  let userid = req.session.userid;
  let albumid = req.query.albumid;
  let action = req.query.action;
  let inWishList = await validateUpdateWsh(userid, albumid);

  // "add": add record if album is not present in collection
  // "delete" : remove record if album is present in collection
  if (action == "add" && !inWishList) {
    sql = "INSERT INTO wishlist (userid, albumid) VALUES (?, ?)";
    params = [userid, albumid];
    let rows = await executeSQL(sql, params);
    res.send(rows);
  } else if (action == "delete" && inWishList) {
    sql = "DELETE FROM wishlist WHERE albumid =? AND userid = ?";
    params = [albumid, userid];
    let rows = await executeSQL(sql, params);
    res.send(rows);
  }
});

/**
 * Listener
 */

app.listen(3000, () => {
  console.log("Server started. Listening on port 3000...");
  dbTest();
});
