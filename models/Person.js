const mongoose= require('mongoose');
const bcrypt= require('bcrypt');
const personSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:["chef","manager","waiter"],
        required:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true 
    },
    address:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true,

    },
    password:{ 
        type:String,
        required:true
    }
})

personSchema.pre('save',async function(next){
    const person=this;
    if(!person.isModified('password')) return next(); //checks if he is changing password..
    try{
        const salt=await bcrypt.genSalt(10);// salt
        const hashpass=await bcrypt.hash(person.password, salt); //hash
        person.password=hashpass;
        next()


    }catch(err){
        console.log(err);
        return next(err);
    }
})

personSchema.methods.comparePassword =async function(enteredPass){
    try{
        const isMatch=await bcrypt.compare(enteredPass, this.password);
        return isMatch;
    }catch(err){
        console.log(err);
        throw err;
    } 
}


const Person=mongoose.model('Person',personSchema);
module.exports = Person;