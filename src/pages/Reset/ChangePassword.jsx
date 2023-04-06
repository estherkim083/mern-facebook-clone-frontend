import React from "react";
import LoginInput from "../../components/Input/LoginInput";
import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

export default function ChangePassword({
  setConf_Password,
  setPassword,
  password,
  conf_password,
  error,
  setLoading,
  setError,
  userInfos,
}) {
  const validatePassword = Yup.object({
    password: Yup.string()
      .required("Password required !")
      .min(4, "Password must be at least 4 characters")
      .max(10, "Password must be at most 10 characters"),
    conf_password: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Password must match"),
  });
  const { email } = userInfos;
  const navigate = useNavigate();
  const changePassword = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/changePassword`,
        {
          email,
          password,
        }
      );
      setError("");

      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
  };
  return (
    <div className="reset_form" style={{ height: "320px" }}>
      <div className="reset_form_header">Change Password</div>
      <div className="reset_form_text">Pick a strong password</div>
      <Formik
        enableReinitialize
        validationSchema={validatePassword}
        initialValues={{ password, conf_password }}
        onSubmit={() => changePassword()}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="password"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <LoginInput
              type="text"
              name="conf_password"
              placeholder="Confirm New Password"
              onChange={(e) => setConf_Password(e.target.value)}
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
