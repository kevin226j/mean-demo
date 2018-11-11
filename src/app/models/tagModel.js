import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TagModel = new Schema({
    tagName: {
        type: String,
        required:true 
    }
},{
    timestamps: true
});


