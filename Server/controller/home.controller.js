const admin = require('firebase-admin');
exports.home = (req,res,next)=>{
    res.render('home/home',{title: "Home"});
}

// exports.Login = async (req, res, next)=>{
//     let msg = '';

//         try {
//             const data = req.body; 
//             let id = req.params.id; 
//             const collectionRef= await admin.firestore().collection('Users').doc(id).get({Email:data.Email});
//             console.log(collectionRef);
//             if(collectionRef != null ){
//                 // tồn tại username ==> kiểm tra passwd
//                 if(collectionRef.Password == req.body.Password){
//                     // đúng thông tin tài khoản ==> lưu vào session
//                     req.session.userLogin = objU; 
//                     // chuyển trang về trang quản trị
//                     return res.redirect('/');
//                 }else{
//                     msg = 'Sai password';
//                 }

//             }else{
//                 msg = 'Không tồn tại tài khoản: ' + req.body.username;
//             }

//         } catch (error) {
//             msg = error.message;
//         }
    

//     res.render('home/home', {msg:msg})
// }