import Express from 'express';
import Cors from 'cors';
import Dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';


// dotenv
Dotenv.config();


// express app

const app = Express();

// express 

app.use(Express.urlencoded());
app.use(Express.json());

// cors 
app.use(Cors({origin:'http://localhost:3000',methods:'GET,POST,DELETE,UPDATE',credentials:true}));

// cookieParser
app.use(cookieParser())

// cookie session
const sessionAge = (24*60*60*1000);
app.use(session({secret:'catscatasdf',cookie:{maxAge:sessionAge}}))

// app.use(cookieSession({name:'sessasdfion',keys:['key1'],maxAge:sessionAge}))


// passport 
// app.use(passport.authenticate('session'))
app.use(passport.initialize());
app.use(passport.session());

// passport 

import './auth/index.js';

// routes 

// auth url     
import authRoute from './auth/route.js';
app.use('/auth',authRoute);


// listening ...
const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Server is running... http://localhost:${port}`);
})