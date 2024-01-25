var express = require('express');
var router = express.Router();
// const session = require('express-session');
// const admin = require('firebase-admin');
// const serviceAccount = require('../../model/firebaseConfig');
// const firestore = admin.firestore();

//Đường dẫn tới home.controller.js 
var homeCtrl = require('../../controller/home.controller');
// const app = express();
// app.use(session({
//     secret: 'nhNNGHSNFGH83sdf23435Fdzgsfnksjdfh9', // Thay thế bằng một khóa bí mật mạnh mẽ hơn trong thực tế
//     resave: false,
//     saveUninitialized: true
//   }));

// const isAuthenticated = (req, res, next) => {
//     // Kiểm tra xem người dùng đã đăng nhập chưa
//     if (req.session.Users) {
//       next();
//     } else {
//       res.status(401).send('Unauthorized');
//     }
//   };
//Vào trang home theo địa chỉ '/'
router.get('/',homeCtrl.home)

//Xuất router
module.exports = router;
