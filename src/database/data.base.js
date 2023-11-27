import mongoose from "mongoose";
import { DB_NAME } from "../constant.js"

const connectDB = async()=>{
    try {
        const connectionNow = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB Is Connect ON ${connectionNow.connection.host}`);
    } catch (error) {
        console.log(`MongoDB Connection Error !!! ${error}`);
        process.exit(1);
    }
}
export { connectDB }