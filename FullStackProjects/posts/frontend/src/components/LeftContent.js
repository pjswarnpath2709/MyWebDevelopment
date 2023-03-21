import React from "react";
import UserInfo from "./UserInfo";
import AddPost from "./AddPost";
import Modal from "./Modal";

const LeftContent = () => {
  return (
    <div className="d-flex flex-column vh-100 gap-2" style={{ width: "25rem" }}>
      <UserInfo />
      <AddPost />
      <Modal />
    </div>
  );
};

export default LeftContent;
