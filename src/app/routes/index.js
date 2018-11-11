const router = require("express").Router();
const albumRoute = require('./albumRoute');
const photoRoute = require('./photoRoute');
const s3Route = require('./s3Route');
const userRoute = require('./userRoute');
const tagRoute = require('./tagRoute');

//configure api routes and controllers
router.use("/api/albums", albumRoute);
router.use("/api/photos", photoRoute);
router.use("/api/aws", s3Route);
router.use("/api/tags", tagRoute);
router.use("/api/login", userRoute);


/* for local env :errors
// register handler for 404 errors
router.use(errorHandler.notFound);
// register handler for error messages
router.use(errorHandler.developmentErrors);
*/


module.exports = router;