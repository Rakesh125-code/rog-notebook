import React ,{useState} from 'react'
import { useNavigate,useLocation ,Link} from 'react-router-dom';
let flag=0;
const Verification = (props) => {
  let location=useLocation();
    let navigate =useNavigate();
    const [otp, setOtp] = useState();
    const onChange=(e)=>{
        setOtp({...otp,[e.target.name]:e.target.value});
    }
    const handleOtp=async (e)=>{
        flag=flag+1;
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/verification",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({otp:otp})}
        )
        const json = await response.json();
        if(json.verify){
            props.showAlert("Redirecting to home. Please wait...");
            console.log("success")
            console.log(json)
            localStorage.setItem('token',json.authtoken);
            flag=0;   
        }
        else{
         
           if(flag>5){
            props.showAlert("Verification failed. Redirecting to Sign Up page...",'bg-red-100 border-red-400 text-red-700');
            navigate("/signup");
            flag=0;
           }
           else{
            console.log("failed");
            props.showAlert("Verification failed. Please enter correct otp",'bg-red-100 border-red-400 text-red-700');
            console.log(json)
           }
            
        }
    }
  return (
    <>
    <div className="flex justify-center">
      <div className="w-full mx-6 lg:w-1/4 my-6">
        <form className="bg-slate-200 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleOtp}>
          <div className="mb-4">
            <label
              className="block text-gray-600 font-bold mb-2"
              htmlFor="otp"
            >
              OTP
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              id="otp"
              type="number"
              placeholder="Enter otp"
              name="otp"
              onChange={onChange}
              required
             
            />
          
          </div>

          <div className="flex items-center justify-between"> 
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded  focus:shadow-outline my-4 mx-1"
              type="submit"
              id="submit"
            >
              Login
            </button>
            <p className="text-center text-gray-500 text-sm">
          Back to <Link className='font-medium text-blue-500' to='/signup'>Sign Up</Link>
        </p>
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

export default Verification