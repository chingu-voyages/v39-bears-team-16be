import * as mongodb from 'mongodb';

export interface LikeInterface {
  _id: mongodb.ObjectId;
  email: string;
  planId: mongodb.ObjectId; 
  createdAt: Date;
}

export class LikeModel implements LikeInterface {
 _id: mongodb.ObjectId;
 email: string;
 planId: mongodb.ObjectId; 
 createdAt: Date;

constructor(
  email = '',
  planId = '' 
) {
  this._id = new mongodb.ObjectId();
  this.email = email;
  this.planId = new mongodb.ObjectId(planId);
  this.createdAt = new Date()
}
}