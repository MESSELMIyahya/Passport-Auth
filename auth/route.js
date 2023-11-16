import { Router } from 'express'
import passport from 'passport';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000/';

// app 
const app = Router();

app.get('/is/authenticated',(req,res)=>{
    if(req.user){
        res.json({user:req.user,authenticated:true});
    }else {
        res.status(401).json({authenticated:false});
    }
})

// logout 

app.get('/logout',(req,res)=>{
    req.logout((err)=>{
        if(err) console.log(err);
        req.cookies = null
        res.redirect(CLIENT_URL);
    })
})


// not authenticated

app.get('/login/failed',(req,res)=>{
    res.status(401).json({authenticated:false});
});

// authenticate google 
app.get('/google',passport.authenticate('google',{scope:['profile']}));

// callback goolge 
app.get('/google/callback',passport.authenticate('google',{
    successRedirect:CLIENT_URL,
    failureRedirect:'/login/failed',
}));


// authenticate
app.get('/github',passport.authenticate('github',{scope:['profile']}));

// callback
app.get('/github/callback',passport.authenticate('github',{
    successRedirect:CLIENT_URL,
    failureRedirect:'/login/failed',
}));


// exporting 
const authRoute = app ;
export default authRoute ;

