const express = require('express');
const router = express.Router();

//const modulRoute = require('./')
const authRoute = require('./auth.route');
const userRoute = require('./user.route')
const roleRoute = require('./role.route')
const moduleRoute = require('./module.route')

router.use('/test',router.get('/',(req,res) => (req,console.log("test route"))))
router.use('/auth',authRoute);
router.use('/user',userRoute)
router.use('/role',roleRoute)
router.use('/module',moduleRoute)

module.exports = router;