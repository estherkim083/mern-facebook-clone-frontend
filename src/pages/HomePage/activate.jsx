import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import LeftHome from "../../components/Home/left";
import { useDispatch, useSelector } from "react-redux";
import RightHome from "../../components/Home/right";
import Stories from "../../components/Home/stories";
import "./style.css";
import CreatePost from "../../components/CreatePost";
import ActivateForm from "./ActivateForm";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
export default function Activate() {
  const { user } = useSelector((user) => ({ ...user }));
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activateAccount = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/activate`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
      Cookies.set("user", JSON.stringify({ ...user, verified: true }));
      dispatch({ type: "VERIFY", payload: true });
      setLoading(false);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  useEffect(() => {
    if (token) {
      activateAccount();
    }
  }, [token]);

  return (
    <div className="home">
      {success && (
        <ActivateForm
          type="success"
          text={success}
          loading={loading}
          header="Account verification succeeded"
        />
      )}
      {error && (
        <ActivateForm
          type="error"
          text={error}
          loading={loading}
          header="Account verification failed"
        />
      )}
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
}
