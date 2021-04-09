const express = require('express');
const bodyParser  = require("body-parser");
const router  = express.Router();
const {ensureAuthenticated, authRole} = require('../config/auth')
const {ROLE} = require('../config/roles')
const {UserReq, User} = require("../models/user");

//login page
router.get('/', (req,res)=>{
    res.render('welcome');
})
//register page
router.get('/register', (req,res)=>{
    res.render('register');
})

router.get('/dashboard',ensureAuthenticated, (req,res)=>{
    res.render('dashboard',{
        user: req.user
    });
})




module.exports = router;
