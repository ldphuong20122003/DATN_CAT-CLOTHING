var express = require('express');
var router = express.Router();

const orderdetail = require('../../controller/chitietdonhang.controller');

router.get('/',orderdetail.getOrderDetailList);
//xóa
router.post('/delete/:id',orderdetail.delete);
//update
router.post('/update/:id',orderdetail.put);
//Xuất router
module.exports = router;