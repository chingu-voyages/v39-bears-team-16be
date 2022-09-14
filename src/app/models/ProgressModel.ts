import * as mongodb from 'mongodb';

interface ProgressClassworkInterface {
  classworkId: mongodb.ObjectId;
  classworkProgress: number;
}

interface ProgressInterface {
  _id: mongodb.ObjectId;
  userId: mongodb.ObjectId;
  planId: mongodb.ObjectId;
  classId: mongodb.ObjectId;
  classProgress: number;
  classworks: ProgressClassworkInterface[];
}

class ProgressModel implements ProgressInterface {
  _id;
  userId;
  planId;
  classId;
  classProgress;
  classworks;

  constructor(
    userId: mongodb.ObjectId,
    classId: mongodb.ObjectId,
    planId: mongodb.ObjectId,
    classProgress = 0,
    classworks: ProgressClassworkInterface[]
  ) {
    this._id = new mongodb.ObjectId();
    this.userId = userId;
    this.classId = classId;
    this.planId = planId;
    this.classProgress = classProgress;
    this.classworks = classworks;
  }
}

export default ProgressModel;
