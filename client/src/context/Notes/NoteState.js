import { useState } from 'react';
import NoteContext from './NoteContext';
const NoteState = (props)=>{
  const host = "http://localhost:5000"
    const notesInitial=[
        {
          "_id": "640091deb9e59f7199b1b8c9",
          "user": "64008764052125f800d2a787",
          "title": "My abhishek",
          "description": "This is my third note",
          "tag": "personal",
          "timestamp": "2023-03-02T12:09:02.642Z",
          "__v": 0
        },
        {
          "_id": "640373577e3802889246f3b9",
          "user": "64008764052125f800d2a787",
          "title": "My title",
          "description": "This is my third note",
          "tag": "personal",
          "timestamp": "2023-03-04T16:35:35.219Z",
          "__v": 0
        },
        {
          "_id": "6403735e7e3802889246f3bb",
          "user": "64008764052125f800d2a787",
          "title": "My title",
          "description": "This is my final note",
          "tag": "personal",
          "timestamp": "2023-03-04T16:35:42.362Z",
          "__v": 0
        },
        {
            "_id": "640091deb9e59f7199b1b8c9",
            "user": "64008764052125f800d2a787",
            "title": "My abhishek",
            "description": "This is my third note",
            "tag": "personal",
            "timestamp": "2023-03-02T12:09:02.642Z",
            "__v": 0
          },
          {
            "_id": "640373577e3802889246f3b9",
            "user": "64008764052125f800d2a787",
            "title": "My title",
            "description": "This is my third note",
            "tag": "personal",
            "timestamp": "2023-03-04T16:35:35.219Z",
            "__v": 0
          },
          {
            "_id": "6403735e7e3802889246f3bb",
            "user": "64008764052125f800d2a787",
            "title": "My title",
            "description": "This is my final note",
            "tag": "personal",
            "timestamp": "2023-03-04T16:35:42.362Z",
            "__v": 0
          }
      ]

    // Add a Note
    const addNote = async (title, description, tag)=>{
      
      const url = `${host}/api/notes/add-note`
      const response = await fetch(url,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMDg3NjQwNTIxMjVmODAwZDJhNzg3In0sImlhdCI6MTY3Nzc1NjMzNX0.Ds3c4c3Y2l84gHQ1494_A8-kPXZmpRfnbux9478j1mc"

        },
        body:JSON.stringify({title,description, tag})
      })
      
      // let i =0
      //   const note = {
      //     "_id": `6403735e7e3802889246f3bb${i++}`,
      //     "user": "64008764052125f800d2a787",
      //     "title": title,
      //     "description": description,
      //     "tag": "personal",
      //     "timestamp": "2023-03-04T16:35:42.362Z",
      //     "__v": 0
      //   }
        // setNotes(notes.concat(note))
        console.log("Submitted")
    }

    //Delete a Note
    const deleteNote = async (id)=>{
      const url = `${host}/api/notes/delete-note/${id}`
      const response = await fetch(url,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMDg3NjQwNTIxMjVmODAwZDJhNzg3In0sImlhdCI6MTY3Nzc1NjMzNX0.Ds3c4c3Y2l84gHQ1494_A8-kPXZmpRfnbux9478j1mc"

        }
      })
      const json = await response.json()

      const newNote = notes.filter((notes)=>{
        return notes._id!== id
      })
      setNotes(newNote)
    }

    // Edit a Note
    const editNote = async(id, title, description, tag)=>{
      const url = `${host}/api/notes/update-note/${id}`
      const response = await fetch(url,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMDg3NjQwNTIxMjVmODAwZDJhNzg3In0sImlhdCI6MTY3Nzc1NjMzNX0.Ds3c4c3Y2l84gHQ1494_A8-kPXZmpRfnbux9478j1mc"

        },
        body:JSON.stringify()
      })
      const json = await response.json()


      for(let i=0;i<notes.length;i++){
        const element = notes[i];
        if(element._id === id){
          element.title = title;
          element.description = description;
          element.tag = tag
        }
      }
        
    }
    
    const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;