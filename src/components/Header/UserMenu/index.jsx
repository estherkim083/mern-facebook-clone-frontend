import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Settings from "./Settings";
import HelpSupport from "./HelpSupport";
import DisplayAccessibiliy from "./DisplayAccessibiliy";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

export default function UserMenu({ user }) {
  const [visible, setVisible] = useState(0);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = async () => {
    Cookies.set("user", "");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <div className="menu">
      {visible === 0 && (
        <>
          <Link className="menu_header hover3" to="/profile">
            <img src={user?.picture} alt="" />
            <div className="menu_col">
              <span>
                {user?.first_name}
                {user?.last_name}
              </span>
              <span>See your profile</span>
            </div>
          </Link>
          <div className="menu_splitter"></div>
          <div className="menu_main hover3">
            <div className="small_circle">
              <i className="report_filled_icon"></i>
            </div>
            <div className="menu_col">
              <div className="menu_span1">Give Feedback</div>
              <div className="menu_span2">Help us improve facebook</div>
            </div>
          </div>
          <div className="menu_splitter"></div>
          <div
            className="menu_item hover3"
            onClick={() => {
              setVisible(1);
            }}
          >
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
            <span>Settings & privacy</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          <div
            className="menu_item hover3"
            onClick={() => {
              setVisible(2);
            }}
          >
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
            <span>Help & Support</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          <div
            className="menu_item hover3"
            onClick={() => {
              setVisible(3);
            }}
          >
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
            <span>Display & Accessibility</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          <div
            className="menu_item hover3"
            onClick={() => {
              logout();
            }}
          >
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
            <span>Logout</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
        </>
      )}
      {visible === 1 && <Settings setVisible={setVisible} />}
      {visible === 2 && <HelpSupport setVisible={setVisible} />}
      {visible === 3 && <DisplayAccessibiliy setVisible={setVisible} />}
    </div>
  );
}
