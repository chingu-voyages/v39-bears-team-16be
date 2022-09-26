import * as mongodb from 'mongodb';


export interface LogInterface {
  _id: mongodb.ObjectId;
  user: string;
  action: string;
  createdAt: Date;
}

export class LogModel implements LogInterface {
  _id: mongodb.ObjectId;
  user: string;
  action: string;
  createdAt: Date;

  constructor(
    user = '',
    action = '',
    createdAt = new Date(),
  ) {
    this._id = new mongodb.ObjectId();
    this.user = user;
    this.action = action;
    this.createdAt = createdAt;
  }
}
