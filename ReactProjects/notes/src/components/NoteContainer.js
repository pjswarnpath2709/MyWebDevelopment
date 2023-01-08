import React from "react";
import Note from "./Note";
import "./NoteContainer.css";
function NoteContainer({ notes, deleteNote, updateText }) {
  const revArray = (arr) => {
    const temp = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      temp.push(arr[i]);
    }
    return temp;
  };
  return (
    <div className="note-container">
      <h2>Notes</h2>
      <div className="note-container_notes  custom-scroll">
        {notes.length > 0 ? (
          revArray(notes).map((note, index) => {
            return (
              <div key={note.id}>
                <Note
                  note={note}
                  deleteNote={deleteNote}
                  updateText={updateText}
                />
              </div>
            );
          })
        ) : (
          <div>
            <h3>No notes added yet</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteContainer;
