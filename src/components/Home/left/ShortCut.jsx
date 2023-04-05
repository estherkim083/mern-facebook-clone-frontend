import React from "react";

export default function ShortCut({ link, img, name }) {
  return (
    <a href={link} rel="noreferrer" className="shortcut_item" target="_blank">
      <img src={img} alt="" />
      <span>{name}</span>
    </a>
  );
}
