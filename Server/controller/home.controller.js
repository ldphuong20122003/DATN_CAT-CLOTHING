const session = require('express-session');
const admin = require('firebase-admin');
const serviceAccount = require('../model/firebaseConfig');
const firestore = admin.firestore();
const bodyParser = require('body-parser');
exports.home = (req,res,next)=>{
    res.render('home/home',{title: "Home"});
}



 