import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { tcHandle } from "../utils/try.handle.js";
import { ApiError } from "../utils/api.error.js";


export const isAuthenticated = tcHandle(async(req,res,next)=>{
    const { token } = req.cookies;
    if (!token) throw new ApiError(400,"Login To Access This Resource")
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const user = await User.findById(decoded._id);
    req.user = user;
    next();
})