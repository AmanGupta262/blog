import { Document } from "mongoose";

export interface INewUser {
  name: string;
  email: string;
  password: string;
}
export interface IDecodeToken {
  id?: string;
  newUser?: INewUser;
  iat: number;
  exp: number;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  type: string;
  _doc: object;
}