const { ObjectId } = require('mongodb');

let classes;

function ClassDao() {
  this.initialize = async (client) => {
    if (classes) {
      return;
    }

    try {
      classes = await client.db().collection('classes');
    } catch (err) {
      console.error(err);
    }
  };

  this.getClassesByCohortId = async (cohortId) => {
    try {
      const result = await classes
        .find({ cohortId: ObjectId(cohortId) })
        .sort({ date: 1 });
      return result.toArray();
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  this.insertClass = async (classObj) => {
    const { name, subject, date, cohortId } = classObj;

    try {
      const result = await classes.insertOne({
        name,
        subject,
        cohortId: new ObjectId(cohortId),
        date: new Date(date),
      });

      return result;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  this.insertClasswork = async (classworkObj) => {
    const { classId, name, body } = classworkObj;
    const classwork = { name, body };
    try {
      const result = await classes.updateOne(
        { _id: ObjectId(classId) },
        { $push: { classworks: classwork } }
      );
      return result;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  this.deleteClass = async (classId) => {
    try {
      const result = await classes.deleteOne({ _id: ObjectId(classId) });
      return result;
    } catch (err) {
      console.error(err);
      return err;
    }
  };
}

const classDao = new ClassDao();

Object.freeze(classDao);

module.exports = classDao;
