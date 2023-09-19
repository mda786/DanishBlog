const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute=require('./routes/auth')
const usersRoute=require('./routes/users')
const postsRoute=require('./routes/posts')

const multer=require('multer')
const cors=require('cors');
const path = require("path");


dotenv.config();

//db connection
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true            
    
  })
  .then(() => {
    console.log("DB connection Successful");
  })
  .catch((err) => {
    console.log(err);     
  });


//uploading a file
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'images') 
  },
  filename:(req,file,cb)=>{
    cb(null,req.body.name)
  }
})
const upload=multer({storage:storage})
app.post('/api/upload',upload.single('file'),(req,res)=>{
  res.status(200).json('file has been uploaded...')
})

//midleware
app.use(express.json())      
app.use(cors())
app.use("/images",express.static(path.join(__dirname,"images")))

app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/posts",postsRoute);     
 
 
//server running
app.listen(5000, () => {
  console.log("Backend is running...");
});
