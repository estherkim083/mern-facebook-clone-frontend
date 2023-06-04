import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import AlreadyLoggedInRoutes from "./routes/AlreadyLoggedInRoutes";
import Activate from "./pages/HomePage/activate";
import Reset from "./pages/Reset";
import CreatePostPopup from "./components/CreatePostPopup";
import { useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
function reducer(state, action) {
  switch (action.type) {
    case "POSTS_REQUEST":
      return { ...state, loading: true, error: "" };
    case "POSTS_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: "",
      };
    case "POSTS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
function App() {
  const [visible, setVisible] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [{ loading, posts, error }, dispatch] = useReducer(reducer, {
    loading: false,
    posts: [],
    error: "",
  });
  console.log(posts);
  useEffect(() => {
    getAllPosts();
  }, []);
  const getAllPosts = async () => {
    try {
      dispatch({
        type: "POSTS_REQUEST",
      });
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/getAllPosts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: "POSTS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: error.response.data.message,
      });
    }
  };
  return (
    <div>
      {visible && <CreatePostPopup user={user} setVisible={setVisible} />}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route
            exact
            path="/"
            element={<HomePage setVisible={setVisible} posts={posts} />}
          />
          <Route exact path="/activate" element={<Activate />} />
          <Route exact path="/profile" element={<Profile />} />
        </Route>

        <Route element={<AlreadyLoggedInRoutes />}>
          <Route exact path="/login" element={<Login />} />
        </Route>
        <Route exact path="/reset" element={<Reset />} />
      </Routes>
    </div>
  );
}

export default App;
