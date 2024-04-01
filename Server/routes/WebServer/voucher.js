var express = require('express');
var router = express.Router();

var vouchers = require('../../controller/voucherController');


router.get('/',vouchers.listVouchers);
router.post('/delete/:id',vouchers.delete);
router.post('/addVoucher',vouchers.addVoucher);
router.post('/update/:id',vouchers.updateVoucher);
module.exports = router;