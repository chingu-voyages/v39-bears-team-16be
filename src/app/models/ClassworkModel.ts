import * as mongodb from 'mongodb';

enum ClassworkTypes {
  SUBMISSION= 'submission',
  ASSIGNMENT= 'assignment'
}

export interface ClassworkInterface {
  _id: mongodb.ObjectId;
  name: string;
  description: string;
  type: ClassworkTypes;
  order: number;
  createdAt: Date;
}

export class ClassworkModel implements ClassworkInterface {
  _id: mongodb.ObjectId;
  name: string;
  description: string;
  type: ClassworkTypes;
  order: number;
  createdAt: Date;

  constructor(
    _id = new mongodb.ObjectId(),
    name = '',
    description = '',
    type = ClassworkTypes.ASSIGNMENT,
    order = 0,
    createdAt = new Date(),
  ) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.order = order;
    this.createdAt = createdAt;
  }
}
