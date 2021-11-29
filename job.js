
const express= require('express');
 const app = express();
 
 const mongoose = require('mongoose');

 const connect= async ()=>{
     mongoose.connect("mongodb://127.0.0.1:27017/naukri")
 }

app.use(express.json());

 const jobschema= new mongoose.Schema({

    id:{type:Number, required:true},
    job_title:{type:String, required:true},
    workfromhome:{type:Boolean,required:true,default:false},
    noticeperiod:{type:Number,required:true},
    city:{type:String, required:true},
     rating:{type:Number,required:true},
     skills:{type:String, required:true},
     rating:{type:Number,required:true}

    
   
 },{
     versionKey:false,
     timestamp:true

 })


 const jobs=mongoose.model("job",jobschema);


 app.get("/jobs",async (req, res) => {

    const alljobs= await jobs.find().lean().exec();
    res.send({alljobs})


 })

 // jobs 
   app.get("/jobs",async (req, res) => {

   })








const companyschema=new mongoose.Schema({
     
    id:{type:Number, required:true},
    company: {type:String, required:true},
    city:{type:String, required:true},
    skills:{type:String, required:true},
    jobtitle:{type:String, required:true},
    openjobs:{type:Number, required:true},



},{
    versionKey:false,
    timestamp:true
})

  const company=mongoose.model("company",companyschema);




  app.get("/companies", async (req, res) => {
    const allcompany= await company.find().lean().exec();
    res.send({allcompany})
})




 console.log("hello")

 app.listen(1200, async ()=>{
     await connect()
     console.log("listening on the port 1200")
 })