const express = require('express');
const app = express();

// Database connection
const db=require('./db');

//Models
const Person=require('./models/Person');
const Menu=require('./models/Menu');

//middle ware: To convert the json bdata formate into object and helps to understand by server 
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Middleware logging 
const logTime=(req,res,next) => {
    console.log(`Request received at ${new Date().toLocaleString()} to the url ${req.originalUrl}`);
    next();
}

app.use(logTime); // for entire requests 


require('dotenv').config();




//Authuntion middleware
const passport= require('passport');
const localStrategy= require('passport-local').Strategy; //it validate username and password

passport.use(new localStrategy(async (USERNAME,pwd,done)=>{
    try{
        const user=await Person.findOne({username:USERNAME});
        if(!user){
            return done(null,false,{message:"user not found"});
        }
        const isPasswd =user.password===pwd ? true : false;
        if(isPasswd){
            return done(null,user);
        }
        if(!isPasswd){
            return done(null,false,{message:"Invalid password"});
        }

    }catch(err){
        console.log(err);
        return done(err);
    }

    
}));





// app.get('/',logTime, (req, res) => {
//     res.send('Nimbupani')
// });
app.get('/',passport.authenticate('local',{session:false}), (req, res) => {
    res.send('Nimbupani')
});


// app.post('/', (req, res) => {
//     const data=req.body;
//     const newPerson=new Person(data);
//     // newPerson.name = data.name;
//     // newPerson.age = data.age;
//     // newPerson.work = data.work;
//     // newPerson.mobile = data.mobile;
//     newPerson.save((error,result)=>{
//         if(error){
//             res.status(500).json(error);
//         }else{
//             res.status(200).json(result);
//     }
//     });
// })










const person=require('./routes/person');
app.use('/person',person);

const menu=require('./routes/menu');
app.use('/menu',menu);


const PORT=process.env.PORT||3000;

app.listen(PORT,() => {
    console.log('Server is running on port 3000');
});
