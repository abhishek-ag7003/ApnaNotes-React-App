import { useContext } from 'react';
import noteContext from  "../context/Notes/NoteContext"
export default function NoteItem(props) {
  const { notes } = props;
  const context = useContext(noteContext)
    const { deleteNote} = context;
  const handleDelete = ()=>{
    deleteNote(notes._id)
  }
  return (
    <div className="col-md-3 my-3">
      <div className="card ">
        <div className="card-body">
          <h5 className="card-title">{notes.title}</h5>
          <p className="card-text">{notes.description}</p>  
          <div>
          <i className="fa-solid fa-trash mx-2 clickable" onClick={handleDelete}></i>
    <i className="fa-solid fa-pen-to-square mx-2 clickable"></i></div>       
        </div>
        
      </div>
    </div>
  );
}
