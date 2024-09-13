const express = require('express');
const router = express.Router();

const orders = require('./Orders/Orders_Route');
const user = require('./Users/User_Route');
const vehicles = require('./Vehicle_Data/Vehicle_Route');
const getlocation = require('./Location/Location_Route');


router.use('/orders', orders);
router.use('/user', user);
router.use('/vehicles', vehicles);
router.use('/location', getlocation);

module.exports = router;
