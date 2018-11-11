const router = require('express').Router();
const s3Controller = require('../controllers/s3Controller');
const passportService = require('../services/passport.service');

router.route('/')
    .post(passportService.passportJWT, s3Controller.uploadMedia)
    .delete(passportService.passportJWT, s3Controller.deleteMedia);
    
module.exports = router;