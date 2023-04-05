import React, { useState } from "react";
import "./style.css";
import LeftLink from "./LeftLink";
import { left } from "../../../data/home";
import { Link } from "react-router-dom";
import { ArrowDown1 } from "../../../svg";
import ShortCut from "./ShortCut";
export default function LeftHome({ user }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="left_home scrollbar">
      <Link to="/profile" className="left_link hover1">
        <img src={user?.picture} alt="" />
        <span>
          {user?.first_name} {user?.last_name}
        </span>
      </Link>
      {left.slice(0, 8).map((link, i) => (
        <LeftLink
          key={i}
          img={link.img}
          text={link.text}
          notif={link.notification}
        />
      ))}
      {!visible && (
        <div
          className="left_link hover1"
          onClick={() => {
            setVisible(true);
          }}
        >
          <div className="small_circle">
            <ArrowDown1 />
          </div>
          <span>See more</span>
        </div>
      )}
      {visible && (
        <>
          <div className="more_left">
            {left.slice(8, left.length).map((link, i) => (
              <LeftLink
                key={i}
                img={link.img}
                text={link.text}
                notif={link.notification}
              />
            ))}
          </div>
          <div
            className="left_link hover1"
            onClick={() => {
              setVisible(false);
            }}
          >
            <div className="small_circle rotate360">
              <ArrowDown1 />
            </div>
            <span>Show less</span>
          </div>
        </>
      )}
      <div className="splitter"></div>
      <div className="shortcut">
        <div className="heading">Your ShortCuts</div>
        <div className="edit_shortcut">Edit</div>
      </div>
      <div className="shortcut_list">
        <ShortCut
          name="My Youtube channel"
          link=""
          img="../../images/ytb.png"
        />
        <ShortCut name="My Instagram" link="" img="../../images/insta.png" />
      </div>
      <div className={`fb_copyright ${visible && "relative_fb_copyright"}`}>
        <Link to="/">Privacy </Link>
        <span>.</span>
        <Link to="/">Terms </Link>
        <span>.</span>
        <Link to="/">Advertising </Link>
        <span>.</span>
        <Link to="/">
          Ad Choices <i className="ad_choices_icon"></i>
        </Link>
        <span>.</span>
        <Link to="/">Cookies </Link>
        <span>.</span>
        <Link to="/">More </Link>
        <span>.</span>
        <br />
        &copy; Meta 2023
      </div>
    </div>
  );
}
