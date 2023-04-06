import React from "react";
import LoginInput from "../../components/Input/LoginInput";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

export default function CodeVerification({
  setLoading,
  code,
  setCode,
  error,
  setError,
  loading,
  setVisible,
  userInfos,
}) {
  const validateCode = Yup.object({
    code: Yup.string()
      .required("Code is required")
      .min("5", "at least 5 chars"),
  });
  const verifyCode = async () => {
    try {
      setLoading(true);
      const { email } = userInfos;

      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/validateResetCode`,
        { email, code }
      );
      setError("");
      setVisible(3);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
  };
  return (
    <div className="reset_form">
      <div className="reset_form_header">Code Verification</div>
      <div className="reset_form_text">
        Please enter your email address or mobile number to search your account.
      </div>
      <Formik
        enableReinitialize
        initialValues={{ code }}
        validationSchema={validateCode}
        onSubmit={() => verifyCode()}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="code"
              placeholder="Code"
              onChange={(e) => setCode(e.target.value)}
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
