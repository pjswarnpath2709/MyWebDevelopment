import { combineReducers } from "redux";
const songsReducer = () => {
  return [
    { title: "Hey Baby", duration: "4:05" },
    { title: "Baby Calm Down!", duration: "3:04" },
    { title: "See You Again", duration: "4:00" },
    { title: "Don Omar", duration: "3:10" },
    { title: "Mercy", duration: "5:09" },
  ];
};

const selectedSongReducer = (selectedSong = null, action) => {
  if (action.type === "SONG_SELECTED") {
    return action.payload;
  }
  return selectedSong;
};

export default combineReducers({
  songs: songsReducer,
  selectedSong: selectedSongReducer,
});
