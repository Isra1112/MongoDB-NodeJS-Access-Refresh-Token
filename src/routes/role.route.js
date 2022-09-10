const express = require('express');
const router = express.Router();
// const User = require('../models/index.model')
const RoleService = require('../services/role.service')
const {addNewRole,getRole,updateRole,removeRole} = require('../controllers/role.controller');
const verifyToken = require('../middlewares/auth-token');
const roleService = new RoleService();


router.use(verifyToken)
router.get('/',(req,res,next)=>getRole(req,res,roleService))
router.get('/:id',(req,res,next)=>getRole(req,res,roleService))
router.post('/',(req,res,next)=>addNewRole(req,res,roleService))
router.put('/',(req,res,next)=>updateRole(req,res,roleService))
router.delete('/',(req,res,next)=>removeRole(req,res,roleService))


module.exports = router;