import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ options, selected, onSelectedChange, label }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };
    document.body.addEventListener("click", onBodyClick);
    //? when the component is not shown this function is called automatically
    return () => {
      if (onBodyClick) {
        document.body.removeEventListener("click", onBodyClick);
      }
    };
  }, []);

  const renderOptions = options.map((option) => {
    if (option.value === selected.value) {
      return null;
    }

    return (
      <div
        key={option.value}
        className="item"
        onClick={() => {
          onSelectedChange(option);
        }}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div className="ui container" ref={ref}>
      <div className="ui form">
        <div className="field">
          <label className="label">{label}</label>
          <div
            className={`ui selection dropdown ${open ? "visible active" : ""}`}
            onClick={() => {
              setOpen(!open);
            }}
          >
            <i className="dropdown icon"></i>
            <div className="text">{selected.label}</div>
            <div className={`menu ${open ? "visible transition" : ""}`}>
              {renderOptions}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
