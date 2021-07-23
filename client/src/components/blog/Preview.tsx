import React from 'react'
import { Link } from 'react-router-dom'
import { IBlog } from '../../utils/TypeScript'

interface IProps {
  blog: IBlog
}

const Preview: React.FC<IProps> = ({blog}) => {
    return (
      <>
        <div className="p-4 text-2xl">Preview</div>
        <div className="flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-xl mt-4 w-100 mx-2 mb-4">
          <div className="h-full w-auto md:w-1/2">
            {typeof blog.thumbnail === "string" ? (
              <Link to={`/blog/${blog._id}`}>
                <img
                  className="inset-0 h-full w-full object-cover object-center"
                  src={blog.thumbnail}
                  alt={blog.title}
                />
              </Link>
            ) : (
              <img
                className="inset-0 h-full w-full object-cover object-center"
                src={URL.createObjectURL(blog.thumbnail)}
                alt="Mountain"
              />
            )}
          </div>

          <div className="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
            <h3 className="font-semibold text-lg leading-tight truncate">
              {blog.title}
            </h3>
            <p className="mt-2">{blog.description}</p>
            <p className="text-sm text-gray-700 uppercase tracking-wide font-semibold mt-2">
              Aman &bull; {new Date(blog.createAt).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </>
    );
}

export default Preview
