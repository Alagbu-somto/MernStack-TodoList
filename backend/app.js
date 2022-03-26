//jshint esversion:6

require("dotenv").config({ path: "./config.env" });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");

const app = express();
app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "my very own secret",
    resave: false,
    saveUninitialized: true,
  })
);

mongoose.connect(
  "mongodb+srv://Stephen:Testing@cluster0.m8xs9.mongodb.net/ListDB"
);

const todoSchema = mongoose.Schema({
  list: String,
  ID: String,
});
const LoginSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  input: [todoSchema],
});
const Todo = mongoose.model("Todo", todoSchema);
const Login = mongoose.model("Login", LoginSchema);

app.post("/screen", (req, res) => {
  const email = JSON.parse(req.body.email);
  const password = JSON.parse(req.body.password);
  Login.findOne({ email: email, password: password }, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      const screen = items.input;
      return res.json({ status: true, screen });
    }
  });
});

app.post("/list", async (req, res) => {
  const items = req.body.name;
  const ID = req.body.ID;
  const todoItems = Todo({
    list: items,
    ID: ID,
  });
  todoItems.save();
  const email = JSON.parse(req.body.email);
  const password = JSON.parse(req.body.password);
  Login.findOne({ password: password, email: email }, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      items.input.push(todoItems);
      items.save();
      const good = items.input;
      return res.json({ status: true, user: "user not found", good });
    }
  });
});

app.post("/delete", (req, res) => {
  const email = JSON.parse(req.body.email);
  const password = JSON.parse(req.body.password);
  const ID = req.body.ID;
  Login.findOneAndUpdate(
    { password: password, email: email },
    { $pull: { input: { ID: ID } } },
    function (err, founditems) {
      console.log(founditems);
      if (err) {
        console.log(err);
      } else {
        console.log("Checked item sucessfully deleted");
        Login.findOne({ password: password, email: email }, (err, items) => {
          if (err) {
            console.log(err);
          } else {
            const good = items.input;
            return res.json({ status: true, user: "user not found", good });
          }
        });
      }
    }
  );
});

app.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const loginItems = await new Login({
      email: req.body.email,
      password: req.body.password,
    });
    Login.findOne(
      { email: req.body.email, password: req.body.password },
      (err, founditems) => {
        if (founditems) {
          return res.json({ status: false, user: "user alredy Exist" });
        } else {
          res.json({ status: true, user: "user not found" });
          loginItems.save();
        }
      }
    );
  } catch (err) {
    res.json({ status: "error", error: "duplicated email" });
  }
});

app.post("/login", async (req, res) => {
  Login.findOne(
    { email: req.body.email, password: req.body.password },
    (err, founditems) => {
      if (founditems) {
        const token = jwt.sign(
          {
            email: founditems.email,
          },
          "mysecret123"
        );
        return res.json({
          status: true,
          user: "sucessfully logedin",
          token,
        });
      } else {
        res.json({ status: false, user: "not sucessfully logedin" });
      }
    }
  );
});

app.listen(5000, function () {
  console.log("Server started sucessfully");
});
