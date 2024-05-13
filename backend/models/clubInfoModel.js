const mongoose =require('mongoose')
const Schema1 = mongoose.Schema;
const Schema2 = mongoose.Schema;
const Schema3 = mongoose.Schema;
const Schema4 = mongoose.Schema;
const Schema5 = mongoose.Schema;

//Schema for storing the metadate of images of achievement/events of that club.
const ImageSchema= new Schema5({
    path:{
        type:String
    },
    directory_path:{
        type:String
    },
    status:{
        type:Boolean
    }
})

//Schema for storing the metadate of achievements added by that club.
const achievementSchema = new Schema1({
    achievement_Title: {
        type: String
    },
    achievement_Description:{
        type: String,
    },
    status: {
        type: Boolean
    },
    images:{
        type:[ImageSchema]
    }
});

//Schema for storing the metadate of events added by that club.
const eventSchema = new Schema2({
    event_Title: {
        type: String,
    },
    event_Description:{
        type: String,
    },
    status: {
        type: Boolean
    },
    images:{
        type:[ImageSchema]
    }
});

//Schema for storing the metadate of members of the club.
const memberSchema = new Schema3({
    member_Name:{
        type:String
    }, 
    member_Position:{
        type:String
    },
    member_Class:{
        type:String
    },
    member_Prn:{
        type:Number
    },
    member_Branch:{
        type:String
    },
    member_MobileNumber:{
        type:Number
    },
    year:{
        type:Number
    },
    member_image:{
        type:String
    },
    status: {
        type: Boolean
    }
});

//Schema for storing the metadate of the general images of that club.
const imageSchema=new Schema4({  
    path:{
        type:String
    },
    status:{
        type:Boolean
    }
})

//Schema for storing the data of Clubs
const userSchema1=new mongoose.Schema({
useremail:{
        type:String,
        required:true,
        unique:true
    },
clubname:{
    type:String,
    required:true,
    unique:true
},
date: {
    type:Date,
    required:true
},
introduction:{
    type:String
},
moto:{
    type:String
},
achievements:{
    type:[achievementSchema]
},
events:{
    type:[eventSchema]
},
members:{
    type:[memberSchema]
},
logo:{
    type:String
},
images:{
    type:[imageSchema]
},
status:{
    type:Boolean
}
});
const clubInfo=new mongoose.model("clubinfo",userSchema1);

module.exports=clubInfo; 