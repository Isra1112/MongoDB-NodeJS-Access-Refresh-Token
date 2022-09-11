const express = require('express');
const router = express.Router();
// const User = require('../models/index.model')
const ModuleService = require('../services/module.service')
const {addNewModule,getModule,updateModule,removeModule} = require('../controllers/module.controller');
const verifyToken = require('../middlewares/auth-token');
const moduleService = new ModuleService();


// router.use(verifyToken)
router.get('/',(req,res,next)=>getModule(req,res,moduleService))
router.get('/:id',(req,res,next)=>getModule(req,res,moduleService))
router.post('/',(req,res,next)=>addNewModule(req,res,moduleService))
router.put('/',(req,res,next)=>updateModule(req,res,moduleService))
router.delete('/',(req,res,next)=>removeModule(req,res,moduleService))


module.exports = router;