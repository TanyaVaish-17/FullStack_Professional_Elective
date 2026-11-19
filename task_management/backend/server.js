const express=require("express")
const app=express()
const taskRoute=require("./routes/taskRoute");
const userRoute=require("./Routes/userRoute");
const rateLimit=require("express-rate-limit")

const limit=rateLimit({
    windowMs:15*60*1000,
    max:15,
    message:"You have exceeded hit limits of API"
})

app.use(cors());
app.use(limit);
app.use(taskRoute);
app.use(express.json())
const mongoose=require('mongoose');
app.use('/',taskRoute);

app.listen(5050,()=>{
    console.log("Server is listening");
})

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
console.log("database connected")
})
.catch((error)=>{
console.log("Databse can't connected",error)
})
