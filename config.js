const mongoose = require("mongoose")

 mongoose.connect("mongodb://localhost:27017/work").then((req,res)=> {
   if(req) {
    console.log("connected successfully!")
   }
 })