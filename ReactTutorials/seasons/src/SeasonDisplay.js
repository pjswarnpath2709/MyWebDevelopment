import React from "react";
import "./SeasonDisplay.css";

const seasonConfig = {
  summer: {
    text: "Let's hit the beach",
    iconName: "sun",
  },
  winter: {
    text: "Burr , it is chilly",
    iconName: "snowflake",
  },
};
//? take out as much as logic possible , out of the component!!
//* logic to get string summer or winter according to latitude and month
const getSeason = function (lat, month) {
  if (month > 2 && month < 9) {
    return lat > 0 ? "summer" : "winter";
  } else {
    return lat > 0 ? "winter" : "summer";
  }
};

const SeasonDisplay = function (props) {
  const season = getSeason(props.lat, new Date().getMonth());
  const { text, iconName } = seasonConfig[season];
  return (
    <div className={`season-display ${season}`}>
      <i className={`icon-left ${iconName} massive  icon`}></i>
      <h1>{text}</h1>
      <i className={`icon-right ${iconName} massive icon`}></i>
    </div>
  );
};

export default SeasonDisplay;
