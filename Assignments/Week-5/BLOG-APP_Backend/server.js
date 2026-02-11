import exp from 'express';
import {connect} from 'mongoose'
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import { userRoute } from './APIs/UserAPI.js';
import { authorRoute } from './APIs/AuthorAPI.js';
import { adminRoute } from './APIs/AdminAPI.js';
import { commonRouter } from './APIs/CommonAPI.js';
config()    //process.env

//Create express application
const app = exp()
//add body parser middleware
app.use(exp.json())
//add cookie parser middleware
app.use(cookieParser())

//connect APIs
app.use("/user-api",userRoute)
app.use("/author-api",authorRoute)
app.use("/admin-api",adminRoute)
app.use("/common-api",commonRouter)

//connect to DB
const connectDB = async() =>{
    try{
        await connect(process.env.DB_URL)
        console.log("DATABASE Connected Successfully!")
        
        //start http server
        app.listen(process.env.PORT,()=>console.log("Server Started"))
    }
    catch(err){
        console.log("Error while DATABASE connection")
    }
}

connectDB()

//dealing with invalid path
app.use((req,res,next)=>{
    res.status(404).json({message:"Invalid path"})
})


// eror handling middleware
app.use((err,req,res,next)=>{
    const status = err.status || err.statusCode || 500;
    const isProduction = process.env.NODE_ENV === "production";

    let message = err.message || "Unexpected error";
    let details;

    if (err.name === "ValidationError") {
        message = "Validation error";
        details = Object.values(err.errors || {}).map((e) => e.message);
    }

    if (err.name === "CastError") {
        message = "Invalid value for field";
        details = [`${err.path} is invalid`];
    }

    if (err.code === 11000) {
        message = "Duplicate value";
        const fields = Object.keys(err.keyValue || {});
        details = fields.length ? fields.map((f) => `${f} already exists`) : undefined;
    }

    if (err.name === "StrictModeError") {
        message = "Invalid fields provided";
        details = err.path ? [`${err.path} is not allowed`] : undefined;
    }

    const finalStatus = status === 500 && (err.name || err.code) ? 400 : status;

    const response = {
        message,
        status: finalStatus,
    };

    if (details) response.details = details;
    if (!isProduction) {
        response.stack = err.stack;
    }

    console.log("err :", err);
    res.status(finalStatus).json(response);
})


// app.use((req,res,next)=>{
//   res.json({message:"Invalid path"})
// })

// app.use((err, req, res, next) => {
//   const status = err.status || err.statusCode || 500;
//   const isProduction = process.env.NODE_ENV === "production";

//   let message = err.message || "Unexpected error";
//   let details;

//   // Mongoose validation errors
//   if (err.name === "ValidationError") {
//     message = "Validation error";
//     details = Object.values(err.errors || {}).map((e) => e.message);
//   }

//   // Mongoose cast errors (e.g. invalid ObjectId)
//   if (err.name === "CastError") {
//     message = "Invalid value for field";
//     details = [`${err.path} is invalid`];
//   }

//   // Duplicate key errors
//   if (err.code === 11000) {
//     message = "Duplicate value";
//     const fields = Object.keys(err.keyValue || {});
//     details = fields.length ? fields.map((f) => `${f} already exists`) : undefined;
//   }

//   // Strict mode "throw" errors from schema
//   if (err.name === "StrictModeError") {
//     message = "Invalid fields provided";
//     details = err.path ? [`${err.path} is not allowed`] : undefined;
//   }

//   // Default to 400 for known client errors without explicit status
//   const finalStatus = status === 500 && (err.name || err.code) ? 400 : status;

//   const response = {
//     message,
//     status: finalStatus,
//   };

//   if (details) response.details = details;
//   if (!isProduction) {
//     response.stack = err.stack;
//   }

//   console.log("err :", err);
//   res.status(finalStatus).json(response);
// });