import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import LeftHome from "../../components/Home/left";
import { useSelector } from "react-redux";
import RightHome from "../../components/Home/right";
import Stories from "../../components/Home/stories";
import "./style.css";
import CreatePost from "../../components/CreatePost";
import SendVerification from "../../components/Home/sendVerif";
import Post from "../../components/post";
export default function HomePage({ setVisible, posts, loading, getAllPosts }) {
  const { user } = useSelector((state) => ({ ...state }));
  const middle = useRef(null);
  const [height, setHeight] = useState();
  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, []);
  console.log(height);
  return (
    <div className="home" style={{ minHeight: `${height + 300}vh` }}>
      <Header page="home" />
      <LeftHome user={user} />
      <div className="home_middle" ref={middle}>
        <Stories />
        {!user?.verified && <SendVerification user={user} />}
        <CreatePost user={user} setVisible={setVisible} />
        <div className="posts">
          {posts.map((post) => (
            <Post post={post} key={post._id} user={user} />
          ))}
        </div>
      </div>
      <RightHome user={user} />
    </div>
  );
}
