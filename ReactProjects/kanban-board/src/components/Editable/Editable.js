import React, { useState } from "react";
import "./Editable.css";
import { X } from "react-feather";
const Editable = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [inputValue, setInputValue] = useState(props.defaultText ?? "");
  const showForm = () => {
    return (
      <form
        className={`editable_edit ${props.editClass ?? ""}`}
        onSubmit={(e) => {
          e.preventDefault();
          if (props.onSubmit) {
            props.onSubmit(inputValue);
          }
          setInputValue("");
          setShowEdit(false);
        }}
      >
        <input
          autoFocus
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={props.placeholder ?? "Enter Item..."}
        />
        <div className="editable_edit_footer">
          <button type="submit">{props.buttonText ?? "Submit"}</button>
          <X onClick={() => setShowEdit(false)} />
        </div>
      </form>
    );
  };

  const showAddCard = () => {
    return (
      <p
        className={`editable_display ${props.displayClass ?? ""}`}
        onClick={() => setShowEdit(true)}
      >
        {props.text ?? "Add"}
      </p>
    );
  };
  return (
    <div className="editable">{showEdit ? showForm() : showAddCard()}</div>
  );
};

export default Editable;
