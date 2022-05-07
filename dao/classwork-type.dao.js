let classworkTypes;

function ClassworkTypeDao() {
  this.initialize = async function initialize(client) {
    if (classworkTypes) {
      return;
    }

    try {
      classworkTypes = await client.db().collection("classworkTypes");
    } catch (err) {
      console.error(err);
    }
  };

  this.getTypes = async function getTypes() {
    try {
      const cursor = await classworkTypes.find({});
      return cursor.toArray();
    } catch (err) {
      console.error(err);
    }
  }
}

const classworkTypeDao = new ClassworkTypeDao();

Object.freeze(classworkTypeDao);

module.exports = classworkTypeDao;
