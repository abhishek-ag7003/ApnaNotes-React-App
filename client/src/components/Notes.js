import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/Notes/NoteContext";
import AddNotes from "./AddNotes";
import NoteItem from "./NoteItem";

function Notes(props) {
  const navigate = useNavigate();
  const { showAlert, setProgress } = props;
  const [noteState, setNoteState] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const context = useContext(noteContext);
  const { notes, fetchNotes, editNote } = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  useEffect(() => {
    console.log("stared mounted");
    if (sessionStorage.getItem("token")) {
      fetchNotes();
    } else {
      navigate("/authentication");
    }
    console.log("Done mounted");
    // eslint-disable-next-line
  }, []);
  const updateNote = async (currentNote) => {
    ref.current.click();
    console.log("click");
    setNoteState(currentNote);
    console.log(noteState);
    props.showAlert("Notes updated successfully","danger")
  };

  const handleSubmit = async (e) => {
    setProgress(20)
    console.log(noteState);
    await editNote(
      noteState._id,
      noteState.title,
      noteState.description,
      noteState.tag
      );
      setProgress(80)
      refClose.current.click();
      fetchNotes();
      setProgress(100)
  };
  const handleOnChange = (e) => {
    setNoteState({ ...noteState, [e.target.name]: e.target.value });
  };
  const bgStyle = {
    width: "100%",
    height: "30vh",
    background:
      "linear-gradient(90deg, rgba(21,95,204,1) 0%, rgba(13,110,253,1) 47%, rgba(156,198,237,1) 100%)",
    borderRadius:"10px"

  };
  const addNoteStyle = {
    width:"90%",
    borderRadius:"10px",
    position:"absolute",
    zIndex:"2",
    top:"100px",
    left:"5%",
    background:"white"


  }

  return (
    <div className="position-relative ">
      <div className="container shadow-lg p-3 mb-5 bg-body-tertiary rounded" style={addNoteStyle}>
      <AddNotes setProgress={setProgress} showAlert={showAlert} />
      </div>
      <div className="d-flex flex-row justify-content-center" style={bgStyle}>
        {/* <div className="d-flex flex-column align-items-center">
        <h1 className="text-light mt-3">Add Notes</h1> */}
        <div className=" d-flex flex-row justify-content-center mt-4" >
        <h4 className=" text-light font-monospace" style={{textAlign:"center"}}>Organize Your Notes with ApnaNotes!</h4>
        {/* </div> */}
        </div>

      </div>
      <button
        type="button"
        className="btn btn-primary d-none"
        ref={ref}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add note
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group my-3">
                  <label htmlFor="title" className="my-2">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    aria-describedby="emailHelp"
                    placeholder="Enter Title"
                    value={noteState.title}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="description" className="my-2">
                    Notes
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder="Type Something....."
                    onChange={handleOnChange}
                    value={noteState.description}
                  />
                </div>

                <div className="form-group my-3">
                  <label htmlFor="tag" className="my-2">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    placeholder="Type Something....."
                    onChange={handleOnChange}
                    value={noteState.tag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      {notes.length !== 0 && (
        <div className="notes-container row">
          <h2>Your Notes</h2>
          {notes.map((notes) => {
            return (
              <NoteItem key={notes._id} updateNote={updateNote} notes={notes} />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Notes;
