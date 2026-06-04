import "./../styles/Register.css";

import { useState } from "react";

import axios from "axios";

import { Link, useNavigate }
from "react-router-dom";

function Register(){

 const navigate = useNavigate();

 const [name,setName] =
 useState("");

 const [email,setEmail] =
 useState("");

 const [password,setPassword] =
 useState("");

 const handleRegister =
 async()=>{

  try{

   await axios.post(
    "http://localhost:5000/api/auth/register",
    {
      name,
      email,
      password
    }
   );

   alert("Registered");

   navigate("/login");

  }
  catch(error){

   alert("Error");

  }

 };

 return(

 <div className="register-container">

  <div className="register-box">

   <h1>Register</h1>

   <input
    placeholder="Name"
    onChange={(e)=>
    setName(e.target.value)}
   />

   <input
    placeholder="Email"
    onChange={(e)=>
    setEmail(e.target.value)}
   />

   <input
    type="password"
    placeholder="Password"
    onChange={(e)=>
    setPassword(e.target.value)}
   />

   <button
    onClick={handleRegister}
   >
    Register
   </button>

   <div className="link">

    <Link to="/login">
      Already have account?
    </Link>

   </div>

  </div>

 </div>

 );

}

export default Register;