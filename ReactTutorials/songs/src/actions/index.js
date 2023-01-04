//? Action creator
export const selectSong = (song) => {
  //* Return an Plain Action Object
  return {
    type: "SONG_SELECTED",
    payload: song,
  };
};
