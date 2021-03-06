import { Document } from "mongoose";
import { Request } from "express";

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

export interface IGoPayload {
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
}

export interface IUserParams {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  type: string;
}

export interface IReqAuth extends Request {
  user?: IUser;
}