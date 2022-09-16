import * as mongodb from 'mongodb';
import { ClassInterface } from './ClassModel';

const { defaultProfilePicture } = require('../../config/defaultVars.config');

class PlanModel {
  _id: mongodb.ObjectId;
  name: string;
  description: string;
  thumbnail: File;
  tags: string[];
  likes: number;
  classes: ClassInterface[];
  createdBy: string;
  visible: boolean;
  createdAt: Date;

  constructor(
    name = '',
    description = '',
    thumbnail = defaultProfilePicture,
    tags = [],
    likes = 0,
    classes = [],
    createdBy = '',
    visible = false,
    createdAt = new Date(),
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
