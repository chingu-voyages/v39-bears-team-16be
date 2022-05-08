const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    console.log(req.user);
    res
      .status(401)
      .json({ msg: "You are not authorized to view this resource." });
  }
};

const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin) {
    next();
  } else {
    console.log(req.user);
    res
      .status(401)
      .json({ msg: "You are not admin" });
  }
};

module.exports = { isAuth, isAdmin };
