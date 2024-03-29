import React, { useState } from "react";

import "./Sidebar.css";
import plusIcon from "../assets/plus.png";

function Sidebar(props) {
  const colors = ["#fe9b72", "#fec971", " #00d4fe", "#b693fd", "#e4ee91"];

  const [listOpen, setListOpen] = useState(false);
  return (
    <div className="sidebar">
      <img src={plusIcon} alt="add" onClick={() => setListOpen(!listOpen)} />
      <ul className={`sidebar_list ${listOpen ? "sidebar_list_active" : ""}`}>
        {colors.map((color) => {
          return (
            <li
              key={color}
              className="sidebar_list_item"
              style={{
                backgroundColor: color,
              }}
              onClick={() => props.addNote(color)}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
