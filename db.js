// step1: Mongoose is a driver that acts as bridge of communication between Mongo db and Node js
const mongoose=require('mongoose'); 

require('dotenv').config();


// step2: Defining database url
//const mongoURL="mongodb://localhost:27017/hotels";
const mongoURL = process.env.DB_URL;
//.env module is to manage sensitive info that relates to security

// step3: connect
mongoose.connect(
    mongoURL,{
        useNewUrlParser: true
       // useUniformedTopology: true
    }
)


//step4: use the term "db" to connect
const db=mongoose.connection;


// Step5: Event listeners for connection status
db.on('connected',() => {
    console.log('Connected to MongoDB');
})
db.on('disconnected',() => {
    console.log('Disconnected from MongoDB');
})


// Step6: Export the db for use in other files
module.exports =db;