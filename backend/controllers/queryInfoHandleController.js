const { finished } = require('nodemailer/lib/xoauth2');
const QueryInfo=require('../models/QueryInfoModel')
const nodemailer=require('nodemailer');

//Saving the information recieved through the form at "Contact-Us" module
exports.queriesSend = async (req, res) => {
    try {
        const { name, email, contact, query, status } = req.body; 
        
        if (!name || !email || !contact || !query) { 
            return res.json({ success: false, message: "Filling all information is mandatory" });
        }
        const queryInformation = new QueryInfo({ name, email, contact, query, status }); // Creating new QueryInfo instance with the provided data
        await queryInformation.save();

        return res.json({ success: true, message: "Query sent successfully" });
    } catch (e) {
        res.json({ message: e.toString() });
    }
}

exports.showQueries=async (req, res)=>{
        try{
            const queries= await QueryInfo.find({})
            const { status } = req.query;
    
            const filteredQueries = queries.filter(query => query.status === status);
        
            console.log(queries) 
            res.status(201).send(filteredQueries)
        }catch(e){
            res.status(400).send(e);
        }
}

exports.seeAllQueries=async (req,res)=>{
    try{
        const queries= await QueryInfo.find({}) 
        res.status(201).send(queries)
    }catch(e){
        res.status(400).send(e);
    }
}

exports.markSolved=async (req,res)=>{
        try{
            const {queryId}=req.params;
            const {status}=req.body;
            const queryInfo=await QueryInfo.findById(queryId);
            if(!queryInfo)
            return res.json({success:false, message:"Query not found"})

            queryInfo.status='solved'
            await queryInfo.save();

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
                to: queryInfo.email,
                subject: "Query solved", // Subject line
                text: "Your query has been sorted. Regarding any further query on your problem, you can contact the admin.", // plain text body
                html: `<b>Your query has been sorted. Regarding any issue you can contact the admin. </b>`, // html body
            })
              console.log("Message sent: %s", info.messageId);
            res.json({success:true, message:"Query Sorted"})
        }
        catch(e){
            res.json({success:false, message:e.toString()})
        }
}