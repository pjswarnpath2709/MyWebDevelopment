import React from "react";
import Comment from "./Comment";

const CommentsArray = () => {
  return (
    <div className="scrollbar">
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
};

export default CommentsArray;
