import { useContext } from 'react';
import noteContext from  "../context/Notes/NoteContext"
export default function NoteItem(props) {
  const { notes , updateNote} = props;
  const context = useContext(noteContext)
    const { deleteNote} = context;
  const handleDelete = ()=>{
    deleteNote(notes._id)

  }
 
  return (
    <div className="col-md-3 my-3">
      <div className="card ">
      <span className="position-absolute top-0 end-0 translate-top badge  bg-primary" style={{borderRadius: "0px 0px 0px 8px"}}>{notes.tag.length > 20 ? `${notes.tag.slice(0, 20)}...`:notes.tag}</span>

        <div className="card-body">
          <h5 className="card-title my-2">{notes.title}</h5>
          <p className="card-text">{notes.description}</p>  
          <div>
          <i className="fa-solid  fa-trash mx-2 clickable" onClick={handleDelete}></i>
    <i className="fa-solid fa-pen-to-square mx-2 clickable" onClick={()=>{updateNote(notes)}}></i></div>       
        </div>
        
      </div>
    </div>
  );
}
