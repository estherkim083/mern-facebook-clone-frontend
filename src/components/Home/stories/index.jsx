import React from "react";
import "./style.css";
import { ArrowRight, Plus } from "../../../svg";
import { stories } from "../../../data/home";
import Story from "./Story";
import { useMediaQuery } from "react-responsive";

export default function Stories() {
  const query1 = useMediaQuery({ query: "(max-width: 1175px)" });
  const query2 = useMediaQuery({ query: "(max-width: 960px)" });
  const max = query2 ? 4 : query1 ? 5 : stories.length;

  return (
    <div className="stories">
      <div className="create_story_card">
        <img
          className="story_img"
          src="../../../images/default_pic.png"
          alt=""
        />
        <div className="plus_story">
          <Plus color="#fff" />
        </div>
        <div className="story_create_text">Create Story</div>
      </div>
      {stories.slice(0, max).map((story, i) => (
        <Story key={i} story={story} />
      ))}
      <div className="white_circle">
        <ArrowRight color="#64676b" />
      </div>
    </div>
  );
}
