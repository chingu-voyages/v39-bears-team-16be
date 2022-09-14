const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send({ msg: "You are not authorized to view this resource." });
  }
};

const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ msg: "You do not have admin permissions." });
  }
};

module.exports = { isAuth, isAdmin };
