import React from "react";

const AddComment = () => {
  return (
    <div>
      <div className="fs-3 ms-1">Comments</div>
      <div className="d-flex">
        <img
          src="https://cdn-icons-png.flaticon.com/128/236/236832.png"
          className="d-flex m-2"
          style={{ height: "2rem", width: "2rem" }}
        ></img>
        <form className="d-flex flex-grow-1">
          <input
            className=" flex-grow-1 rounded-pill d-flex align-items-center justify-content-start p-2 border-pill"
            placeholder="Add a comment..."
          ></input>
        </form>
      </div>
    </div>
  );
};

export default AddComment;
