import * as mongodb from 'mongodb';
import { ClassworkInterface } from './ClassworkModel';

export interface ClassInterface {
  _id: mongodb.ObjectId;
  name: string;
  description: string;
  completed: boolean;
  classworks: ClassworkInterface[];
  createdAt: Date;
}

class ClassModel implements ClassInterface {
  _id;
  name;
  description;
  completed;
  classworks;
  createdAt;

  constructor(name = '', description = '', completed = false, classworks = [], createdAt = new Date()) {
    this._id = new mongodb.ObjectId();
    this.name = name;
    this.description = description;
    this.completed = completed;
    this.classworks = classworks;
    this.createdAt = createdAt;
  }
}

export default ClassModel;
