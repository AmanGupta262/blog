import React,{ useState }   from 'react'
import { useDispatch, useSelector } from "react-redux";
import { InputChange, RootStore, IUserProfile } from "../../utils/TypeScript";

const UserInfo = () => {
    const { auth } = useSelector((state: RootStore) => state);

    const initailState = { name: "", email: "", password: "", cf_password: "", avatar: "" };
    const [user, setUser] = useState<IUserProfile>(initailState);
    const [typePass, setTypePass] = useState(false);
    const [typeCfPass, setTypeCfPass] = useState(false);

    const { name, email, avatar, password, cf_password } = user;

    const handleFileChange = (e: InputChange) => {
      const target = e.target as HTMLInputElement;
      
      const files = target.files;
      if (files) {
        const file = files[0]; 
        setUser({...user, avatar: file});
      }
    }

    const handleInputChange = (e: InputChange) => {
      const { value, name } = e.target;
      setUser({ ...user, [name]: value });
    };
    
    if(!auth.user) return <div></div>
    return (
      <>
        <div className="w-full p-4 flex">
          <form className="mt-8 space-y-6 w-full" method="POST">
            <div className="relative flex justify-center">
              <img
                className="h-40 w-40 rounded-full shadow-md border-4 border-white"
                src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
                alt={auth.user.name}
              />
            </div>
            <div className="">
              <label className="text-sm font-bold text-gray-700 tracking-wide">
                Profile pic
              </label>
              <input
                className="rounded w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="file"
                accept="image/*"
                placeholder="Your name is up to 20 chars long"
                name="pic"
                id="pic"
                onChange={handleFileChange}
              />
            </div>
            <div className="">
              <label className="text-sm font-bold text-gray-700 tracking-wide">
                Name
              </label>
              <input
                className="rounded w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                placeholder="Your name is up to 20 chars long"
                name="name"
                id="name"
                value={auth.user.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="">
              <label className="text-sm font-bold text-gray-700 tracking-wide">
                Email
              </label>
              <input
                className="rounded w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="email"
                placeholder="Enter your email"
                name="email"
                id="email"
                disabled={true}
                value={auth.user.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-8 content-center">
              <label className="text-sm font-bold text-gray-700 tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  className="rounded w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type={typePass ? "text" : "password"}
                  placeholder="Password must be at least 6 chars long"
                  name="password"
                  id="password"
                  value={password}
                  onChange={handleInputChange}
                />
                <label
                  className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer absolute top-2 right-2"
                  onClick={() => setTypePass(!typePass)}
                >
                  {typePass ? "hide" : "show"}
                </label>
              </div>
            </div>
            <div className="mt-8 content-center">
              <label className="text-sm font-bold text-gray-700 tracking-wide">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  className="rounded w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type={typeCfPass ? "text" : "password"}
                  placeholder="Confirm password"
                  name="cf_password"
                  id="cf_password"
                  value={cf_password}
                  onChange={handleInputChange}
                />
                <label
                  className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer absolute top-2 right-2"
                  onClick={() => setTypeCfPass(!typeCfPass)}
                >
                  {typeCfPass ? "hide" : "show"}
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className={`w-full flex justify-center bg-indigo-500 text-gray-100 p-4  rounded-full tracking-wide
                                font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300`}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </>
    );
}

export default UserInfo
