const { body, validationResult, param } = require('express-validator');
const cohorts = require('../../../dao/cohort.dao');

const adminClassStoreRequest = [
  body('name').isLength({ min: 1, max: 255 }).trim().escape(),
  body('subject').isLength({ min: 1, max: 255 }).trim().escape(),
  param('cohortId').custom(async (value) => {
    try {
      console.log(value);
      const cohort = await cohorts.findCohortById(value);
      if (!cohort) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject('Cohort ID is invalid.');
      }
      return Promise.resolve();
    } catch (err) {
      console.error(err);
      return err;
    }
  }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return next();
  },
];

module.exports = adminClassStoreRequest;
