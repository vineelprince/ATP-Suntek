import exp from 'express'
import { UserTypeModel } from '../models/UserModel.js'
import { ArticleModel } from '../models/ArticleModel.js'
import { verifyToken } from '../middlewares/verifyToken.js'

export const adminRoute = exp.Router();

//Read all articles

//Block / Unblock user roles
adminRoute.put("/block-user/:userId",verifyToken,async(req,res)=>{
    if(req.user?.role !== "ADMIN"){
        return res.status(403).json({message:"Forbidden"})
    }
    //get user id from url
    let userId = req.params.userId
    //find user
    let userofDB = await UserTypeModel.findById(userId)
    if(!userofDB){
        return res.status(404).json({message:"User Not Found"})
    }
    //block unblock the user
    let updatedUser = await UserTypeModel.findByIdAndUpdate(
        userId,
        {$set:{isBlocked: !userofDB.isBlocked}},
        {new:true}
    )
    res.status(200).json({message: updatedUser.isBlocked ? "User Blocked" : "User Unblocked", payload: updatedUser})
})



//Add comments to an article
    adminRoute.put('/admin/article/:aid',verifyToken,async(req,res)=>{
        if(req.user?.role !== "ADMIN"){
            return res.status(403).json({message:"Forbidden"})
        }
        // getting the article id where we have to comment 
        let {aid} = req.params;
        // check if the article exist
        let articeOfDB = await ArticleModel.findOne({_id:aid});
        // now if the article is not there then can't comment 
        if(!articeOfDB){
            return res.status(404).json({message:"article not available"})
        }

        let newArticle = await ArticleModel.findOneAndUpdate(
            {_id:aid},
            {$push:{"comments":{user:req.body.user,comment:req.body.comment}}},
            {new:true}
        )

        res.status(200).json({message:"comment added",payload:newArticle})
    })

//change password