const router = require('express').Router();
const photoController = require('../controllers/photoController');
const passportService = require('../services/passport.service');

router.route('/')
    .get(passportService.passportJWT,photoController.readAll)
    .post(passportService.passportJWT,photoController.create);

router.route('/:id')
    .get(passportService.passportJWT,photoController.readByAlbum)
    .put(passportService.passportJWT, photoController.update)
    .delete(passportService.passportJWT, photoController.deleteById);


module.exports = router;