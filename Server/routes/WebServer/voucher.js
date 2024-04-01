var express = require('express');
var router = express.Router();

var vouchers = require('../../controller/voucherController');


router.get('/',vouchers.listVouchers);
router.post('/delete/:id',vouchers.delete);

module.exports = router;