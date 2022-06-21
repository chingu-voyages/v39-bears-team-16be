require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const csrf = require('csurf');
const compression = require('compression');
const helmet = require('helmet');

const webRoutes = require('./routes/web.routes');
const passport = require('./config/passport.config');
const { defaultOrigins } = require('./config/cors.config');

const app = express();
const productionEnv = process.env.NODE_ENV === 'production';
// cors config
app.use(
  cors({
    origin: defaultOrigins,
    credentials: true,
  }),
);
// required express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    rolling: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 1, // 1 hour
      httpOnly: true,
      sameSite: productionEnv ? 'none' : 'lax',
      secure: productionEnv,
    },
  }),
);
app.set('trust proxy', 1);
app.use(csrf());
app.use(passport.authenticate('session'));
// routing
app.use(helmet());
app.use(compression());
app.use(webRoutes);
// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).send({ message: 'Form has been tampered with.' });
  }

  return res.status(err.status || 500);
});

module.exports = app;
