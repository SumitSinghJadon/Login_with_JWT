import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"





const Login=()=>{
    const [input,setInput] = useState({})
    const [error, setError] = useState('');


    const handleInput=(e)=>{
        let name=e.target.name;
        let value=e.target.value;

        setInput(values=>({...values, [name]:value}));
    }
    
    const handlesubmit= async ()=>{
    try {
        let url=`http://127.0.0.1:8000/api/login/`

        const response = await axios.post(url, input)
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            setError('')
            setInput({
                     
                username: "",
                password: ""
               
         })
            console.log(error)
            alert("login successful")
     
    } catch(error) {
        setError('Invalid credentials');
    }
};

    
    
 

    return(
        <>
        <center>
     <div class="max-w-3xl w-full h-[550px] p-2 rounded-3xl border-2 border-solid border-gray-400  z-20 bg-gradient-to-r from-base-100 via-base-100/10 to-base-100/5 flex backdrop-blur-md bg-opacity-90 ">
        <div className="bg-purple-500 bg-opacity-50 w-1/2 overflow-hidden rounded-2xl flex items-center justify-center p-6 hidden md:flex">
        <img src="imgs/login.png" />
        </div>
        <div  className="w-full md:w-1/2 items-center justify-center  flex-col">
            <div className="w-full flex justify-end space-x-1 pt-6 pb-4 md:pb-12 text-xs">
                <span>Not Register?</span>
                <Link to={'Raise_Request'} className="text-primary hover:text-primary-dark hover:underline text-blue-500 ">Raise Request</Link>
            </div>
            <h1 className="text-2xl font-semibold py-2">Hello Again!</h1>
            <p className="text-sm">Welcome Back you've been missed!</p>
            <div  className="all-center flex flex-col  py-4 md:py-8 space-y-3 md:space-y-4 w-full max-w-xs px-6">
                <input type="text" name="username" value={input.username} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter Username"/>
                <div className="w-full relative">
                    <input type="password" name="password" value={input.password} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" placeholder="Password"/>
                </div>
                <div className="w-full text-right text-sm">
                    <Link to={'Recovery_Password'}  className=" hover:text-primary hover:underline hover:text-blue-500  " >Recovery Password</Link>
                </div>
                <div className="py-4 w-full">
                    <button onClick={handlesubmit} className="bg-red-500 hover:bg-red-600 w-full text-white shadow-xl py-3 px-4 rounded-lg">
                        Sign In
                    </button>
                </div>
              <div className="divider w-full after:bg-base-200 before:bg-base-200 p-4">
                 <span>OR</span> 
              </div>
              <Link to={"?method=face_id"} className="btn btn-sm btn-ghost">
              <span><i class="fa-solid fa-face-viewfinder"></i></span>
              <span className="f-[12px]">Login with Face ID</span>
              </Link>
                
            </div>
           


        </div>


      </div> 
      </center>



        </>
    )
}

export default Login