import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const AlbumModel = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    total: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

