import React from "react";
import "./Chip.css";
import { X } from "react-feather";

const Chip = ({ text, close, color, onClose }) => {
  return (
    <div className="chip" style={{ backgroundColor: color }}>
      {text}
      {close && <X onClick={() => (onClose ? onClose() : "")} />}
    </div>
  );
};

export default Chip;
