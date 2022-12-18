import React from "react";

const CommentDetail = function (props) {
  return (
    <div className="comment">
      <a href="/" className="avatar">
        <img alt="avatar" src={props.imageUrl}></img>
      </a>
      <div className="content">
        <a href="/" className="author">
          {props.author}
        </a>

        <div className="metadata">
          <span className="date">{props.timeAgo}</span>
        </div>
        <div className="text">{props.commentContent}</div>
      </div>
    </div>
  );
};

export default CommentDetail;
