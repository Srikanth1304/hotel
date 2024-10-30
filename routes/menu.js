const express=require('express');
const routes=express.Router();

const Menu=require('./../models/Menu');

routes.get('/items',async (req, res)=>{
    try{
    const items=await Menu.find();
    res.status(200).json(items);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }}
)


routes.post('/',async (req, res)=>{
    try{
        const data=req.body;
        const newMenu=new Menu(data);
        const response=await newMenu.save();
        console.log("Successfully saved");
        res.status(200).json(response);
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
})


routes.put('/:id',async(req, res)=>{
    try{
        const data=req.body;
        const id =req.params.id;
        const updateMenu=await Menu.findByIdAndUpdate(id,data,{
            new:true,
            runValidators:true
        });
        console.log("Successfully updated");
        res.status(200).json(updateMenu);
        if(!updateMenu){
            return res.status(404).json({message:"Menu not found"})
        }
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
})


routes.delete('/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const response=await Menu.findByIdAndDelete(id);
        console.log("deleted");
        res.status(200).json(response);
        if(!response){
            return res.status(404).json({message:"Menu not found"})
        }
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports=routes;
