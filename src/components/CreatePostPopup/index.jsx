import { useEffect, useRef, useState } from "react";
import "./style.css";
import EmojiPicker from "emoji-picker-react";
import EmojiPickerBg from "./EmojiPickerBg";
import AddToYourPost from "./AddToYourPost";
import ImgPreview from "./ImgPreview";

export default function CreatePostPopup({ user }) {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(true);
  const [images, setImages] = useState([]);

  return (
    <div className="blur">
      <div className="postBox">
        <div className="box_header">
          <div className="small_circle">
            <i className="exit_icon"></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className="box_profile">
          <img className="box_profile_img" src={user?.picture} alt="" />
          <div className="box_col">
            <div className="box_profile_name">
              {user?.first_name} {user?.last_name}
            </div>
            <div className="box_privacy">
              <img src="../../../icons/public.png" alt="" />
              <span>Public</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>
        {!showPrev ? (
          <>
            <EmojiPickerBg user={user} text={text} setText={setText} />
          </>
        ) : (
          <ImgPreview
            images={images}
            setImages={setImages}
            user={user}
            text={text}
            setText={setText}
            setShowPrev={setShowPrev}
          />
        )}
        <AddToYourPost setShowPrev={setShowPrev} />
        <button className="post_submit">Post</button>
      </div>
    </div>
  );
}
