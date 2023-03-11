import React, {useContext, useState} from "react";
import noteContext from  "../context/Notes/NoteContext"


const AddNotes = () => {
    const context = useContext(noteContext)
    const {addNote} = context;
    const [notes, setNotes] = useState({title:"", description:"", tag:""})
    const handleSubmit = (e)=>{
      e.preventDefault();
      addNote(notes.title,notes.description,notes.tag)
    }
    const handleOnChange =(e)=>{
      setNotes({...notes, [e.target.name]:e.target.value})
    }
  return (
    <div>
      <div className="container my-3">
        <h1>Add Notes</h1>
        <form>
          <div className="form-group my-3">
            <label htmlFor="title" className="my-2">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              placeholder="Enter Title"
              onChange={handleOnChange}

            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="description" className="my-2">Notes</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              placeholder="Type Something....."
              onChange={handleOnChange}

            />
          </div>
          <div className="form-check my-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              onChange={handleOnChange}
            />
            <label className="form-check-label " htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNotes;
