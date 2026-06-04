import "./../styles/Login.css";

import { Link, useNavigate }
from "react-router-dom";

function Login(){

 const navigate =
 useNavigate();

 const loginUser = ()=>{

   navigate("/dashboard");

 };

 return(

 <div className="register-container">

  <div className="register-box">

   <h1>Login</h1>

   <input
    placeholder="Email"
   />

   <input
    placeholder="Password"
    type="password"
   />

   <button
    onClick={loginUser}
   >
    Login
   </button>

   <div className="link">

    <Link to="/">
      Create Account
    </Link>

   </div>

  </div>

 </div>

 );

}

export default Login;