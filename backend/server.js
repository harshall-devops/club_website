const express = require("express");
const cookieParser = require('cookie-parser');
const userRoute = require("./routes/userRoute")
const clubRoute = require("./routes/clubInfoRoute")
const updateInfoRoute = require('./routes/updateInformation')
const queryRoute=require("./routes/queryinfoRoute");
const fs = require('fs');
const cors = require('cors');
const clubInfo = require('./models/clubInfoModel')

//express app
const app = express();
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(cookieParser());
const path = require('path');
require('./db/conn');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/user", userRoute);
app.use("/api/v1/dropdown", clubRoute);
app.use("/api/v1/dropdownusers", userRoute);
app.use("/api/v1/clubinfo", clubRoute);
app.use("/api/v1/update", updateInfoRoute);
app.use("/", updateInfoRoute);
app.use("/api/v1", clubRoute)
app.use("/api/v1/query",queryRoute);

app.listen(3001, () => {
  console.log("App Running on Port:3001");
})
