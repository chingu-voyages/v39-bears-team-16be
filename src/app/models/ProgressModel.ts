import * as mongodb from 'mongodb';

export interface ProgressClassworkInterface {
  classworkId: mongodb.ObjectId;
  classworkProgress: number;
}

export interface ProgressClassInterface {
  classId: mongodb.ObjectId;
  classProgress: number;
  classworks: ProgressClassworkInterface[];
}

export interface ProgressInterface {
  _id: mongodb.ObjectId;
  user: string;
  planId: mongodb.ObjectId;
  classes: ProgressClassInterface[];
}

class ProgressModel implements ProgressInterface {
  _id;
  user;
  planId;
  classes;
  constructor(user: string, planId: mongodb.ObjectId, classes: ProgressClassInterface[] = []) {
    this._id = new mongodb.ObjectId();
    this.user = user;
    this.planId = planId;
    this.classes = classes;
  }
}

export default ProgressModel;
