import * as mongodb from 'mongodb';

export enum ClassworkType {
  ASSIGNMENT = 'assignment',
  MATERIAL = 'material',
}

// export interface ClassworkInterface {
//   _id: mongodb.ObjectId;
//   name: string;
//   description: string;
//   link: string;
//   type: ClassworkType;
// }

class ClassworkModel {
  _id: mongodb.ObjectId;
  name: string;
  description: string;
  link: string;
  type: ClassworkType;

  constructor(
    _id: mongodb.ObjectId = new mongodb.ObjectId(),
    name: string = '',
    description: string = '',
    link: string = '',
    type: ClassworkType = ClassworkType.MATERIAL,
  ) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.link = link;
    this.type = type;
  }
}

export default ClassworkModel;
