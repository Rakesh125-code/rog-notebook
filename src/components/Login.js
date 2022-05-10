import React,{useState} from 'react'
import { useNavigate,Link } from "react-router-dom";
const Login = (props) => {
    let navigate =useNavigate();
   const [credentials, setCredentials] = useState({email:"",password:""})
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})}
        )
        const json = await response.json();
        console.log(json);
        if(json.success){
          props.showAlert('Login successfully');
            localStorage.setItem('token',json.authtoken);
            navigate("/");
        }
        else{
          props.showAlert('Try to login with correct credentials','bg-red-100 border-red-400 text-red-700');
        }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <>
    <div className="flex justify-center">
      <div className="w-full mx-6 lg:w-1/4 my-2">
        <form className="bg-slate-200 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-600 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
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
            />
          </div>

          <div className=" mx-2 lg:mx-0 flex items-center justify-between"> 
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded  focus:shadow-outline my-4 mx-1"
              type="submit"
              id="submit"
            >
              Login
            </button>
            <p className="text-center text-gray-500 text-sm">
          Don't Have an Account? <Link className='font-medium text-blue-500' to='/signup'>Create Now!</Link>
        </p>
          </div>
        
        </form>
        
      </div>
      </div>
    </>
  )
}

export default Login