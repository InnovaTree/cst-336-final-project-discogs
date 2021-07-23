module.exports = function isAuthenticated(req, res, next){
  req.session.authenticated ? next() : res.redirect("/");
};