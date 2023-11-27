import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";


const userSchema = new Schema({
    name:String,
    email:{
        type:String,
        unique:true,
        required:[true, "Please Enter Email"]
    },
    password:{
        type:String,
        required:[true, "Please Enter Password"],
        select:false 
    },
    timeline:[
        {
            title:String,
            description:String,
            date:Date
        }
    ],
    skills:{
        image1:{
            public_id:String,
            url:String
        },
        image2:{
            public_id:String,
            url:String
        },
        image3:{
            public_id:String,
            url:String
        },
        image4:{
            public_id:String,
            url:String
        },
        image5:{
            public_id:String,
            url:String
        },
        image6:{
            public_id:String,
            url:String
        },
    },
    youtube:[
        {
            url:String,
            title:String,
            image:{
                public_id:String,
                url:String
            }
        }
    ],
    projects:[
        {
            url:String,
            title:String,
            image:{
                public_id:String,
                url:String
            },
            description:String,
            techStack:String
        }
    ],
    about:{
        name:String,
        title:String,
        subtitle:String,
        description:String,
        quote:String,
        avatar:{
            public_id:String,
            url:String
        }
    },
})
 
userSchema.methods.getjwtToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
  };

export const User = mongoose.model("User", userSchema)