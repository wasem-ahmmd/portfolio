import { User } from "../models/user.model.js"
import { ApiError } from "../utils/api.error.js";
import { tcHandle } from "../utils/try.handle.js"
import { SendToken } from "../utils/send.token.js"
import { ApiResponse } from "../utils/api.response.js"
import { sendMail } from "../middlewares/send.mail.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { v2 as cloudinary } from "cloudinary";

// const myuser = tcHandle(async(res,req)=>{
//     return await User.create({
//         email:"waseem@gmail.com",
//         password:"waseem"
//     })
// })
// myuser()
//.......login ........
export const login = tcHandle(async(req,res,next)=>{
    const { email , password } = req.body;
    const user = await User.findOne({email , password})
    if (!user) throw new ApiError(400,"Invalid Email Or Password")
    SendToken(res,user,`WellCom Back`,200)
})
//........ logout.......
export const logout = tcHandle(async(req,res,next)=>{
    res.status(200).cookie("token",null,{
        expires:new Date(Date.now()),
    }).json(new ApiResponse(201,null,"Logged Out Successfully"))
    
})
//......... getuser.......
export const getuser = tcHandle(async(req,res,next)=>{
    const user = await User.findOne().select("-password -email")
    res.status(200).json(new ApiResponse(201,user))
})
//.........my profile.......
export const MyProfile = tcHandle(async(req,res,next)=>{
    const user = await User.findById(req.user._id);
    res.status(200).json(new ApiResponse(201,user))
})


//.........update user.......
export const updateUser = tcHandle(async(req,res,next)=>{
    const user = await User.findById(req.user._id);
    const {name,email,password,skills,about} = req.body;
    if(name){
        user.name = name
    }
    if(email){
        user.email = email
    }
    if(password){
        user.password = password
    }
   
    // if (skills) {
    //     if (skills.image1) {
    //             const skillsImage = await uploadOnCloudinary(skills.image1)
    //             user.skills.image1 ={
    //                 public_id:skillsImage.public_id,
    //                 url:skillsImage.secure_url
    //             }
    //     }  
    // }

    if (about) {
        user.about.name = about.name
        user.about.title = about.title
        user.about.subtitle = about.subtitle
        user.about.description = about.description
        user.about.quote = about.quote 
    //     if (about.avatar) {
    //         const aboutAvatar = await uploadOnCloudinary(about.avatar)
    //         user.about.avatar ={
    //                 public_id:aboutAvatar.public_id,
    //                 url:aboutAvatar.secure_url
    //             }
    //     } 
    }  
   await  user.save()
    res.status(200).json(new ApiResponse(201,user,"User Updated Successfuly"))
})

//......... add timeline.......
export const addTimeline = tcHandle(async(req,res,next)=>{
    const {title,description,date} = req.body;

    const user = await User.findById(req.user._id);
    user.timeline.unshift({
        title,
        description,
        date
    })
    await user.save();

    res.status(200).json(new ApiResponse(201,user,"Added To TimeLine"))
})

//......... add youtube.......
export const addYoutube = tcHandle(async(req,res,next)=>{
    const {url,title} = req.body;
    let imageyt;
    if (req.files && Array.isArray(req.files.image) && req.files.image.length > 0) {
        imageyt = req.files.image[0].path
    }
    const user = await User.findById(req.user._id);
    const youtubeimage = await uploadOnCloudinary(imageyt)

    user.youtube.unshift({
        url,
        title,
        image:{
            public_id:youtubeimage.public_id,
            url:youtubeimage.secure_url
        }
        
    })
    await user.save();

    res.status(200).json(new ApiResponse(201,user,"Added To youtube"))
})

//......... add project.......
export const addProject = tcHandle(async(req,res,next)=>{
    const {url,title,description,techStack} = req.body;
    let imageP;
    if (req.files && Array.isArray(req.files.image) && req.files.image.length > 0) {
        imageP = req.files.image[0].path
    }
    const user = await User.findById(req.user._id);
    const projectimage = await uploadOnCloudinary(imageP)

    user.projects.unshift({
        url,
        title,
        description,
        techStack,
        image:{
            public_id:projectimage.public_id,
            url:projectimage.secure_url
        }
        
    })
    await user.save();

    res.status(200).json(new ApiResponse(201,user,"Added To projects"))
})

//......... delete timeline.......
export const deleteTimeline = tcHandle(async(req,res,next)=>{
    const {id} = req.params;

    const user = await User.findById(req.user._id);
    user.timeline = user.timeline.filter((item)=>item._id != id)
   
    await user.save();

    res.status(200).json(new ApiResponse(201,user,"Delete From TimeLine"))
}) 
//......... delete youtube.......
export const deleteYoutube = tcHandle(async(req,res,next)=>{
    const {id} = req.params;

    const user = await User.findById(req.user._id);
    const video =  user.youtube.find((video)=>video._id == id)
    console.log(video);
    await cloudinary.uploader.destroy(video.image.public_id)
    user.youtube = user.youtube.filter((video)=>video._id != id)
   
    await user.save();

    res.status(200).json(new ApiResponse(201,user,"Delete From YouTube"))
}) 

//......... delete Project.......
export const deleteProject = tcHandle(async(req,res,next)=>{
    const {id} = req.params;

    const user = await User.findById(req.user._id);
    const project =  user.projects.find((project)=>project._id == id)
    await cloudinary.uploader.destroy(project.image.public_id)
    user.projects = user.projects.filter((project)=>project._id != id)
   
    await user.save();

    res.status(200).json(new ApiResponse(201,user,"Delete From projects"))
})

//.........contact.......
export const contact = tcHandle(async(req,res,next)=>{
    const {name,email,message} = req.body;
    const usermessage = `Hey, I am ${name}. My Email Is ${email}. My Message Is ${message}.`;
    await sendMail(usermessage)
    
    res.status(200).json(new ApiResponse(201,"Message Send Successfully"))
})
