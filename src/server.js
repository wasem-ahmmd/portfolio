import { httpServer } from "./app.js";
import { connectDB } from "../src/database/data.base.js";
import dotenv from "dotenv";

dotenv.config({
    path:"./.env"
})


const StartServer = ()=>{
    httpServer.listen(process.env.PORT || 5000 , ()=>{
        console.log(` Server Is Listening ON Port ${process.env.PORT || 5000}`);
    })
}

connectDB().then(() => {
    StartServer();
}).catch((err) => {
    console.log(`MongoDB Connection Error ! ${err}`);
});