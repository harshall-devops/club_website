import logo from '../src/logo.svg';
// import ll from ''
import './App.css';
import CustomNavbar from './components/CustomNavbar';
import {Routes, Route } from 'react-router-dom';
import ShowAllClubDetails from './components/ShowAllClubDetails';
import About from './components/About';
import  ContactUs from './components/ContactUs';
import SignIn from './components/SignIn';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import AddClub from './components/AddClub';
import DeleteClub from './components/DeleteClub';
import ClubInsight from './components/ClubInsight';
import EditClub from './components/EditClub';
import ForgotPassowrd from './components/ForgotPassword';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SeeQueries from './components/SeeQueries';


function App() {
  const [userRole, setUserRole] = useState(null);
  const [footVal, setFootVal] = useState('');
  return (
    <div className="App">
     <CustomNavbar userRole={userRole} setUserRole={setUserRole} setFootVal={setFootVal}/>
     <Routes>
        <Route path="/" element={<ShowAllClubDetails/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contactus" element={<ContactUs/>}/>
        <Route path="/signin" element={<SignIn setUserRole={setUserRole}/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/addclub" element={<AddClub/>}/>
        <Route path="/deleteclub" element={<DeleteClub/>}/>
        <Route path="/clubinsight" element={<ClubInsight/>}/>
        <Route path="/editclub" element={<EditClub/>}/>
        <Route path="/forgotpassowrd" element={<ForgotPassowrd/>}/>
        <Route path="/seequeries" element={<SeeQueries/>}/>
    
     </Routes>
     <ToastContainer />
     <Footer  footVa={footVal} setFootVal={setFootVal}/>
    </div>
  );
}

export default App;
