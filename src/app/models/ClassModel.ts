import * as mongodb from 'mongodb';
import { ClassworkInterface } from './ClassworkModel';

export interface ClassInterface {
  _id: mongodb.ObjectId;
  name: string;
  description: string;
  classworks: ClassworkInterface[];
  createdAt: Date;
}

class ClassModel implements ClassInterface {
  _id;
  name;
  description;
  classworks: ClassworkInterface[];
  createdAt;

  constructor(name = '', description = '') {
    this._id = new mongodb.ObjectId();
    this.name = name;
    this.description = description;
    this.classworks = [];
    this.createdAt = new Date();
  }
}

export default ClassModel;
