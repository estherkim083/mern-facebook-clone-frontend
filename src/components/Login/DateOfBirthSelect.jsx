import React from "react";
import { useMediaQuery } from "react-responsive";

export default function DateOfBirthSelect({
  bDay,
  bMonth,
  bYear,
  days,
  months,
  years,
  handleRegisterChange,
  dateError,
  setFieldValue,
}) {
  const view1 = useMediaQuery({ query: "(min-width: 655px) " });
  const view2 = useMediaQuery({ query: "(min-width: 850px) " });
  const view3 = useMediaQuery({ query: "(min-width: 1170px) " });
  return (
    <div
      className="reg_grid"
      style={{ marginBottom: `${dateError && !view3 ? "90px" : "0px"}` }}
    >
      <select
        name="bDay"
        value={bDay}
        onChange={(e) => handleRegisterChange(e, setFieldValue)}
      >
        {days.map((day, i) => (
          <option value={day} key={i}>
            {day}
          </option>
        ))}
      </select>
      <select
        name="bMonth"
        value={bMonth}
        onChange={(e) => handleRegisterChange(e, setFieldValue)}
      >
        {months.map((month, i) => (
          <option key={i} value={month}>
            {month}
          </option>
        ))}
      </select>
      <select
        name="bYear"
        value={bYear}
        onChange={(e) => handleRegisterChange(e, setFieldValue)}
      >
        {years.map((year, i) => (
          <option key={i} value={year}>
            {year}
          </option>
        ))}
      </select>
      {dateError && (
        <div
          className={!view3 ? "input_error" : "input_error input_error_select"}
        >
          <div
            className={!view3 ? "error_arrow_bottom" : "error_arrow_right"}
          ></div>
          {dateError}
        </div>
      )}
    </div>
  );
}
