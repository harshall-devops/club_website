import React, { useState } from 'react';
import { useEffect } from 'react';
import '../styles/EditClub.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import editClubImg from '../assets/editClubModuleMainImage.png'

const EditClub = () => {

  //State variable declarations

  //Initial Form variables
  const [initialFormDivStyle, SetinitialFormDivStyle] = useState({ position: "relative" });
  const [roleAdmin, setroleAdmin] = useState("");
  const [initialFormClubname, SetInitialFormClubname] = useState("");
  const [initialLogin, SetInitialLogin] = useState(false);
  const [initialIntroduction, SetInitialIntroduction] = useState('');
  const [initialMoto, SetInitialMoto] = useState('');
  const [initialDate, SetInitialDate] = useState('');

  // State variable for changing selected img
  const [image, setImage] = useState(null);
  const [choosenImgId, SetChoosenImgId]=useState();

  //Setting Drop Down variables
  const [dropnames, setDropDown] = useState([]);

  //Style Change State functions and variables
  const [editStyleBlock, setEditStyleBlock] = useState({ display: "none" });
  const [editClubImageStyle, changeEditClubImgeStyle] = useState({});
  const [styleintro, SetIntroStyle] = useState({});
  const [styledate, SetDateStyle] = useState({});
  const [stylemoto, SetMotoStyle] = useState({});
  const [styleachievements, SetAchievementStyle] = useState({ display: "none" });
  const [editAchievementTableStyle, SetEditAchievementTableStyle] = useState({ display: "none" })
  const [styleevent, SetEventStyle] = useState({ display: "none" });
  const [editEventTableStyle, SetEditEventTableStyle] = useState({ display: "none" })
  const [stylemember, SetMemberStyle] = useState({ display: "none" });
  const [editMemberTableStyle, SetEditMemberTableStyle] = useState({ display: "none" })
  const [logostyle, SetLogoStyle] = useState({});
  const [styleimages, setImageStyle] = useState({ display: "none" });
  const [editImageTableStyle, setEditClubImageTableStyle] = useState({ display: "none" });

  //Content Change State functions and variables
  const [alldata, setAlldata] = useState('');
  const [clubname, setOption] = useState('');
  const [introContent, setIntroContent] = useState('')
  const [dateContent, setDate] = useState('');
  const [motoContent, setMoto] = useState('');
  const [achievementTitle, setAchievementTitle] = useState('');
  const [achievementDescription, setAchievementDescription] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [memberTitle, setMemberTitle] = useState('');
  const [memberDescription, setMemberDescription] = useState('');
  const [memberClass, setMemberClass] = useState('');
  const [memberPrn, setMemberPrn] = useState('');
  const [memberMobileNumber, setMemberMobileNumber] = useState('');
  const [memberBranch, setMemberBranch] = useState('');
  const [memberImage, setMemberImage] = useState('');
  const [logoContent, SetLogoContent] = useState('');

  //Fetching and displaying the achievement, event, member details and images
  const [showAchievement, setShowAchievement] = useState([]);
  const [showEvent, setShowEvent] = useState([]);
  const [showMember, setShowMember] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [showImage, SetShowImage] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

 //Search Query state variables
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
   setAchievementDescription('')
   setAchievementTitle('')
  }, [showAchievement]);

  useEffect(() => {
    setEventDescription('')
    setEventTitle('')
   }, [showEvent]);

   useEffect(() => {
    setMemberTitle('')
    setMemberPrn('')
    setMemberMobileNumber('')
    setMemberDescription('')
    setMemberClass('')
    setMemberBranch('')
   }, [showMember]);

  //Fetching the token data
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
        setroleAdmin(data.role);
        SetInitialLogin(data.initialLogin);
        SetInitialFormClubname(data.clubname); // Set initialFormClubname here
      })
      .catch(error => console.error(error));
  }, [roleAdmin]);


  //Fetching the initialLogi variable value as per role president and clubname.
  useEffect(() => {
    if (initialFormClubname) { // Ensure initialFormClubname is not empty
      fetch(`http://localhost:3001/api/v1/user/getInitialLogin/${initialFormClubname}`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(data => {
          SetInitialLogin(data.initialLogin);
          console.log(data.initialLogin);
        })
        .catch(error => console.error(error));
    }
  }, [initialFormClubname]);

  //Functions for manipulating Data

  //Fetching club's data
  useEffect(() => {
    const getClubDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/clubinfo/showClubData/${clubname}`)
        const data = await response.json();
        setAlldata(data);
      } catch (e) {
        console.log('Error fetching data:');
      }
    };
    getClubDetails();
  }, [alldata]);

  //Function to handle img change
  const handleImageChange = (event, imgId) => {
    SetChoosenImgId(imgId);
    setImage(event.target.files[0]);
    const file = event.target.files[0];
  const maxSize = 10 * 1024 * 1024; // 10 MB in bytes

  if (file && file.size > maxSize) {
    alert("Image size exceeds the limit of 10 MB. Please select an image having space less than 10MB.");
    event.target.value = null;
    return;
  }
  };

  //Function to update the selected Logo 
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(choosenImgId!=3){
      alert("Error in uploading image")
    }
    else{
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('clubname', clubname);

      const response = await fetch(`http://localhost:3001/upload/updateLogo/${clubname}`, {
        method: 'PUT',
        body: formData
      });
      const data = await response.json()
      if (data.success) {
        SetLogoContent(data.path)
        alert('Logo Updated successfully!');
        setImage('');
      } else {
        alert('Plese select the image and then click on Update Logo');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(error);
    }
  }
  };

  //Function to handle the uploaded member img 
  const handleMemberImageUpload = async (event, memberId) => {
    event.preventDefault();
    if(choosenImgId!=memberId){
      alert("Error in updating the image")
    }
    else{
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('clubname', clubname);
      const response = await fetch(`http://localhost:3001/upload/updateMemberImage/${clubname}/${memberId}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await response.json()
      if (data.success) {
        setMemberImage(data.path)

        const updatedMembers = showMember.map(member => {
          if (member._id === memberId) {
            return { ...member, member_image: data.path };
          }
          return member;
        });
        setShowMember(updatedMembers);
        alert(data.message);
        setImage('');
      } else {
        alert('Error in updating image, Select the image properly');
      }
    } catch (error) {
      alert('Error in updating image, Select the image properly');
    
    }
  }
  };

  //Function to handle the deleting of achievement image
  const handleAchievementImageDelete = async (event, achievementId, imageId) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', image); // Assuming `image` is defined somewhere in your component
      formData.append('clubname', clubname);
      const response = await fetch(`http://localhost:3001/upload/deleteImage/${clubname}/${achievementId}/${imageId}`, {
        method: 'PUT', // Assuming this is a PUT request to update the image status
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        // Update the UI by marking the status of the deleted image as false
        setShowAchievement(prevAchievements =>
          prevAchievements.map(achievement => {
            if (achievement._id === achievementId) {
              return {
                ...achievement,
                images: achievement.images.map(img => {
                  if (img._id === imageId) {
                    return { ...img, status: false }; // Update the image status to false
                  } else {
                    return img;
                  }
                })
              };
            } else {
              return achievement;
            }
          })
        );
        alert(data.message);
      } else {
        alert("Error in deleting the image");
      }
    } catch (error) {
      alert("Error in deleting image");
    }
  };

   //Function to handle the updating of achievement image
  const handleAchievementImageUpdate = async (event, achievementId, imageId) => {
    event.preventDefault();
    if(choosenImgId!=imageId){
      alert("Error in uploading the image")
    }
    else{
    try {
      const formData = new FormData();
      formData.append('image', image); // Assuming `image` is defined somewhere in your component
      formData.append('clubname', clubname);
      const response = await fetch(`http://localhost:3001/upload/updatedAchievementImage/${clubname}/${achievementId}/${imageId}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        // Update the UI by replacing the old image path with the updated one
        setShowAchievement(prevAchievements =>
          prevAchievements.map(achievement => {
            if (achievement._id === achievementId) {
              return {
                ...achievement,
                images: achievement.images.map(img => {
                  if (img._id === imageId) {
                    return { ...img, path: data.path }; // Update the image path
                  } else {
                    return img;
                  }
                })
              };
            } else {
              return achievement;
            }
          })
        );
        alert('Image Updated successfully!');
        setImage('');
      } else {
        alert('Error in updating image, Select the image properly');
      }
    } catch (error) {
      alert("Error in updating image, Select the image properly");
    }
  }
  };

   //Function to handle the uploading of a achievement image
  const handleAchievementImageUpload = async (event, achievementId) => {
    event.preventDefault();
    if(choosenImgId!=achievementId){
      alert("Error in uploading the image")
    }
    else{
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('clubname', clubname);
      const response = await fetch(`http://localhost:3001/upload/updateAchievementImage/${clubname}/${achievementId}`, {
        method: 'POST', // Assuming this is a POST request to add a new image
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        // Update the UI by adding the newly uploaded image to the respective achievement
        setShowAchievement(prevAchievements =>
          prevAchievements.map(achievement => {
            if (achievement._id === achievementId) {
              return {
                ...achievement,
                images: [...achievement.images, { _id: data.imageId, path: data.path, status: true }]
              };
            } else {
              return achievement;
            }
          })
        );
        alert(data.message);
        setImage('');
      } else {
        alert("Error in uploading the image. Try selecting the image properly");
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Select the image properly.');
    }
  }
  };

  //Function to handle the deleting of event image
  const handleEventImageDelete = async (event, eventId, imageId) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('clubname', clubname);
      const response = await fetch(`http://localhost:3001/upload/deleteEventImage/${clubname}/${eventId}/${imageId}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await response.json()
      if (data.success) {
        setShowEvent(prevEvents =>
          prevEvents.map(event => {
            if (event._id === eventId) {
              return {
                ...event,
                images: event.images.map(img => {
                  if (img._id === imageId) {
                    return { ...img, status: false }; // Update the image status to false
                  } else {
                    return img;
                  }
                })
              };
            } else {
              return event;
            }
          })
        );

        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
     alert("Error in deleting image");
    }
  };

//Function to handle the updating of event image
  const handleEventImageUpdate = async (event, eventId, imageId) => {
    event.preventDefault();
    if(choosenImgId!=imageId){
      alert("Error in updating the image")
    }
    else{
    try {
      const formData = new FormData();
      formData.append('image', image); // Assuming `image` is defined somewhere in your component
      formData.append('clubname', clubname);

      const response = await fetch(`http://localhost:3001/upload/updatedEventImage/${clubname}/${eventId}/${imageId}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {

        setShowEvent(prevEvents =>
          prevEvents.map(event => {
            if (event._id === eventId) {
              return {
                ...event,
                images: event.images.map(img => {
                  if (img._id === imageId) {
                    return { ...img, path: data.path }; // Update the image path
                  } else {
                    return img;
                  }
                })
              };
            } else {
              return event;
            }
          })
        );
        alert(data.message);
        setImage('');
      } else {
        alert("Error in updating image, Select the image properly");
      }
    } catch (error) {
      alert("Error in updating image, Select the image properly");
    }
  }
  };

  //Function to handle the uploading of a event image
  const handleEventImageUpload = async (event, eventId) => {
    event.preventDefault();
    if(choosenImgId!=eventId){
      alert("Error in uploading the image")
    }
    else{
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('clubname', clubname);
      const response = await fetch(`http://localhost:3001/upload/updateEventImage/${clubname}/${eventId}`, {
        method: 'POST', // Assuming this is a POST request to add a new image
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        // Update the UI by adding the newly uploaded image to the respective achievement
        setShowEvent(prevEvents =>
          prevEvents.map(event => {
            if (event._id === eventId) {
              return {
                ...event,
                images: [...event.images, { _id: data.imageId, path: data.path, status: true }]
              };
            } else {
              return event;
            }
          })
        );
        alert(data.message);
        setImage('');
      } else {
        alert("Error in updating image, Select the image properly");
      }
    } catch (error) {
      alert("Error in updating image, Select the image properly");
    }
  }
  };

  //Function to handle the uploading of club's general image
  const handleClubImageImageUpload = async (event) => {
    event.preventDefault();
    if(choosenImgId!=33){
      alert("Error uploading image")
    }
    else{
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('clubname', clubname);
      const response = await fetch(`http://localhost:3001/upload/uploadClubImage/${clubname}`, {
        method: 'POST', // Assuming this is a POST request to add a new image
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        // Update the UI by adding the newly uploaded image to the respective achievement
        SetShowImage(prevImages => {
          const newImage = {
            _id: data.imageId,
            path: data.path,
            status: true,
          };
          console.log(data.path)

          return [...prevImages, newImage];
        });
        alert(data.message);
        setImage('');
      } else {
        alert("Error in updating image. Make sure you have selected the image properly");
      }
    } catch (error) {
      alert("Error in updating image. Make sure you have selected the image properly");
    }
  }
  };

//Function to handle the deleting of club's image
  const handleClubImageDelete = async (e, imageId) => {
    try {
      const response = await fetch(`http://localhost:3001/upload/deleteClubImage/${clubname}/${imageId}`, {
        method: 'PUT'
      })
      const data = await response.json()
      if (data.success) {
        SetShowImage(prevImages =>
          prevImages.map(image => {
            if (image._id === imageId) {
              return { ...image, status: false }; // Update the status of the deleted achievement
            } else {
              return image;
            }
          })
        );

        alert(data.message);
      } else {
        alert("Error in deleting the image");
      }
    } catch (error) {
      alert("Error in loading data")
    }
  }

  //Function to handle the updating of club image
  const handleClubImageUpdate = async (event, imageId) => {
    event.preventDefault();
    if(choosenImgId!=imageId){
      alert("Error in updating the image")
    }
    else{
    try {
      const formData = new FormData();
      formData.append('image', image); // Assuming `image` is defined somewhere in your component
      formData.append('clubname', clubname);
      const response = await fetch(`http://localhost:3001/upload/updateClubImage/${clubname}/${imageId}`, {
        method: 'PUT',
        body: formData
      });
      const data = await response.json();
      if (data.success) {

        SetShowImage(prevImages =>
          prevImages.map(image => {
            if (image._id === imageId) {
              return { ...image, path: data.path };
            } else {
              return image;
            }
          })
        );
        alert(data.message);
        setImage('');
      } else {
        alert("Error in updating image. Make sure you have selected the image properly");
      }
    } catch (error) {
      alert("Error in updating image. Make sure you have selected the image properly");
    }
  }
  };

  //Function to fetch the data for dropdown
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
      .then(data => setDropDown(data))
      .catch(error => console.error(error));
  }, []);

//Styling Change functions
  const showEditBlock = () => {
    if (!clubname) {
      alert("Select the club name from the drop down first")
    }
    else {
      setEditStyleBlock({ display: "block" })
      changeEditClubImgeStyle({ display: "none" })
      if (!alldata.introduction)
        setIntroContent("")
      else
        setIntroContent(alldata.introduction);
      if (!alldata.moto)
        setMoto("")
      else
        setMoto(alldata.moto);
      if (!alldata.logo)
        SetLogoContent("")
      else {
        console.log("Logo" + alldata.logo)
        SetLogoContent(alldata.logo);
      }
      if (!alldata.member_image)
        setMemberImage("")
      else
        setMemberImage(alldata.member_image);
    }
  }

  const changeChoice = async (choice) => {
    setOption(choice);
    setEditStyleBlock({ display: "none" })
    SetIntroStyle({ display: "none" })
    SetEventStyle({ display: "none" })
    SetDateStyle({ display: "none" })
    SetMotoStyle({ display: "none" })
    SetAchievementStyle({ display: "none" })
    SetEditAchievementTableStyle({ display: "none" })
    SetEditEventTableStyle({ display: "none" })
    SetMemberStyle({ display: "none" })
    SetEditMemberTableStyle({ display: "none" })
    SetLogoStyle({ display: "none" })
    setImageStyle({ display: "none" })
    setEditClubImageTableStyle({ display: "none" })
  }

  const changeStyleIntro = () => {
    SetIntroStyle({ display: "block" })
    SetEventStyle({ display: "none" })
    SetDateStyle({ display: "none" })
    SetAchievementStyle({ display: "none" })
    SetEditAchievementTableStyle({ display: "none" })
    SetEditEventTableStyle({ display: "none" })
    SetMemberStyle({ display: "none" })
    SetEditMemberTableStyle({ display: "none" })
    SetMotoStyle({ display: "none" })
    SetLogoStyle({ display: "none" })
    setImageStyle({ display: "none" })
    setEditClubImageTableStyle({ display: "none" })
  }

  const changeStyleDate = () => {
    SetDateStyle({ display: "block" })
    SetEventStyle({ display: "none" })
    SetIntroStyle({ display: "none" })
    SetAchievementStyle({ display: "none" })
    SetEditAchievementTableStyle({ display: "none" })
    SetEditEventTableStyle({ display: "none" })
    SetMemberStyle({ display: "none" })
    SetEditMemberTableStyle({ display: "none" })
    SetMotoStyle({ display: "none" })
    SetLogoStyle({ display: "none" })
    setImageStyle({ display: "none" })
    setEditClubImageTableStyle({ display: "none" })
  }

  const changeStyleMoto = async () => {
    SetMotoStyle({ display: "block" })
    SetAchievementStyle({ display: "none" })
    SetEventStyle({ display: "none" })
    SetDateStyle({ display: "none" })
    SetIntroStyle({ display: "none" })
    SetEditAchievementTableStyle({ display: "none" })
    SetEditEventTableStyle({ display: "none" })
    SetMemberStyle({ display: "none" })
    SetEditMemberTableStyle({ display: "none" })
    SetLogoStyle({ display: "none" })
    setImageStyle({ display: "none" })
    setEditClubImageTableStyle({ display: "none" })
  }

  const changeStyleAchievement = async () => {
    SetAchievementStyle({ display: "block" })
    SetEventStyle({ display: "none" })
    SetDateStyle({ display: "none" })
    SetIntroStyle({ display: "none" })
    SetEditAchievementTableStyle({ display: "none" })
    SetEditEventTableStyle({ display: "none" })
    SetMemberStyle({ display: "none" })
    SetEditMemberTableStyle({ display: "none" })
    SetMotoStyle({ display: "none" })
    SetLogoStyle({ display: "none" })
    setImageStyle({ display: "none" })
    setEditClubImageTableStyle({ display: "none" })
  }

  const changeStyleEvent = async () => {
    SetEventStyle({ display: "block" })
    SetAchievementStyle({ display: "none" })
    SetDateStyle({ display: "none" })
    SetIntroStyle({ display: "none" })
    SetEditAchievementTableStyle({ display: "none" })
    SetMemberStyle({ display: "none" })
    SetEditMemberTableStyle({ display: "none" })
    SetMotoStyle({ display: "none" })
    SetLogoStyle({ display: "none" })
    setImageStyle({ display: "none" })
    setEditClubImageTableStyle({ display: "none" })
  }

  const changeStyleMember = async () => {
    SetMemberStyle({ display: "block" })
    SetEventStyle({ display: "none" })
    SetAchievementStyle({ display: "none" })
    SetDateStyle({ display: "none" })
    SetIntroStyle({ display: "none" })
    SetEditAchievementTableStyle({ display: "none" })
    SetEditMemberTableStyle({ display: "none" })
    SetMotoStyle({ display: "none" })
    SetLogoStyle({ display: "none" })
    setImageStyle({ display: "none" })
    setEditClubImageTableStyle({ display: "none" })
  }

  const changeStyleLogo = async () => {
    SetLogoStyle({ display: "block" })
    SetMemberStyle({ display: "none" })
    SetEventStyle({ display: "none" })
    SetAchievementStyle({ display: "none" })
    SetDateStyle({ display: "none" })
    SetIntroStyle({ display: "none" })
    SetEditAchievementTableStyle({ display: "none" })
    SetEditMemberTableStyle({ display: "none" })
    SetMotoStyle({ display: "none" })
    setImageStyle({ display: "none" })
    setEditClubImageTableStyle({ display: "none" })
  }

  const changeClubImageSectionStyle = () => {
    setImageStyle({ display: "block" })
    SetLogoStyle({ display: "none" })
    SetMemberStyle({ display: "none" })
    SetEventStyle({ display: "none" })
    SetAchievementStyle({ display: "none" })
    SetDateStyle({ display: "none" })
    SetIntroStyle({ display: "none" })
    SetEditAchievementTableStyle({ display: "none" })
    SetEditMemberTableStyle({ display: "none" })
    SetMotoStyle({ display: "none" })
    setEditClubImageTableStyle({ display: "none" })
  }

  const changeAchievementAddButtonStyle = () => {
    SetEditAchievementTableStyle({ display: "block" })
  }

  const changeEventAddButtonStyle = () => {
    SetEditEventTableStyle({ display: "block" })
  }

  const changeMemberAddButtonStyle = () => {
    SetEditMemberTableStyle({ display: "block" })
  }

  const changeClubImageAddButtonStyle = () => {
    setEditClubImageTableStyle({ display: "block" })
  }

  //Update information functions :

  // 1. Update Intro
  const ConfirmIntro = async (introValue) => {
    if (introValue === null || introValue == '') {
      alert("Field cannot be kept empty")
    }
    else if(introValue.length>50){
      alert("Word limit exceeded. 50 characters allowed.")
    }
    else {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/update/updateIntroduction/${clubname}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            introduction: introValue
          })
        })
        const data = await response.json();
        if (data.success) {
          alert(data.message)
        }
        else {
          alert(data.message)
        }
      } catch (e) {
        alert("Error in fetching the Api")
      }
    }


  }

  // 2. Update Date
  const ConfirmDate = async (updatedDate) => {
    if (!updatedDate) {
      alert("Enter Date. Field cannot be kept empty")
    }
    else {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/update/updateDate/${clubname}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            date: updatedDate
          })
        });
        const data = await response.json();
        if (data.success) {
          alert(data.message)
        }
        else {
          alert(data.message)
        }
      } catch (e) {
        alert("Error in fetching the Api")
      }
    }

  }

  //3. Updating Moto
  const ConfirmMoto = async (updatedMoto) => {
    if (!updatedMoto) {
      alert("Field cannot be kept empty")
    }
    else if(updatedMoto.length>50){
      alert("Word limit exceeded. 50 characters allowed.")
    }
    else {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/update/updateMoto/${clubname}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            moto: updatedMoto
          })
        })
        const data = await response.json();
        if (data.success) {
          alert(data.message)
        }
        else {
          alert(data.message)
        }
      } catch (e) {
        alert("Error in fetching the Api")
      }
    }
  }

  // 4. Add a new Achievement
  const AddAchievement = async (e, achievement_Title, achievement_Description) => {
    e.preventDefault();
    if (!achievement_Title || !achievement_Description) {
      alert("Fill all the required details");
    }
    else if(achievementTitle.length>50){
      alert("Word limit exceeded. Check your achievement title, only maximum 50 characters allowed.")
    }
    else if(achievementDescription.length>50){
      alert("Word limit exceeded. Check your achievement description, only maximum 50 characters allowed.")
    }
    else {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/update/addAchievement/${clubname}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            achievement_Title: achievement_Title,
            achievement_Description: achievement_Description,
            status: true
          })
        });
        const data = await response.json();
        if (data.success) {
          // Update the showAchievement state variable with the newly added achievement
          setShowAchievement(prevState => {
            const newAchievement = {
              _id: data.achievementId, // Assuming the server returns the ID of the newly added achievement
              achievement_Title: achievement_Title,
              achievement_Description: achievement_Description,
              status: true,
              images: [],
            };
            // Use unshift to add the new achievement at the beginning of the array
            const newState = [newAchievement, ...prevState];
            return newState;
          });
          alert(data.message);
        } else {
          alert(data.message);
          setAchievementTitle('')
          setAchievementDescription('')
        }
      } catch (error) {
        console.error('Error adding achievement:', error);
        alert('Error adding achievement. Please try again.');
      }
    }
    // else {
    //   try {
    //     const response = await fetch(`http://localhost:3001/api/v1/update/addAchievement/${clubname}`, {
    //       method: 'PUT',
    //       headers: {
    //         'Content-type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         achievement_Title: achievement_Title,
    //         achievement_Description: achievement_Description,
    //         status: true
    //       })
    //     }); 
    //     if (data.success) {
    //       // Update the showAchievement state variable with the newly added achievement
    //       setShowAchievement(prevState => [
    //         ...prevState,
    //         {
    //           _id: data.achievementId, // Assuming the server returns the ID of the newly added achievement
    //           achievement_Title: achievement_Title,
    //           achievement_Description: achievement_Description,
    //           status: true,
    //           images: [],
    //         }
    //       ]);
    //       alert(data.message);
    //     } 
    //     else {
    //       alert(data.message);
    //     }
    //   } catch (error) {
    //     console.error('Error adding achievement:', error);
    //     alert('Error adding achievement. Please try again.');
    //   }
    // }
  };


  //5. Update Existing Achievement
  const UpdateAchievement = async (e, achievement_Title, achievement_Description, achievementId) => {
    e.preventDefault();
    if (!achievement_Title || !achievement_Description) {
      alert("Fields cannot be empty");
    }
    else if(achievement_Title.length>50){
      alert("Word limit exceeded. Check your achievement title, only maximum 50 characters allowed.")
    }
    else if(achievement_Description.length>50){
      alert("Word limit exceeded. Check your achievement description, only maximum 50 characters allowed.")
    }
    else {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/update/updateAchievement/${clubname}/${achievementId}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            achievement_Title: achievement_Title,
            achievement_Description: achievement_Description,
            status: true
          })
        })
        const data = await response.json();
        if (data.success) {
          alert(data.message)
        }
        else {
          alert(data.message)
        }
      } catch (e) {
        alert("Error occured: Error in loading data")
      }
    }

  }

  //6. Fetch existing Achievement Details : 
  useEffect(() => {
    const fetchAchievementDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/update/getAchievementDetails/${clubname}`);
        const data = await response.json();
        setShowAchievement(data);
      } catch (error) {
        console.error('Error fetching data:');
      }
    };
    fetchAchievementDetails();
  }, [clubname]);

  const DeleteAchievement = async (e, achievementId) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/v1/update/deleteAchievement/${clubname}/${achievementId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        }
      })
      const data = await response.json();
      if (data.success) {
        setShowAchievement(prevAchievements =>
          prevAchievements.map(achievement => {
            if (achievement._id === achievementId) {
              return { ...achievement, status: false }; // Update the status of the deleted achievement
            } else {
              return achievement;
            }
          })
        );
        alert(data.message)
      } else {
        alert(data.message)
      }
    } catch (error) {
      alert("Error occurred: Error in loading data")
    }
  };

  //7. Handling Input Change in Achivement's Textareas 
  //Change in Achievement title
  const handleAchievementTitleChange = (value, achievementId) => {
    const updatedAchievements = [...showAchievement];
    const updatedAchievementIndex = updatedAchievements.findIndex(achievement => achievement._id === achievementId);
    updatedAchievements[updatedAchievementIndex].achievement_Title = value;
    setShowAchievement(updatedAchievements);
  };

  //Change in Achievement description
  const handleAchievementDescriptionChange = (value, achievementId) => {
    const updatedAchievements = [...showAchievement];
    const updatedAchievementIndex = updatedAchievements.findIndex(achievement => achievement._id === achievementId);
    updatedAchievements[updatedAchievementIndex].achievement_Description = value;
    setShowAchievement(updatedAchievements);
  };

  //Updating the achievement info storing array 
  const handleUpdateAchievement = (e, achievementId) => {
    const updatedAchievement = showAchievement.find(achievement => achievement._id === achievementId);
    const { achievement_Title, achievement_Description } = updatedAchievement;
    UpdateAchievement(e, achievement_Title, achievement_Description, achievementId);
  };

  //Event Manipulation :

  //1. Adding Event 
  const AddEvent = async (e, event_Title, event_Description) => {
    e.preventDefault();
    if (!event_Title || !event_Description) {
      alert("All fields should be mandatorily filled")
    }
    else if(event_Title.length>50){
      alert("Word limit exceeded. Check your event title, only maximum 50 characters allowed.")
    }
    else if(event_Description.length>50){
      alert("Word limit exceeded. Check your event description, only maximum 50 characters allowed.")
    }
    else {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/update/addEvent/${clubname}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            event_Title: event_Title,
            event_Description: event_Description,
            status: true
          })
        });
        const data = await response.json();
        if(data.success){
          setShowEvent(prevState=>{
            const newEvent={
              _id: data.eventId, // Assuming the server returns the ID of the newly added achievement
              event_Title: event_Title,
              event_Description: event_Description,
              status: true,
              images: [],
            }
            const newState = [newEvent, ...prevState];
            return newState;
          })
          alert(data.message);
        }else {
          alert(data.message);
        }
        
        // if (data.success) {
        //   setShowEvent(prevState => [
        //     ...prevState,
        //     {
        //       _id: data.eventId, // Assuming the server returns the ID of the newly added achievement
        //       event_Title: event_Title,
        //       event_Description: event_Description,
        //       status: true,
        //       images: [], // Assuming no images are added initially
        //     }
        //   ]);
        //   alert(data.message);
        //   setEventTitle('')
        //   setEventDescription('')
        // } else {
        //   alert(data.message);
        // }
      } catch (error) {
        console.error('Error adding event:', error);
        alert('Error adding event. Please try again.');
      }
    }

  };

  //2. Fetching Event Details
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/update/getEventDetails/${clubname}`);
        const data = await response.json();
        setShowEvent(data);
      } catch (error) {
        console.error('Error fetching data:');
      }
    };
    fetchEventDetails();
  }, [clubname]);

  //3. Deleting the event
  const DeleteEvent = async (e, eventId) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/v1/update/deleteEvent/${clubname}/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        }
      })
      const data = await response.json();
      if (data.success) {
        setShowEvent(prevEvents =>
          prevEvents.map(event => {
            if (event._id === eventId) {
              return { ...event, status: false }; // Update the status of the deleted achievement
            } else {
              return event;
            }
          })
        );
        alert(data.message)
      } else {
        alert(data.message)
      }
    } catch (e) {
      alert("Error occured: Error in loading data")
    }
  };

  //4. Updating Event
  const UpdateEvent = async (e, event_Title, event_Description, eventId) => {
    e.preventDefault();
    if (!event_Title || !event_Description) {
      alert("All fields should be mandatorily filled")
    }
    else if(event_Title.length>50){
      alert("Word limit exceeded. Check your event title, only maximum 50 characters allowed.")
    }
    else if(event_Description.length>50){
      alert("Word limit exceeded. Check your event description, only maximum 50 characters allowed.")
    }
    else {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/update/updateEvent/${clubname}/${eventId}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            event_Title: event_Title,
            event_Description: event_Description,
            status: true
          })
        })
        const data = await response.json();
        if (data.success) {
          alert(data.message)
        }
        else {
          alert(data.message)
        }
      } catch (e) {
        alert("Error occured: Error in loading data")
      }
    }

  }

  //5. Handlig Input Change in Event textareas
   //Change in event title
  const handleEventTitleChange = (value, eventId) => {
    const updatedEvents = [...showEvent];
    const updatedEventIndex = updatedEvents.findIndex(event => event._id === eventId);
    updatedEvents[updatedEventIndex].event_Title = value;
    setShowEvent(updatedEvents);
  };

   //Change in event description
  const handleEventDescriptionChange = (value, eventId) => {
    const updatedEvents = [...showEvent];
    const updatedEventIndex = updatedEvents.findIndex(event => event._id === eventId);
    updatedEvents[updatedEventIndex].event_Description = value;
    setShowEvent(updatedEvents);
  }
  const handleUpdateEvent = (e, eventId) => {
    const updatedEvent = showEvent.find(event => event._id === eventId);
    const { event_Title, event_Description } = updatedEvent;
    UpdateEvent(e, event_Title, event_Description, eventId);

  };

  const AddMember = async (e, member_Name, member_Position, member_Class, member_Prn, member_Branch, member_MobileNumber) => {
    e.preventDefault();
    const memberMobileRegex = /^[0-9]{10}$/;
    const memberPrnRegex = /^[0-9]+$/;
    const memberNameValidationPattern = /^[A-Za-z\s]+$/

    if (!member_Name || !member_Position || !member_Class || !member_Prn || !member_Branch || !member_MobileNumber) {
      alert("All fields need to be mandatorily filled")
    }
    else if (!(memberNameValidationPattern.test(member_Name))) {
      alert("Name should contain only upper or lower case characters.")
    }
    else if (!(memberMobileRegex.test(member_MobileNumber))) {
      alert("Invalid mobile number. Check the entered data once again")
    }
    else if (!(memberPrnRegex.test(member_Prn))) {
      alert("Invalid Prn")
    }
    else {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/update/addMember/${clubname}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            member_Name: member_Name,
            member_Position: member_Position,
            member_Class: member_Class,
            member_Prn: member_Prn,
            member_Branch: member_Branch,
            member_MobileNumber: member_MobileNumber,
            status: true
          })
        });
        const data = await response.json();
        if (data.success) {
          alert(data.message);
          console.log(data.memberId)
            setShowMember(prevMembers => {
              const newMember = {
                _id: data.memberId,
                member_Name,
                member_Position,
                member_Class,
                member_Prn,
                member_Branch,
                member_MobileNumber,
                status: true,
                member_image: [], // assuming data.member.member_image contains the updated member image
                cnt: data.year // assuming data.cnt contains the count attribute
              };
  
              const updatedMembers = [...prevMembers, newMember];
  
              return updatedMembers
            });
        } else {
          alert(data.message);
        }
      } catch (error) {
        alert("Error occurred: Error in loading data");
      }
    }
  }

  //Function for manipulating Member's Data

  //Getting Member Details :
  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/update/getMemberDetails/${clubname}`);
        const data = await response.json();
        setShowMember(data);
        setOriginalData(data)
      } catch (error) {
        console.error('Error fetching data:');
      }
    };
    fetchMemberDetails();
  }, [clubname]);

  //Updating Member
  const UpdateMember = async (e, member_Name, member_Position, member_Class, member_Prn, member_Branch, member_MobileNumber, memberId) => {
    e.preventDefault();
    const memberNameValidation=/^[A-Za-z\s]+$/
    const memberMobileValidation=/^[0-9]{10}$/
    const memberPrnValidation=/^[0-9]+$/
   
    
    if (!memberNameValidation.test(member_Name)) {
      alert("Only Alphabets are allowed")
    }
    else if (!memberPrnValidation.test(member_Prn)) {
      alert("Invalid PRN")
    }
    else if (!memberMobileValidation.test(member_MobileNumber)) {
      alert("Invalid mobile number")
    }
    else {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/update/updateMember/${clubname}/${memberId}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            member_Name: member_Name,
            member_Position: member_Position,
            member_Class: member_Class,
            member_Prn: member_Prn,
            member_Branch: member_Branch,
            member_MobileNumber: member_MobileNumber,
            status: true
          })
        })
        const data = await response.json();
        if (data.success) {
          alert(data.message)
        }
        else {
          alert(data.message)
        }
      } catch (e) {
        alert("Error occured: Error in loading data")
      }
    }

  }

  //Deleting Member
  const DeleteMember = async (e, memberId) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/v1/update/deleteMember/${clubname}/${memberId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        }
      })
      const data = await response.json()
      if (data.success) {
        setShowMember(prevMembers =>
          prevMembers.map(member => {
            if (member._id === memberId) {
              return { ...member, status: false }; // Update the status of the deleted achievement
            } else {
              return member;
            }
          })
        );

        alert(data.message);
      }
      else {
        alert(data.message)
      }
    } catch (e) {
      alert("Error occured: Error in loading data")
    }
  }

  const handleMemberTitleChange = (value, memberId) => {
    const updatedMembers = [...showMember];
    const updatedMemberIndex = updatedMembers.findIndex(member => member._id === memberId);
    updatedMembers[updatedMemberIndex].member_Name = value;
    setShowMember(updatedMembers);

  };

  const handleMemberDescriptionChange = (value, memberId) => {
    const updatedMembers = [...showMember];
    const updatedMemberIndex = updatedMembers.findIndex(member => member._id === memberId);
    updatedMembers[updatedMemberIndex].member_Position = value;
    setShowMember(updatedMembers);
  }

  const handleMemberClassChange = (value, memberId) => {
    const updatedMembers = [...showMember];
    if (value != null || value != '') {
      const updatedMemberIndex = updatedMembers.findIndex(member => member._id === memberId);
      updatedMembers[updatedMemberIndex].member_Class = value;
    }
    setShowMember(updatedMembers);
  }
  const handleMemberPrnChange = (value, memberId) => {
    const updatedMembers = [...showMember];
    const updatedMemberIndex = updatedMembers.findIndex(member => member._id === memberId);
    updatedMembers[updatedMemberIndex].member_Prn = value;
    setShowMember(updatedMembers);
  }

  const handleMemberBranchChange = (value, memberId) => {
    const updatedMembers = [...showMember];
    const updatedMemberIndex = updatedMembers.findIndex(member => member._id === memberId);
    updatedMembers[updatedMemberIndex].member_Branch = value;
    setShowMember(updatedMembers);
  }
  const handleMemberMobileChange = (value, memberId) => {
    const updatedMembers = [...showMember];
    const updatedMemberIndex = updatedMembers.findIndex(member => member._id === memberId);
    updatedMembers[updatedMemberIndex].member_MobileNumber = value;
    setShowMember(updatedMembers);
  }

  const handleUpdateMember = (e, memberId) => {
    const updatedMember = showMember.find(member => member._id === memberId);
    const { member_Name, member_Position, member_Class, member_Prn, member_Branch, member_MobileNumber } = updatedMember;
    UpdateMember(e, member_Name, member_Position, member_Class, member_Prn, member_Branch, member_MobileNumber, memberId);
  };


  //Showing Images, in Image Section 
  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/update/getClubImageDetails/${clubname}`);
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('API response is not an array');
        }
        SetShowImage(data);
      } catch (error) {
        console.error('Error fetching image');
      }
    };
    fetchImageDetails();
  }, [clubname]);

  //Handle Search :
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterRows = () => {
    if (searchQuery.trim() === '') {
      // If search query is empty, show all rows
      setShowMember(originalData);
      setSearchPerformed(false);
      alert("Field Empty")
    } else {
      const filtered = searchPerformed ? originalData : showMember;
      const newFiltered = filtered.filter(row =>
        row.member_Name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (newFiltered.length <= 0)
        alert("No match found")
      setShowMember(newFiltered);
      setSearchPerformed(true);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowMember(originalData);
    setSearchPerformed(false);
  };

  const submitInitialResponse = async (e) => {
    e.preventDefault()
    const currClubDate=new Date();
    const enteredNewDate=new Date(initialDate)
    if (!initialIntroduction || !initialMoto || !initialDate) {
      alert("Filling each field is mandatory")
    }
    else if(enteredNewDate > currClubDate){
      alert("Date Invalid.")
    }
    else {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/clubinfo/clubInitialInfoForm/${initialFormClubname}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            introduction: initialIntroduction,
            moto: initialMoto,
            date: initialDate
          })
        })
        const response1 = await fetch(`http://localhost:3001/api/v1/user/changeInitialLogin/${initialFormClubname}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const data = await response.json();
        const data1 = await response1.json();
        if (data.success) {
          alert(data.message);
          SetInitialLogin(false)
          SetinitialFormDivStyle({ display: "none" })
        } else {
          alert(data.message);
        }
        if (data1.success) {
          console.log(data1.message);
        } else {
          console.log(data1.message);
        }
      } catch (e) {
        alert("Error in fetching the Api")
      }
    }
  }

  return (
    <div className="editClubMainOuterDiv">
      <div className="editClubOuterDiv">
        {
          (roleAdmin === "admin" && <div className="changePasswordLinkDiv"><Link to="/forgotpassowrd" className="changePasswordLink" >Change Password</Link></div>)
        }
        {
          (roleAdmin === "president" && initialLogin === true &&
            <div className='intialFormOuterDiv' style={initialFormDivStyle}>
              <div className="intialFormInnerDiv">
                <h2>Fill the primary details</h2>
                <form action="">
                  <div className="initialFormDiv">
                    <label htmlFor="" className='initialFormLabels'>Enter club's introduction</label> <br />
                    <input type="text" className='initialFormInputs' value={initialIntroduction} onChange={(e) => SetInitialIntroduction(e.target.value)} />

                  </div>
                  <div className="initialFormDiv">
                    <label htmlFor="" className='initialFormLabels'>Enter club's moto/goal</label><br />
                    <input type="text" className='initialFormInputs' value={initialMoto} onChange={(e) => SetInitialMoto(e.target.value)} />

                  </div>
                  <div className="initialFormDiv">
                    <label htmlFor="" className='initialFormLabels'>Enter club's establishment date</label><br />
                    <input type="date" className='initialFormInputs' value={initialDate} onChange={(e) => SetInitialDate(e.target.value)} />

                  </div>
                  <div className="initialFormButtonDiv">
                    <input type="button" value='SUBMIT' className='initialFormButton' onClick={(e) => submitInitialResponse(e)} />
                  </div>
                </form>
              </div>
            </div>
          )
        }
        <div className="editClubMainHeading">
          <h1>EDIT THE REQUIRED CLUB DETAILS</h1>
        </div>
        <div className="editClubDropDown">
          <div className="editClubDropDwonHoldingDiv">
            <select name="" id="" onChange={(e) => changeChoice(e.target.value)}>
              <option value=""></option>
              {dropnames.map((names, index) => (
                <option key={index} value={names}>{names}</option>
              ))}
            </select>
          </div>
          <input type="button" value="EDIT" className='editConfirmbutton' onClick={() => showEditBlock()} />
        </div>

        <div className="editClubImageHolder">
          <img src={editClubImg} alt="" className="back_img1" style={editClubImageStyle} />
        </div>

        {alldata && (
          <div className="editClubMainContentHoldingOuterDiv">
            <div className="editClubMainHoldingInnerDiv" style={editStyleBlock}>
              <div className="ButtonOuterDiv">
                <div className="Buttons_Div">
                  <div className="editButtonsDiv" id="updateIntroductionButtonDivID">
                    <button className='editButtonclass' id="updateIntroductionButtonID" onClick={(e) => changeStyleIntro(e)} > ✏️ Update Club Introduction</button>
                  </div>
                  <div className="editButtonsDiv" id="updateDateButtonDivID">
                    <button className='editButtonclass' id="updateDateButtonID" onClick={(e) => changeStyleDate(e)} >🖊️ Update Establishment Date</button>
                  </div>
                  <div className="editButtonsDiv" id="updateMotoButtonDivID">
                    <button className='editButtonclass' id="updateMotoButtonID" onClick={(e) => changeStyleMoto(e)}> → Update Moto</button>
                  </div>
                  <div className="editButtonsDiv" id="updateachievementButtonDivID">
                    <button className='editButtonclass' id="updateachievementButtonID" onClick={(e) => changeStyleAchievement(e)} >🏆 Update Achievement Section</button>
                  </div>
                </div>
                <div className="Buttons_Div">
                  <div className="editButtonsDiv" id="updateEventButtonDivID">
                    <button className='editButtonclass' id="updateEventButtonID" onClick={() => changeStyleEvent()} >📖 Update Event Section</button>
                  </div>
                  <div className="editButtonsDiv" id="updateMemberButtonDivID">
                    <button className='editButtonclass' id="updateMemberButtonID" onClick={(e) => changeStyleMember(e)} >👤 Update Member</button>
                  </div>
                  <div className="editButtonsDiv" id="updateLogoButtonDivID">
                    <button className='editButtonclass' id="updateLogoButtonID" onClick={(e) => changeStyleLogo(e)}>📷 Update Logo</button>
                  </div>
                  <div className="editButtonsDiv" id="updateImagesButtonDivID">
                    <button className='editButtonclass' id="updateImagesButtonID" onClick={(e) => changeClubImageSectionStyle(e)} > 🏷️ Update Images</button>
                  </div>
                </div>
              </div>

              <div className="displayEditingContentOuterDiv">

                <div className="displayEditingContentInnerDiv">
                  <div className="editableContentDiv" style={styleintro} >
                    <h2>Update Club Introduction</h2>
                    <textarea name="" id="editintro" cols="30" rows="5" value={introContent} onChange={(e) => setIntroContent(e.target.value)}></textarea>
                    <input type="button" value="CONFIRM" className='confirmEditButton' id="confirmIntroductionUpdate" onClick={() => ConfirmIntro(introContent)} />

                  </div>

                  <div className="editableContentDiv" style={styledate}>

                    <h2>Update Establishment Date</h2>
                    <input type="date" id="dateElement" onChange={(e) => setDate(e.target.value)} /> <br />
                    <input type="button" value="Set Date" className='confirmEditButton' onClick={() => ConfirmDate(dateContent)} />
                  </div>

                  <div className="editableContentDiv" style={stylemoto} >
                    <h2>Update Club Moto</h2>
                    <textarea name="" id="editmoto" cols="30" rows="5" value={motoContent} onChange={(e) => setMoto(e.target.value)}></textarea>
                    <input type="button" value="CONFIRM" className='confirmEditButton' id="confirmMotoUpdate" onClick={() => ConfirmMoto(motoContent)} />
                  </div>

                  <div id="achievementUpdationTableDiv">
                    <div className="editingButtonHolderMainOuterDiv" style={styleachievements} id="editingButtonHolderMainOuterDivId1">
                      <button onClick={() => changeAchievementAddButtonStyle()} className="addAchievementButton" >Add New Club Achievement</button>
                      <form action="" style={editAchievementTableStyle}>
                        <table className="addAchievementTable">
                          <tr>
                            <th className="addAchievememntTitleTableColumn">Add Achievement Title</th>
                            <th className="addAchievememntDescriptionTableColumn">Add Achievemenet Description</th>
                            <th className="add_achievement_button"></th>
                          </tr>
                          <tr>
                            <td className='InnerColumnClass'>
                              <textarea name="" id="" className="add_title" value={achievementTitle} onChange={(e) => setAchievementTitle(e.target.value)} ></textarea>
                            </td>
                            <td className='InnerColumnClass'>
                              <textarea name="" id="" className="add_description" value={achievementDescription} onChange={(e) => setAchievementDescription(e.target.value)} ></textarea>
                            </td>
                            <td className='InnerColumnClass'>
                              <button className="editAchievementButton" id="addAchievementButton" onClick={(e) => AddAchievement(e, achievementTitle, achievementDescription)}>ADD ACHIEVEMENT</button>
                            </td>
                          </tr>
                        </table>
                      </form>

                      <table border="1">
                        <thead    >
                          <tr className="AchievementTableHeading">
                            <th className="first-column">Achievement Title</th>
                            <th className="second-column">Achievement Description</th>
                            <th className="fifth-column">Images </th>
                            <th className="third-column"></th>
                            <th className="fourth-column"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {showAchievement.filter(achievement => achievement.status).map((achievement, index) => (
                            <tr key={achievement._id}>
                              <td className="InnerColumnClass">
                                <textarea
                                  className="achievementTitleTextarea"
                                  name=""
                                  id={`achievementTitleTextarea-${achievement._id}`}
                                  rows="15"
                                  value={achievement.achievement_Title}
                                  onChange={(e) =>
                                    handleAchievementTitleChange(e.target.value, achievement._id)
                                  }
                                ></textarea>
                              </td>
                              <td className="InnerColumnClass">
                                <textarea
                                  className="achievementDescriptionTextarea"
                                  name=""
                                  id={`achievementDescriptionTextarea-${achievement._id}`}
                                  rows="15"
                                  value={achievement.achievement_Description}
                                  onChange={(e) =>
                                    handleAchievementDescriptionChange(e.target.value, achievement._id)
                                  }
                                ></textarea>
                              </td >
                              <td className="InnerColumnClass">
                                <form onSubmit={(e) => handleAchievementImageUpload(e, achievement._id)} className="achievementImageUploadForm"  >

                                  <div className="addImageAchievementDiv">
                                    <input type="file" accept="image/*" onChange={(e)=>handleImageChange(e,achievement._id)} className="achievementImageInput" />
                                  </div>
                                  <br />
                                  <button type="submit" id="add_achievement_image_button">ADD IMAGE</button>
                                </form>
                                {achievement.images.filter(image => image.status).map((image) => (
                                  <div className="achievementHoldingImageDiv" key={image._id}>
                                    <form action="" >
                                      <img src={image.path} alt="Achievement" className="TableImages" />
                                      <button className='achievementDeleteInnerImageButtons' id={`delete_achievement_image_button_${index}`} onClick={(e) => handleAchievementImageDelete(e, achievement._id, image._id)} >Delete image</button>
                                      <input type="file" accept="image/*" onChange={(e)=>handleImageChange(e,image._id)} className="achievementImageInput" />
                                      <button type="submit" className='achievementUpdateInnerImageButtons' id={`update_achievement_image_button_${index}`} onClick={(e) => handleAchievementImageUpdate(e, achievement._id, image._id)}>Update Image</button>
                                    </form>
                                  </div>
                                ))}

                              </td>
                              <td className="InnerColumnClass">
                                <button className="editAchievementButton" id="deleteAchievementButton" onClick={(e) => DeleteAchievement(e, achievement._id)}>DELETE</button>
                              </td>
                              <td className="InnerColumnClass">
                                <button className="editAchievementButton" id="updateAchievementButton" onClick={(e) => handleUpdateAchievement(e, achievement._id)}> UPDATE</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div id="eventUpdationTableDiv">
                    <div className="editingButtonHolderMainOuterDiv" style={styleevent} id="editingEventButtonHolderMainOuterDivId1">

                      <button onClick={() => changeEventAddButtonStyle()} className="addEventButton" >Add New Club Event</button>
                      <form action="" style={editEventTableStyle}>
                        <table className="addEventTable">
                          <tr>
                            <th className="addEventTitleTableColumn">Add Event Title</th>
                            <th className="addEventDescTableColumn" >Add Event Description</th>
                            <th className="add_event_button"></th>
                          </tr>
                          <tr>
                            <td className='InnerColumnClass'>
                              <textarea name="" id="" className="add_title" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} ></textarea>
                            </td>
                            <td className='InnerColumnClass'>
                              <textarea name="" id="" className="add_description" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} ></textarea>
                            </td>
                            <td className='InnerColumnClass'>
                              <button className="editEventButton" id="addEventButton" onClick={(e) => AddEvent(e, eventTitle, eventDescription)}>ADD EVENT</button>
                            </td>
                          </tr>
                        </table>
                      </form>

                      <table>
                        <thead>
                          <tr>
                            <th className="first-column">Event Title</th>
                            <th className="second-column">Event Description</th>
                            <th className="second-column">Images</th>
                            <th className="third-column"></th>
                            <th className="fourth-column"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {showEvent.filter(event => event.status).map((event, index) => (
                            <tr key={event._id}>
                              <td className="InnerColumnClass">
                                <textarea
                                  className="eventTitleTextarea"
                                  name=""
                                  id={`eventTitleTextarea-${event._id}`}
                                  rows="5"
                                  value={event.event_Title}
                                  onChange={(e) =>
                                    handleEventTitleChange(e.target.value, event._id)
                                  }
                                ></textarea>
                              </td>
                              <td className="InnerColumnClass">
                                <textarea
                                  className="eventDescriptionTextarea"
                                  name=""
                                  id={`eventDescriptionTextarea-${event._id}`}
                                  rows="5"
                                  value={event.event_Description}
                                  onChange={(e) =>
                                    handleEventDescriptionChange(e.target.value, event._id)
                                  }
                                ></textarea>
                              </td>
                              <td className="InnerColumnClass">
                                <form onSubmit={(e) => handleEventImageUpload(e, event._id)}>
                                  <div className="addImageEventDiv">
                                    <input type="file" accept="image/*" onChange={(e)=>handleImageChange(e,event._id)} className="EventtImageInput" />
                                  </div>
                                  <br />
                                  <button type="submit" id="add_achievement_image_button">ADD IMAGE</button>
                                </form>
                                {event.images.filter(image => image.status).map((image) => (
                                  <div className="achievementHoldingImageDiv" key={image._id}>
                                    <form action="" >
                                      <img src={image.path} alt="Event" className="TableImages" />
                                      <button className='achievementDeleteInnerImageButtons' id={`delete_event_image_button_${index}`} onClick={(e) => handleEventImageDelete(e, event._id, image._id)} >Delete image</button>
                                      <input type="file" accept="image/*" onChange={(e)=>handleImageChange(e,image._id)} className="achievementImageInput" />
                                      <button type="submit" className='achievementUpdateInnerImageButtons' id={`update_event_image_button_${index}`} onClick={(e) => handleEventImageUpdate(e, event._id, image._id)}>Update Image</button>
                                    </form>
                                  </div>
                                ))}
                              </td>
                              <td className="InnerColumnClass">
                                <button className="editEventButton" id="deleteEventButton" onClick={(e) => DeleteEvent(e, event._id)}>DELETE</button>
                              </td>
                              <td className="InnerColumnClass">
                                <button className="editEventButton" id="updateEventButton" onClick={(e) => handleUpdateEvent(e, event._id)}> UPDATE</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div id="memberUpdationTableDiv">
                    <div className="editingButtonHolderMainOuterDiv" style={stylemember} id="memberButtonHolderMainOuterDivId1">

                      <div className="search_option">
                        <input
                          type="text"
                          className='searchBarInput'
                          value={searchQuery}
                          onChange={handleSearchChange}
                          placeholder="Type member's name to search..."
                        />
                        <button onClick={filterRows} className='searchbuttons' id="searchInputButton">Search</button>
                        <button onClick={clearSearch} className='searchbuttons' id="searchClearButton">Clear</button>
                      </div>

                      <div className="addMemberButtonHoldingDiv">
                        <button onClick={() => changeMemberAddButtonStyle()} className="addMemberButton" >Add Member in the Club</button>
                      </div>
                      <form action="" style={editMemberTableStyle}>
                        <table className="addMemberTable">
                          <tr>
                            <th className="addMemberTableColumn" id="addMemberTitleTableColumn">Member Name</th>
                            <th className="addMemberTableColumn" id="addMemberDescriptionTableColumn">Position</th>
                            <th className="addMemberTableColumn" id="addMemberClassTableColumn">Class</th>
                            <th className="addMemberTableColumn" id="addMemberPrnTableColumn">PRN</th>
                            <th className="addMemberTableColumn" id="addMemberBranchTableColumn">Branch</th>
                            <th className="addMemberTableColumn" id="addMemberMobileTableColumn">Mobile no.</th>
                            <th className="add_member_button"></th>
                          </tr>
                          <tr>
                            <td className='InnerColumnClass'>
                              <input name="" id="" className="add_title" value={memberTitle} onChange={(e) => setMemberTitle(e.target.value)} ></input>
                            </td>
                            <td className='InnerColumnClass'>
                              <input name="" id="memberposition" value={memberDescription} className="add_description" onChange={(e) => setMemberDescription(e.target.value)} ></input>
                            </td>
                            <td className='InnerColumnClass'>
                              <select name="" id="" value={memberClass} onChange={(e) => setMemberClass(e.target.value)}>
                                <option value=""></option>
                                <option value="First Year">Fisrt Year</option>
                                <option value="Second Year">Second Year</option>
                                <option value="Third Year">Third Year</option>
                                <option value="B-Tech">B-Tech</option>
                              </select>
                            </td>
                            <td className='InnerColumnClass'>
                              <input type="number" name="" id="memberprn" value={memberPrn} onChange={(e) => setMemberPrn(e.target.value)} />
                            </td>
                            <td className='InnerColumnClass'>  
                              <input type="text" id="memberbranch" value={memberBranch} onChange={(e) => setMemberBranch(e.target.value)} />
                            </td>
                            <td className='InnerColumnClass'>
                              <input type="number" name="" id="membermobile" value={memberMobileNumber} onChange={(e) => setMemberMobileNumber(e.target.value)} />
                            </td>
                            <td className='InnerColumnClass'>
                              <button className="editMemberButton" id="addMemberButton" onClick={(e) => AddMember(e, memberTitle, memberDescription, memberClass, memberPrn, memberBranch, memberMobileNumber)}>ADD MEMBER</button>
                            </td>
                          </tr>
                        </table>
                      </form>

                      <table>
                        <thead>
                          <tr>
                            <th className="addMemberTableColumn" id="addMemberTitleTableColumn">Member Name</th>
                            <th className="addMemberTableColumn" id="addMemberDescriptionTableColumn">Position</th>
                            <th className="addMemberTableColumn" id="addMemberClassTableColumn">Class</th>
                            <th className="addMemberTableColumn" id="addMemberPrnTableColumn">PRN</th>
                            <th className="addMemberTableColumn" id="addMemberBranchTableColumn">Branch</th>
                            <th className="addMemberTableColumn" id="addMemberMobileTableColumn">Mobile no.</th>
                            <th className="add_member_button"></th>
                            <th className="add_member_button"></th>
                            <th className="add_member_button" id="member_image_upload_column">Image Update</th>
                          </tr>
                        </thead>
                        <tbody>
                          {showMember.filter(member => member.status).map((member, index) => (
                            <tr key={member._id}>
                              <td className='InnerColumnClass1'>
                                <input
                                  className="memberTitleTextarea"
                                  name=""
                                  id={`memberTitleTextarea-${member._id}`}
                                  rows="5"
                                  value={member.member_Name}
                                  onChange={(e) =>
                                    handleMemberTitleChange(e.target.value, member._id)
                                  }
                                ></input>
                              </td>
                              <td className='InnerColumnClass1'>
                                <input
                                  className="memberDescriptionTextarea"
                                  name=""
                                  id={`memberDescriptionTextarea-${member._id}`}
                                  rows="5"
                                  value={member.member_Position}
                                  onChange={(e) =>
                                    handleMemberDescriptionChange(e.target.value, member._id)
                                  }
                                ></input>
                              </td>
                              <td className='InnerColumnClass1'>
                                {/* <input type="text" disabled className="memberClassInput" value={member.member_Class} /> */}
                                <select name="" id="" className="editedClassChoice"
                                  onChange={(e) => handleMemberClassChange(e.target.value, member._id)}>
                                  <option value={member.member_Class}  >{member.member_Class}</option>
                                  <option value="First Year">Fisrt Year</option>
                                  <option value="Second Year">Second Year</option>
                                  <option value="Third Year">Third Year</option>
                                  <option value="B-Tech">B-Tech</option>
                                </select>
                              </td>
                              <td className='InnerColumnClass1'>
                                <input type="number" className="memberPrnInput" value={member.member_Prn}
                                  onChange={(e) => handleMemberPrnChange(e.target.value, member._id)} />
                              </td>
                              <td className='InnerColumnClass1'>
                                <input type="text" className="memberBranchInput" value={member.member_Branch}
                                  onChange={(e) => handleMemberBranchChange(e.target.value, member._id)} />
                              </td>
                              <td className='InnerColumnClass1'>
                                <input type="number" className="memberMobileInput" value={member.member_MobileNumber}
                                  onChange={(e) => handleMemberMobileChange(e.target.value, member._id)} />
                              </td>
                              <td className='InnerColumnClass1'>
                                <button className="editMemberButton" id="deleteMemberButton" onClick={(e) => DeleteMember(e, member._id)}>DELETE</button>
                              </td>
                              <td className='InnerColumnClass1'>
                                <button className="editMemberButton" id="updateMemberButton" onClick={(e) => handleUpdateMember(e, member._id)}> UPDATE DETAILS</button>
                              </td>
                              <td className='InnerColumnClass1' >
                                <form onSubmit={(e) => handleMemberImageUpload(e, member._id)}>
                                  <img src={member.member_image} alt="" className="memberImage" />
                                  <br />
                                  <input type="file" accept="image/*" onChange={(e)=>handleImageChange(e,member._id)} className="memberImageInput" />
                                  <br />
                                  <button type="submit" className="updateMemberImage">UPDATE IMAGE</button>
                                </form>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="editableContentDiv" style={logostyle} id="logoOuterDivID">
                    <h2>Update Club Logo</h2>
                    <form onSubmit={handleSubmit}>
                      <img src={logoContent} alt="" className="logoImage" />
                      <br />
                      <input type="file" accept="image/*" onChange={(e)=>handleImageChange(e,3)} />
                      <br/>
                      <button type="submit">Update Logo</button>
                    </form>

                  </div>

                  <div id="clubImageUpdationTableDiv">
                    <div className="editingButtonHolderMainOuterDiv" style={styleimages} id="editingButtonHolderMainOuterDivId5">
                      <button onClick={() => changeClubImageAddButtonStyle()} className="addClubImageButton" >Add Images</button>
                      <form action="" style={editImageTableStyle}>
                        <table className="addAchievementTable">
                          <tr>
                            <th className="addAchievememntTitleTableColumn">Choose Image</th>
                            <th className="add_achievement_button"></th>
                          </tr>
                          <tr>
                            <td className='InnerColumnClass'>
                              <form action="">
                                <input type="file" accept="image/*" name="" id="" onChange={(e)=>handleImageChange(e,33)} />
                              </form>
                            </td>
                            <td className='InnerColumnClass'>
                              <button onClick={(e) => handleClubImageImageUpload(e)} className="ClubImageUplaodClass">ADD IMAGE</button>
                            </td>
                          </tr>
                        </table>
                      </form>
                      <table>
                        <thead>
                          <tr>
                            <th className="first-column">Image</th>
                            <th className="second-column" id="second-columnImage"></th>
                            <th className="third-column" id="third-columnImage"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {showImage.filter(image => image.status).map((image, index) => (
                            <tr key={image._id}>
                              <td className='imageTableHeading'>
                                <img src={image.path} alt="" className="clubImages" />
                              </td>
                              <td className='imageTableHeading'>  <button className='ClubImageDeleteImageButtons' id={`delete_club_image_button_${index}`} onClick={(e) => handleClubImageDelete(e, image._id)} >Delete image</button>
                              </td>
                              <td className='imageTableHeading'>
                                <form action="" className="clubImageUpdateForm" >
                                  <div className="ClubImageUpdateDiv">
                                    <input type="file" accept="image/*" onChange={(e)=>handleImageChange(e,image._id)} className="UpdateClubImageInput" />
                                  </div> <br />
                                  <button type="submit" className='UpdateClubImageButtons' id={`update_club_image_button_${index}`} onClick={(e) => handleClubImageUpdate(e, image._id)}>Update Image</button>
                                </form>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        )}
      </div>
    </div>
  );
};

export default EditClub;
