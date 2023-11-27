import { Router } from "express";
import { 
    MyProfile, 
    contact, 
    getuser, 
    login, 
    logout, 
    updateUser, 
    addTimeline, 
    addYoutube, 
    addProject, 
    deleteTimeline, 
    deleteYoutube,
    deleteProject
} from "../controllers/user.control.js";
import { isAuthenticated } from "../middlewares/auth.js"
import { upload } from "../middlewares/multer.middle.js"

const router = Router();

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/user").get(getuser);

router.route("/me").get(isAuthenticated,MyProfile);

router.route("/admin/update").put(isAuthenticated,upload.fields([{name:"avatar",maxCount:1}]),updateUser);

router.route("/admin/timeline/add").post(isAuthenticated,addTimeline);

router.route("/admin/timeline/:id").delete(isAuthenticated,deleteTimeline);

router.route("/admin/youtube/add").post(isAuthenticated,upload.fields([{name:"image",maxCount:1}]),addYoutube);

router.route("/admin/youtube/:id").delete(isAuthenticated,deleteYoutube);

router.route("/admin/project/add").post(isAuthenticated,upload.fields([{name:"image",maxCount:1}]),addProject);

router.route("/admin/project/:id").delete(isAuthenticated,deleteProject);

router.route("/contact").post(contact);






export default router;