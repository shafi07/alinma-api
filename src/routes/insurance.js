const express = require("express");

const router = express.Router();;

router.get('/',async(req,res)=>{
    res.send('success2323')
});

module.exports = router