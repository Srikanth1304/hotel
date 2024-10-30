const express=require('express');
const router=express.Router();

const Person=require('./../models/Person');

router.get('/',async (req, res)=>{
    try{
        const people=await Person.find();
        res.status(200).json(people);

    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})



router.post("/details",async (req, res)=>{
    try{
        const data=req.body;
        const newPerson=new Person(data);
        const response= await newPerson.save()
            console.log("successfull");
            res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json(err);

    }

})



router.get('/:workType',async (req, res)=>{
    const workType=req.params.workType;
    try{
        if(workType=='chef' || workType=='manager' || workType=='waiter'){
        const person=await Person.find({work:workType});
        res.status(200).json(person);
        }
        else{
            res.status(400).json({message:"Invalid work type"})
        }
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }   
})


router.put('/:id',async (req,res)=>{
   
    try{
        const person_id=req.params.id;
        const updatedPerson=req.body;
        const response=await Person.findByIdAndUpdate(person_id,updatedPerson,{
            new:true,
            runValidators:true
        });
        if(!response){
            return res.status(404).json({message:"Person not found"})
        }
        console.log("Updated successfull");
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json(err);  
    }

})


router.delete("/:id",async(req, res)=>{
   try{
    const id=req.params.id;
    const response= await Person.findByIdAndDelete(id);
    if(!response){
        return res.status(404).json({message:"Person not found"})
    }

   }catch(err){
    console.log(err);
    res.status(500).json(err);
   }
});
module.exports=router;