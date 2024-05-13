const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const clubInfo = require('../models/clubInfoModel')
const multer = require('multer');

router.use(cors({
  origin: true,
  credentials: true
}));

const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    const fileName = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
    return cb(null, fileName);
  }
})
const upload = multer({
  storage: storage
})
router.use('/images', express.static('upload/images'))

const {
  updateIntro,
  updateDate,
  updateMoto,
  addAchievement,
  updateAchievement,
  getAchievementDetails,
  deleteAchievement,
  addEvent,
  updateEvent,
  deleteEvent,
  getEventDetails,
  addMember,
  updateMember,
  deleteMember,
  getMemberDetails,
  getClubImageDetails,
  deleteClub
} = require('../controllers/updateInformationController');

//Club Intro Updating Api
router.put("/updateIntroduction/:clubname", updateIntro)

//Club Establishment Date Updating Api
router.put("/updateDate/:clubname", updateDate)

//Api for Updating Club's Moto
router.put("/updateMoto/:clubname", updateMoto);

//Achievement Manipulation Api's
router.put("/addAchievement/:clubname", addAchievement)
router.put("/updateAchievement/:clubname/:achievementId", updateAchievement)
router.put("/deleteAchievement/:clubname/:achievementId", deleteAchievement)
router.get("/getAchievementDetails/:clubname", getAchievementDetails)

//Event Manipulation Api's
router.put("/addEvent/:clubname", addEvent)
router.get("/getEventDetails/:clubname", getEventDetails)
router.put("/updateEvent/:clubname/:eventId", updateEvent)
router.put("/deleteEvent/:clubname/:eventId", deleteEvent)

//Member Manipulation Api's
router.put("/addMember/:clubname", addMember)
router.get("/getMemberDetails/:clubname", getMemberDetails)
router.put("/updateMember/:clubname/:memberId", updateMember)
router.put("/deleteMember/:clubname/:memberId", deleteMember)

//Show Club Images
router.get("/getClubImageDetails/:clubname", getClubImageDetails)

//Delete Club
router.put("/deleteClub/:clubname", deleteClub)

//Image manipulation Apis
router.put('/upload/updateLogo/:clubname', upload.single('image'), async (req, res) => {
  try {
    const { clubname } = req.params;
    const imagePath = `http://localhost:3001/images/${req.file.filename}`
    const clubname1 = await clubInfo.findOne({ clubname: clubname })
    const imageUrl = await clubname1.logo
    if (!imageUrl) {
      await clubInfo.findOneAndUpdate({ clubname: clubname }, { logo: imagePath });
    }
    else {
      const parts = imageUrl.split("/");
      const imageName = parts[parts.length - 1];
      fs.unlinkSync(`./upload/images/${imageName}`);
      clubname1.logo = imagePath;
      await clubInfo.findOneAndUpdate({ clubname: clubname }, { logo: imagePath });
    }
    res.status(200).json({ success: true, path: imagePath, message: 'Image uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error in uploading logo' });
  }
});

//Update image of member in Edit Club module. 
router.put('/upload/updateMemberImage/:clubname/:memberId', upload.single('image'), async (req, res) => {
  try {
    const { clubname, memberId } = req.params;
    const imagePath = `http://localhost:3001/images/${req.file.filename}`;
    const club = await clubInfo.findOne({ clubname });
    if (!club) {
      return res.status(404).json({ success: false, message: 'Club not found' });
    }
    const member = await club.members.id(memberId);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member information not found' });
    }
    const imageUrl = member.member_image;
    if (!imageUrl) {
      member.member_image = imagePath;
    }
    else {
      const parts = imageUrl.split("/");
      const imageName = parts[parts.length - 1];
      fs.unlinkSync(`./upload/images/${imageName}`);
      member.member_image = imagePath;
    }

    await club.save();
    return res.status(200).json({ success: true, _id: club.members.id(memberId), path: imagePath, message: 'Image uploaded successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error in uploading the image. Make sure you have selected the image' });
  }
});

//Upload the images of achievement in Edit Club module.
router.post('/upload/updateAchievementImage/:clubname/:achievementId', upload.single('image'), async (req, res) => {
  try {
    const { clubname, achievementId } = req.params;
    const imagePath = `http://localhost:3001/images/${req.file.filename}`
    const directoryPath = req.file.path;
    const club = await clubInfo.findOne({ clubname });
    if (!club) {
      return res.status(404).json({ success: false, message: 'Club not found' });
    }
    const achievement = await club.achievements.id(achievementId);
    if (!achievement) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }
    achievement.images.push({ path: imagePath, directory_path: directoryPath, status: true });
    await club.save();
    const newImageId = achievement.images[achievement.images.length - 1]._id;
    console.log(newImageId)
    return res.status(200).json({ success: true, path: imagePath, imageId: newImageId, message: 'Image uploaded successfully.' });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error in updating image. Make sure you have selected the image properly' });
  }
});

//Update the images of achievement of Edit Club module
router.put('/upload/updatedAchievementImage/:clubname/:achievementId/:imageId', upload.single('image'), async (req, res) => {
  try {
    const { clubname, achievementId, imageId } = req.params;
    const imagePath = `http://localhost:3001/images/${req.file.filename}`;
    const club = await clubInfo.findOne({ clubname });
    if (!club) {
      return res.status(404).json({ success: false, message: 'Club not found' });
    }
    const achievement = club.achievements.id(achievementId);
    if (!achievement) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }
    const image = achievement.images.id(imageId);
    if (!image) {
      return res.status(404).json({ success: false, message: 'Error in updating image. Make sure you have selected the image properly' });
    }
    const imageUrl = image.path;
    const parts = imageUrl.split("/");
    const imageName = parts[parts.length - 1];
    fs.unlinkSync(`./upload/images/${imageName}`);
    await club.save();
    image.path = imagePath;
    await club.save();
    return res.status(200).json({ success: true, path: imagePath, message: 'Image updated successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error in updating image. Make sure you have selected the image properly' });
  }
});

//Delete achievment image at Edit Club module
router.put('/upload/deleteImage/:clubname/:achievementId/:imageId', async (req, res) => {
  try {
    const { clubname, achievementId, imageId } = req.params;
    const club = await clubInfo.findOne({ clubname });
    if (!club) {
      return res.status(404).json({ success: false, message: 'Club not found' });
    }
    const achievement = club.achievements.id(achievementId);
    if (!achievement) {
      return res.status(404).json({ success: false, message: 'Achievement Image not found' });
    }
    const image = achievement.images.id(imageId);
    if (!image) {
      return res.status(404).json({ success: false, message: 'Error in updating image. Make sure you have selected the image properly' });
    }
    image.status = false;

    const imageUrl = image.path;
    const parts = imageUrl.split("/");
    const imageName = parts[parts.length - 1];

    await club.save();
    fs.unlinkSync(`./upload/images/${imageName}`);
    return res.status(200).json({ success: true, message: 'Image deleted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error in updating image. Make sure you have selected the image properly' });
  }
});

//Upload event image at Edit Club module  
router.post('/upload/updateEventImage/:clubname/:eventId', upload.single('image'), async (req, res) => {
  try {
    const { clubname, eventId } = req.params;
    const imagePath = `http://localhost:3001/images/${req.file.filename}`
    const directoryPath = req.file.path;
    const club = await clubInfo.findOne({ clubname });
    if (!club) {
      return res.status(404).json({ success: false, message: 'Club not found' });
    }
    const event = await club.events.id(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    event.images.push({ path: imagePath, directory_path: directoryPath, status: true });
    await club.save();
    const newImageId = event.images[event.images.length - 1]._id;
    return res.status(200).json({ success: true, imageId: newImageId, path: imagePath, message: 'Image uploaded successfully.' });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error in updating image. Make sure you have selected the image properly' });
  }
});

//Updat the event image at Edit CLub module.
router.put('/upload/updatedEventImage/:clubname/:eventId/:imageId', upload.single('image'), async (req, res) => {
  try {
    const { clubname, eventId, imageId } = req.params;
    const imagePath = `http://localhost:3001/images/${req.file.filename}`;
    const club = await clubInfo.findOne({ clubname });
    if (!club) {
      return res.status(404).json({ success: false, message: 'Club not found' });
    }
    const event = club.events.id(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    const image = event.images.id(imageId);
    if (!image) {
      return res.status(404).json({ success: false, message: 'Error in updating image. Make sure you have selected the image properly' });
    }
    const imageUrl = image.path;
    const parts = imageUrl.split("/");
    const imageName = parts[parts.length - 1];
    fs.unlinkSync(`./upload/images/${imageName}`);
    await club.save();
    image.path = imagePath;
    await club.save();
    return res.status(200).json({ success: true, path: imagePath, message: 'Image updated successfully.' });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error in updating image. Make sure you have selected the image properly' });
  }
});

//Delete event image at Edit Club module 
router.put('/upload/deleteEventImage/:clubname/:eventId/:imageId', async (req, res) => {
  try {
    const { clubname, eventId, imageId } = req.params;
    const club = await clubInfo.findOne({ clubname });
    if (!club) {
      return res.status(404).json({ success: false, message: 'Club not found' });
    }
    const event = club.events.id(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event Image not found' });
    }
    const image = event.images.id(imageId);
    if (!image) {
      return res.status(404).json({ success: false, message: 'Error in updating image. Make sure you have selected the image properly' });
    }
    image.status = false;

    const imageUrl = image.path;
    const parts = imageUrl.split("/");
    const imageName = parts[parts.length - 1];

    await club.save();
    fs.unlinkSync(`./upload/images/${imageName}`);
    return res.status(200).json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

//Upload the club images at Edit club module
router.post('/upload/uploadClubImage/:clubname', upload.single('image'), async (req, res) => {
  try {
    const { clubname } = req.params;
    const imagePath = `http://localhost:3001/images/${req.file.filename}`

    const club = await clubInfo.findOne({ clubname });
    if (!club) {
      return res.status(404).json({ success: false, message: 'Club not found' });
    }
    club.images.push({ path: imagePath, status: true });
    await club.save();
    const newImageId = club.images[club.images.length - 1]._id;
    return res.status(200).json({ success: true, imageId: newImageId, path: imagePath, message: 'Image uploaded successfully.' });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error in uploading image' });
  }
});

//Delete club images at edit club module
router.put('/upload/deleteClubImage/:clubname/:imageId', async (req, res) => {
  try {
    const { clubname, imageId } = req.params;
    const club = await clubInfo.findOne({ clubname });
    if (!club) {
      return res.status(404).json({ success: false, message: 'Club not found' });
    }
    const image = club.images.id(imageId);
    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }
    image.status = false;

    const imageUrl = image.path;
    const parts = imageUrl.split("/");
    const imageName = parts[parts.length - 1];

    await club.save();
    fs.unlinkSync(`./upload/images/${imageName}`);
    return res.status(200).json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

//Update Club images at Edit club moddule
router.put('/upload/updateClubImage/:clubname/:imageId', upload.single('image'), async (req, res) => {
  try {
    const { clubname, imageId } = req.params;
    const imagePath = `http://localhost:3001/images/${req.file.filename}`;
    console.log(req.file.path)
    const club = await clubInfo.findOne({ clubname });
    if (!club) {
      return res.status(404).json({ success: false, message: 'Club not found' });
    }
    const image = await club.images.id(imageId);

    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    const imageUrl = image.path;
    if (!imageUrl) {
      image.path = imagePath;
    }
    else {
      const parts = imageUrl.split("/");
      const imageName = parts[parts.length - 1];
      fs.unlinkSync(`./upload/images/${imageName}`);
      image.path = imagePath;
    }

    await club.save();
    return res.status(200).json({ success: true, _id: club.images.id(imageId), path: imagePath, message: 'Image uploaded successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error in uploading image' });
  }
});

module.exports = router;