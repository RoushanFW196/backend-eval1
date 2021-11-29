
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


//  app.get("/jobs",async (req, res) => {

//     const alljobs= await jobs.find().lean().exec();
//     res.send({alljobs})


//  })


// all jobs in particular city and with particular skills


app.get("/jobs",async (req, res) => {

    const skilljob= await jobs.find({$or:[{"city":{$eq:"poland"}},{"skills":{$eq:"Node.js"}}]}).lean().exec();
    res.send({skilljob})


   })

 // "city":"Poland","skills":"Node.js"





 // jobs available for work from home
//    app.get("/jobs",async (req, res) => {

//     const workfromhomejob= await jobs.find({"workfromhome":true}).lean().exec();
//     res.send({workfromhomejob})


//    })


//    app.get("/jobs",async (req, res) => {

//     const noticeperiodjob= await jobs.find({"noticeperiod":{$eq:2}}).lean().exec();
//     res.send({noticeperiodjob})


//    })


   // sorting the jobs as per rating 


//    app.get("/jobs",async (req, res) => {

//     const ratingjob= await jobs.find().sort({"rating":-1}).lean().exec();
//     res.send({ratingjob})


//    })






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


  // geting the list of the company
  app.get("/companies", async (req, res) => {
    const allcompany= await company.find().lean().exec();
    res.send({allcompany})
})


// geeting the details of a company

app.get("/companies/:id", async (req, res) => {

  const companydetail= await company.find({"_id":{$eq:req.params.id}}).lean().exec();

  res.send({companydetail})


})



// the company that has most open jobs

  
app.get("/companies", async (req, res) => {

    const mostopenjobcompany= await company.find({"openjobs":{$gte:req.params.no}}).sort().lean().exec();
  
    res.send({mostopenjobcompany})
  
  
  })
  






 console.log("hello")

 app.listen(1200, async ()=>{
     await connect()
     console.log("listening on the port 1200")
 })