import React from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { IParams, RootStore } from "../../utils/TypeScript";
import UserInfo from "../../components/profile/UserInfo";
import OtherInfo from "../../components/profile/OtherInfo";
import UserBlogs from "../../components/profile/UserBlogs";

const Profile = () => {
  const { slug }: IParams = useParams();

  const { auth } = useSelector((state: RootStore) => state);
  return (
    <>
      <div className="bg-gray-100 container p-5 flex flex-col md:flex-row items-start">
        <div className="md:w-1/3 mb-4 bg-white md:mr-4 w-full shadow-md rounded-lg">
          {auth.user?._id === slug ? <UserInfo /> : <OtherInfo />}
        </div>
        <div className="md:w-2/3 bg-white w-full shadow-md rounded-lg">
          <UserBlogs />
        </div>
      </div>
    </>
  );
};

export default Profile;