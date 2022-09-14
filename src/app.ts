require('dotenv').config();

import { Request, Response, NextFunction } from 'express';

interface Error extends NodeJS.ErrnoException {
  status?: number;
}

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const csrf = require('csurf');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');

const webRoutes = require('./routes/web.routes');
const passport = require('./config/passport.config');
const { defaultOrigins } = require('./config/cors.config');

const app = express();
const productionEnv = process.env.NODE_ENV === 'production';

app.use(
  cors({
    origin: defaultOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  })
);
app.set('trust proxy', 1);
app.use(csrf());
app.use(passport.authenticate('session'));

app.use(helmet());
app.use(compression());
app.use(morgan('dev'));

app.use(webRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).send({ message: 'Form has been tampered with.' });
  }

  return res.status(err.status || 500);
});

export default app;
