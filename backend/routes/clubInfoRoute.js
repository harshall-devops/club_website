const express=require('express');
const router1=express.Router();


//Declaring the functions used
const {showClubInformation,
    specificClubInformation,
    dropDownEmailsFun,
    clubRegisterFunction,
    clubInitialInfoForm
}=require('../controllers/displayController');

// Apis for club's data manipulation.
router1.get("/showClubData",showClubInformation);
router1.get("/showClubData/:clubname",specificClubInformation)
router1.get("/dropDownEmails",dropDownEmailsFun)
router1.post("/clubRegister",clubRegisterFunction)
router1.post("/clubInitialInfoForm/:clubname",clubInitialInfoForm)

module.exports=router1;