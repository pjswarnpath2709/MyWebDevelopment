import React from "react";
import LanguageContext from "../contexts/LanguageContext";

const LanguageSelector = () => {
  const render = ({ onLanguageChange }) => {
    return (
      <div>
        Select a language:
        <i
          className="flag us"
          onClick={() => onLanguageChange("english")}
          style={{
            cursor: "pointer",
          }}
        />
        <i
          className="flag in"
          onClick={() => onLanguageChange("hindi")}
          style={{
            cursor: "pointer",
          }}
        />
      </div>
    );
  };
  return <LanguageContext.Consumer>{render}</LanguageContext.Consumer>;
};

export default LanguageSelector;
