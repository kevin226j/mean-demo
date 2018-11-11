const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-plus-token');
const User = require('./app/models/userModel');

require('dotenv').config();

//JSON WEB TOKEN STRATEGY - when access is granted.
passport.use(new JWTStrategy({
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
    try {
        
        //check expiration date
        if(payload.exp < Date.now()){
            return done(null,false, {message: 'token expired'});
        }

        //find the user specified in token
        const user = User.findById(payload.sub);

        //if user doesn't exist, handle it
        if(!user){
            return done(null, false);
        }

        //otherwise return the user
        return done(null, user);

    } catch (error) {

        return done(error, false);

    }
}));



//LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField : 'email'
}, async (email, password, done) =>{
    try {

        //find user given email
        const user = await User.findOne({"local.email": email});

        //if user doesn't exist, handle it
        if(!user){
            return done(null, false, {message: 'error'});
        }

        //check if password is correct, if not handle it.
        const isMatched = await user.isValidPassword(password);

        
        if(!isMatched){
            return done(null, false, {message: 'error'})
        }

        //otherwise return user 
        return done(null, user);
        
    } catch (error) {
        
        return done(error, false);

    }
}));
