const express=require('express');
const router=express.Router();

//Functions for manipulating user's data
const {
    showData,
    registerUser,
    credentialCheck,
    getPresident,
    deleteUser,
    changePassword,
    dropDownEmailsUsername,
    changeInitialLogin,
    getInitialLogin
}=require('../controllers/userController')

const {
    authenticateData
}=require('../controllers/authenticate');

// Apis for user's data manipulation.
router.get("/show", showData);
router.get("/getPresident",getPresident)
router.put("/deleteUser/:clubname",deleteUser)
router.post("/register",registerUser)
router.post("/login",credentialCheck);
router.get("/authenticateData",authenticateData)
router.get("/dropDownEmailsUsername",dropDownEmailsUsername)
router.get("/getInitialLogin/:clubname",getInitialLogin)
router.put("/changePassword/:clubname",changePassword)
router.put("/changeInitialLogin/:clubname",changeInitialLogin)

module.exports=router;