require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const router = require("./routes/api.routes");
const passport = require("./middlewares/passport.middleware");
const compression = require('compression');
const helmet = require("helmet");

const app = express();

app.use(helmet());
app.use(compression());

// for testing purpose only
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
      // 1 hour
      maxAge: 1000 * 60 * 60 * 1
  }
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

module.exports = app;
