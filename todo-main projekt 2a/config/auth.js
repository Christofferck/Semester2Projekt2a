module.exports = {
    ensureAuthenticated : function(req,res,next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg' , 'You need to sign in to view this page');
        res.redirect('/login');
    },
    authRole : function(role) {

      return (req, res, next) => {

        if(req.user.role !== role) {
          res.status(401)
          return res.send('You do not have permission to view this page')
        }
        next()
      }
    },
}
