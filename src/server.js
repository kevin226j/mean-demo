// set up ======================================================================
import express from 'express';
import bodyParser from 'body-parser';
import mongoose  from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import router from './app/routes/';

const database = require('./config/database');
const app = express();
const path = require('path');
const http = require('http'); //create http for production

//const session = require('express-session');
const passport = require('passport');

const port = process.env.PORT || 8080;

// configuration ===============================================================

//serve ng
app.use(express.static(path.join(__dirname, '/../', 'dist/public')));

//database connection
mongoose.Promise = global.Promise;
mongoose.connect(database.atlasURL,{useNewUrlParser: true, dbName: 'demo'});  // for localhOST: {useNewUrlParser: true}
mongoose.connection.once('open', ()=>{console.log(`DB connected`)});



//middle-ware

app.use(morgan(`dev`));
app.use(express.static(path.join(__dirname, '/../', 'dist/public')));     // set the static files location
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                         // parse application/json


//passport-middleware set up
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {done(null, user)});
passport.deserializeUser((user, done) => {done(null, user)});


 

//cors
app.use(cors());
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});




// routes ======================================================================
app.use(router);

//redirect production routing to index.html
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'public', 'index.html'));
});



//Create server for production
const server = http.createServer(app);




// listening ======================================================================
server.listen(port,()=>{
    console.log(`server running on port: ${port}`);
})





