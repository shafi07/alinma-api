const express = require("express");

const router = express.Router();;

router.get('/auth',async(req,res)=>{
    res.send('success')
});

module.exports = router