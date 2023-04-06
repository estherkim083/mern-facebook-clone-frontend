import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Form, Formik } from "formik";
import { useState } from "react";
import Footer from "../../components/Login/Footer";
import SearchAccount from "./SearchAccount";
import SendEmail from "./SendEmail";
import CodeVerification from "./CodeVerification";
import ChangePassword from "./ChangePassword";
export default function Reset() {
  const { user } = useSelector((state) => ({ ...state }));
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [conf_password, setConf_Password] = useState("");
  const [error, setError] = useState("");
  const [userInfos, setUserInfos] = useState("");
  const [visible, setVisible] = useState(0);

  const logout = async () => {
    Cookies.set("user", "");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <div className="reset">
      <div className="reset_header">
        <img src="../../../icons/facebook.svg" alt="" />
        {user ? (
          <div className="right_reset">
            <Link to="/profile">
              <img src={user?.picture} alt="" />
            </Link>
            <button className="blue_btn" onClick={() => logout()}>
              logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="right_reset">
            <button className="blue_btn">Login</button>
          </Link>
        )}
      </div>
      <div className="reset_wrap">
        {visible === 0 && (
          <SearchAccount
            email={email}
            setVisible={setVisible}
            setLoading={setLoading}
            setEmail={setEmail}
            setError={setError}
            setUserInfos={setUserInfos}
            error={error}
          />
        )}
        {visible === 1 && userInfos && (
          <SendEmail
            email={email}
            setVisible={setVisible}
            setLoading={setLoading}
            setError={setError}
            setUserInfos={setUserInfos}
            error={error}
            userInfos={userInfos}
            loading={loading}
          />
        )}
        {visible === 2 && (
          <CodeVerification
            setVisible={setVisible}
            setLoading={setLoading}
            setError={setError}
            setCode={setCode}
            error={error}
            userInfos={userInfos}
            loading={loading}
            code={code}
          />
        )}
        {visible === 3 && (
          <ChangePassword
            userInfos={userInfos}
            password={password}
            conf_password={conf_password}
            setPassword={setPassword}
            setConf_Password={setConf_Password}
            error={error}
            loading={loading}
            setVisible={setVisible}
            setLoading={setLoading}
            setError={setError}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
