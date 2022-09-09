import * as mongodb from 'mongodb';

enum Sexes {
  MALE = 'male',
  FEMALE = 'female',
}

class UserModel {
  _id: mongodb.ObjectId;
  name: string;
  email: string;
  hash: string;
  salt: string;
  profilePicture: string;
  location: string;
  sex: Sexes | null;
  isAdmin: boolean;
  enrolledIn: string[];
  createdAt: Date;

  constructor(
    name = '',
    email = '',
    hash = '',
    salt = '',
    profilePicture = '',
    location = '',
    sex = null,
    isAdmin = false,
    enrolledIn = [],
    createdAt = new Date(),
  ) {
    this.name = name;
    this.email = email;
    this.hash = hash;
    this.salt = salt;
    this.profilePicture = profilePicture;
    this.location = location;
    this.sex = sex;
    this.isAdmin = isAdmin;
    this.enrolledIn = enrolledIn;
    this.createdAt = createdAt;
  }
}

export default UserModel;
