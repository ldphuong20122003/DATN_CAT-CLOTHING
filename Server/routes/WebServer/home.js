var express = require('express');
var router = express.Router();
const session = require('express-session');
const bodyParser = require('body-parser');

//Đường dẫn tới home.controller.js 
var homeCtrl = require('../../controller/home.controller');


//Vào trang home theo địa chỉ '/'
router.get('/',homeCtrl.home);

  
  
//Xuất router
module.exports = router;
