const mongoose =require('mongoose') 

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    facebook:{
        type:String,
        required:false,
    },
    instagram:{
        type:String,
        required:false,
    },
    linkedin:{ 
        type:String,
        required:false,
    },
    youtube:{
        type:String,
        required:false,
    },
    github:{
        type:String,
        required:false,
    },
    about:{
        type:String,
        required:false, 
    }, 
    password:{
        type:String,
        required:true,
    },
    profilepic:{
        type:String,
        default:""
    }
},{timestamps:true})

module.exports=mongoose.model("User",UserSchema)