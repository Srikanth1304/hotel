const mongoose = require('mongoose');
const menuSchema=new mongoose.Schema({
    item:{
        type:"string",
        required:true
    },
    price:{
        type:"number",
        required:true
    },
    category:{
        type:"string",
        enum:["starter","main course","dessert"],
        required:true
    }

})
const Menu=mongoose.model("Menu",menuSchema);
module.exports=Menu;