const jwt = require('jsonwebtoken');

//Token Verification and authentification
exports.authenticateData=async (req,res)=>{

    const fetchToken=req.headers.authorization;
    const decodeToken=jwt.verify(fetchToken,process.env.JWT_SECRET)
    const role = decodeToken.role;
    const initialLogin = decodeToken.initialLogin;
    const clubname = decodeToken.username;
    console.log(clubname);
    return res.json({role:role, initialLogin:initialLogin, clubname:clubname}); 
}