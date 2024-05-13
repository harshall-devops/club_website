const bcrypt = require('bcrypt')
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const nodemailer=require('nodemailer');

//Displaying the data of user. Not used this function in code.
exports.showData = async (req, res, next) => {
  try {
    const usersData = await User.find()
    res.status(201).send(usersData);
  } catch (e) {
    res.status(400).send(e);
  }
}

//Fetch the President Name
exports.getPresident=async (req,res)=>{
  try{
      const usersData=await User.find({status:true})
      res.status(201).send(usersData);
  }catch(e){
    res.status(400).send(e);
  }
}

//Registering the president
exports.registerUser = async (req, res) => {
  try {
    const { clubname, password, president, prn, gender, classname, dob, presidentEmail, contact, role, status, initialLogin } = req.body;

    // Check if all required fields are provided
    if (!clubname || !password || !president || !prn || !gender || !classname || !dob || !presidentEmail || !contact || !role || !status) {
      return res.json({ success: false, message: "Fill all details" });
    }

    // Check if the clubname already exists
    const existingClub = await User.findOne({ clubname });
    if (existingClub) {
      return res.json({ success: false, message: "Oops, Club Already Exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      clubname,
      password: hashedPassword,
      president,
      prn,
      gender,
      classname,
      dob,
      presidentEmail,
      contact,
      role,
      status,
      initialLogin
    });

    // Save the user to the database
    await newUser.save();

    return res.json({ success: true, message: "Congratulations, President added successfully!!!" });
  } catch (e) {
    console.error(e);
    return res.json({ message: e.toString() });
  }
};


exports.credentialCheck = async (req, res) => {

  const  MAX_INVALID_LOGIN=3
  const LOCKOUT_DURATION = 30 * 1000;

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({ success: false, error: "Entering username and password is necessary" });
    }

    const user = await User.findOne({ $or: [
      { clubname: username },
      { username: username }
    ]});

    if (!user) {
      return res.json({ success: false, error: `Username not found.`});
    }

    if(user.wrongPasswordEntryCount>=MAX_INVALID_LOGIN){
      const expiration=user.wrongPasswordEntryTimeStamp.getTime() +LOCKOUT_DURATION;
      const lockOutTime= expiration-Date.now();
      if(lockOutTime>0){
        return res.json({success:false, error:"Login maxium limit reached. Try after 30 seconds" })
      }
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) 
    {
      user.wrongPasswordEntryCount++;
      user.wrongPasswordEntryTimeStamp=Date.now();
      await user.save();
      if(user.wrongPasswordEntryCount>=MAX_INVALID_LOGIN){
        const expiration=user.wrongPasswordEntryTimeStamp.getTime() +LOCKOUT_DURATION;
        const lockOutTime= expiration-Date.now();
  
        if(lockOutTime>0){
          return res.json({success:false, error:"Login maxium limit reached. Try after 30 seconds" })
        }
      }
      return res.json({ success: false, error: `Invalid Password. ${user.wrongPasswordEntryCount}/3 invalid attempts finished` });
    }

    const role = user.role;
    const initialLogin1=user.initialLogin;
    const tokenPayload = {
      username: username,
      role: role ,
      initialLogin: initialLogin1
    };
    user.wrongPasswordEntryCount = 0;
    await user.save();
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '10h' });
    return res.status(201).json({ success: true, msg: "Login Successful", token: token, role: role });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "An error occurred" });
  }
}

//Making the status false for tha particular president.
exports.deleteUser=async (req,res)=>{
  try{
    
    const {clubname}=req.params;
    const user=await User.findOne({clubname});
    console.log(user)
    if(!user)
    return res.json({success:false})
    user.status=false;
    
    await user.save();
    return res.json({success:true})
}catch(e){
    return res.json({ success: false, message: "Error occurred: Error in deleting member" });
}
}

//DropDown including clubname/username for Change Password purpose
exports.dropDownEmailsUsername = async (req, res) => {
  try {
    const users = await User.find({status: true});
    const clubname1 =await users.map(user => user.clubname ? user.clubname : user.username);
    console.log(clubname1);
    res.json(clubname1);
} catch (error) {
  console.error(error);
  res.status(500).json({ message: error });
}
};

//Changing the Password of selected username --> selecting the username --> checking if the password is reseted 3 times within 24 hrs --> Replacing the new password to collection. --> Sending mail to the president about password change.
exports.changePassword=async (req,res)=>{
  try{
  const {clubname}=req.params;
 
    const {password}=req.body;
    
     const hashedPassword = await bcrypt.hash(password, 10);
     
     const club=await User.findOne({$or:[
      {clubname : clubname},
     { username : clubname}
    ]});
    if(!club)
    return res.json({success:false, message:"Club doesn't exist"})

    // Check if 24 hours have passed since the last password change
    const lastPasswordChange = club.lastPasswordChangeTimestamp;
    const currentTime = new Date();
    const twentyFourHoursAgo = new Date(currentTime.getTime() - (24 * 60 * 60 * 1000));
    if (lastPasswordChange > twentyFourHoursAgo) {
      // If within 24 hours, check if password change count exceeds 3
      if (club.passwordChangeCount >= 3) {
        return res.status(400).json({ message: "Password change limit exceeded for 24 hours" });
      }
    } else {
      // If more than 24 hours have passed, reset password change count and timestamp
      club.passwordChangeCount = 0;
    }

    // If everything is fine, increment the password change count and update timestamp
    club.passwordChangeCount++;
    club.lastPasswordChangeTimestamp = currentTime;
   
     club.password = hashedPassword;
    await club.save();
   
    let transporter = await nodemailer.createTransport({

      service:'gmail',
      port:'587',
      secure:true,
      logger:true,
      debug:true,
      secureConnection:false,
        auth: {
          user: 'sampledemomail1@gmail.com',
          pass: 'jtac vfui ekpn zgql'
        },
        tls:{
          rejectUnAuthorized:true
        }
        });

    let info= await transporter.sendMail({
      from: 'sampledemomail1@gmail.com', // sender address
      to: club.presidentEmail,
      subject: "Password Change", // Subject line
      text: "Password Changed Successfully", // plain text body
      html: `<b>Password Changed Successfully. In case you don't requested for password change, please meet the admin.</b>`, // html body
    })
    console.log("Message sent: %s", info.messageId);
  
    return res.json({success:true, message:"Password updated successfully"})

}catch(e){
    return res.json({ success: false, message: e.toString() });
}
}

//If president have filled the form then changing ths status of initial login to false,so that the initial form won't appear for that president.
exports.changeInitialLogin=async (req,res)=>{
    try{
      const {clubname}=req.params;
      const club=await User.findOneAndUpdate({clubname:clubname},{initialLogin:false})
      if(club){
        return res.json({success:true,message:"Updated the initial login count successfully"})
   
      }
      else{
        return res.json({success:false,message:"Error in manipulating data of initial login count in db"})
   
      }
      }catch(error){
      return res.json({ success: false, message: e.toString() });
    }
}

//Fetching initial login value details
exports.getInitialLogin = async (req, res) => {
  try {
    const { clubname } = req.params;
    const club = await User.findOne({ clubname: clubname });
    if (!club) {
      return res.status(404).json({ success: false, message: "Club not found" });
    }
    return res.json({ initialLogin: club.initialLogin });
  } catch (error) {
    console.error("Error fetching initialLogin:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
