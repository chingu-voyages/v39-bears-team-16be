const { userDao } = require('./auth');

function EnrollmentController() {
  this.index = async (req, res, next) => {
    const { email } = req.user;
    try {
      const plans = await userDao.allPlans(email);
      return res.status(200).json({ plans });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };
}

const enrollmentController = new EnrollmentController();

Object.freeze(enrollmentController);

module.exports = enrollmentController;
