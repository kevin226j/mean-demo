import jwt from 'jsonwebtoken';

require('dotenv').config();

const responses = require('../models/response');
const User = require('../models/userModel');


const signToken = (user) => {
    return jwt.sign({
        iss: process.env.JWT_ISS, //issuer
        sub: user.id,   //subject
        iat: new Date().getTime(), //time issued
        exp: new Date().setDate(new Date().getDate() + 1) //expiration date, 1 day after issue
    }, process.env.JWT_SECRET)
}


export const signUp = async (req,res,next) => {

    //use for signUp logic, if request headers not valid, throw back an error, not authorized.
    if (req.get('Access-Control-Request-Headers') === process.env.ACRH_CODE){

        const {email, password} = req.body;

        //Check if user with same email.
        const foundUser = await User.findOne({"local.email" : email});
        if(foundUser){
            return res.status(403).json({error: 'Email already in use'});
        }

        //create new user 
        const newUser = new User({
            method: 'local',
            local : {
                email: email,
                password : password
            }
        });

        //save new user
        await newUser.save();


        //generate new token
        //const token = signToken(newUser);

        //respond with token
        //res.status(200).json({token, expiresIn: '86400'});

        //respond
        res.status(200).json({message: 'You are approved'});

    } else {
        return res.status(401).json({error: 'Unauthorized Access'});
    }

}

export const signIn = async (req,res,next) => {
    
    const token = signToken(req.user);

    res.status(200).json({token,expiresIn: '86400'});

}


