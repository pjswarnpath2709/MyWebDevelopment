import React, { useState } from "react";

const Context = React.createContext("hindi");

export const LanguageStore = (props) => {
  const [language, setLanguage] = useState("english");

  const onLanguageChange = (newLan) => {
    setLanguage(newLan);
  };

  return (
    <Context.Provider
      value={{
        language,
        onLanguageChange,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Context;
