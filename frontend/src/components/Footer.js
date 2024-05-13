import React from 'react'
import insta_logo from '../assets/footer_insta_logo.png'
import linkedin_logo from '../assets/footer_linkedin_logo.png'
import youtube_logo from '../assets/footer_youtube_logo.png'
import { Link } from 'react-router-dom'
import '../styles/Footer.css'
import { useState, useEffect } from 'react'

export default function Footer() {
  
  return (
    <div>
      <div className="outerFooterContainer">
        <div className="innerFooterContainers">
          <div className="footerContentBlockDiv">
            <div className="writtentContentHoldingOuterDiv" id="footerContentDivID1">
              <h1>Get in Touch</h1>
              <div className="footerparaHold">
                <p> Rajarambapu Institute of Technology, Rajaramnagar.
                  <br />📍 Tal. Walwa Dist. Sangli, Maharashtra(415414) <br />
                  📧 director@ritindia.edu <br />
                  ☎️ Landline : + 912342-220329, + 919970700700 <br />
                  🎫 Admission : + 919970700800 <br />
                </p>
              </div>
              <div className="footerdiv">
                <a href="https://www.instagram.com/ritindiaedu?igsh=dW1sYTg3bTFpcDZk" target="_blank" rel="noopener noreferrer">
                  <img src={insta_logo} alt="" />
                </a>
                <a href="https://www.linkedin.com/school/rajarambapu-institute-of-technology-rajaramnagar-sakharale/" target="_blank" rel="noopener noreferrer">
                  <img src={linkedin_logo} alt="" />
                </a>
                <a href="https://www.youtube.com/@ritindia_edu" target="_blank" rel="noopener noreferrer">
                  <img src={youtube_logo} alt="" />
                </a>
              </div>
            </div>
          </div>

          <div className="footerContentBlockDiv" id="footerContentBlockDivId">
            <div className="footerContentDiv" id="footerContentDivID2">
              <div className="footerInnerContentDivs" id="footerInnerContentDivsID1">
                <div className="footerClgLinkHoldingDiv">
                  <h1>🌐</h1>
                  <Link to="https://ritindia.edu/ritwebsite/website/index.php" className="visitCollegeLink" target="_blank" rel="noopener noreferrer">Visit the college website</Link>
                </div>
              </div>
              <div className="footerInnerContentDivs" id="footerInnerContentDivsID2">
                <div className="footerClgLinkHoldingDiv">
                  <h1>📞</h1>
                  <p to="www.google.com" className="contactUsPara">Contact us at : <br /> +91 2342220989</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
