import React, { useRef } from "react";
import EmojiPickerBg from "./EmojiPickerBg";

export default function ImgPreview({
  images,
  setImages,
  user,
  text,
  setText,
  setShowPrev,
  setError,
}) {
  const imgInputRef = useRef(null);

  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      if (
        img.type !== "image/jpeg" &&
        img.type !== "image/png" &&
        img.type !== "image/webp" &&
        img.type !== "image/gif"
      ) {
        setError(
          `${img.name} format is unsupported | only jpeg,png,webp,gif are allowed`
        );
        files = files.filter((item) => item.name != img.name);
        return;
      } else if (img.size > 1024) {
        setError(`${img.name} size is too large. maximum 5mb allowed`);
        files = files.filter((item) => item.name != img.name);
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readerEvent) => {
        setImages((images) => [...images, readerEvent.target.result]);
      };
    });
  };

  return (
    <div className="overflow_a scrollbar">
      <EmojiPickerBg type2 user={user} text={text} setText={setText} />
      <div className="add_pics_wrap">
        <input
          type="file"
          multiple
          hidden
          accept="image/jpeg,image/png,image/webp,image/gif"
          ref={imgInputRef}
          onChange={handleImages}
        />
        {images && images.length ? (
          <div className="add_pics_inside2 p0">
            <div className="preview_actions">
              <button className="hover1">
                <i className="edit_icon"></i>
                Edit
              </button>
              <button
                className="hover1"
                onClick={() => imgInputRef.current.click()}
              >
                <i className="addPhoto_icon"></i>
                Add Photos/Videos
              </button>
            </div>
            <div className="small_white_circle" onClick={() => setImages([])}>
              <i className="exit_icon"></i>
            </div>
            <div
              className={
                images.length === 1
                  ? "preview1"
                  : images.length === 2
                  ? "preview2"
                  : images.length === 3
                  ? "preview3"
                  : images.length === 4
                  ? "preview4"
                  : images.length === 5
                  ? "preview5"
                  : images.length % 2 === 0
                  ? "preview6"
                  : "preview6 singular_grid"
              }
            >
              {images.map((img, i) => (
                <img src={img} key={i} alt="" />
              ))}
            </div>
          </div>
        ) : (
          <div className="add_pics_inside1">
            <div
              className="small_white_circle"
              onClick={() => setShowPrev(false)}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className="add_col"
              onClick={() => imgInputRef.current.click()}
            >
              <div className="add_circle">
                <i className="add_photo_icon"></i>
              </div>
              <span>Add photos/ videos</span>
              <span>or drag and drop</span>
            </div>
          </div>
        )}
        <div className="add_pics_inside2">
          <div className="add_circle">
            <i className="phone_icon"></i>
          </div>
          <div className="mobile_text">Add photos from your mobile device.</div>
          <span className="addphone_btn">Add</span>
        </div>
      </div>
    </div>
  );
}
