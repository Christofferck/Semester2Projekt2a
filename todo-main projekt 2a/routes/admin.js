const express = require('express');
const bodyParser  = require("body-parser");
const router  = express.Router();
const {ensureAuthenticated, authRole} = require('../config/auth')
const {ROLE} = require('../config/roles')
const {UserReq, User} = require("../models/user");



router.get('/', ensureAuthenticated, authRole(ROLE.ADMIN), async function(req, res) {
    let query = UserReq.find()
        try {
            const users = await query.exec()
            res.render('admin', {
                users: users,
            })
        } catch {
            res.redirect('/')
        }
})

router.post('/', async function(req, res) {
  
  switch (req.body.formInstance) {
    case 'pendingUser':

      if (req.body.choice == 'decline') {
          UserReq.findOneAndDelete({email: req.body.email}, function(err,obj) {
            if (err) {
              console.log(err)
            }
          });
      } else if (req.body.choice == 'accept') {
          UserReq.findOne({email: req.body.email}, async function(err,obj) { return obj })
          .then(res =>{ //callback function
              user = new User(res)
              user.isNew = true;
              console.log(user)
              user.save(function(error, savedDocument) {
                  if (error) console.log(error)
                  else {
                    console.log(savedDocument + " has been saved");
                    UserReq.findOneAndDelete({email: req.body.email}, function(err,obj) {})
                  }

              })
          })

      }


    break;
    case 'userRole':
      console.log(req.body.userRole)

      // `doc` is the document _after_ `update` was applied because of
      // `returnOriginal: false`
      User.findOneAndUpdate({email: req.body.email}, { role: req.body.userRole }, function(err,obj) {
        if (err) {
          console.log(err)
        }
        console.log('changes role for user: ', obj)
      });




    break;
    default:

  }





  res.redirect('/admin')
})








module.exports = router;
