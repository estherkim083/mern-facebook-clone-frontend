import "./style.css";
import { ErrorMessage, useField } from "formik";
import { useMediaQuery } from "react-responsive";

export default function LoginInput({ placeholder, bottom, ...props }) {
  const [field, meta] = useField(props);
  const desktopView = useMediaQuery({ query: "(min-width: 850px) " });

  const errorClassName = desktopView
    ? "input_error input_error_desktop"
    : "input_error";
  const arrowClassName = desktopView
    ? "error_arrow_right"
    : bottom
    ? "error_arrow_bottom"
    : "error_arrow_top";
  const inputClassName = meta.touched && meta.error ? "inputerror_border" : "";

  return (
    <div className="input_wrap">
      {meta.touched && meta.error && !bottom && (
        <div className={errorClassName}>
          <ErrorMessage name={field.name} />
          <div className={arrowClassName}></div>
        </div>
      )}
      <input
        className={inputClassName}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && bottom && (
        <div className={errorClassName}>
          <ErrorMessage name={field.name} />
          <div className={arrowClassName}></div>
        </div>
      )}
      {meta.touched && meta.error && (
        <i
          className="error_icon"
          style={{ top: `${!bottom && !desktopView ? "70%" : "15px"}` }}
        ></i>
      )}
    </div>
  );
}
