const express = require('express');
const router = express.Router();

//logout
router.get('/',(req,res)=>{
    req.logout();
    req.flash('success_msg','Now logged out, do you want to login again?');
    res.redirect('login'); 
    })

module.exports  = router; 