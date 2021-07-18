import { IUserRegister } from "./TypeScript";

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

export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// check password and cf_password match
export const checkPassword = (password: string, cf_password: string) => {
  if (!password) return "Please enter your password.";
  else if (password.length < 6) return "Password must be 6 chars long.";
  else if (password !== cf_password)
    return "Confirm password did not match.";
}