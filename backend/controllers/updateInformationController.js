
const Club = require('../models/clubInfoModel');

//Updating the Introduction at "Edit Club module"
exports.updateIntro = async (req, res) => {
    try {
        const { clubname } = req.params;
        const { introduction } = req.body;

        const club = await Club.findOneAndUpdate({ clubname: clubname }, { introduction: introduction }, { new: true })
        if (!club) {
            return res.json({ success: false, message: "Club not found" })
        }
        res.json({ success: true, message: 'Introduction updated successfully', club });
    } catch (e) {
        console.error('Error in updating the introduction:', e);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

//Updating the Date at "Edit Club module"
exports.updateDate = async (req, res) => {
    try{
        const { clubname } = req.params;
        const {date} = req.body;
        
        const club = await Club.findOneAndUpdate({ clubname: clubname }, { date: date }, { new: true })
        if (!club)
            return res.json({ success: false, message: "Club not found" })
        res.json({success:true, message:"Date updated successfully"})
        
    }catch(e){
        console.error('Error updating date:', e);
        res.status(500).json({ success: false, message: 'Internal server error' });
    } 
}

//Updating the moto at "Edit Club module"
exports.updateMoto=async (req,res)=>{
        const {clubname}=req.params;
        const {moto}=req.body;
        try{
            const club=await Club.findOneAndUpdate({clubname:clubname},{moto:moto},{new :true})
            if(!club){
                return res.json({success:false, message:"Club not found"})
            }
            res.json({success:true, message:"Moto updated successfully"})
            
        }catch(e){
            console.error('Error updating Moto:', e);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
}

//Achivement Section manipulation

//Adding new Achievement at "Edit Club module"
exports.addAchievement=async (req,res)=>{
    const {clubname}=req.params
    const {achievement_Title,achievement_Description,status}=req.body;

    try{
        const club=await Club.findOne({clubname:clubname})
        if(!club){
            return res.json({success:false,message:"Club not found"})
        }
        club.achievements.push({
            achievement_Title,
            achievement_Description,
            status
        })
        await club.save();
        const addedAchievement = club.achievements[club.achievements.length - 1];
        const addedAchievementId = addedAchievement._id;

        res.json({ success: true,achievementId:addedAchievementId, message: 'Achievement added successfully' });
    }catch(e){
        res.json({success:false,message:"Error occured: Error in loading data"});
    }
}

//Fetching existing achievements at "Edit Club module"
exports.getAchievementDetails=async (req,res)=>{
    try{
        const clubData = await Club.findOne({clubname:req.params.clubname})
        if(!clubData)
        return res.json({success:false, message:"Club not found"})
        const achievements = clubData.achievements.filter(achievement => achievement.status === true);
        const achievementsReversed = achievements.reverse();
        res.status(201).send(achievementsReversed);
      } catch (e) {
        res.status(400).send(e);
      }    
}

//Updating existing achievement at "Edit Club module"
exports.updateAchievement = async (req, res) => {
    const { clubname, achievementId } = req.params;
    const { achievement_Title, achievement_Description, status } = req.body;

    try {
        const club = await Club.findOne({ clubname: clubname });
        if (!club) {
            return res.json({ success: false, message: "Club not found" });
        }

        const achievement = club.achievements.id(achievementId);
        if (!achievement) {
            return res.json({ success: false, message: "Achievement not found" });
        }

        // Update achievement properties
        achievement.achievement_Title = achievement_Title;
        achievement.achievement_Description = achievement_Description;
        achievement.status = status;

        await club.save();
        res.json({ success: true, message: 'Achievement updated successfully' });
    } catch (e) {
        res.json({ success: false, message: "Error occurred: Error in updating achievement" });
    }
}

//Deleting selected Achievement at "Edit Club module"
exports.deleteAchievement=async (req,res)=>{
    const { clubname, achievementId } = req.params;

    console.log(achievementId)

    try {
        const club = await Club.findOne({ clubname: clubname });
        if (!club) {
            return res.json({ success: false, message: "Club not found" });
        }

        const achievement = club.achievements.id(achievementId);
        if (!achievement) {
            return res.json({ success: false, message: "Achievement not found" });
        }
        achievement.status = false;

        await club.save();

        res.json({ success: true, message: "Achievement deleted successfully." });
    } catch (e) {
        res.json({ success: false, message: "Error occurred: Error in deleting achievement" });
    }
}

//Event Manipulation :

//Adding new Event at "Edit Club module"
exports.addEvent=async (req,res)=>{
    const {clubname}=req.params
    const {event_Title,event_Description,status}=req.body;

    try{
        const club=await Club.findOne({clubname:clubname})
        if(!club){
            return res.json({success:false,message:"Club not found"})
        }
        club.events.push({
            event_Title,
            event_Description,
            status
        })
        await club.save();
        const addedEvent = club.events[club.events.length - 1];
        const addedEventId = addedEvent._id;
        res.json({ success: true,eventId:addedEventId, message: 'Event added successfully' });
    }catch(e){
        res.json({success:false,message:"Error occurred: Error in loading data"});
    }
}

//Fetching exisitng events at "Edit Club module"
exports.getEventDetails=async (req,res)=>{
    try{
        const clubData = await Club.findOne({clubname:req.params.clubname})
        if(!clubData)
        return res.json({success:false, message:"Club not found"})
        const events = clubData.events.filter(event => event.status === true);
        const eventsReversed = events.reverse();
        res.status(201).send(eventsReversed);
      } catch (e) {
        res.status(400).send(e);
      }    
}

//Updating existing event at "Edit Club module"
exports.updateEvent = async (req, res) => {
    const { clubname, eventId } = req.params;
    const { event_Title, event_Description, status } = req.body;

    try {
        const club = await Club.findOne({ clubname: clubname });
        if (!club) {
            return res.json({ success: false, message: "Club not found" });
        }

        const event = club.events.id(eventId);
        if (!event) {
            return res.json({ success: false, message: "Event not found" });
        }

        // Update event properties
        event.event_Title = event_Title;
        event.event_Description = event_Description;
        event.status = status;

        await club.save();
        res.json({ success: true, message: 'Event updated successfully' });
    } catch (e) {
        res.json({ success: false, message: "Error occurred: Error in updating the event information" });
    }
}

//Deleting selected event at "Edit Club module"
exports.deleteEvent=async (req,res)=>{
    const { clubname, eventId } = req.params;

    console.log(eventId)

    try {
        const club = await Club.findOne({ clubname: clubname });
        if (!club) {
            return res.json({ success: false, message: "Club not found" });
        }

        const event = club.events.id(eventId);
        if (!event) {
            return res.json({ success: false, message: "Event not found" });
        }
        event.status = false;

        await club.save();
        res.json({ success: true, message: "Event deleted successfully." });
    } catch (e) {
        res.json({ success: false, message: "Error occurred: Error in updating the event information" });
    }
}

//Member Data Manipulation Functions

//Adding member to the database at Edit Club module
exports.addMember=async (req,res)=>{
    const {clubname}=req.params
    const {member_Name, member_Position,member_Class,member_Prn,member_Branch,member_MobileNumber,status}=req.body;
    if(!member_Name|| !member_Position||!member_Class||!member_Prn||!member_Branch||!member_MobileNumber||!status){
        return res.json({success:false, message:"Filling all the details is mandatory"}) 
    }
    
    let year=0;
    if(member_Class==='First Year') 
    year=1
    else if(member_Class==='Second Year')
    year=2
    else if(member_Class==='Third Year')
    year=3
    else if(member_Class==='B-Tech')
    year=4

    try{
        const club=await Club.findOne({clubname:clubname})
        if(!club){
            return res.json({success:false,message:"Club not found"})
        }
        
        const existingMember = club.members.find(member => member.member_Prn == member_Prn);
        if (existingMember) {
            return res.json({ success: false, message: "Member's information already exists" });
        }

        club.members.push({
            member_Name, 
            member_Position,
            member_Class,
            member_Prn,
            member_Branch,
            member_MobileNumber,
            year,
            status
        })
        await club.save();
        const addedMember = club.members[club.members.length - 1];
        const addedMemberId = addedMember._id;

        res.json({ success: true, year:year,memberId:addedMemberId ,message: "Member's data added successfully" });
    }catch(e){
        res.json({success:false,message:"Error occured: Error in adding member's data."});
    }
}

//Fetching existing member data from the database at Edit Club module
exports.getMemberDetails=async (req,res)=>{
    try{
        const clubData = await Club.findOne({clubname:req.params.clubname})
        if(!clubData)
        return res.json({success:false, message:"Club not found"})

        const members = clubData.members.filter(member => member.status === true);
        const updatedMembers=members.sort((a, b) =>b.year - a.year);
        res.status(201).send(updatedMembers);
      } catch (e) {
        res.status(400).send(e);
      }    
}

//Updating member information to the database at Edit Club module
exports.updateMember = async (req, res) => {
    const { clubname, memberId } = req.params;
    const { member_Name, member_Position, member_Class, member_Prn, member_Branch, member_MobileNumber, status } = req.body;
    
    if(!member_Name|| !member_Position||!member_Class||!member_Prn||!member_Branch||!member_MobileNumber||!status){
        return res.json({success:false, message:"Filling all the fields is mandatory"}) 
    }
    
    //assigning numeric value according to the class
    let year=0;
    if(member_Class==='First Year') 
    year=1
    else if(member_Class==='Second Year')
    year=2
    else if(member_Class==='Third Year')
    year=3
    else if(member_Class==='B-Tech')
    year=4

    try {
        const club = await Club.findOne({ clubname: clubname });
        if (!club) {
            return res.json({ success: false, message: "Club not found" });
        }

        const existingMember = club.members.find(member => member.member_Prn == member_Prn);
        // if (existingMember) {
        //     return res.json({ success: false, message: "Member information with this prn already exists. Check PRN once" });
        // }

        const member = club.members.id(memberId);
        if (!member) {
            return res.json({ success: false, message: "Member's information not found" });
        }

        // Update member properties

        member.member_Name=member_Name,
        member.member_Position=member_Position,
        member.member_Class=member_Class,
        member.member_Prn=member_Prn, 
        member.member_Branch=member_Branch, 
        member.member_MobileNumber=member_MobileNumber,
        member.year=year,
        member.status=status

        await club.save();
        res.json({ success: true, message: "Member's data updated successfully" });
    } catch (e) {
        res.json({ success: false, message: "Error occurred: Error in updating member's data" });
    }
}

//Deleting selected member's information to the database at Edit Club module
exports.deleteMember=async (req,res)=>{
    const { clubname, memberId } = req.params;

    try {
        const club = await Club.findOne({ clubname: clubname });
        if (!club) {
            return res.json({ success: false, message: "Club not found" });
        }

        const member = club.members.id(memberId);
        if (!member) {
            return res.json({ success: false, message: "Member's information not found" });
        }
        member.status = false;

        await club.save();
        res.json({ success: true, message: "Member's data deleted successfully." });
    } catch (e) {
        res.json({ success: false, message: "Error occurred: Error in deleting member" });
    }
}
  
//Fetching Image Details from the database at Edit Club module
exports.getClubImageDetails=async (req,res)=>{
    try{
        const clubData = await Club.findOne({clubname:req.params.clubname})
        if(!clubData)
        return res.json({success:false, message:"Club not found"})
        const image = clubData.images.filter(img => img.status === true);
        // const updatedMembers=members.sort((a, b) =>b.year - a.year);
        res.status(201).send(image);
      } catch (e) {
        res.status(400).send(e);
      }  

}

//Deleting member information from the database at Edit Club module
exports.deleteClub=async (req,res)=>{
    try{
        console.log("inside")
        const {clubname}=req.params;
        console.log(clubname)
        if(!clubname)
        return res.json({success:false, message: "Select the club you want to delete from the dropdown."})
        const club=await Club.findOne({clubname});
        console.log(club)
        if(!club)
        return res.json({success:false, message:"Club not found"})
        console.log(club.status)
        club.status=false;
        console.log(club.status)
        await club.save();
        return res.json({success:true, message:"Club deleted successfully"})
    }catch(e){
        return res.json({ success: false, message:"" });
    }
}