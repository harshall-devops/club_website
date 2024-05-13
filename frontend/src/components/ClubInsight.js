import React, { useState } from 'react'
import '../styles/ClubInsight.css'
import img1 from '../assets/background_img1.jpg'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'

export default function ClubInsight(props) {
  const [currentSlide, setCurrentSlide] = useState(0);
    const [specificClubData, setClubData]=useState();
    const [images,setclubImages]=useState([]);
    const {state}=useLocation();
    const defaultImageUrl = img1;

    useEffect(()=>{
        const getClubDetails=async ()=>{
            try{
                const response=await fetch(`http://localhost:3001/api/v1/clubinfo/showClubData/${state}`)
                const data=await response.json();
                setClubData(data);
                const filteredImages = data.images.filter(image => image.status === true);
                setclubImages(filteredImages); 
            }catch(e){
                console.log('Error fetching data:');
            }
        }; 
        getClubDetails(); 
    },[]);


    //Logic for sliding corousel images
      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
        }, 3000);
    
        return () => clearInterval(interval);
      }, [images.length]);
    
      const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
      };
    
      const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
      };

return (
    <div className="clubInsightOuterDiv">
      {specificClubData && (
      <div className="insightInnerContainer">
        <div className="insightInner_div1">
          <div className="insightheaderDiv">
            <div className="insightInnerHoldingDiv">
              <img src={specificClubData.logo} alt="" />
              <div className="clubnameDiv">
              <h1>
                {specificClubData ? specificClubData.clubname : 'Club Name'}
                </h1>
              </div>
               </div>
               <div className="establishDateDiv">
                <p>Established on :- {new Date(specificClubData.date).toLocaleDateString('en-GB')}</p>
               </div>
          </div>
        </div>
        <div className="carousel">
      <div className="carousel_Button" id="prevButton"><button onClick={prevSlide}> <b> &#10094;</b></button></div>
      <div className="carousel_imageDiv">
      <img src={images.length > 0 ? images[currentSlide]?.path : defaultImageUrl} alt={`Slide ${currentSlide + 1}`} />

      </div>
    <div className="carousel_Button" id="nextButton">  <button onClick={nextSlide}><b>&#10095;</b></button>
   </div>
     </div>
          <h1 className="exploreHeading">EXPLORE MORE HERE!!!</h1>

        <div className="insightInner_div2">
          <div className="insightContentHoldingDiv" id="insightContentHoldingDivID1">
            <div className="accordianDiv">
              <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                      Club Introduction
                    </button>
                  </h2>
                  <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                      <p>{specificClubData && specificClubData.introduction ? specificClubData.introduction : 'No information available'}</p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                      Achievements
                    </button>
                  </h2>
                  <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                   {specificClubData.achievements.filter(achievement=>achievement.status).map((achievement)=>(
                    <div className="achievement_club" key={achievement._id}>
                   <h4 className="achievementTitle" >{achievement.achievement_Title}</h4> <br />
                   <p  className="achievementDescription" >{achievement.achievement_Description}</p> <br />
                    <div className="accordian_images_achievement">
                      <div className="image-grid">
                      {achievement.images.filter(image=>image.status).map((image)=>(
                        <img src={image.path} alt=""></img>
                    ))}
                    </div>
                    </div>
                    <hr />
                    <br />
                   </div>
                   ))}
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                        Events
                      </button>
                    </h2>
                    <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                      {specificClubData.events.filter(event=>event.status).map((event)=>(
                        <div className="event_club" key={event._id}>
                            <h4 className="eventTitle" >{event.event_Title}</h4> <br />
                              <p  className="eventDescription" >{event.event_Description}</p> <br />
                                <div className="accordian_images_event">
                                    <div className="image-grid">
                                      {event.images.filter(image=>image.status).map((image)=>(
                                        <img src={image.path} alt=""></img>
                                    ))}
                                    </div>
                                  </div>
                                  <hr />
                                  <br />
                                </div>
                                ))}
                              </div>
                        </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                        Members
                      </button>
                    </h2>
                    <div id="flush-collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body">
                          <div className="members_club">
                          <table border="1">
                              <tr>
                                <th className="clubInsightTh" >Member Name</th>
                                <th className="clubInsightTh">Member Position</th>
                                <th className="clubInsightTh" >Photo</th>
                              </tr>
                              {specificClubData.members.filter(member=>member.status).sort((a, b) => b.year - a.year).map((member)=>(
                              <tr key={member._id}>
                                <td  className="clubInsightTd" >{member.member_Name}</td>
                                <td className="clubInsightTd" >{member.member_Position}</td>
                                <td  className="clubInsightTd" ><img src={member.member_image} alt="" className="member_Image"/></td>
                              </tr>
                              ))}
                          </table>
                        </div>
                        </div> 
                      </div>
                  </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
        )}
    </div>
  );
}
