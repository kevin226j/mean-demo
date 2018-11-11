const passport = require('passport');
const passportConfig = require('../../passport'); //need to create passport object strategies

module.exports = {
    passportSignIn : function(req, res, next) {passport.authenticate('local', {session : false}, function (err, user) {
        req.logIn(user, function() {
            if(err) return next(err);
            (!user) ? res.send({error: 'Unauthorized'}) : next();
        });
    })(req, res, next)},

    passportJWT : passport.authenticate("jwt", {session: false})
}
