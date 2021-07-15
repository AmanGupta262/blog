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
      <h2>Profile</h2>
      {
          auth.user?._id === slug ? <UserInfo /> : <OtherInfo />
      }
      <UserBlogs />
    </>
  );
};

export default Profile;
