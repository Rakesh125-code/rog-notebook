import React from "react";
import { Link,useLocation ,useNavigate} from "react-router-dom";
export default function Navbar() {
    let location=useLocation();
    let navigate =useNavigate();
    const handleLogout=()=>{
      localStorage.removeItem('token');
      navigate('/login')
    }
  return (
    <>
      <div className="bg-zinc-200 h-16 flex justify-between">
        <ul className="flex py-5">
            <h2 className="mx-1 font-medium px-2">RogNotebook</h2>
          <Link className={` text-blue-800 mx-2 ${location.pathname==="/"?"text-blue-500":""}`} to={"/"}>Home</Link>
          <Link className={`text-blue-800 mx-2 ${location.pathname==="/about"?"text-blue-500":""}`} to={"/about"}>About</Link>
        </ul>
        {!localStorage.getItem('token')? <div className="py-5 px-2">
          <Link className=" mr-1 py-2 px-2 rounded bg-blue-500 hover:bg-blue-600 text-white" to="/login" >Login</Link>
          <Link className="ml-1 py-2 px-2 rounded bg-blue-500 hover:bg-blue-600  text-white" to="/signup" >Signup</Link>
        </div>: <div className="py-3 px-2">
          <button className="ml-1 py-2 px-2 rounded bg-blue-500 hover:bg-blue-600  text-white" onClick={handleLogout} >Logout</button>
        </div>}
      </div>
    </>
  );
}
