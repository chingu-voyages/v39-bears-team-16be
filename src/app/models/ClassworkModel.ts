import * as mongodb from 'mongodb';

export enum ClassworkType {
  ASSIGNMENT = 'assignment',
  MATERIAL = 'material',
}

export interface ClassworkInterface {
  _id: mongodb.ObjectId;
  name: string;
  description: string;
  link: string;
  type: ClassworkType;
}

class ClassworkModel implements ClassworkInterface {
  _id;
  name;
  description;
  link;
  type;

  constructor(
    name: string = '',
    description: string = '',
    link: string = '',
    type: ClassworkType = ClassworkType.MATERIAL
  ) {
    this._id = new mongodb.ObjectId();
    this.name = name;
    this.description = description;
    this.link = link;
    this.type = type;
  }
}

export default ClassworkModel;
