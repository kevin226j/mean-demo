const router = require('express').Router();
const tagController = require('../controllers/tagController');
const passportService = require('../services/passport.service');

router.route('/')
    .get(passportService.passportJWT,tagController.readAll)
    .post(passportService.passportJWT, tagController.create);

router.route('/:id')
    .get(passportService.passportJWT,tagController.readById)
    .put(passportService.passportJWT, tagController.update)
    .delete(passportService.passportJWT, tagController.deleteById);

module.exports = router;