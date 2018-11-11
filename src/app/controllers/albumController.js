import mongoose from 'mongoose';
import {AlbumModel} from '../models/albumModel';

const responses = require('../models/response');
const Album = mongoose.model('Album', AlbumModel, 'albums');


export const readAll = (req, res, next) => {
    Album.find({}).exec()
        .then(result => res.json(new responses.ItemsResponse(result)))
        .catch(err => res.status(500).send(new responses.ErrorResponse(err)))
}

export const readById = (req, res, next) => {
    Album.findById({_id: req.params.id}).exec()
        .then(result => res.json(new responses.ItemResponse(result)))
        .catch(err => res.status(500).send(new responses.ErrorResponse(err)))
}

export const create = (req, res, next) => {
    Album(req.body).save()
        .then(result => res.json(new responses.ItemResponse(result)))
        .catch(err => res.status(500).send(new responses.ErrorResponse(err)))
}

export const update = (req, res, next) => {
    Album.findOneAndUpdate({_id : req.params.id}, req.body, {new:true}).exec()
        .then(result => res.json(new responses.SuccessResponse(result)))
        .catch(err => res.status(500).send(new responses.ErrorResponse(err)))
}

export const deleteById = (req, res, next) => {
    Album.findOneAndDelete({_id : req.params.id})
        .then(result => res.json({'message': 'successfully deleted'}))
        .catch(err => res.status(500).send(new responses.ErrorResponse(err)))
}


export const readByCategory = (req, res, next) => {
    Album.find({category: req.params.category}).exec()
        .then(result => res.json(new responses.ItemsResponse(result)))
        .catch(err => res.status(500).send(new responses.ErrorResponse(err)))
}

export const readByName = (req, res, next) => {
    Album.findOne({name: req.params.name, category: req.params.category}).exec()
        .then(result => res.json(new responses.ItemResponse(result)))
        .catch(err => res.status(500).send(new responses.ErrorResponse(err)))    
}
