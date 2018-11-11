import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const PhotoModel = new Schema({
    albumName: {
        type: String,
        required:true 
    },
    image: {
        type: String,
        required: true
    }
},{
    timestamps: true
});


