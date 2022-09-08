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

  this.store = async (req, res, next) => {
    const { email } = req.user;
    const { planId } = req.body;
    try {
      const result = await userDao.addPlan({ email, planId });
      return res.status(200).json({ result });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };

  this.destroy = async (req, res, next) => {
    const { email } = req.user;
    const { planId } = req.params;
    try {
      const result = await userDao.removePlan({ email, planId });
      return res.status(200).json({ result });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };
}

const enrollmentController = new EnrollmentController();

Object.freeze(enrollmentController);

module.exports = enrollmentController;
