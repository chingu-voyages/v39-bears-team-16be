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

export class ClassModel implements ClassInterface {
  _id: mongodb.ObjectId;
  name: string;
  description: string;
  completed: boolean;
  classworks: ClassworkInterface[];
  createdAt: Date;

  constructor(
    name = '',
    description = '',
    completed = false,
    classworks = [],
    createdAt = new Date(),
  ) {
    this._id = new mongodb.ObjectId();
    this.name = name;
    this.description = description;
    this.completed = completed;
    this.classworks = classworks;
    this.createdAt = createdAt;
  }
}
