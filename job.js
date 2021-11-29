
const express= require('express');
 const app = express();
 
 const mongoose = require('mongoose');



 // connecting mongoose with mongodb naukri 
 const connect= async ()=>{
     mongoose.connect("mongodb://127.0.0.1:27017/naukri")
 }

   app.use(express.json());


// job schema
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


 const jobs=mongoose.model("job",jobschema);   // jobs collection are created under naukri database



// all of the job list available on naukri database

    // app.get("/jobs",async (req, res) => {

    //   try{
    //     const alljobs= await jobs.find().lean().exec();
    //          res.status(201).send({alljobs})
    //   }
    //     catch(e){

    //         res.status(500).send({e})
    //     }
    

    //  })





// all jobs in particular city and with particular skills


//     app.get("/jobs",async (req, res) => {

//     try{

    
//     const skilljob= await jobs.find({$or:[{"city":{$eq:"poland"}},{"skills":{$eq:"Node.js"}}]}).lean().exec();
//     res.status(500).send({skilljob})
//     }
//     catch(e){
//         res.status(500).send({e})
//     }

//    })



   app.get("/jobs/:city",async (req, res) => {

    try{

    
    const skilljob= await jobs.find({$and:[{"city":{$eq:req.params.city}},{"skills":"Node.js"}]}).lean().exec();
    res.status(500).send({skilljob})
    }
    catch(e){
        res.status(500).send({e})
    }

   })







 // "city":"Poland","skills":"Node.js"





 // jobs available for work from home
   app.get("/jobs",async (req, res) => {

    try{

    
    const workfromhomejob= await jobs.find({"workfromhome":true}).lean().exec();
    res.status(500).send({workfromhomejob})
    }
    catch(e){
        res.status(500).send({e})
    }


   })


   // jobs which having 2 month notice periods

   app.get("/jobs",async (req, res) => {

    try{

    
    const noticeperiodjob= await jobs.find({"noticeperiod":{$eq:2}}).lean().exec();
    res.send({noticeperiodjob})
    }
    catch(e){
        res.status(500).send({e})
    }



   })


   // sorting the jobs as per rating 


   app.get("/jobs",async (req, res) => {
       try{
    const highratingjob= await jobs.find().sort({"rating":-1}).lean().exec();
    res.send({highratingjob})
       }
       catch(e){
        res.status(500).send({e})
    }


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


  // geting the list of all the company
  app.get("/companies", async (req, res) => {
       try{

       
    const allcompany= await company.find().lean().exec();
    res.send({allcompany})
       }
       catch(e){
        res.status(500).send({e})
    }

})


// geeting the details of a company

app.get("/companies/:id", async (req, res) => {

      try{

      
  const companydetail= await company.find({"_id":{$eq:req.params.id}}).lean().exec();

  res.send({companydetail})
      }

      catch(e){
        res.status(500).send({e})
    }


})



// the company that has most open jobs

  
app.get("/companies", async (req, res) => {
      
    try{
  const mostopenjobcompany= await company.find().sort({"openjobs":-1}).limit(10).lean().exec();
  
    res.send({mostopenjobcompany})
    }
    catch(e){
        res.status(500).send({e})
    }

  
  })
  






 console.log("hello")

 app.listen(1200, async ()=>{
     await connect()
     console.log("listening on the port 1200")
 })