import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import header_img from '../assets/homepage_header_img.png'
import img1 from '../assets/background_img1.jpg'
import img2 from '../assets/backgroung_img.jpg'
import '../styles/ShowAllClubDetails.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img3 from '../assets/background_img2.jpg'
import img4 from '../assets/background_img3.jpg'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function ShowAllClubDetails() {
  const [clubDetails, setClubDetails] = useState([]);
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [img1,img2,img3,img4];
  const [searchQuery, setSearchQuery] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [originalData,setOriginalData]=useState([]);
 
  const [roleAdminQueries, setroleAdminQueries] = useState("");
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }
    fetch('http://localhost:3001/api/v1/user/authenticateData', {
      method: 'GET',
      headers: {
        'Authorization': `${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setroleAdminQueries(data.role);
      })
      .catch(error => console.error(error));
  },[roleAdminQueries]);

  //Logic corousel
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
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterRows = () => {
    if (searchQuery.trim() === '') {
      setClubDetails(originalData);
      setSearchPerformed(false);
    } else {
      const filtered = searchPerformed ? originalData : clubDetails;
        const newFiltered = filtered.filter(row =>
          row.clubname.toLowerCase().includes(searchQuery.toLowerCase())
        );
        console.log(newFiltered)
        if(newFiltered.length<=0)
          alert("No match found")
        setClubDetails(newFiltered);
        setSearchPerformed(true);
    }
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    setClubDetails(originalData); // Show all rows
    setSearchPerformed(false);
  };

  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/clubinfo/showClubData'); // Make sure the URL is correct
        const clubData = await response.json();
        const response1 = await fetch('http://localhost:3001/api/v1/user/getPresident'); // Make sure the URL is correct 
        const presidentData = await response1.json();
        const mergedData = clubData.map(club => {
          const president = presidentData.find(president => president.clubname === club.clubname);
          return {
            ...club,
            president: president ? president.president : 'Not updated' // Set president to 'Unknown' if not found
          };
        });
        setClubDetails(mergedData);
        setOriginalData(mergedData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchClubDetails();
  },[]); 

  const handleInsightClick = (clubUserName) => {
    console.log(clubUserName);
    navigate('/clubinsight',{ state: clubUserName });
  };

  return (
    <div>
      <div className="outer_container">
      <div className="alert alert-success  alert-dismissible fade show" role="alert"  >
        For Adding or Deleting your club from website, meet the website admin.
        </div>
        <div className="OuterhomePageHeaderDiv">
          <div className="innerhomePageHeaderDiv">
            <div className="heading">
              <img src={header_img} alt="" />
              <h1 className="homePageWelcomeHeading">Welcome to the Clubs of RIT</h1>
              <hr/>
              <img src={header_img} alt="" />
            </div>
            <div className="subheading">
            </div>
          </div>
        </div>
        <div className="carousel">
      <div className="carousel_Button" id="prevButton"><button onClick={prevSlide}> <b> &#10094;</b></button></div>
      <div className="carousel_imageDiv"><img src={images[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
      </div>
    <div className="carousel_Button" id="nextButton">  <button onClick={nextSlide}><b>&#10095;</b></button>
   </div>
     </div>
      <div className="searchclub_option">
      <h3><i> Search the Club here!!!</i></h3>
          <div className="clubSearchBar">
            <input type="text" className='searchBarClubInput'value={searchQuery} onChange={handleSearchChange} placeholder="Type club's name to search..."/>
          <div className="clubSearchButtonsDiv">
            <button onClick={filterRows} className='searchclubbuttons' id="searchClubInputButton">Search</button>
            <button onClick={clearSearch} className='searchclubbuttons' id="searchClubClearButton">Clear</button>
          </div>
         </div>
      </div>
      <div className="card_holding_div">
        {clubDetails.map((club, index) => (
          <div className="card_inner_div" key={index}>
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={club.logo} className="img-fluid rounded-start" alt="..."/>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title"><b>{club.clubname}</b></h5>
                    <hr />
                    <p className="card-text" id="card-textIdpara"><b>Club Email :</b> {club.useremail}</p>
                    <p className="card-text"><small className="text-body-secondary1"><b>Establishment :</b> {new Date(club.date).toLocaleDateString('en-GB')}</small></p>
                    <p className="card-text"><small className="text-body-secondary1"><b>President :</b> {club.president}</small></p>
                  
                    <div className="takeInsightButtonDiv">
                    <button type="button" className="btn btn-info"  onClick={() => handleInsightClick(club.clubname)}> Take Insight</button>
                    </div>
                    </div>
                </div>
              </div>
            </div> 
          </div>
        ))}
        </div>
     </div>
     {  roleAdminQueries ==='admin' &&
                     <p>🖋️<Link to='/seequeries'>  See Student Queries</Link></p>
      }
     <div className="hrDiv">
      <hr className="showallclubdetailshrwidth" />
      </div>
    </div>
  );
}
