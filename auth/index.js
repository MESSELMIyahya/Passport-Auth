import GoogleS from 'passport-google-oauth20';
import GithubS from 'passport-github2';
import passport from 'passport';

// 
import Dotenv from 'dotenv';
Dotenv.config();

// passport 

// GOOGLE

const GoogleStrategy = GoogleS.Strategy ;

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback:true
  },
  function(req,accessToken, refreshToken, profile, done) {
     // here where we search on the user in db if he doesn't exist we caret one 
     // return the user 
     const userObj = {
      username:profile.displayName,
      photo:profile.photos[0],
      name:profile.name
     };
    //  console.log(profile)
    return done(null,userObj);
  }
));


// GITHUB


const GithubStrategy = GithubS.Strategy ;

passport.use(new GithubStrategy({
    clientID: process.env.CLIENT_GITHUB_ID,
    clientSecret: process.env.CLIENT_GITHUB_SECRET,
    callbackURL: "http://localhost:5000/auth/github/callback",
    passReqToCallback:true
  },
  function(req,accessToken, refreshToken, profile, done) {
     // here where we search on the user in db if he doesn't exist we caret one 

     // return the user 
     const userObj = {
      username:profile.displayName,
      photo:profile.photos[0],
      name:{family:profile.username,last:''}
     };
     console.log(profile)
    return done(null,userObj);
  }
));



// serialize
passport.serializeUser((user,done)=>{
  done(null,user);
})
// deserialize
passport.deserializeUser((user,done)=>{
 done(null,user);
})
