const express = require('express');
const router = express.Router();
const {User} = require("../models/user");
const bcrypt = require('bcrypt');
const passport = require('passport');

router.get('/', (req,res)=>{
    res.render('login');
})

router.post('/', (req,res,next)=>{
    passport.authenticate('local',{
        successRedirect : '/dashboard',
        failureRedirect: '/',
        failureFlash : true
    })(req,res,next)
})

module.exports = router;
