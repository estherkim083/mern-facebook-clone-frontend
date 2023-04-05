import React from "react";

export default function LeftLink({ img, text, notif }) {
  return (
    <div className="left_link">
      {img !== undefined && <img src={`/left/${img}.png`} alt="" />}
      {notif !== undefined ? (
        <div className="col">
          <div className="col_1">{text}</div>
          <div className="col_2">{notif}</div>
        </div>
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
}
