import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote,editClick} = context;
  const { note } = props;
  return (
    <div className="my-1 mx-1 py-1 w-cardWidthMobile sm:w-72 sm:my-2 sm:mx-1 rounded-sm bg-slate-100">
      {/* <div className="h-30 px-1 flex justify-center"></div> */}
      <div className="flex justify-between text-white  text-xs mx-1 py-1 px-3 bg-teal-500 rounded-sm text-center ">
      {note.title}
        <div>
           <i className="fa-solid fa-pen-to-square cursor-pointer mx-2"
           onClick={()=>{editClick(note._id,note.title,note.description,note.tag)}}></i>
          <i className="fa-solid fa-trash-can cursor-pointer mx-2"
          onClick={()=>{deleteNote(note._id)}}></i>{" "}
        </div>
      </div>
      <div className="rounded-sm  sm:w-72 bg-slate-100 px-1 py-1">
        {/* <h5 className="px-1 pb-1 text-lg text-slate-500"></h5> */}
        <p className="px-2 py-1 text-xs text-slate-600">{note.description}</p>

        {/* <div className="mx-2 my-1 text-slate-400 text-xs"></div> */}
        {/* <div className="h-0.5 bg-slate-100"></div> */}
        <div className="my-2 flex justify-between"></div>
      </div>
    </div>
  );
};
export default Noteitem;
