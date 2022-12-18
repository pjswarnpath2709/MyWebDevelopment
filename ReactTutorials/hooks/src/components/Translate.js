import React, { useState } from "react";
import Dropdown from "./Dropdown";
import Convert from "./Convert";
const options = [
  {
    label: "Afrikaans",
    value: "af",
  },
  {
    label: "Arabic",
    value: "ar",
  },
  {
    label: "Hindi",
    value: "hi",
  },
  {
    label: "Dutch",
    value: "nl",
  },
  {
    label: "Chinese (Traditional)",
    value: "zh-TW",
  },
  {
    label: "Chinese (Simplified)",
    value: "zh-CN",
  },
  {
    label: "Japanese",
    value: "ja",
  },
];
const Translate = () => {
  const [language, setLanguage] = useState(options[0]);
  const [text, setText] = useState("");
  return (
    <div className="ui container">
      <div className="ui form ">
        <div className="field">
          <label className="">Enter Text</label>
          <input
            value={text}
            onChange={(event) => {
              setText(event.target.value);
            }}
          ></input>
        </div>
      </div>

      <Dropdown
        label="Select a language"
        selected={language}
        onSelectedChange={setLanguage}
        options={options}
      />
      <hr />
      <h3 className="ui header">Output</h3>
      <Convert text={text} language={language} />
    </div>
  );
};

export default Translate;
