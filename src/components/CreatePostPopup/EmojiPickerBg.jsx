import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";

export default function EmojiPickerBg({ type2, text, setText, user }) {
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);

  const textRef = useRef(null);
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  const handleEmoji = ({ emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };
  return (
    <div className={`${type2 ? "images_input" : ""}`}>
      <div className={`${!type2 ? "flex_center" : ""}`}>
        <textarea
          ref={textRef}
          maxLength={100}
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
              type2 ? "movepicker2" : "rlmove"
            }`}
          >
            <EmojiPicker
              emojiStyle="twitter"
              onEmojiClick={(emojiObject) => handleEmoji(emojiObject)}
            />
          </div>
        )}
        {!type2 && <img src="../../../icons/colorful.png" alt="" />}
        <i
          className={`emoji_icon_large ${type2 ? "moveleft" : ""}`}
          onClick={() => setPicker(!picker)}
        ></i>
      </div>
    </div>
  );
}
