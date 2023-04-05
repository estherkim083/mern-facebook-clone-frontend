import "./style.css";
import { ErrorMessage, useField } from "formik";
import { useMediaQuery } from "react-responsive";

export default function RegisterInput({ placeholder, bottom, ...props }) {
  const [field, meta] = useField(props);
  const view1 = useMediaQuery({ query: "(min-width: 655px) " });
  const view2 = useMediaQuery({ query: "(min-width: 850px) " });
  const view3 = useMediaQuery({ query: "(min-width: 1170px) " });
  const test1 = view3 && field.name === "first_name";
  const test2 = view3 && field.name === "last_name";

  return (
    <div className="input_wrap register_input_wrap">
      <input
        className={meta.touched && meta.error ? "inputerror_border" : ""}
        style={{
          width: `${
            view1 && (field.name === "first_name" || field.name === "last_name")
              ? "100%"
              : view1 && (field.name === "email" || field.name === "password")
              ? "370px"
              : "330px"
          }`,
        }}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <div
          className={view3 ? "input_error input_error_desktop" : "input_error"}
          style={{
            transform: "translateY(2px)",
            left: `${test1 ? "-107%" : test2 ? "107%" : ""}`,
          }}
        >
          <ErrorMessage name={field.name} />
          <div
            className={
              !view3
                ? "error_arrow_bottom"
                : view3 &&
                  (field.name === "last_name"
                    ? "error_arrow_left"
                    : "error_arrow_right")
            }
          ></div>
        </div>
      )}
      {meta.touched && meta.error && <i className="error_icon"></i>}
    </div>
  );
}
