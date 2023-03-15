import {  useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);

  //Fetch All notes
  const fetchNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetch-all-notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMDg3NjQwNTIxMjVmODAwZDJhNzg3In0sImlhdCI6MTY3Nzc1NjMzNX0.Ds3c4c3Y2l84gHQ1494_A8-kPXZmpRfnbux9478j1mc",
      },
    });
    const json = await response.json();
    setNotes(json);
    console.log("fetched")
  };

  


  // Add a Note
  const addNote = async (title, description, tag) => {
    const url = `${host}/api/notes/add-note`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMDg3NjQwNTIxMjVmODAwZDJhNzg3In0sImlhdCI6MTY3Nzc1NjMzNX0.Ds3c4c3Y2l84gHQ1494_A8-kPXZmpRfnbux9478j1mc",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    fetchNotes();
    console.log("Submitted");
  };

  //Delete a Note
  const deleteNote = async (id) => {
    const url = `${host}/api/notes/delete-note/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMDg3NjQwNTIxMjVmODAwZDJhNzg3In0sImlhdCI6MTY3Nzc1NjMzNX0.Ds3c4c3Y2l84gHQ1494_A8-kPXZmpRfnbux9478j1mc",
      },
    });
    await response.json();
    // Filter the notes by id and remove that from the notes
    const newNote = notes.filter((notes) => {
      return notes._id !== id;
    });
    setNotes(newNote);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    const url = `${host}/api/notes/update-note/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMDg3NjQwNTIxMjVmODAwZDJhNzg3In0sImlhdCI6MTY3Nzc1NjMzNX0.Ds3c4c3Y2l84gHQ1494_A8-kPXZmpRfnbux9478j1mc",
      },
      body: JSON.stringify({
        title:title,
        description:description,
        tag:tag
      }),
    });
    await response.json();

    // for (let i = 0; i < notes.length; i++) {
    //   const element = notes[i];
    //   if (element._id === id) {
    //     element.title = title;
    //     element.description = description;
    //     element.tag = tag;
    //   }
    // }
  };

  return (
    <NoteContext.Provider value={{ notes,fetchNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
