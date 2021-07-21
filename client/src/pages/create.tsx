import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import { IBlog, RootStore } from '../utils/TypeScript';

import Preview from "../components/blog/Preview";
import CreateForm from "../components/blog/CreateForm";
import NotFound from "../components/global/NotFound";

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

    const {auth} = useSelector((state: RootStore) => state);

     
    if(!auth.access_token) return <NotFound />;
    return (
      <>
        <div className="bg-gray-100 container p-5 flex flex-col md:flex-row items-start">
          <div className="md:w-1/2 mb-4 bg-white md:mr-4 w-full shadow-md rounded-lg">
            <CreateForm blog={blog} setBlog={setBlog} />
          </div>
          <div className="md:w-1/2 bg-white w-full shadow-md rounded-lg">
            <Preview />
          </div>
        </div>
      </>
    );
}

export default CreateBlog
