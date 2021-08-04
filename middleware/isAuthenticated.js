/**
 * Proceeds to next function if user is authenticated or
 * redirects to index if not.
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
module.exports = function isAuthenticated(req, res, next){
  req.session.authenticated ? next() : res.redirect("/");
};