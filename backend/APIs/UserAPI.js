// create mini-express app
import exp from 'express'
import {UserModel} from '../models/UserModel.js';

export const UserApp = exp.Router()

//USER API ROUTES
UserApp.post('/users', async(req, res) => {
    try {
      const newUser = req.body
      const newUserDocument = new UserModel(newUser)
      let user = await newUserDocument.save()
      res.status(201).json({message:"User created successfully", user: user})
    } catch(err) {
      console.error("Error creating user:", err)
      res.status(400).json({message:"Failed to create user", error: err.message})
    }
})

UserApp.get('/users', async(req, res) => {
    try {
      let usersList = await UserModel.find({status: true})
      res.status(200).json({message:"Users list", users: usersList})
    } catch(err) {
      console.error("Error fetching users:", err)
      res.status(500).json({message:"Failed to fetch users", error: err.message})
    }
})

//read user by id
UserApp.get('/users/:id', async(req, res) => {
    try {
      let uid = req.params.id
      let user = await UserModel.findOne({_id: uid, status: true})
      if(!user) {
          return res.status(404).json({message:"User not found"})
      }
      res.status(200).json({message:"User details", payload: user})
    } catch(err) {
      console.error("Error fetching user:", err)
      res.status(500).json({message:"Failed to fetch user", error: err.message})
    }
})

//delete user by id
UserApp.delete('/users/:id', async(req, res) => {
    try {
      let uid = req.params.id
      let user = await UserModel.findByIdAndUpdate(uid, {$set: {status: false}})
      if(!user) {
          return res.status(404).json({message:"User not found"})
      }
      res.status(200).json({message:"User deactivated successfully"})
    } catch(err) {
      console.error("Error deleting user:", err)
      res.status(500).json({message:"Failed to delete user", error: err.message})
    }
})

//activate the User (change status to true)
UserApp.patch('/users/:id', async(req, res) => {
    try {
      let uid = req.params.id
      let user = await UserModel.findByIdAndUpdate(uid, {$set: {status: true}}, {new: true})
      if(!user) {
          return res.status(404).json({message:"User not found"})
      }
      res.status(200).json({message:"User activated successfully", payload: user})
    } catch(err) {
      console.error("Error activating user:", err)
      res.status(500).json({message:"Failed to activate user", error: err.message})
    }
})

//update user by id 
UserApp.put('/users/:id', async(req, res) => {
    try {
      let uid = req.params.id
      let updatedData = req.body
      let user = await UserModel.findByIdAndUpdate(uid, {$set: updatedData}, {new: true})
      if(!user) {
          return res.status(404).json({message:"User not found"})
      }
      res.status(200).json({message:"User updated successfully", payload: user})
    } catch(err) {
      console.error("Error updating user:", err)
      res.status(500).json({message:"Failed to update user", error: err.message})
    }
})
