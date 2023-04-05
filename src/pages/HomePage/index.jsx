import React from "react";
import Header from "../../components/Header";
import LeftHome from "../../components/Home/left";
import { useSelector } from "react-redux";
import RightHome from "../../components/Home/right";
import Stories from "../../components/Home/stories";
import "./style.css";
import CreatePost from "../../components/CreatePost";
import SendVerification from "../../components/Home/sendVerif";
export default function HomePage() {
  const { user } = useSelector((state) => ({ ...state }));
  console.log(user);
  return (
    <div className="home">
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        {!user?.verified && <SendVerification user={user} />}
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
}
