import mongoose from 'mongoose';
import {PhotoModel} from '../models/photoModel';

const responses = require('../models/response');
const Photo = mongoose.model('Photo', PhotoModel, 'photos');


export const readAll = (req, res, next) => {
    Photo.find({}).exec()
        .then(result => res.json(new responses.ItemsResponse(result)))
        .catch(err => res.status(500).send(new responses.ErrorResponse(err)))
}
 

export const create = (req, res, next) => {
    let post = new Photo(req.body)
    post.save()
        .then(result => res.json(new responses.ItemResponse(result)))
        .catch(err => res.status(500).send(new responses.ErrorResponse(err)))
}

export const update = (req, res, next) => {
    Photo.findOneAndUpdate({_id : req.params.id}, req.body, {new:true}).exec()
        .then(result => res.json(new responses.SuccessResponse(result)))
        .catch(err => res.status(500).send(new responses.ErrorResponse(err)))
}

export const deleteById = (req, res, next) => {
    Photo.findOneAndDelete({_id : req.params.id})
        .then(result => res.json({'message': 'successfully deleted'}))
        .catch(err => res.status(500).send(new responses.ErrorResponse(err)))
}


export const readByAlbum = (req, res, next) => {
    Photo.find({albumName : req.params.id}).exec()
        .then(result => res.json(new responses.ItemsResponse(result)))
        .catch(err => res.status(500).send(new responses.ErrorResponse(err)))
}




