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











// app.get('/',logTime, (req, res) => {
//     res.send('Nimbupani')
// });
app.get('/', (req, res) => {
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





//Authuntion middleware
const passport= require('./auth');
app.use(passport.initialize());
const authentication=passport.authenticate('local',{session:false})


const person=require('./routes/person');
app.use('/person',authentication,person);

const menu=require('./routes/menu');
app.use('/menu',authentication,menu);


const PORT=process.env.PORT||3000;

app.listen(PORT,() => {
    console.log('Server is running on port 3000');
});
