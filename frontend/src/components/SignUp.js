import React, { useState } from 'react';
import login_image from '../assets/login_page_img.png';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

export default function SignUp() {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [president, SetPresident] = useState('');
  const [prn, SetPrn] = useState('');
  const [gender, SetGender] = useState('');
  const [classname, SetClass] = useState('');
  const [dob, setDOB] = useState('');
  const [presidentEmail, SetPresidentEmail] = useState('');
  const [contact, SetContact] = useState('');
  const [club_namedropDown, setClubNameDropDown] = useState([]);
  const [clubname, setClubName] = useState('');
  const [role, setRole] = useState('president');
  const [state, setLoginState] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const presidentNameValidation = /^[A-Za-z\s]+$/
    const presidentMobileValidation = /^[0-9]{10}$/
    const presidentPrnValidation = /^[0-9]+$/
    const presidentEmailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const currDate = new Date();
    const presidentDOB = new Date(dob)
    const ageDifferenceMs = currDate - presidentDOB;
    const ageDifferenceYears = ageDifferenceMs / (1000 * 60 * 60 * 24 * 365.25);

    if (!clubname || !password || !president || !prn || !gender || !classname || !dob || !presidentEmail || !contact) {
      alert("Filling all the fields is mandatory");
    }
    else if (!(presidentNameValidation.test(president))) {
      alert("Fill the name properly. Only lowercase and uppercase characters are allowed")
    }
    else if (!(presidentMobileValidation.test(contact))) {
      alert("Invalid mobile number")
    }
    else if (!(presidentPrnValidation.test(prn))) {
      alert("Only numeric characters are allowed. Fill the prn correctly")
    }
    else if (!(presidentEmailValidation.test(presidentEmail))) {
      alert("Email is not as per the standard format.")
    }
    else if (ageDifferenceYears < 17) {
      alert("Invalid DOB. User should be atleast 17 years old.")
    }
    else {
      if (password === password1) {
        try {
          const response = await fetch('http://localhost:3001/api/v1/user/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ clubname, password, president, prn, gender, classname, dob, presidentEmail, contact, role, status: true, initialLogin: true })
          });

          const data = await response.json();
          if (data.success) {
            setLoginState(true);
            alert(data.message);
          } else {
            setLoginState(true);
            alert(data.message);
          }
        } catch (error) {
          alert('An error occurred. Please try again.');
        }
      } else {
        alert("Please confirm that, passwords from 'Create Password' & 'Confirm Password' fields are same")
      }
    }
  };

  useEffect(() => {
    if (state) {
      console.log("After useEffect" + state);
      navigate('/', { state: state, stateAbout: false, setFlag1: true });
    }
  }, [state]);


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

  const SetPresidentValidation = (event) => {
    if (/[^a-zA-Z\s]/.test(event)) {
      alert('Only alphabets are allowed.');
    } else {
      SetPresident(event);
    }
  }

  return (
    <div className='signup-outer-div' >
      <div className="form_div">
        <div className="outerCommonDiv" id="outerCommonDiv1">
          <h1>ADD MEMBER DETAILS</h1>
        </div>
        <div className="outerCommonDiv" id="outerCommonDiv2">
          <form action="">
            <div className="inner_div_form1">

              <div className="outerFormDivBlock">
                <div className="inputs" id="dropdownHoldingDiv">
                  <label htmlFor="useremail">Club Name</label>
                  <select name="useremail" className="dropdownUsers" id="useremail" onChange={(e) => setClubName(e.target.value)}>
                    <option value=""></option>
                    {club_namedropDown.map((names, index) => (
                      <option key={index} value={names}>{names}</option>
                    ))}
                  </select>
                </div>
                <div className="inputs">
                  <label htmlFor="contact">Contact no.</label><br />
                  <input type="number" id="contact" value={contact} onChange={(e) => SetContact(e.target.value)} /><br />
                </div>
              </div>

              <div className="outerFormDivBlock">
                <div className="inputs">
                  <label htmlFor="president">President Name</label><br />
                  <input type="text" id="president" value={president} onChange={(e) => SetPresidentValidation(e.target.value)} /><br />

                </div>
                <div className="inputs">
                  <label htmlFor="prn">PRN</label><br />
                  <input type="number" id="prn" value={prn} onChange={(e) => SetPrn(e.target.value)} /><br />
                </div>
              </div>
              <div className="outerFormDivBlock">
                <div className="inputs">
                  <label htmlFor="gender">Gender</label><br />
                  <select name="" id="gender" className="dropdownUsers" onChange={(e) => SetGender(e.target.value)}>
                    <option value="" name="gender"></option>
                    <option value="Male" name="gender">Male</option>
                    <option value="Female" name="gender">Female</option>
                    <option value="Other" name="gender">Other</option>
                  </select>
                </div>
                <div className="inputs">
                  <label htmlFor="classname">Class</label><br />
                  <input type="text" id="classname" value={classname} onChange={(e) => SetClass(e.target.value)} /><br />
                </div>
              </div>
              <div className="outerFormDivBlock">
                <div className="inputs">
                  <label htmlFor="dob">Date of Birth</label><br />
                  <input type="date" id="dob" value={dob} onChange={(e) => setDOB(e.target.value)} /><br />
                </div>
                <div className="inputs">
                  <label htmlFor="presidentEmail">Email of President</label><br />
                  <input type="email" id="presidentEmail" value={presidentEmail} onChange={(e) => SetPresidentEmail(e.target.value)} /><br />
                </div>
              </div>
              <div className="outerFormDivBlock">
                <div className="inputs">
                  <label htmlFor="password">Create Password</label><br />
                  <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
                </div>
                <div className="inputs">
                  <label htmlFor="password1">Confirm Password</label><br />
                  <input type="password" id="password1" value={password1} onChange={(e) => setPassword1(e.target.value)} /><br />
                </div>
              </div>
              <div className="inputs" id="SignupDivId">
                <button className="loginbutton" onClick={(e) => handleSignUp(e)}>CONFIRM DETAILS</button>
              </div>

            </div>
          </form>
        </div>

      </div>
    </div>
  );
}


