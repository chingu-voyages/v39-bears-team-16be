import * as mongodb from 'mongodb';

class PlanModel {
  _id: mongodb.ObjectId;
  name: string;
  description: string;
  thumbnail: string;
  tags: string[];
  likes: number;
  classes: string[];
  createdBy: string;
  visible: boolean;
  createdAt = Date;

  constructor(
    name = '',
    description = '',
    thumbnail = '',
    tags = [],
    _likes = 0,
    classes = [],
    createdBy = '',
    visible = false,
    createdAt = Date,
  ) 
   {
    this._id = new mongodb.ObjectId();
    this.name = name;
    this.description = description;
    this.thumbnail = thumbnail;
    this.tags = tags;
    this.likes = 0;
    this.classes = classes;
    this.createdBy = createdBy;
    this.visible = visible;
    this.createdAt = createdAt;    
  }
}

export default PlanModel;