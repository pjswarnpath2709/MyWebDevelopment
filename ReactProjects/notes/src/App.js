import React, { useEffect, useState } from "react";

import NoteContainer from "./components/NoteContainer";
import Sidebar from "./components/Sidebar";

import "./App.css";

const App = () => {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) ?? []
  );

  const onAddNote = (color) => {
    const tempNotes = [...notes];
    tempNotes.push({
      id: Date.now() + Math.floor(Math.random() * 1000) + color,
      text: "",
      note_time: Date.now(),
      color: color,
    });
    setNotes(tempNotes);
  };

  const onDeleteNote = (id) => {
    const tempNotes = [...notes];
    setNotes(tempNotes.filter((note) => note.id !== id));
  };

  const onUpdateText = (id, text) => {
    const tempNotes = [...notes];
    const index = tempNotes.findIndex((note) => note.id === id);
    if (index < 0) return;
    tempNotes[index].text = text;
    setNotes(tempNotes);
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="App">
      <Sidebar addNote={onAddNote} />
      <NoteContainer
        notes={notes}
        deleteNote={onDeleteNote}
        updateText={onUpdateText}
      />
    </div>
  );
};

export default App;
