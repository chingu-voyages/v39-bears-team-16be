const { ObjectId } = require('mongodb');

let classCollection;

function ClassDao() {
  this.initialize = async (client) => {
    if (classCollection) {
      return;
    }

    try {
      classCollection = await client.db().collection('classes');
    } catch (err) {
      console.error(err);
    }
  };

  this.find = async (_id) => {
    try {
      const result = await classCollection.findOne({ _id: ObjectId(_id) });
      return result;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  this.create = async ({
    name = '',
    description = '',
    completed = false,
    classworks = [],
    createdAt = new Date(),
  }) => {
    try {
      const result = await classCollection.insertOne({
        name,
        description,
        completed,
        classworks,
        createdAt,
      });

      return result.insertedId;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  };

  // eslint-disable-next-line object-curly-newline
  this.update = async ({ _id, name, description, completed }) => {
    const result = await classCollection.updateOne(
      { _id: ObjectId(_id) },
      {
        $set: {
          name,
          description,
          completed,
        },
      },
    );

    return result;
  };

  this.delete = async (_id) => {
    try {
      const result = await classCollection.deleteOne({ _id: ObjectId(_id) });
      return result;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  this.allClassworks = async (classId) => {
    try {
      const classworks = await classCollection.findOne(
        { _id: ObjectId(classId) },
        { projection: { classworks: 1, _id: 0 } },
      );
      return classworks;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  this.createClasswork = async ({
    classId = '',
    classworkId = new ObjectId(),
    name = '',
    description = '',
    type = '',
    order = 0,
    createdAt = new Date(),
  }) => {
    try {
      const result = await classCollection.updateOne(
        {
          _id: ObjectId(classId),
        },
        {
          // eslint-disable-next-line object-curly-newline
          $push: {
            classworks: {
              _id: classworkId,
              name,
              description,
              type,
              order,
              createdAt,
            },
          },
        },
      );
      return result;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  this.deleteClasswork = async ({ classId, classworkId }) => {
    console.log(typeof classworkId);
    try {
      const result = await classCollection.updateOne(
        { _id: ObjectId(classId) },
        { $pull: { classworks: { _id: ObjectId(classworkId) } } },
      );

      return result;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };
}

const classDao = new ClassDao();

Object.freeze(classDao);

module.exports = classDao;
