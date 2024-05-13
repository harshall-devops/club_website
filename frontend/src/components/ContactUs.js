import React, { useState } from 'react'
import contactus_Background_img from '../assets/contactUs_Background_img.jpg'
import '../styles/ContactUs.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactUs() {

    const [name, setNameUser]=useState('');
    const [email, setEmailUser]=useState('');
    const [contact, setContactUser]=useState('');
    const [query, setQueryUser]=useState('');

    const sendQueryInfo=async (e)=>{
        e.preventDefault();
        const nameValidationPattern=/^[A-Za-z\s]+$/
        const contactRegex = /^[0-9]{10}$/;
        const emailValidationPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if(!name || !email || !contact || !query){
            alert("Filling up all the fields is mandatory")
        }
        else if(!(nameValidationPattern.test(name))){
            alert("Name should contain only upper or lower case characters.")
        }
        else if(!(emailValidationPattern.test(email))){
            alert("Email not in standard format. Check the entered email once again")
        }
        else if (!(contactRegex.test(contact))) {
            alert("Invalid mobile number. Check the entered mobile number once again")
        }
        else if (query.length>50) {
            alert("Query is too long. Maximum word limit is 50 characters")
        }
        else{
            try{
                const response=await fetch(`http://localhost:3001/api/v1/query/queriesSend`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        name,email,contact, query, status:'unsolved'
                    })
                })
                console.log(name,email,contact, query)
                const data=await response.json();
                    if(data.success){
                        alert(data.message)
                    }
                    else{
                        alert(data.message)
                    }
            }catch(error){
                alert(error);
            }
        }
    }

    return (
        <div className='contactUsMostOuterContainerDiv' >
            <div className="contactUsOuterContainerDiv">
            <div className="contactUsOuterContainer">
                <div className="contactUsInfoHoldingDiv" id="contactUseLeftDiv">
                    <img src={contactus_Background_img} alt="" />
                </div>
                <div className="contactUsInfoHoldingDiv" id="contactUseRighttDiv">
                    <div className="contacUsHeadingDiv">
                        <h1>Your Contact Information</h1>
                    </div>
                    <div className="contactUsFormHoldingDiv">
                        <form action="">
                            <div className="contactUsInputs">
                                <label htmlFor="name">Name</label><br />
                                <input type="text" id="name" placeholder="Enter your name" className="contactUsInputsText" onChange={(e)=>setNameUser(e.target.value)}/>
                            </div>

                            <div className="contactUsInputs">
                                <label htmlFor="email">Email</label><br />
                                <input type="email" id="email" placeholder="Enter email here" className="contactUsInputsText" onChange={(e)=>setEmailUser(e.target.value)}/>
                            </div>

                            <div className="contactUsInputs">
                                <label htmlFor="phone">Phone no.</label><br />
                                <input type="number" id="phone" placeholder="Enter your phone no. here" className="contactUsInputsText" onChange={(e)=>setContactUser(e.target.value)}/>
                            </div>

                            <div className="contactUsInputs">
                                <label htmlFor="message">Query</label><br />
                                <textarea name="" id="message" cols="26" rows="5" className="contactUsInputsText" onChange={(e)=>setQueryUser(e.target.value)} ></textarea>
                            </div>
                            <div className="contactUsInputs">
                                <button  onClick={(e)=>sendQueryInfo(e)}  >SUBMIT</button>
                            </div>
                            <br />
                        </form>
                    </div>
                </div>
            </div>
            </div>

            <div className="contactUsOuterContainerDiv" id="contactUsOuterContainerBottomId">
            <div className="contactUsInnerContainerDiv">
            <h1>RIT Location: </h1>
            <div className="contactUsMap">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3534.1774299589088!2d74.28083426334858!3d17.063652313334224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc174c4124484bd%3A0x35d1cbf0672b3f50!2sRajarambapu%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1710761400053!5m2!1sen!2sin" ></iframe>
            </div>
            </div>
            </div>
        </div>
    )
}
