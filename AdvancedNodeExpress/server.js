"use strict";
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongo = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const LocalStrategy = require("passport-local");

const myDB = require("./connection");

const fccTesting = require("./freeCodeCamp/fcctesting.js");

const app = express();

fccTesting(app); //For FCC testing purposes
const cors = require("cors");
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "pug");

myDB(async (client) => {
  const myDataBase = await client.db("myFirstDatabase").collection("users");

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    myDataBase.findOne({ _id: new ObjectID(id) }, (err, doc) => {
      done(null, doc);
    });
  });

  passport.use(
    new LocalStrategy(function (username, password, done) {
      myDataBase.findOne({ username: username }, function (err, user) {
        console.log("User " + username + " attempted to log in.");
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (password !== user.password) {
          return done(null, false);
        }
        return done(null, user);
      });
    })
  );

  // Be sure to change the title
  app.route("/").get((req, res) => {
    //Change the response to render the Pug template
    res.render("pug", {
      title: "Connected to Database",
      message: "Please login",
      showLogin: true,
      showRegistration: true,
    });
  });

  app.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/" }),
    (req, res, user) => {
      if (user) {
        console.log("user has been returned to login path");
        console.log(req.user);
        console.log(req.user.username);
        return res.redirect("/profile");
      } else {
        console.log("user could not be found");
        return res.redirect("/");
      }
    }
  );

  app.route("/logout").get((req, res) => {
    req.logout();
    res.redirect("/");
  });

  function ensureAuthenticated(req, res, next) {
    console.log("trying to authenticate");
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
      console.log("authenticated");
      return next();
    }
    console.log("could not authenticate user");
    res.redirect("/");
  }

  app.route("/profile").get(ensureAuthenticated, (req, res) =>
    res.render(process.cwd() + "/views/pug/profile", {
      username: req.user.username,
    })
  );

  app.route("/register").post(
    (req, res, next) => {
      console.log("registration attempt");
      myDataBase.findOne({ username: req.body.username }, function (err, user) {
        if (err) {
          next(err);
        } else if (user) {
          res.redirect("/");
        } else {
          myDataBase.insertOne(
            {
              username: req.body.username,
              password: req.body.password,
            },
            (err, doc) => {
              if (err) {
                res.redirect("/");
              } else {
                // The inserted document is held within
                // the ops property of the doc
                next(null, doc.ops[0]);
              }
            }
          );
        }
      });
    },
    passport.authenticate("local", { failureRedirect: "/" }),
    (req, res, next) => {
      res.redirect("/profile");
    }
  );

  // comment

  app.use((req, res, next) => {
    res.status(404).type("text").send("Not Found");
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
  });
}).catch((e) => {
  app.route("/").get((req, res) => {
    res.render("pug", { title: e, message: "Unable to login" });
  });
});
