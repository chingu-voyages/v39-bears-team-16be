let classworkTypes;

function ClassworkTypeDao() {
  this.initialize = async (client) => {
    if (classworkTypes) {
      return;
    }

    try {
      classworkTypes = await client.db().collection('classworkTypes');
    } catch (err) {
      console.error(err);
    }
  };

  this.getTypes = async () => {
    try {
      const cursor = await classworkTypes.find({});
      return cursor.toArray();
    } catch (err) {
      console.error(err);
      return err;
    }
  };
}

const classworkTypeDao = new ClassworkTypeDao();

Object.freeze(classworkTypeDao);

module.exports = classworkTypeDao;
