import React from "react";
import AddButton from "../images/add.png";

const AddPost = () => {
  return (
    <button
      className="rounded-3 btn btn-primary"
      style={{ height: "3rem", width: "13rem" }}
    >
      <div className="d-flex align-items-center">
        <img
          src={AddButton}
          className="m-2"
          style={{ width: "1rem", height: "1rem" }}
        />
        <div className="fs-5 d-flex align-items-center">Create post</div>
      </div>
    </button>
  );
};

export default AddPost;
