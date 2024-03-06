var express = require('express');
var router = express.Router();
const session = require('express-session');
const bodyParser = require('body-parser');

//Đường dẫn tới donhang.controller.js 
const donhangCtrl = require('../../controller/donhang.controller');

router.get('/',donhangCtrl.OrderDanhSach);
//xóa
router.post('/delete/:id',donhangCtrl.delete);

//Xuất router
module.exports = router;
