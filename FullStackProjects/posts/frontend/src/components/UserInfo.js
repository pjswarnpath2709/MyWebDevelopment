import React from "react";
import AddPost from "./AddPost";

// https://cdn-icons-png.flaticon.com/512/4436/4436481.png  --green
// https://cdn-icons-png.flaticon.com/512/1828/1828843.png  --red

const UserInfo = () => {
  return (
    <div
      className=" bg-warning rounded-3 mt-2"
      style={{ height: "10rem", backgroundColor: "rgb(86, 181, 245" }}
    >
      <div
        className="d-flex flex-row rounded-3 justify-content-between"
        style={{ backgroundColor: "rgb(242, 241, 237)" }}
      >
        <div
          className="d-flex flex-row rounded-3"
          //   style={{ backgroundColor: "rgb(242, 241, 237)" }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/236/236832.png"
            className="d-flex m-2"
            style={{ height: "3rem", width: "3rem" }}
          ></img>
          <div className="d-flex align-items-center f-3 ms-2 fs-3">
            Pulkit Jain
          </div>
        </div>

        <div className="d-flex align-items-center ">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9426/9426997.png"
            className="d-flex align-items-center justify-content-center me-3"
            style={{ height: "1.5rem", width: "1.5rem" }}
          />
        </div>
      </div>
      <div className="d-flex flex-column">
        <div className="ms-2 d-flex align-items-center mt-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/10037/10037961.png"
            style={{ width: "2.5rem", height: "2.5rem" }}
          />
          <div className="">pjswarnpath@gmail.com</div>
        </div>
        <div className="ms-2 d-flex align-items-center mt-1">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3425/3425073.png"
            style={{ width: "2.5rem", height: "2.5rem" }}
          />
          <div>Jaipur,Rajasthan</div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
