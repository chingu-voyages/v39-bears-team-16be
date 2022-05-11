require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const compression = require("compression");
const helmet = require("helmet");
const MongoStore = require("connect-mongo");

const router = require("./routes/api.routes");
const passport = require("./middlewares/passport.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    rolling: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
      // 1 hour
      maxAge: 1000 * 60 * 60 * 1,
      httpOnly: true
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());
app.use(compression());
app.use(router);

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
});

module.exports = app;
