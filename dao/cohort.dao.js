const { ObjectId } = require('mongodb');

let cohorts;

function CohortDao() {
  this.initialize = async (client) => {
    if (cohorts) {
      return;
    }

    try {
      cohorts = await client.db().collection('cohorts');
      return;
    } catch (err) {
      console.error(err);
    }
  };

  this.getCohorts = async () => {
    try {
      const cursor = await cohorts.find({}).sort({ startDate: 1 });
      return cursor.toArray();
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  this.findCohortById = async (_id) => {
    try {
      const cohort = await cohorts.findOne({ _id: ObjectId(_id) });
      return cohort;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  this.insertCohort = async (cohort) => {
    const { name, startDate, endDate } = cohort;
    try {
      const result = await cohorts.insertOne({
        name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });
      return result;
    } catch (err) {
      console.error(err);
      return err;
    }
  };
}

const cohortDao = new CohortDao();

Object.freeze(cohortDao);

module.exports = cohortDao;
