import React, {useContext, useState} from "react";
import noteContext from  "../context/Notes/NoteContext"


const AddNotes = () => {
    const context = useContext(noteContext)
    const {addNote} = context;
    const [notes, setNotes] = useState({title:"", description:"", tag:""})
    const handleSubmit = async(e)=>{
      e.preventDefault();
      await addNote(notes.title,notes.description,notes.tag)
      setNotes({title:"", description:"", tag:""})
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
              value={notes.title}
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
              value={notes.description}

              placeholder="Type Something....."
              onChange={handleOnChange}

            />
          </div>
          
          <div className="form-group my-3">
            <label htmlFor="tag" className="my-2">Tag</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={notes.tag}
              placeholder="Type Something....."
              onChange={handleOnChange}

            />
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
