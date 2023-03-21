import React from "react";
import AddComment from "./AddComment";
import CommentsArray from "./CommentsArray";

const RightContent = () => {
  return (
    <div
      className=" d-flex flex-column gap-2 rounded-4 shadow p-3 mb-5 bg-body mt-3 border border-danger"
      style={{ width: "25rem", height: "31rem" }}
    >
      <AddComment />
      <CommentsArray />
    </div>
  );
};

export default RightContent;
