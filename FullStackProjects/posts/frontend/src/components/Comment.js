import React, { useState } from "react";

const Comment = () => {
  return (
    <div className="d-flex p-1 align-items-center gap-3">
      <div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/727/727399.png"
          style={{ width: "2rem", height: "2rem" }}
        />
      </div>
      <div className="border border-danger rounded-3 w-100 d-flex flex-column">
        <div className="fs-5 ms-2">Tanya</div>
        <div
          className="fs-6 ms-2 p-2"
          //   rows={5}
          contentEditable="false"
          //   style={{ border: "none", outline: "none" }}
        >
          hs csjvcj cav bnxbBetween the boys, girls and the para-athlete races,
          there were 66 gold medals handed out this weekend at the OSAA swimming
          state championships at the Tualatin Hills Aquatic Center in Beaverton.
        </div>
        <div className="d-flex gap-3 ms-2 p-2">
          <a
            className="fw-bold text-decoration-none"
            style={{ cursor: "pointer" }}
          >
            Edit
          </a>
          <a
            className="fw-bold text-decoration-none text-danger"
            style={{ cursor: "pointer" }}
          >
            Delete
          </a>
        </div>
      </div>
    </div>
  );
};

export default Comment;
