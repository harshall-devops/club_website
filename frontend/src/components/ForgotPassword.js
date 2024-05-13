import React, { useState } from 'react'
import { useEffect } from 'react';
import '../styles/ForgotPassword.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [dropdownClubnames, SetDropdownClubnames] = useState([])
  const [clubname, SetConfirmOption] = useState('');
  const [password, setPassword]=useState('');
  const [confirmpassword, setConfirmPassword]=useState('');
  const [styleChangePasswordDiv, SetStyleChangePasswordDiv] = useState({ display: "none" })

  const navigate=useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token'); // Assuming token is stored in sessionStorage
    if (!token) {
      console.error('Token not found');
      return;
    }
    fetch('http://localhost:3001/api/v1/dropdownusers/dropDownEmailsUsername', {
      method: 'GET',
      headers: {
        'Authorization': `${token}` // Include the token in the Authorization header
      }
    })
      .then(response => response.json())
      .then(data =>{console.log(data); SetDropdownClubnames(data)})
      .catch(error => console.error(error));
  }, []);


  const showPasswordChangeBlock = () => {
    if(clubname==='' || clubname===null){
        alert("Selecting a choice from the dropdown is mandatory.")
        SetStyleChangePasswordDiv({ display: "none" })
    }else{
      SetStyleChangePasswordDiv({ display: "flex" })
    }
  }
  const updatePassword=async (e, password,confirmpassword)=>{
      e.preventDefault();
      console.log(password);
      if(!password || !confirmpassword ){
          alert("Filling all the details is mandatory.")
      }else{
        if(password===confirmpassword){
          try{
            const response = await fetch(`http://localhost:3001/api/v1/user/changePassword/${clubname}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ password: password }) // Send both clubname and password
            });
                const data=await response.json();
                if(data.success){
                  alert(data.message);
                  navigate('/editclub');
                } 
                else{
                  alert(data.message);
                }
          }
          catch(error){
            alert("Error in processing the data")
          }
        }
        else{
          alert("Re-entered password doesn't match the newly entered password")
        }
      } 
  }

  return (
    <div className="forgotPasswordOuterDiv" >
      <div className="forgotPasswordInnerDiv">
        <div className="forgotPasswordHeading">
          <h1>CHANGE PASSWORD</h1>
        </div>
        <div className="passwordChangeDropDown">
          <div className="passwordChangeDropDwonHoldingDiv">
            <select name="" id="" onChange={(e) => SetConfirmOption(e.target.value)}>
              <option value=''></option>
              {dropdownClubnames.map((names, index) => (
                <option key={index} value={names}>{names}</option>
              ))}
            </select>
          </div>
          <input type="button" value="Confirm" className='passwordChangeConfirmbutton' onClick={() => showPasswordChangeBlock()} />
        </div>
        <div className="changingPasswordDiv" style={styleChangePasswordDiv}>
          <div className="changingPasswordInnerDiv">
          <form action="">
            <div className="passwordInputDiv">
              <div id="passwordChangeinput1">
                <label htmlFor="">New Password</label> <br />
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='forgotPasswordInput' />
              </div>
              <div id="passwordChangeinput2">

                <label htmlFor="">Re-enter the new password</label><br />
                <input type="password" value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)} className='forgotPasswordInput'/>
              </div>
            </div>
            <input type="button" value="Submit Password" className="submitPasswordButton" onClick={(e)=>updatePassword(e,password, confirmpassword)} />
          </form>
          </div>
        </div>
      </div>
    </div>
  )
}
