import React from "react";
import "./PostsCard.css";
import heart from "../../images/heart.png";
import heartRed from "../../images/redHeart.png";
import chat from "../../images/chat.png";
import { useState } from "react";
// src="https://cdn-icons-png.flaticon.com/512/2589/2589197.png"

const PostsCard = (props) => {
  const [active, setActive] = useState(false);

  const changeColor = () => {
    setActive(!active);
  };
  return (
    <div className="postsCard ">
      <div className="postsCard-header">
        <div className="header-icon h-100 d-flex align-items-center p-1">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140061.png"
            className="h-75 d-flex ms-2"
          ></img>
          <div className="d-flex align-items-center f-3 ms-2 fs-3">Name</div>
        </div>
      </div>
      <div className="postsCard-post">
        <img
          src="https://images.unsplash.com/photo-1516381093400-a0fecb601de2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          className="h-100 w-100 img-fluid"
        ></img>
      </div>
      <div></div>
      <div className="postsCard-footer">
        <div className="footer-like active">
          <img
            src={!active ? heart : heartRed}
            className="p-1 "
            onClick={() => changeColor()}
          ></img>
        </div>
        <div className="footer-comment">
          <img
            src={chat}
            className="p-1"
            onClick={() => {
              //props.setCurrentPost(postId);
            }}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default PostsCard;
