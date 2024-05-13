import React, { useState } from 'react';
import login_image from '../assets/login_page_img.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/SignIn.css'
import { useEffect } from 'react';

export default function SignIn({ setUserRole }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginState,setLoginState]=useState(false);
  const [roleUse,setRoleUse]=useState('');
  
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      },{
        credentials: 'include'
      });

      const data = await response.json();
      console.log(data)
      if (data.success) {
        setLoginState(true);
        sessionStorage.setItem('token',data.token);
        sessionStorage.setItem('state',true);
        setRoleUse(data.role);
        setUserRole(data.role);
        alert(data.msg);
        window.location.href = '/'; 
      } 
      else {
        // navigate('/',{state:false,stateAbout:false, roleUse:roleUse});
        alert(data.error);
      }
    } catch (msg) {
      console.error('Error:', msg);
      alert('An error occured. Please try again.');
    }
  };

  useEffect(() => {
    if (loginState && roleUse) {
      console.log(roleUse)
      
      navigate('/', { state: loginState, stateAbout: false, setFlag1: true, roleUse:roleUse });
    }
  }, [loginState,roleUse]);

  return (

    <div className='signin-outer-div' >
      <div className="form_div1" id="form_div1ID1">
        <h1>USER LOGIN</h1>
        <form action="">
          <div className="inner_div_form">
            <div className="signinInputs">
              <label htmlFor="username">Username</label><br />
            <div className="signinInputdiv">
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
              </div> </div>
            <div className="signinInputs">
              <label htmlFor="password">Password</label><br />
             <div className="signinInputdiv">
             <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
             </div> 
             </div>
              <div className="signinInputs" id="LoginDivId">
              <button className="loginbutton" onClick={(e)=>handleSignIn(e)}>Login</button>
               </div>
          </div>
        </form>
      </div>
    </div>
  );
}


