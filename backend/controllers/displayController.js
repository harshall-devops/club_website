const Club=require('../models/clubInfoModel');
const jwt = require('jsonwebtoken');

//Showing club information at home page
exports.showClubInformation = async (req, res, next) => {
    try {
      const clubData = await Club.find({status:true})
      res.status(201).send(clubData);
    } catch (e) {
      res.status(400).send(e);
    }
}

//Displaying selected club information in ClubInsight module
exports.specificClubInformation=async(req,res)=>{
  try{
    const clubData = await Club.findOne({clubname:req.params.clubname})
    res.status(201).send(clubData);
  } catch (e) {
    res.status(400).send(e);
  }
}

//Dropdown including Clubnames in the Edit Club module, SignUp module
exports.dropDownEmailsFun=async(req,res)=>{
  try {
    const token = req.headers.authorization;
    console.log("Token ::"+token)

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Extract the role attribute from the decoded token
    const role = decodedToken.role;
    const username = decodedToken.username;
    if(role==='admin'){
      const users = await Club.find({status: true},'clubname');
      const clubname1 = users.map(user => user.clubname);
      res.json(clubname1);
    }
    else if(role==='president'){
      res.json([username]);
    }   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
}

//Registering new Club
exports.clubRegisterFunction=async (req,res)=>{
  try{
      const clubs=new Club(req.body);
      if(!clubs){
        return res.json({success:false,message:"Fill all details"});
      }
      const useremail1= await Club.findOne({useremail:req.body.useremail});
      if(useremail1)
      return res.json({success:false,message:"Oops, Club Already Exists"});
    else{
      await clubs.save();
      return res.json({success:true, message:"Congratulations, Club added successfully!!!"})
    }
  }catch(e){
      return res.json({success:false,message:e.toString()})
  }
}

//If president is logging in first time and visiting the "edit club" module, then this function handles the manipulation of information of that form.
exports.clubInitialInfoForm=async (req,res)=>{
  try{
      const {introduction, moto, date}=req.body;
      const {clubname}= req.params;
      const club= await Club.findOne({clubname:clubname});
      if(!club){
        return res.json({success:false, message:"Club doesn't exist"})
      }
      await Club.findOneAndUpdate({ clubname: clubname }, { introduction, moto, date });
   
      res.json({success:true, message:"Information saved successfully"})
      
  }catch(error){
    return res.json({success:false,message:error.toString()})
  }
}