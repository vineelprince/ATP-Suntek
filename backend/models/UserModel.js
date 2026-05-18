import {Schema,model} from 'mongoose'
//create user Schema with validations
//create user Model for User Schema

const userSchema = new Schema({
    name:{
        type:String,
        required:[true,"name is req"]
    },
    email:{
        type:String,
        required:[true,"emial is req"],
        unique:[true,"email already exist"]
    },
    dateOfBirth :{
        type:Date,
        required:[true,"Date of Birth is required"],

    },
    mobileNumber:{
        type:Number,
    },
    //for soft delete
    status:{
        type:Boolean,
        default:true
    }
},
{
timestamps: true,
versionkey:false,
strict:"throw"
}

)
export const UserModel = model("user",userSchema)