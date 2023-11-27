import express from "express";
import { createServer } from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddle } from "../src/middlewares/error.middle.js"

const app = express();

//.........client side........
app.set("view engine" , "ejs")
app.get("/",(req,res)=>{
  res.render("index")
})
app.get("/home",(req,res)=>{
  res.render("home")
})

app.post("/api/v1/login",(req,res)=>{
  res.redirect("/home")
})



//........ backend side........
const httpServer = createServer(app);

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); // configure static file to save images locally
app.use(cookieParser());

//..........import router ....
import userRouter from "../src/routes/user.route.js"
app.use("/api/v1",userRouter)


app.use(ErrorMiddle);
export { httpServer }