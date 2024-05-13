import React, { useState } from 'react'
import '../styles/AddClub.css'
import leftDivImg from '../assets/addClub_rit_logo.png'
import rightDivImg from '../assets/background_img1.jpg'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddClub() {

  const [useremail, setEmail] = useState('');
  const [clubname, setClubName] = useState('');
  const [date, setDate] = useState('');

  const navigate = useNavigate();
  const ClickedAddButton = async (e) => {
    e.preventDefault();
    const clubEmailValidationPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const currentDate = new Date();
    const enteredDate = new Date(date);
    if(!useremail || !date || !clubname){
      alert("Filling up all the details is mandatory");
    }
    else if (!(clubEmailValidationPattern.test(useremail))) {
      alert("Email is not in standard format");
    }
    else if (enteredDate > currentDate) {
      alert("Invalid date. Check the entered date once again");
    }
    else {
      try {
        const response = await fetch('http://localhost:3001/api/v1/clubRegister', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            useremail,
            clubname,
            date,
            status: true
          })
        });
        const data = await response.json();
        if (data.success) {
          alert(data.message)
          navigate('/signup')
        }
        else {
          alert(data.message)
        }
      } catch (e) {
        alert(e);
      }
    }
  }

  return (
    <div>
      <div className="addClubOuterDiv">
        <div className="addClubInnerMainDivs" id="addClubInnerMainDivs_idleft">
          <div className="addClubLeftContent">
            <div className="addClubLeftInnerDiv">
              <img src={leftDivImg} alt="" />
              <h2>Welcome to Club Community</h2>
            </div>
            <hr />
            <div className="addClubLeftInnerDiv">
              <div className="addClubLeftInnerFormDiv">
                <form action="">
                  <div className="addClubinputs">
                    <label htmlFor="useremail">EMAIL OF CLUB</label><br />
                    <input type="email" id="useremail" value={useremail} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="addClubinputs">
                    <label htmlFor="clubname">CLUB NAME</label><br />
                    <input type="text" id="clubname" value={clubname} onChange={(e) => setClubName(e.target.value)} />
                  </div>
                  <div className="addClubinputs">
                    <label htmlFor="establishment">ESTABLISHMENT DATE</label><br />
                    <input type="date" id="establishment" value={date} onChange={(e) => setDate(e.target.value)} />
                  </div>
                  <div className="addClubinputs">
                    <button onClick={(e) => ClickedAddButton(e)}>ADD CLUB</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="addClubInnerMainDivs" id="addClubInnerMainDivs_idright">
          <img src={rightDivImg} alt="" />
        </div>
      </div>
    </div>
  )
}
