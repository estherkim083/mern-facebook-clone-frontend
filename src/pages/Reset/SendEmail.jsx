import { Link } from "react-router-dom";
import axios from "axios";

export default function SendEmail({
  setVisible,
  setLoading,
  setError,
  userInfos,
  setUserInfos,
  error,
  loading,
  email,
}) {
  const sendEmail = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/sendResetPasswordCode`,
        { email }
      );
      setVisible(2);
      setError("");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
  };
  return (
    <div className="reset_form dynamic_height">
      <div className="reset_form_header">Reset Your Password</div>
      <div className="reset_grid">
        <div className="reset_left">
          <div className="reset_form_text">
            How do you want to receive the code to reset your password?
          </div>
          <label htmlFor="email" className="hover1">
            <input type="radio" name="" id="email" checked readOnly />
            <div className="label_col">
              <span>Send code via email</span>
              <span>{userInfos?.email}</span>
            </div>
          </label>
        </div>
        <div className="reset_right">
          <img src={userInfos?.picture} alt="" />
          <span>{userInfos?.email}</span>
          <span>Facebook user</span>
        </div>
      </div>
      {error && (
        <div className="error_text" style={{ padding: "10px" }}>
          {error}
        </div>
      )}
      <div className="reset_form_btns">
        <Link to="/login" className="gray_btn">
          Not You?
        </Link>
        <button onClick={() => sendEmail()} className="blue_btn">
          Continue
        </button>
      </div>
    </div>
  );
}
