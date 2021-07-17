export const checkImage = (file: File) => {
  let err = "";
  if (!file) return "File does not exist.";
  if (file.size > 1024 * 1024) err = "File is too large.";
  return err;
};
