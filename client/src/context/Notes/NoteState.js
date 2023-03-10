import { useState } from 'react';
import NoteContext from './NoteContext';
const NoteState = (props)=>{
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
    const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;