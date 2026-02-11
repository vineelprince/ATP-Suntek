import exp from 'express'
import { authenticate } from '../Services/authService.js'
import { verifyToken } from '../middlewares/verifyToken.js'
import bcrypt from "bcrypt"
import { UserTypeModel } from "../models/UserModel.js"

export const commonRouter = exp.Router()

//login
commonRouter.post("/login", async (req, res) => {
    //get author cred obj
            let authorCred = req.body
            //call auth service
            let {token,user} = await authenticate(authorCred)
            //save token as httpOnly cookie
            res.cookie("token",token,{
                httpOnly: true,
                sameSite: "lax",
                secure: false
            })
            //send res
            res.status(200).json({message:"LOGIN SUCCESS", payload:user})
})

//logout
    commonRouter.post('/logout',(req,res)=>{
        // Clear the cookie named 'token'
        res.clearCookie("token",{
            httpOnly: true,
            secure: false,
            sameSite : 'lax'
        })
        res.status(200).json({message:"Logged out successfully"})
    })

//change password
    commonRouter.post('/change-password',verifyToken,async(req,res)=>{
        //get current password and new password
        let {currentPassword,newPassword} = req.body
        //check the current password is correct or not
        let user = await UserTypeModel.findById(req.user?.userID)
        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if(!isMatch){
            return res.status(401).json({message:"Current password is incorrect"})
        }

        //replace current password with thw new pass
        user.password = await bcrypt.hash(newPassword, 10)
        await user.save()

        //sending response back
        res.status(200).json({message:"Password updated"})
    })