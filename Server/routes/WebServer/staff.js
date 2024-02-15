var express = require('express');
var router = express.Router();
var StaffCtrl = require('../../controller/staff.controller');



router.get('/',StaffCtrl.listStaffs);

router.post('/delete/:id',StaffCtrl.delete);

router.post('/edit/:id',StaffCtrl.put);
module.exports = router;