import express from 'express'
import {register,authenticate} from '../Services/authService.js'
import { verifyToken } from '../middlewares/verifyToken.js';
import { checkUser } from '../middlewares/checkUser.js'
import { ArticleModel } from '../models/ArticleModel.js';

export const userRoute = express.Router();

//Register User
    userRoute.post('/users',async(req,res)=>{
        //get user object from req
        let userObj = req.body

        //call register
        const newUserObj = await register({...userObj, role: "USER"})

        //send res
        res.status(201).json({message:"User Created", payload: newUserObj})
    })

//Read all Articles
    userRoute.get("/articles",async(req,res)=>{
        //read all active articles  }
        let articles = await ArticleModel.find({isArticleActive:true}).populate("author","firstName email")
        //send res
        res.status(200).json({message:"All Active Articles",payload:articles})
    })

//Read all Articles for a user (protected)
    userRoute.get("/user/:userId/articles",verifyToken,checkUser,async(req,res)=>{
        //read all active articles
        let articles = await ArticleModel.find({isArticleActive:true}).populate("author","firstName email")
        //send res
        res.status(200).json({message:"All Active Articles",payload:articles})
    })

//Add comments to an article(protected route)
    userRoute.put('/user/:uid/article/:aid',verifyToken,checkUser,async(req,res)=>{
        // getting the userid and article id where we have to comment 
        let {uid,aid} = req.params;
        // check if the article exist as the user is already checked
        let articeOfDB = await ArticleModel.findOne({_id:aid,isArticleActive:true});
        // now if the article is not there then can't comment 
        if(!articeOfDB){
            return res.status(404).json({message:"article not available"})
        }

        let newArticle = await ArticleModel.findOneAndUpdate(
            {_id:aid},
            {$push:{"comments":{user:uid,comment:req.body.comment}}},
            {new:true}
        )

        res.status(200).json({message:"comment added",payload:newArticle});
    })