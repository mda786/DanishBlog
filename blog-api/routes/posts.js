const router=require('express').Router()
const Post=require('../models/Post')


//Create Post
router.post('/',async (req,res)=>{
    try{  
        const newPost=new Post(req.body)
        const savedPost=await newPost.save()
        res.status(200).json(savedPost)   
    }
    catch(err){
        res.sendStatus(500).json(err)
          
    }
})

//Update Post  
router.put('/:id',async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        if(post.email===req.body.email){
            try {
                const updatedPost=await Post.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                },{new:true})
                res.status(200).json(updatedPost)    
            } catch (error) {
                res.sendStatus(500).json(error)
                
            }
        }else{
            res.sendStatus(401).json("you can only update your post...")
            
        }     
    } catch (error) {
        res.sendStatus(500).json(error)
        
    }
})
   
//Delete Post 
router.delete('/:id',async (req,res)=>{ 
    try {
        const post=await Post.findById(req.params.id)
        if(post.email===req.body.email){
            try {
                await post.deleteOne() 
                res.status(200).json("your post has been deleted successfully...") 
            } catch (error) {
                res.sendStatus(500).json(error)
                
            }
        }else{
            res.sendStatus(401).json("you can only delete your post...")
            
        }
        
    } catch (error) {
        res.sendStatus(500).json(error)
        
    }
})

//Get Post
router.get('/:id',async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        res.status(200).json(post)
    } catch (error) {
        res.sendStatus(500).json(error)
    }
})

//Get All Post
router.get('/',async (req,res)=>{
    const categories=req.query.cat;
    const name=req.query.user;
    try {
        let posts;
        if(name){
            posts=await Post.find({name})
        }else if(categories){
            posts=await Post.find({categories})
        }else{
            posts=await Post.find();
        }
        res.status(200).json(posts)

    } catch (error) {
        res.sendStatus(500).json(error)
    }
})

module.exports=router;