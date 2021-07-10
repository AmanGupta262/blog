import { ChangeEvent, FormEvent } from "react";

export type InputChange = ChangeEvent<HTMLInputElement>;
export type FormSubmit = FormEvent<HTMLFormElement>;

export interface IParams {
  page: string;
  slug: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUser extends IUserLogin {
  avatar: string;
  createdAt: string;
  name: string;
  role: string;
  type: string;
  updatedAt: string;
  _id: string;
}

export interface IAlert {
  loading?: boolean;
  success?: string | string[];
  error?: string | string[];
}