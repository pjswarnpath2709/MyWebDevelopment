import React from "react";
import "./Note.css";
import deleteIcon from "../assets/delete.svg";
import moment from "moment";

function Note(props) {
  const formatTime = (value) => {
    if (!value) return "";
    return moment(value).format("MMMM Do YYYY, h:mm:ss a");
  };

  //////-------------------------------------------------------------------------------------------------------------------------------//////
  let timer = 500,
    timeout;
  const debounce = (func) => {
    clearTimeout(timeout);
    timeout = setTimeout(func, timer);
  };

  const updateText = (id, text) => {
    debounce(() => props.updateText(id, text));
  };

  //////-------------------------------------------------------------------------------------------------------------------------------//////

  return (
    <div className="note" style={{ backgroundColor: props.note.color }}>
      <textarea
        className="note_text custom-scroll"
        defaultValue={props.note.text}
        onChange={(e) => updateText(props.note.id, e.target.value)}
      ></textarea>
      <div className="note_footer">
        <p className="note_time">{formatTime(props.note.note_time)}</p>
        <img
          src={deleteIcon}
          alt="delete"
          onClick={() => props.deleteNote(props.note.id)}
        />
      </div>
    </div>
  );
}

export default Note;
