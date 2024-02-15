var express = require('express');
var router = express.Router();
var UserCtrl = require('../../controller/userController');

router.get('/',UserCtrl.listUsers);
router.post('/delete/:id',UserCtrl.delete);

module.exports = router;