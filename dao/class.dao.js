const { ObjectId } = require("mongodb");

let classes;

function ClassDao() {
  this.initialize = async function initialize(client) {
    if (classes) {
      return;
    }

    try {
      classes = await client.db().collection("classes");
    } catch (err) {

    }
  }

  this.getClassesByCohort = async function getClassesByCohort(cohortId) {
    console.log(cohortId);
    try {
      const result = await classes.find({ cohortId : new ObjectId(cohortId) }).sort({ date: 1 });
      return result.toArray();
    } catch (err) {
      console.error(err);
    } 
  }
}

const classDao = new ClassDao();

Object.freeze(classDao);

module.exports = classDao;