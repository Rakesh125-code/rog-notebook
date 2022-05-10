import React,{useState,useEffect,useLayoutEffect} from 'react'
import { useNavigate } from "react-router-dom";
const Signup = (props) => {
    let navigate =useNavigate();
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",confirmPassword:""})

      // setInterval(() => {
      
      //   if(credentials.password!==credentials.confirmPassword){
      //     console.log('done')
      //     // props.showAlert('','bg-red-100 border-red-400 text-red-700')
      //     document.getElementById('confirmPassword').classList.add('')
      //   }
      //   else{
      //     console.log('not done')
      //     // document.getElementById('confirmPassword').classList.remove('border-2 border-red-300')
      //   }
      // }, 500);
    
    
   
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        //verfication
       navigate('/verification');

        const response = await fetch("http://localhost:5000/api/auth/createuser",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})}
        )
        const json = await response.json();
        if(json.success){
            props.showAlert("Signup successfully");
            console.log("success signup")
            console.log(json)
            localStorage.setItem('token',json.authtoken);
            navigate("/");
            
        }
        else{
            // props.showAlert("Verification failed. Please try to signup with correct email",'bg-red-100 border-red-400 text-red-700');
            // navigate("/signup");
            console.log("failed signup")
            console.log(json)
        }
    }
  return (
    <>
    <div className="flex justify-center">
      <div className="w-full mx-6 lg:w-1/4 my-2">
        <form className="bg-slate-200 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
            <label
              className="block text-gray-600 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              id="name"
              type="text"
              placeholder="Enter your name"
              name="name"
              value={credentials.name}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-600 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              id="email"
              type="email"
              placeholder="Enter your email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-600  font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              id="password"
              type="password"
              placeholder="Enter password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              required
              minLength={5}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-600  font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className={`${(credentials.confirmPassword!==credentials.password && credentials.confirmPassword.length!==0) ? 'border-red-300':''} shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none`}
              id="confirmPassword"
              type="password"
              placeholder="Renter password"
              name="confirmPassword"
              value={credentials.confirmPassword}
              onChange={onChange}
              required
            />
          </div>

          <div className="flex items-center justify-between"> 
            <button
            disabled={credentials.confirmPassword!==credentials.password || credentials.password.length===0}
              className={`${!(credentials.confirmPassword!==credentials.password || credentials.password.length===0)?"bg-blue-500 hover:bg-blue-700":"bg-blue-400"} text-white font-medium py-2 px-4 rounded  focus:shadow-outline my-4 mx-1`}
              type="submit"
              id="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          {/* &copy;2020 Acme Corp. All rights reserved. */}
        </p>
      </div>
      </div>
    </>
  )
}

export default Signup