var express = require('express');
var router = express.Router();
const session = require('express-session');
const bodyParser = require('body-parser');

//Đường dẫn tới home.controller.js 
var homeCtrl = require('../../controller/home.controller');
const productCtrl = require("../../controller/productController");

router.post('/add',homeCtrl.addSTAFF)
//Vào trang home theo địa chỉ '/'
router.get('/home',homeCtrl.home);
router.post('/login',homeCtrl.LOGIN);
router.get('/',productCtrl.loginScreen);
  router.get('/reg',homeCtrl.reg)
//Xuất router
module.exports = router;
