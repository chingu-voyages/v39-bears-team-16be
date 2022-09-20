import * as mongodb from 'mongodb';


export interface LogInterface {
  id: mongodb.ObjectId;
  user: string;
  action: string;
  createdAt: Date;
}

export class LogModel implements LogInterface {
  id: mongodb.ObjectId;
  user: string;
  action: string;
  createdAt: Date;

  constructor(
    user = '',
    action = '',
    createdAt = new Date(),
  ) {
    this.id = new mongodb.ObjectId();
    this.user = user;
    this.action = action;
    this.createdAt = createdAt;
  }
}
