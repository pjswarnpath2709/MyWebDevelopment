import React from "react";
import LanguageContext from "../contexts/LanguageContext";

const Field = () => {
  // "english" ? "Name" : ;
  return (
    <div className="ui field">
      <LanguageContext.Consumer>
        {({ language }) => {
          return language === "english" ? "Name" : "नाम";
        }}
      </LanguageContext.Consumer>
      <input type={"text"} />
    </div>
  );
};

export default Field;
