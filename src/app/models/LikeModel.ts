import * as mongodb from 'mongodb';

class LikeModel {
 _id: mongodb.ObjectId;
 email: string;
 planId: mongodb.ObjectId; 
 createdAt: Date;

 constructor(
    email = '',
    planId = '', 
    createdAt = new Date(),

  ) {
    this._id = new mongodb.ObjectId();
    this.email = email;
    this.planId = new mongodb.ObjectId(planId);
    this.createdAt = createdAt;
  }

}

export default LikeModel;