export const checkImage = (file: File) => {
  const types = ['image/png', 'image/jpeg'];

  let err = "";
  if (!file) return "File does not exist.";
  if (file.size > 1024 * 1024) err = "File is too large.";
  if (!types.includes(file.type)) err = "File type is not allowed."; 
  return err;
};

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "foq5t8md");
  formData.append("cloud_name", `${process.env.REACT_APP_CLOUD_NAME}`);

  const res = await fetch(`${process.env.REACT_APP_IMAGE_UPLOAD}`, {
    method: "POST",
    body: formData,
  });
  const json = await res.json();
  return { public_id: json.public_id, url: json.secure_url };
};
