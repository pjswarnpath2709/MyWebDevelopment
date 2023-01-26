import React from "react";
import LanguageContext from "../contexts/LanguageContext";
import ColorContext from "../contexts/ColorContext";

const Button = () => {
  const renderButton = (value) => {
    return (
      <button className={`ui button  ${value === "red" ? "red" : "primary"}`}>
        <LanguageContext.Consumer>
          {({ language }) => {
            return language === "english" ? "Submit" : "प्रस्तुत";
          }}
        </LanguageContext.Consumer>
      </button>
    );
  };
  return <ColorContext.Consumer>{renderButton}</ColorContext.Consumer>;
};

export default Button;
