import { IUserRegister, IBlog } from "./TypeScript";

// Valid Register User
export const validRegister = (userRegister: IUserRegister) => {
  const { name, email, password, cf_password } = userRegister;
  const errors: string[] = [];

  if (!name) errors.push("Please enter your name.");
  else if (name.length > 20) errors.push("Your name is up to 20 chars long.");

  if (!email) errors.push("Please enter your email.");
  else if (!validateEmail(email)) errors.push("Enter a valid email.");

  const msg = checkPassword(password, cf_password);

  if (msg) errors.push(msg);

  return {
    errMsg: errors,
    errLength: errors.length,
  };
};

// Valid Email
export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// check password and cf_password match
export const checkPassword = (password: string, cf_password: string) => {
  if (!password) return "Please enter your password.";
  else if (password.length < 6) return "Password must be 6 chars long.";
  else if (password !== cf_password) return "Confirm password did not match.";
};

// Valid Blog
export const validCreateBlog = ({
  title,
  content,
  category,
  thumbnail,
  description,
}: IBlog) => {
  const err: string[] = [];
  if (title.trim().length < 10)
    err.push("Title must be at least 10 chars long.");
  else if (title.trim().length > 50) err.push("Title is too long.");

  if (description.trim().length < 50)
    err.push("Description must be at least 50 chars long.");
  else if (description.trim().length > 200)
    err.push("Description is too long.");

  if (content.trim().length < 2000)
    err.push("Content must be at least 2000 chars long..");

  if (!thumbnail) err.push("Please select a thumbnail.");

  if (!category) err.push("Please select a category.");

  return {
    errMsg: err,
    errLength: err.length,
  };
};
