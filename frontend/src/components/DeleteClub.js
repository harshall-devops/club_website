import React, { useEffect,useState } from 'react'
import '../styles/DeleteClub.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function DeleteClub() {
  const navigate=useNavigate();
  const [clubNameDropDown,setClubNameDropDown]=useState([]);
  const [clubname,setselectedClubName]=useState('');
  useEffect(() => {
    const token = sessionStorage.getItem('token'); // Assuming token is stored in sessionStorage
    if (!token) {
      console.error('Token not found');
      return;
    }
    fetch('http://localhost:3001/api/v1/dropdown/dropDownEmails', {
      method: 'GET',
      headers: {
        'Authorization': `${token}` // Include the token in the Authorization header
      }
    })
      .then(response => response.json())
      .then(data => setClubNameDropDown(data))
      .catch(error => console.error(error));
  }, []);

  const changeOption=(clubname)=>{
    setselectedClubName(clubname);
  }

  const DeleteClubFunction=async (e)=>{
    e.preventDefault();

      if(!(clubname)){
        alert("Select the club you want to delete from the dropdown.")
      }
      else{
        try{
          const response=await fetch(`http://localhost:3001/api/v1/update/deleteClub/${clubname}`,{
          method:'PUT'
          })
          const data=await response.json();

          const response1=await fetch(`http://localhost:3001/api/v1/user/deleteUser/${clubname}`,{
          method:'PUT'
          })
          const data1=await response1.json(); 
          if(data.success && data1.success){
            alert("Club deleted successfully");
            navigate('/')
          }
          else if(data.success && !data1.success){
            alert("Club deleted successfully but error in deleting the president's information");
          }
          else if(!data.success && data1.success){
            alert("Error in deleting few information fields.");
          }
          else{
            alert(data.message);
          }
      }catch(error){
        alert("Error in deleting the club information");
      }
      }     
  }

  return (
    <>
    <div className='deleteClubOuterContainer'>
    <div className="overlay">
        <div className="deleteClubimgHolder">
            <img src="" alt="" className="back_img"/>
        </div>
        <div className="mainheading">
            <h1>DELETE YOUR ACCOUNT HERE</h1>
       </div>
       
            <div className="overlay_inner">
        <div className="deleteClubDiv">
        <div className="deleteClubHeading">
            <h1>Delete Club</h1>
        </div>
        <hr />
        <div className="deleteClubSubHeading">
            <p>Select the club name you want to delete!"</p>
        </div>
        <div className="deleteClubInputsDiv">
                <select name="" id="" onChange={(e)=>changeOption(e.target.value)} className="selectdropDown">
                  <option value=""></option>
                  {clubNameDropDown.map((clubname1)=>(
                          <option key={clubname1._id} value={clubname1}>{clubname1}</option>
                  ))}
                </select>
                <button className="deleteclubButton" onClick={(e)=>DeleteClubFunction(e)}  >DELETE ACCOUNT</button>
        </div>
      </div>
      </div>
        </div>
    </div>
    </>
    
  )
}