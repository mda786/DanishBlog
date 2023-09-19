const router=require('express').Router()
const User=require('../models/User')
const bcrypt=require('bcrypt') 
const Post=require('../models/Post')       

//Update
router.put('/:id',async (req,res)=>{
    if(req.body.userId===req.params.id){
        if(req.body.password){
            req.body.password=await bcrypt.hash(req.body.password,10)
        }
        try{
            const updatedUser=await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true})
            res.status(200).json(updatedUser)
        }
        catch(err){
            res.sendStatus(500).json(err);

        }
    }else{
        res.sendStatus(401).json("you can only update your account...")
    }
    
})   
        
//Delete
router.delete('/:id',async (req,res)=>{ 
    if(req.body.userId===req.params.id){
        try{
            const user=await User.findById(req.params.id)
            try{
                await Post.deleteMany({email:user.email}) 
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("user has been deleted successfully...")
            }
            catch(err){
                res.sendStatus(500).json(err);
            }
        }
        catch(err){
            res.sendStatus(404).json("User not found...")
        }      
    }else{
        res.sendStatus(401).json("you can only delete your account...")
    }    
})  
 
//Get    
router.get('/:id',async (req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        const {password,...others}=user._doc
        res.status(200).json(others) 
    }
    catch(err){
        res.sendStatus(500).json(err);
    }
})

module.exports=router; 
