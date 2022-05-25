require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const csrf = require("csurf");
const compression = require("compression");
const helmet = require("helmet");
const MongoStore = require("connect-mongo");

const router = require("./routes/api.routes");
const passport = require("./middlewares/passport.middleware");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://100devstracker.netlify.app",
      "https://api.github.com",
      "https://github.com"
    ],
    credentials: true,
  })
);
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
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(csrf());
app.use(helmet());
app.use(compression());
app.use(router);

// error handler
app.use(function (err, req, res, next) {
  if (err.code === "EBADCSRFTOKEN") {
    // handle CSRF token errors here
    return res.status(403).send({ message: "form tampered with" });
  }

  res.status(err.status || 500);
});

module.exports = app;
