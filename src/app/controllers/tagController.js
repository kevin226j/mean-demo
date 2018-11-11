import mongoose from 'mongoose';
import {TagModel} from '../models/tagModel';

const responses = require('../models/response');
const Tag = mongoose.model('Tag', TagModel, 'tags');


export const readAll = (req, res, next) => {
    Tag.find({}).exec()
        .then(result => res.json(new responses.ItemsResponse(result)))
        .catch(err => res.status(500).send(new responses.ErrorResponse(err)))
}

export const readById = (req, res, next) => {
    Tag.findById({_id: req.params.id}).exec()
        .then(result => res.json(new responses.ItemResponse(result)))
        .catch(err => res.status(500).send(new responses.ErrorResponse(err)))
}

export const create = (req, res, next) => {
    Tag(req.body).save()
        .then(result => res.json(new responses.ItemResponse(result)))
        .catch(err => res.status(500).send(new responses.ErrorResponse(err)))
}

export const update = (req, res, next) => {
    Tag.findOneAndUpdate({_id : req.params.id}, req.body, {new:true}).exec()
        .then(result => res.json(new responses.SuccessResponse(result)))
        .catch(err => res.status(500).send(new responses.ErrorResponse(err)))
}

export const deleteById = (req, res, next) => {
    Tag.findOneAndDelete({_id : req.params.id})
        .then(result => res.json({'message': 'successfully deleted'}))
        .catch(err => res.status(500).send(new responses.ErrorResponse(err)))
}
