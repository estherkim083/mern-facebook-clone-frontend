import "emoji-picker-element";
import React, { useEffect, useRef, useState } from "react";

export default function EmojiPickerBg({
  background,
  setBackground,
  type2,
  text,
  setText,
  user,
}) {
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [showBg, setShowBg] = useState(false);

  const textRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    if (picker) {
      document
        .querySelector("emoji-picker")
        .addEventListener("emoji-click", (event) =>
          handleEmoji(event.detail.unicode)
        );
    }
  }, [picker]);
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  const handleEmoji = (emoji) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };
  const postBackgrounds = [
    "../../../public/images/postbackgrounds/1.jpg",
    "../../../public/images/postbackgrounds/2.jpg",
    "../../../public/images/postbackgrounds/3.jpg",
    "../../../public/images/postbackgrounds/4.jpg",
    "../../../public/images/postbackgrounds/5.jpg",
    "../../../public/images/postbackgrounds/6.jpg",
    "../../../public/images/postbackgrounds/7.jpg",
    "../../../public/images/postbackgrounds/8.jpg",
    "../../../public/images/postbackgrounds/9.jpg",
  ];
  const backgroundHandler = (i) => {
    bgRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;
    setBackground(postBackgrounds[i]);
    bgRef.current.classList.add("bgHandler");
  };
  const removeBg = () => {
    bgRef.current.style.backgroundImage = "";
    setBackground("");
    bgRef.current.classList.remove("bgHandler");
    setShowBg(false);
  };
  return (
    <div className={`${type2 ? "images_input" : ""}`}>
      <div className={`${!type2 ? "flex_center" : ""}`} ref={bgRef}>
        <textarea
          ref={textRef}
          maxLength="250"
          style={{
            paddingTop: `${
              background
                ? Math.abs(textRef.current.value.length * 0.1 - 34)
                : "0"
            }%`,
          }}
          value={text}
          className={`post_input ${type2 ? "input2" : ""}`}
          onChange={(e) => setText(e.target.value)}
          placeholder={`What's on your mind, ${user?.first_name}?`}
        ></textarea>
      </div>
      <div className={`${!type2 ? "post_emojis_wrap" : ""}`}>
        {picker && (
          <div
            className={`comment_emoji_picker ${
              type2 ? "movepicker2" : showBg ? "rlmove2" : "rlmove"
            }`}
          >
            <emoji-picker></emoji-picker>
          </div>
        )}
        {!type2 && (
          <img
            src="../../../public/icons/colorful.png"
            onClick={() => {
              setShowBg((prev) => !prev);
            }}
            alt=""
          />
        )}
        {!type2 && showBg && (
          <div className="post_backgrounds">
            <div
              className="no_bg"
              onClick={() => {
                removeBg();
              }}
            ></div>
            {postBackgrounds.map((bg, i) => (
              <img
                src={bg}
                key={i}
                alt=""
                onClick={() => {
                  backgroundHandler(i);
                }}
              />
            ))}
          </div>
        )}
        <i
          className={`emoji_icon_large ${type2 ? "moveleft" : ""}`}
          onClick={() => setPicker(!picker)}
        ></i>
      </div>
    </div>
  );
}
