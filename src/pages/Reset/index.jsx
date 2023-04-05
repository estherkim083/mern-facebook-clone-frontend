import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Form, Formik } from "formik";
import { useState } from "react";
import LoginInput from "../../components/Input/LoginInput";
export default function Reset() {
  const { user } = useSelector((state) => ({ ...state }));
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

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
        <div className="reset_form">
          <div className="reset_form_header">Find Your Account</div>
          <div className="reset_form_text">
            Please enter your email address or mobile number to search your
            account.
          </div>
          <Formik enableReinitialize initialValues={{ email }}>
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email address or phone number"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && <div className="error_text">{error}</div>}
                <div className="reset_form_btns">
                  <Link to="/login" className="gray_btn">
                    Cancel
                  </Link>
                  <button type="submit" className="blue_btn">
                    Search
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
