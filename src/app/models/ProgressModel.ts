import * as mongodb from 'mongodb';

export interface ProgressClassworkInterface {
  classworkId: mongodb.ObjectId;
  classworkProgress: 0 | 1;
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
  planProgress: number;
  classes: ProgressClassInterface[];
}

class ProgressModel implements ProgressInterface {
  _id;
  user;
  planId;
  planProgress;
  classes;
  constructor(user: string, planId: mongodb.ObjectId, classes: ProgressClassInterface[] = []) {
    this._id = new mongodb.ObjectId();
    this.user = user;
    this.planId = planId;
    this.planProgress = 0;
    this.classes = classes;
  }
}

export default ProgressModel;
