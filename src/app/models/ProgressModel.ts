import * as mongodb from 'mongodb';

interface ProgressClassworkInterface {
  classworkId: mongodb.ObjectId;
  classworkProgress: number;
}

interface ProgressClassInterface {
  classId: mongodb.ObjectId;
  classProgress: number;
  classworks: ProgressClassworkInterface[];
}

interface ProgressInterface {
  _id: mongodb.ObjectId;
  userId: mongodb.ObjectId;
  planId: mongodb.ObjectId;
  classes: ProgressClassInterface[];
}

class ProgressModel implements ProgressInterface {
  _id;
  userId;
  planId;
  classes;
  constructor(userId: mongodb.ObjectId, planId: mongodb.ObjectId, classes: ProgressClassInterface[] = []) {
    this._id = new mongodb.ObjectId();
    this.userId = userId;
    this.planId = planId;
    this.classes = classes;
  }
}

export default ProgressModel;
