import { Request, Response, NextFunction } from 'express';

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send({ msg: 'You are not authorized to view this resource.' });
  }
};

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated() && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ msg: 'You do not have admin permissions.' });
  }
};

module.exports = { isAuth, isAdmin };
