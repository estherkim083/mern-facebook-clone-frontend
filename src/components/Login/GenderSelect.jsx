import React from "react";
import { useMediaQuery } from "react-responsive";

export default function GenderSelect({
  genderError,
  handleRegisterChange,
  setFieldValue,
}) {
  const view1 = useMediaQuery({ query: "(min-width: 655px) " });
  const view2 = useMediaQuery({ query: "(min-width: 850px) " });
  const view3 = useMediaQuery({ query: "(min-width: 1170px) " });
  return (
    <div
      className="reg_grid"
      style={{ marginBottom: `${genderError && !view3 ? "90px" : "0px"}` }}
    >
      <label htmlFor="male">
        Male
        <input
          type="radio"
          name="gender"
          id="male"
          value="male"
          onChange={(e) => handleRegisterChange(e, setFieldValue)}
        />
      </label>
      <label htmlFor="female">
        Female
        <input
          type="radio"
          name="gender"
          id="female"
          value="female"
          onChange={(e) => handleRegisterChange(e, setFieldValue)}
        />
      </label>
      <label htmlFor="custom">
        Custom
        <input
          type="radio"
          name="gender"
          id="custom"
          value="custom"
          onChange={(e) => handleRegisterChange(e, setFieldValue)}
        />
      </label>
      {genderError && (
        <div
          className={!view3 ? "input_error" : "input_error input_error_select"}
        >
          <div
            className={!view3 ? "error_arrow_bottom" : "error_arrow_right"}
          ></div>
          {genderError}
        </div>
      )}
    </div>
  );
}
