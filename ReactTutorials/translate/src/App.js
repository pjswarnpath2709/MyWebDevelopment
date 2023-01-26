import React, { useState } from "react";
import "./App.css";
import UserCreate from "./components/UserCreate";
import { LanguageStore } from "./contexts/LanguageContext";
import ColorContext from "./contexts/ColorContext";
import LanguageSelector from "./components/LanguageSelector";

function App() {
  return (
    <div className="ui container">
      <LanguageStore>
        <LanguageSelector />
        <ColorContext.Provider value={"red"}>
          <UserCreate />
        </ColorContext.Provider>
      </LanguageStore>
    </div>
  );
}

export default App;
