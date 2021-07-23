import React from "react";
import { useSelector } from "react-redux";
import { IBlog, InputChange, RootStore } from "../../utils/TypeScript";

interface IProps {
  blog: IBlog;
  setBlog: (blog: IBlog) => void;
}

const CreateForm: React.FC<IProps> = ({ blog, setBlog }) => {
  const { categories } = useSelector((state: RootStore) => state);

  const handleChange = (e:InputChange) => {
    const { name, value } = e.target;
    setBlog({
      ...blog,
      [name]: value.trim()
    });
  }

  const handleThumbnailChange = (e:InputChange) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;

    if(files){
      const file = files[0];
      setBlog({ ...blog, thumbnail: file });
    }
  }

  return (
    <>
      <div className="p-4 text-2xl">Create Blog</div>
      <form className="p-4">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="title"
            id="title"
            name="title"
            value={blog.title}
            className="rounded w-full"
            onChange={handleChange}
          />
          <small className="absolute right-2 bottom-1 text-gray-500">
            {blog.title.length}/50
          </small>
        </div>

        <div className="relative mb-4">
          <input
            type="file"
            accept="image/*"
            id="thumbnail"
            name="thumbnail"
            onChange={handleThumbnailChange}
            className="rounded w-full border border-gray-500 p-1"
          />
        </div>

        <div className="relative mb-4">
          <textarea
            placeholder="description"
            id="description"
            name="description"
            value={blog.description}
            onChange={handleChange}            
            rows={4}
            className="rounded w-full resize-none"
          />
          <small className="absolute right-2 bottom-2 text-gray-500">
            {blog.description.length}/200
          </small>
        </div>

        <div className="realtive mb-4">
          <select
            name="category"
            id="category"
            className="capitalize rounded w-full"
            value={blog.category}
            onChange={handleChange}
          >
            <option value="">Choose a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </>
  );
};

export default CreateForm;
