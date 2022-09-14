import * as mongodb from "mongodb";
import { defaultProfilePicture } from "../../config/defaultVars.config";

enum Sexes {
  MALE = "male",
  FEMALE = "female",
}

interface UserInterface {
  _id: mongodb.ObjectId;
  name: string;
  email: string;
  hash: string;
  salt: string;
  profilePicture: string;
  location: string;
  sex: Sexes | null;
  isAdmin: boolean;
  enrolledIn: mongodb.ObjectId[];
  createdAt: Date;
}

class UserModel implements UserInterface {
  _id;
  name;
  email;
  hash;
  salt;
  profilePicture;
  location;
  sex;
  isAdmin;
  enrolledIn;
  createdAt;

  constructor(
    name = "",
    email = "",
    hash = "",
    salt = "",
    profilePicture = defaultProfilePicture,
    location = "",
    sex: Sexes | null = null,
    isAdmin = false,
    enrolledIn: mongodb.ObjectId[] = [],
    createdAt = new Date()
  ) {
    this._id = new mongodb.ObjectId();
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
