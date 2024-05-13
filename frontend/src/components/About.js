import React from 'react'
import left_image from '../assets/about_img1.jpg'
import { useNavigate } from 'react-router-dom'
import '../styles/About.css'

export default function About() {
  const navigate = useNavigate();
  function Back() {
    navigate('/')
  }

  return (
    <div className="aboutOuterDiv">
      <div className="about-marquee">
        <div className="inner_marquee_div">
          <marquee behavior="" direction="" >Welcome to Rajarambapu Institute of technology, Islmapur</marquee>
        </div>
      </div>
      <div className="about-out-div">
        <div className="about-content-holding-divs" id="about-content-holding-divsId1">
          <img src={left_image} alt="img" />
        </div>
        <div className="about-content-holding-divs" id="about-content-holding-divsId2" >
          <h5>Rajarambapu Institute of Technology, Rajaramnagar (formerly known as College of Engineering, Sakharale) was started in 1983. Located near Islampur, 7 kms away from Peth Naka off Pune -Bangalore highway, RIT has a green beautiful campus of 17 hectares and buildings on it measuring 54,000 sq.m. RIT has emerged as a leading technological Institute in Western Maharashtra through its dedicated and disciplined approach to provide quality technical education over a period of more than thirty seven years.</h5>
          <br />
          <h5>At RIT, we believe in fostering a vibrant and inclusive community where students can explore their passions, develop new skills, and forge lifelong connections. With a user-friendly interface, our website provides students with easy access to information about each club. Join us in celebrating the diversity, creativity, and spirit of collaboration that define the club culture at RIT. Together, let's embark on a journey of exploration, growth, and friendship as we build a stronger, more connected college community, one club at a time. Join us in celebrating the diversity, creativity, and spirit of collaboration that define the club culture at RIT. Together, let's embark on a journey of exploration, growth, and friendship as we build a stronger, more connected college community, one club at a time.</h5>
          <br />
          <div className="linkHoldersAbout">

            <div className="ritlink">
              <a className="aboutVisitLinks" href="http://ritage.ritindia.edu/ritcms/" target="_blank" rel="noopener noreferrer">RITAGE</a>

            </div>
            <div className="moodlelink">
              <a className="aboutVisitLinks" href="http://210.212.171.173/login/index.php" target="_blank" rel="noopener noreferrer">Moodle Server</a>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}


