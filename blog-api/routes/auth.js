 const router=require('express').Router()
 const User=require('../models/User')
const bcrypt=require('bcrypt') 
  
 //register
 router.post("/register",async(req,res)=>{
    try{
        const newUser=new User({
            name:req.body.name,
            email:req.body.email,
            password:await bcrypt.hash(req.body.password,10)
        })
        const user=await newUser.save();
        res.status(200).json(user)
    }
    catch(err){ 
        res.sendStatus(500).json(err)   
      
    }
 })

 //login
 router.post('/login',async(req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email}) 
        if(!user){
            res.status(400).json("wrong credentials")
        
        }
        const validate=await bcrypt.hash(req.body.password,user.password)
        if(!validate){
            res.status(400).json("wrong credentials")
        
        }

        const{password,...others}=user._doc;
        res.status(200).json(others);
    }
    catch(err){ 
        res.sendStatus(500).json(err)
    
    }
 })


 module.exports=router;