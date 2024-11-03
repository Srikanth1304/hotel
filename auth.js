const passport = require('passport');
const localStrategy= require('passport-local').Strategy; //it validate username and password
const Person= require('./models/Person');

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

module.exports =passport;