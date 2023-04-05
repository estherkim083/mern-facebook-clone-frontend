import { useState } from "react";
import "./style.css";
import axios from "axios";

export default function SendVerification({ user }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const setVerificationLink = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/sendverification`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  return (
    <div className="send_verification">
      <span>
        Your account is not verified, verify your account before is gets deleted
        after a month from creating.
      </span>
      <a
        onClick={() => {
          setVerificationLink();
        }}
      >
        Click here to resend verification
      </a>
      {success && <div className="success_text">{success}</div>}
      {error && <div className="error_text">{error}</div>}
    </div>
  );
}
