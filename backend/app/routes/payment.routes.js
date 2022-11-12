const express = require('express');
const router = express.Router();
const {createOrder,paymentCallback} = require('../http/controllers/payment.ctrl')

router.get('/createorder',createOrder)
router.post('/payment/callback',paymentCallback)
module.exports = router;