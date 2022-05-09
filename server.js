require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const compression = require("compression");
const csrf = require("csurf");
const helmet = require("helmet");
const MongoStore = require("connect-mongo");

const router = require("./routes/api.routes");
const passport = require("./middlewares/passport.middleware");

const app = express();

// for testing purpose only
app.set("views", "./views");
app.set("view engine", "ejs");

if (process.env.NODE_ENV === "production") {
  const corsOptions = {
    origin: "https://100devstracker.netlify.app",
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
} else {
  app.use(cors());
}

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
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(csrf());
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.user = req.user;
  next();
});

app.use(helmet());
app.use(compression());
app.use(router);

if (process.env.NODE_ENV === "production") {
  app.use(function (err, req, res, next) {
    if (err.code !== "EBADCSRFTOKEN") return next(err);

    // handle CSRF token errors here
    res.status(403);
    res.send("form tampered with");
  });
}

module.exports = app;
