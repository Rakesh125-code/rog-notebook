import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const InitialNote = [];
  const [notes, setNotes] = useState(InitialNote);
 const [noteid, setnoteid] = useState('')
  //edit note
  const editClick=(id,title,description,tag)=>{
    //for top scrolling
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;// For Chrome, Firefox, IE and Opera
    //
    let etitle=document.getElementById('title');
    let edescription=document.getElementById('description');
    let etag=document.getElementById('tag');
    let cancelBtn=document.getElementById('cancelBtn');
    let updateBtn=document.getElementById('updateBtn');
    let addBtn=document.getElementById('addBtn');
    cancelBtn.classList.remove('hidden')
    updateBtn.classList.remove('hidden')
    addBtn.classList.add('invisible')
    setnoteid(id);
     notes.filter((note) => {
      if(note._id===id){
        etitle.value=title;
        edescription.value=description;
        etag.value=tag;
      }
    });
  }
  //get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    let note=await response.json();
    setNotes(notes.concat(note));

    //
   
  };
  //Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      }
    });
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    //logic to edit in client
    let newNotes=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes ,editClick,noteid}}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
