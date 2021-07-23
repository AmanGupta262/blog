import React, { useEffect, useRef } from "react";
import { useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { ALERT } from "../../redux/types/alertTypes";
import { checkImage } from "../../utils/imageUpload";

const container = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ['link', 'image'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
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
