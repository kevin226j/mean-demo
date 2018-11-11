const {validateBody, schemas} = require('../helpers/routeHelper');
const express = require('express');
const router = require('express-promise-router')();

const userController = require('../controllers/userController');
const passportService = require('../services/passport.service');


// router.route('/signup')
//     .post(validateBody(schemas.authSchema),userController.signUp);

router.route('/')
    .post(validateBody(schemas.authSchema), passportService.passportSignIn, userController.signIn);

module.exports = router;