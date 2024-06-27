import { useState } from "react";
import api from "./api";





const ApplyLeave=()=>{

    const[input, setInput]=useState({})

    const handleInput=(e)=>{
            let name=e.target.name;
            let value=e.target.value;

            setInput(values=>({...values, [name]:value}));
    }

    const SubmitInput=()=>{
      console.log(input);
      let token = localStorage.getItem('token');
  
      if (!token) {
          alert("Please login to proceed");
          return;
      }
        let url=`http://127.0.0.1:8000/ApplyLeave/`
        api.post(url, input).then((res)=>{
            alert("Leave Requested")
        })
        setInput({
            "Employ_name" : "",
            "Title" : "",
            "discription" : ""
        })
    }


    
    return(
        <>
        <div class="w-[400px] h-[450px] border-2 border-black mt-[30px] p-5">
          <h1 class="text-lg font-semibold mb-4">Apply Employ Leave</h1>
          <div class="space-y-4">
            <label for="emp_name" class="block text-sm font-medium text-gray-700">Employ Name</label>
            <input
              type="text"
              name="Employ_name"
              placeholder="Employ_name"
              id="emp_name"
              value={input.Employ_name}
              onChange={handleInput}
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
      
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="Title"
              placeholder="title"
              id="title"
              value={input.Title}
              onChange={handleInput}
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
      
            <label for="dis" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="discription"
              id="dis"
              placeholder="discripation"
              value={input.discription}
              onChange={handleInput}
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            ></textarea>
          </div>
      
          <center>
            <button
              type="submit"
              onClick={SubmitInput}
              class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Request Leave
            </button>
          </center>
        </div>
      </>
      
    );
}

export default ApplyLeave