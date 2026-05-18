// Create HTTP server
import exp from 'express'
import { config } from 'dotenv'
import {connect} from 'mongoose'
import { UserApp } from './APIs/UserAPI.js';
import cors from 'cors'
//add cors middleware
// Read env variables
config();
// Create HTTP server
const app =exp()
// Add body parser middleware
//add cors middleware
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(exp.json())
// Forward req to UserAPI if path start with /user-api
app.use("/user-api", UserApp)

// connect databse
const connectDB = async() =>{
    try{
        await connect(process.env.DB_URL)
        console.log("DATABASE Connected Successfully!")
        
        //start http server
        app.listen(process.env.PORT,()=>console.log("Server Started"))
    }
    catch(err){
        console.log("Error while DATABASE connection",err)
    }
}

connectDB()

// Add error handling middlewares
app.use((err,req,res,next)=>{
    //mongoose validation error
    if(err.name === "ValidationError"){
        return res.status(400).json({message:"Validation Error",errors:err.errors})
    }
    //invalid object id error
    if(err.name === "CastError"){
        return res.status(400).json({message:"Invalid ID format"})
    }
    //duplicate key error
    if(err.code === 11000){
        return res.status(409).json({message:"Duplicate key error",errors:err.keyValue})
    }
    res.status(500).json({message: "Internal Server Error",});
})
