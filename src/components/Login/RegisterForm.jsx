import { Formik, Form } from "formik";
import React, { useState } from "react";
import RegisterInput from "../Input/RegisterInput";
import * as Yup from "yup";
import DateOfBirthSelect from "./DateOfBirthSelect";
import GenderSelect from "./GenderSelect";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function _calculateAge(birthday) {
  // birthday is a date
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
export default function RegisterForm({ setVisible }) {
  const navigate = useNavigate();
  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  };
  const [user, setUser] = useState(userInfos);
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = userInfos;
  const yearTemp = new Date().getFullYear();

  const handleRegisterChange = (e, setFieldValue) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
    setUser({ ...user, [name]: value });
  };

  const years = Array.from(new Array(108), (val, index) => yearTemp - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

  const registerValidation = Yup.object().shape({
    first_name: Yup.string()
      .required("What's your first name?")
      .min(2, "First Name must be at least 2 characters")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed"),
    last_name: Yup.string().required("What's your last name?"),
    email: Yup.string()
      .required("Email required !")
      .email("Enter a valid email address"),
    password: Yup.string()
      .required("Password required !")
      .min(4, "Password must be at least 4 characters")
      .max(10, "Password must be at most 10 characters"),
  });
  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const registerSubmit = async () => {
    try {
      const {
        first_name,
        last_name,
        email,
        password,
        bYear,
        bMonth,
        bDay,
        gender,
      } = user;
      let err_message = "";
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/register`,
        {
          first_name,
          last_name,
          email,
          password,
          bYear,
          bMonth,
          bDay,
          gender,
        }
      );
      setError("");
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: rest });
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 2000);
    } catch (err) {
      setLoading(false);
      setSuccess("");
      setError(err.response.data.message);
    }
  };
  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon" onClick={() => setVisible(false)}></i>
          <span>Sign up</span>
          <span>It's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let picked_date = new Date(user.bYear, user.bMonth - 1, user.bDay);
            console.log(picked_date);
            const age = _calculateAge(picked_date);
            if (age < 14) {
              console.log("you are not 14.");
              setDateError("you are not 14.");
              return;
            } else if (age > 70) {
              setDateError("you are more than 70");
              console.log("you are more than 70");
              return;
            } else {
              setDateError("");
            }
            if (user.gender === "") {
              setGenderError("Gender is empty. Please choose a gender");
              return;
            } else {
              //submit
              console.log("remove gender error");
              setGenderError("");
            }
            registerSubmit();
          }}
        >
          {({ setFieldValue }) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  onChange={(e) => handleRegisterChange(e, setFieldValue)}
                />
                <RegisterInput
                  type="text"
                  placeholder="Last Name"
                  name="last_name"
                  onChange={(e) => handleRegisterChange(e, setFieldValue)}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="email"
                  placeholder="Mobile Number or email address"
                  name="email"
                  onChange={(e) => handleRegisterChange(e, setFieldValue)}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="password"
                  placeholder="New Password"
                  name="password"
                  onChange={(e) => handleRegisterChange(e, setFieldValue)}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Date Of Birth <i className="info_icon"></i>
                </div>
                <DateOfBirthSelect
                  bDay={user.bDay}
                  bMonth={user.bMonth}
                  bYear={user.bYear}
                  days={days}
                  months={months}
                  years={years}
                  handleRegisterChange={handleRegisterChange}
                  dateError={dateError}
                  setFieldValue={setFieldValue}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender<i className="info_icon"></i>
                </div>
                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                  setFieldValue={setFieldValue}
                />
              </div>
              <div className="reg_infos">
                By clicking signup , you agree to our &nbsp;{" "}
                <span> Terms , Data Policy</span>
                and <span>Cookie Policy</span>. You may receive SMS
                notifications from us and can opt out at any time.
              </div>
              <div className="reg_btn_wrapper">
                <button className="open_signup" type="submit">
                  Sign Up
                </button>
              </div>
              <DotLoader color="#1876f2" loading={loading} size={30} />
              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
