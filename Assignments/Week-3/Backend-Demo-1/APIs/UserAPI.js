import express from 'express'

// create a mini express(Seperate Route) app

export const userApp = express.Router();

// test local in memory data
let users = [];
//  get request handing route (read users)
userApp.get('/users',(req,res)=>{
    // send users data in res
    res.status(200).json({message:"all users data",payload:users}) // message,payload
})
// post req handling route (post user)
userApp.post('/users',(req,res)=>{
    // create a new user
    let newUser = req.body;
    // console.log("new user",newUser);
    // insert new user to user array
    users.push(newUser);
    res.status(201).json({message:"User created successfully"})
    
})
// put req handling route (update user)
userApp.put('/users/id',(req,res)=>{
    // updating the user
    // get the modified user
    let modifiedUSer = req.body;
    // console.log(modifiedUSer);
    // find the user with id exists in array 
    // if user not found send res as user not found
    // if user found then modify the user
    // send res as "user modified"
    let checkIfExist = users.findIndex((user) => user.id === modifiedUSer.id);
    if(checkIfExist === -1){
        res.status(404).json({message:"User Not Found"})
    }
    else{
        let delUser = users.splice(checkIfExist,1,modifiedUSer);
        // console.log(delUser);
        res.status(200).json({message:"User updated successfully"})
    }
})


// read user by id
userApp.get('/users/:id',(req,res)=>{
    // read id from url parameter
    // console.log(req.params);
    
    let userid=Number(req.params.id)  // {id: 100}
    // console.log(id);
    let user=users.find((user)=>user.id===userid);
    if(!user) return res.status(404).json({message:"user not found"});
    res.status(200).json({message:"user",payload:user})
})

// delete req handling route (delete user)
userApp.delete('/users/:id',(req,res)=>{
    // getting the user id from params
    let userId = Number(req.params.id);
    let user = users.findIndex((obj)=>obj.id===userId);
    if(user === -1) return res.json({message:"user not found"})
    let deletedUser = users.splice(user,1);
    res.json({message:"Deleted Successfully",payload:deletedUser})
    
})