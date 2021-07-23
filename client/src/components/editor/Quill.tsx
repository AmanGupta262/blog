import React, { useEffect, useRef } from "react";
import { useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { ALERT } from "../../redux/types/alertTypes";
import { checkImage, uploadImage } from "../../utils/imageUpload";

const container = [
  [{ font: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown

  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ script: "sub" }, { script: "super" }], // superscript/subscript

  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ align: [] }],

  ["clean", "link", "image", "video"],
];

interface IProps {
  setBody: (value: string) => void;
}

const Quill: React.FC<IProps> = ({ setBody }) => {
  const modules = { toolbar: { container } };

  const handleChange = (e: string) => {
    setBody(e);
  };
  const dispatch = useDispatch();
  const quillRef = useRef<ReactQuill>(null);

  const handleChangeImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    
    input.onchange = async () => {
      const files = input.files;
      if(!files) return dispatch({type: ALERT, payload: {errors: "No file selected"}});

      const file = files[0];
      const check = checkImage(file);

      if(check) return dispatch({ type: ALERT, payload: { errors: check } });

      dispatch({ type: ALERT, payload: { loading: true } });

      const pic = await uploadImage(file);

      const quill = quillRef.current;
      const range = quill?.getEditor().getSelection()?.index;

      if(range !== undefined) {
        quill?.getEditor().insertEmbed(range, "image", `${pic.url}`);
      }

      dispatch({ type: ALERT, payload: { loading: false } });
      
    }
  },[]);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;

    let toolbar = quill.getEditor().getModule("toolbar");
    toolbar.addHandler("image", handleChangeImage);
  }, [handleChangeImage]);

  return (
    <>
      <ReactQuill
        modules={modules}
        theme="snow"
        placeholder="Write something..."
        onChange={handleChange}
        ref={quillRef}
      />
    </>
  );
};

export default Quill;
