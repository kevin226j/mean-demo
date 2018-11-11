const router = require('express').Router();
const albumController = require('../controllers/albumController');
const passportService = require('../services/passport.service');

router.route('/')
    .get(passportService.passportJWT,albumController.readAll)
    .post(passportService.passportJWT, albumController.create)

router.route('/:id')
    .get(albumController.readById)
    .put(passportService.passportJWT, albumController.update)
    .delete(passportService.passportJWT, albumController.deleteById);

router.route('/album/:category')
    .get(passportService.passportJWT,albumController.readByCategory)

router.route('/album/:category?/:name?')
    .get(passportService.passportJWT,albumController.readByName);

module.exports = router;