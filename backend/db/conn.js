require('dotenv').config({path:'./config/.env'});

const mongoose = require('mongoose');
 
mongoose.connect(process.env.db)
.then(()=>
{
    console.log("connection successful");
}).catch((e)=>
{
    console.log("No connection");
})