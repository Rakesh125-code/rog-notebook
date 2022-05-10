import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import { AddNote } from "./AddNote";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";
const Notes = () => {
  let navigate =useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate('/login');
    }
  }, []);

  return (
    <>
      <AddNote />
      <div className="flex justify-center">
        <div className="w-full lg:w-3/4">
          <h2
            className="mx-2 text-center mt-2 font-bold text-xl text-teal-500 shadow-md 
      shadow-teal-200 rounded py-2 px-2 bg-teal-100"
          >
            Your Notes
          </h2>
          <h2 className="mx-2 mt-1 text-slate-600">
        {notes.length == 0 && "No notes to display"}
      </h2>
        </div>
        
      </div>
      

      <div className="flex justify-evenly flex-wrap lg:w-3/4">
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
};
export default Notes;
