import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { IBlog, RootStore } from '../utils/TypeScript';

import Preview from "../components/blog/Preview";
import CreateForm from "../components/blog/CreateForm";
import NotFound from "../components/global/NotFound";
import Quill from '../components/editor/Quill';
import { validCreateBlog } from '../utils/Valid';
import { ALERT } from '../redux/types/alertTypes';
import { createBlog } from "../redux/actions/blog";

const CreateBlog = () => {
    const initState = {
        user: '',
        title: '',
        content: '',
        description: '',
        category: '',
        thumbnail: '',
        createAt: new Date().toISOString(),
    }

    const dispatch = useDispatch()

    const [blog, setBlog] = useState<IBlog>(initState);
    const [body, setBody] = useState("");
    const [text, setText] = useState("");

    const divRef = useRef<HTMLDivElement>(null)

    const {auth} = useSelector((state: RootStore) => state);

    const handleSubmit = async  () => {
      if(!auth.access_token) return;

      const check = validCreateBlog({...blog, content: text});
      if(check.errLength > 0) return dispatch({type: ALERT, payload: {errors: check.errMsg}})

      let newData = { ...blog, content: body };

      dispatch(createBlog(newData, auth.access_token));
    }

    useEffect(() => {
      const div = divRef.current;
      if(!div) return;
      const content = div?.innerText as string;
      setText(content);
    }, [body])

     
    if(!auth.access_token) return <NotFound />;
    return (
      <>
        <div className="bg-gray-100 container p-5 ">
          <div className="flex w-full flex-col md:flex-row items-start">
            <div className="md:w-1/2 mb-4 bg-white md:mr-4 w-full shadow-md rounded-lg">
              <CreateForm blog={blog} setBlog={setBlog} />
            </div>
            <div className="md:w-1/2 w-full rounded-lg">
              <Preview blog={blog} />
            </div>
          </div>
          <div className="bg-white w-full mb-4 relative">
            <Quill setBody={setBody} />
            <small className="absolute right-2 bottom-1 text-gray-500">
              {text.length}
            </small>
            <div
              className="hidden"
              ref={divRef}
              dangerouslySetInnerHTML={{
                __html: body,
              }}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="mx-auto block bg-gray-800 px-4 py-1 text-white rounded hover:bg-gray-700 focus:bg-gray-700 cursor-pointer "
          >
            Create
          </button>
        </div>
      </>
    );
}

export default CreateBlog
