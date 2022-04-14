const express = require('express');
const router = express.Router();
// const User = require('../models/index.model')
const UserService = require('../services/user.service')
const {addNewUser,getUser,updateUser,removeUser} = require('../controllers/user.controller');
const verifyToken = require('../middlewares/auth-token');
const userService = new UserService();


// router.use(verifyToken)
router.get('/',(req,res,next)=>getUser(req,res,userService))
router.get('/:id',(req,res,next)=>getUser(req,res,userService))
router.post('/',(req,res,next)=>addNewUser(req,res,userService))
router.put('/',(req,res,next)=>updateUser(req,res,userService))
router.delete('/',(req,res,next)=>removeUser(req,res,userService))


module.exports = router;