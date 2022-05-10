import React, { useContext ,useState} from "react";
import noteContext from "../context/notes/noteContext";
import { Link } from "react-router-dom";
export const AddNote = () => {
const context = useContext(noteContext);
const { addNote,editNote,noteid} = context;
const [note, setNote] = useState({title:"",description:"",tag:"default"})

const handleClick=()=>{
    addNote(note.title,note.description,note.tag);
    document.getElementById('title').value="";
    document.getElementById('description').value="";
    document.getElementById('tag').value="";
    setNote({title:"",description:"",tag:"default"})
}
const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}
let cancelBtn=document.getElementById('cancelBtn');
    let updateBtn=document.getElementById('updateBtn');
    let addBtn=document.getElementById('addBtn');
   
const cancelClick=()=>{
    cancelBtn.classList.add('hidden')
    updateBtn.classList.add('hidden')
    addBtn.classList.remove('invisible')
   document.getElementById('title').value="";
    document.getElementById('description').value="";
   document.getElementById('tag').value="";
}
const updateClick=()=>{
   
    cancelBtn.classList.add('hidden')
    updateBtn.classList.add('hidden')
    addBtn.classList.remove('invisible')
    let etitle=document.getElementById('title');
    let edescription=document.getElementById('description');
    let etag=document.getElementById('tag');
    editNote(noteid,etitle.value,edescription.value,etag.value);
    document.getElementById('title').value="";
    document.getElementById('description').value="";
    document.getElementById('tag').value="";
    
}
  return (
    <>
    <div className="flex justify-center">
      <div className="w-full mx-2 lg:w-3/4 my-2">
        <form className="bg-white shadow-md rounded px-8 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              id="title"
              type="text"
              placeholder="Enter title"
              name="title"
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="tag"
            >
              Tag
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              id="tag"
              type="text"
              placeholder="Enter tag"
              name="tag"
              onChange={onChange}  
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none h-40"
              id="description"
              type="text"
              placeholder="Enter description"
              name="description"
              onChange={onChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
             disabled={note.title.length<3||note.description.length<5}
              className={`${!(note.title.length<3||note.description.length<5)?"hover:bg-blue-700 bg-blue-500":"bg-blue-400"}    text-white font-medium py-2 px-4 rounded  focus:shadow-outline`}
              type="button"
              id="addBtn"
              onClick={handleClick}
            >
              Add Note
            </button>
            {/* <Link
              className={`hover:bg-blue-700 bg-blue-500 text-white font-medium py-2 px-4 rounded  focus:shadow-outline`}
              type="button"
              id="canvas"
              to={'/canvaspaint'}
            >
              Canvas
            </Link> */}
            {/* <input type="file" /> */}
            <div>
            <button
              className="bg-slate-500 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded  focus:shadow-outline hidden mx-2"
              type="button"
              id="cancelBtn"
              onClick={cancelClick}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded  focus:shadow-outline hidden mx-2"
              type="button"
              id="updateBtn"
              onClick={updateClick}
            >
              Update Note
            </button>
            </div>
          </div>
        </form>
        
      </div>
      </div>
    </>
  );
};
