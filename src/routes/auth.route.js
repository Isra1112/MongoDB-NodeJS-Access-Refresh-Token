const express = require('express');
const router = express.Router();

const AuthService = require('../services/auth.service');
const authService = new AuthService()
const {reqRefreshToken,reqAccessToken} = require("../controllers/auth.controller")

router.post('/createaccesstoken',(req,res,next)=>reqAccessToken(req,res,authService));
router.post('/createrefreshtoken',(req,res,next)=>reqRefreshToken(req,res,authService));

module.exports = router;