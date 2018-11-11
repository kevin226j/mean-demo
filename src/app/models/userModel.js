import mongoose from 'mongoose';
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;



const UserModel = new Schema({
    method: {
        type: String,
        enum: ['local', 'google'],
        required: true
    },
    local: {
        email: {
            type: String,
            lowercase: true
        },
        password: {
            type: String
        }
    },
    google: {
        id: {
            type: String
        },
        email : {
            type: String,
            lowercase: true
        }
    }

})

UserModel.pre('save', async function(next) {
    try {
        //check if local auth
        if(this.method !== 'local'){
            next();
        }

        //generate salt
        const salt = await bcrypt.genSalt(10);

        //generate password hash (salt + hash)
        const passwordHash = await bcrypt.hash(this.local.password, salt);

        //re-assign hash version of password over original text password
        this.local.password = passwordHash;

        next();
        
    } catch (error) {
        
        next(error);

    }
});


//compare password entered vs hashed password
UserModel.methods.isValidPassword = async function (enteredPassword){
    try {
        return await bcrypt.compare(enteredPassword, this.local.password);
    } catch (error) {
        throw new Error(error);
    }
}


//create model
const User = mongoose.model('user', UserModel, 'users');

//export
module.exports = User;