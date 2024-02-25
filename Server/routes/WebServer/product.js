var express = require('express');
var router = express.Router();
const admin = require('firebase-admin');
const multer = require('multer');

//Đường dẫn tới products.controller.js 
var productCtrl = require('../../controller/productController');


//Vào trang product theo địa chỉ '/products/'
router.get('/',productCtrl.listProducts);
router.get('/search', (req, res) => {
    const itemName = req.query.itemName;

    admin.firestore().collection('products').where('Name', '==', itemName).get()
        .then(snapshot => {
            if (snapshot.empty) {
                res.send('Không tìm thấy mục.');
                return;
            }

            const data = [];
            snapshot.forEach(doc => {
                data.push(doc.data());
            });
            res.send(data);
           ;
        })
        .catch(err => {
            console.error('Lỗi truy vấn:', err);
            res.status(500).send('Đã xảy ra lỗi.');
        });
         res.redirect('/products')
});

//Chi tiết
// router.get('/view/:id_p',productCtrl.viewProducts);
// //Thêm
router.post('/add',productCtrl.addProduct);
// //Sửa
router.post('/edit/:id',productCtrl.put);
// //Xóa
router.post('/delete/:id',productCtrl.delete);
// router.delete('/delete/:id',productCtrl.delete)
module.exports = router;
