import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import { IBlog, RootStore } from '../utils/TypeScript';

import Preview from "../components/blog/Preview";
import CreateForm from "../components/blog/CreateForm";
import NotFound from "../components/global/NotFound";
import Quill from '../components/editor/Quill';

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

    const [blog, setBlog] = useState<IBlog>(initState);
    const [body, setBody] = useState("");

    const {auth} = useSelector((state: RootStore) => state);

     
    if(!auth.access_token) return <NotFound />;
    return (
      <>
        <div className="bg-gray-100 container p-5 flex flex-col items-center">
          <div className="flex w-full flex-col md:flex-row items-start">
            <div className="md:w-1/2 mb-4 bg-white md:mr-4 w-full shadow-md rounded-lg">
              <CreateForm blog={blog} setBlog={setBlog} />
            </div>
            <div className="md:w-1/2 w-full rounded-lg">
              <Preview blog={blog} />
            </div>
          </div>
          <div className="bg-white w-full mb-4">
            <Quill setBody={setBody} />
          </div>
          <button className="mx-auto bg-gray-800 px-4 py-1 text-white rounded hover:bg-gray-700 focus:bg-gray-700 cursor-pointer ">
            Create
          </button>
        </div>
      </>
    );
}

export default CreateBlog
