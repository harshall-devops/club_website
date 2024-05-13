import React, { useEffect, useState } from 'react'
import logo from '../assets/rit_logo.png'

import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import '../styles/CustomNavbar.css'
export default function CustomNavbar({setFootVal, userRole,setUserRole }) {
    
    const {roleUse} = useLocation();
    
    const [visible1, setVisible]=useState({visibility: "visible"});
    const [visible2, setAbout]=useState({visibility: "visible"});
    const [visible3, setBack]=useState({visibility: "hidden"});
    const [flag1,setFlag]=useState(false);
    const [flag2,setFlagaboutConLogin]=useState(true);
    const [exp,setExp]=useState(true)

    const stateNavbar=sessionStorage.getItem('state')
    const [roleUser,setUserRole1]=useState('');
    console.log(userRole);

    function changeVisibility(){
         setFlag(true);
         setFlagaboutConLogin(false)
        setVisible({visibility: "hidden"})
        setAbout({visibility: "visible"})
        setBack({visibility: "visible"})  
    }

    function changeVisibilityHome(){
        console.log("Homeflag1"+flag1);
         console.log("HOmeflag2"+flag2);
    }
    function changeVisibilityLogOut(){
        setFlag(false);
        sessionStorage.removeItem('state');
        sessionStorage.removeItem('token');
        setUserRole1('false')
        setExp(false);
        setFlagaboutConLogin(true)
        setFootVal('not admin')
        setVisible({visibility: "visible"})
        setAbout({visibility: "visible"})
        setBack({visibility: "visible"})  
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token'); // Assuming token is stored in sessionStorage
        if (!token) {
          console.error('Token not found');
          return;
        }
        fetch('http://localhost:3001/api/v1/user/authenticateData', {
          method: 'GET',
          headers: {
            'Authorization': `${token}` // Include the token in the Authorization header
          }
        })
        .then(response => response.json())
        .then(data => {
          setUserRole1(data.role);
          setFootVal(data.role)
        })
        .catch(error => console.error(error));
      }, [exp]);
 
    return (
        <div className="outer-container">
            <>
                <nav className="navbar">
                    <div className="container-fluid" >
                        <div className="left-nav-elements">
                            <img src={logo} alt="" className="navbarlogo"/>
                            <Link className="navbar-brand" to="/showclubdetails" style={{color:"blueviolet"}}>RIT CLUBS</Link>
                        </div>

                       <div className="outer_right_nav_element">
                        <div className="right-nav-elements">
                        <Link className="navbar-brand" to="/"  onClick={()=>changeVisibilityHome()} >HOME</Link>
                                    
                            {(roleUse=="admin" ||roleUser=="admin" || flag1) && (
                                <>
                                         <Link className="navbar-brand" to="/addclub">ADD-CLUB</Link>
                                         <Link className="navbar-brand" to="/deleteclub">DELETE-CLUB</Link>
                                         <Link className="navbar-brand" to="/editclub">EDIT-CLUB</Link>
                                         <Link className="navbar-brand" to="/signup">ADD-MEMBER</Link>
                                         <Link className="navbar-brand" id="logout_div"   to="/"  onClick={()=>changeVisibilityLogOut()}>LOGOUT</Link>
                                </>          
                            )}
                            {(roleUse=='president' || roleUser=="president" || flag1) && (
                                <>
                                         <Link className="navbar-brand" to="/editclub">EDIT-CLUB</Link>
                                         <Link className="navbar-brand" id="logout_div"   to="/"  onClick={()=>changeVisibilityLogOut()}>LOGOUT</Link>
                                </>          
                            )}
                            {
                                (!stateNavbar && flag2) && (
                                    <>
                                   <Link className="navbar-brand" to="/about" style={visible2}>ABOUT</Link>
                                   <Link className="navbar-brand" to="/contactus" style={visible2}>CONTACT-US</Link>
                                   <Link className="navbar-brand" id="navbar_login" to="/signin" style={visible1}>LOGIN</Link>
                                    </>
                                )
                            }
                            </div>
                            </div>
                    </div>
                </nav>
            </>
        </div>
    )
}










// import React, { useEffect, useState } from 'react'
// import logo from '../assets/rit_logo.png'

// import { Link } from 'react-router-dom'
// import { useLocation } from 'react-router-dom'
// import '../styles/CustomNavbar.css'
// export default function CustomNavbar({ userRole,setUserRole }) {
    
//     const {roleUse} = useLocation();
    
//     const [visible1, setVisible]=useState({visibility: "visible"});
//     const [visible2, setAbout]=useState({visibility: "visible"});
//     const [visible3, setBack]=useState({visibility: "hidden"});
//     const [flag1,setFlag]=useState(false);
//     const [footerVal,setFooterVal]=useState(false);
//     const [flag2,setFlagaboutConLogin]=useState(true);
//     const [exp,setExp]=useState(true)

//     const stateNavbar=sessionStorage.getItem('state')
//     const [roleUser,setUserRole1]=useState('');
//     console.log(userRole);


//     function changeVisibility(){
//          setFlag(true);
//          setFlagaboutConLogin(false)
//         setVisible({visibility: "hidden"})
//         setAbout({visibility: "visible"})
//         setBack({visibility: "visible"})  
//     }

//     function changeVisibilityHome(){
//         console.log("Homeflag1"+flag1);
//          console.log("HOmeflag2"+flag2);
//     }
//     function changeVisibilityLogOut(){
//         setFlag(false);
//         sessionStorage.removeItem('state');
//         sessionStorage.removeItem('token');
//         setUserRole1('false')
//         setExp(false);
//         setFlagaboutConLogin(true)
//         setFooterVal(false)
//         setVisible({visibility: "visible"})
//         setAbout({visibility: "visible"})
//         setBack({visibility: "visible"})  
//     }

//     useEffect(() => {
//         const token = sessionStorage.getItem('token'); // Assuming token is stored in sessionStorage
//         if (!token) {
//           console.error('Token not found');
//           return;
//         }
//         fetch('http://localhost:3001/api/v1/user/authenticateData', {
//           method: 'GET',
//           headers: {
//             'Authorization': `${token}` // Include the token in the Authorization header
//           }
//         })
//         .then(response => response.json())
//         .then(data => {
//           setUserRole1(data.role);
//           console.log(roleUser);
//         })
//         .catch(error => console.error(error));
//       }, [exp]);
 
//     return (
//         <div className="outer-container">
//             <>
//                 <nav className="navbar">
//                     <div className="container-fluid" >
//                         <div className="left-nav-elements">
//                             <img src={logo} alt="" className="navbarlogo"/>
//                             <Link className="navbar-brand" to="/showclubdetails" style={{color:"blueviolet"}}>RIT CLUBS</Link>
//                         </div>

//                        <div className="outer_right_nav_element">
//                         <div className="right-nav-elements">
//                         <Link className="navbar-brand" to="/"  onClick={()=>changeVisibilityHome()} >HOME</Link>
                                    
//                             {(roleUse=="admin" ||roleUser=="admin" || flag1) && (
//                                 <>
//                                          <Link className="navbar-brand" to="/addclub">ADD-CLUB</Link>
//                                          <Link className="navbar-brand" to="/deleteclub">DELETE-CLUB</Link>
//                                          <Link className="navbar-brand" to="/editclub">EDIT-CLUB</Link>
//                                          <Link className="navbar-brand" to="/signup">ADD-MEMBER</Link>
//                                          <Link className="navbar-brand" id="logout_div"   to="/"  onClick={()=>changeVisibilityLogOut()}>LOGOUT</Link>
//                                 </>          
//                             )}
//                             {(roleUse=='president' || roleUser=="president" || flag1) && (
//                                 <>
//                                          <Link className="navbar-brand" to="/editclub">EDIT-CLUB</Link>
//                                          <Link className="navbar-brand" id="logout_div"   to="/"  onClick={()=>changeVisibilityLogOut()}>LOGOUT</Link>
//                                 </>          
//                             )}
//                             {
//                                 (!stateNavbar && flag2) && (
//                                     <>
//                                    <Link className="navbar-brand" to="/about" style={visible2}>ABOUT</Link>
//                                    <Link className="navbar-brand" to="/contactus" style={visible2}>CONTACT-US</Link>
//                                    <Link className="navbar-brand" id="navbar_login" to="/signin" style={visible1}>LOGIN</Link>
//                                     </>
//                                 )
//                             }
//                             </div>
//                             </div>
//                     </div>
//                 </nav>
//             </>
//         </div>
//     )
// }
