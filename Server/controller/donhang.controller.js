const session = require('express-session');
const admin = require('firebase-admin');
const serviceAccount = require('../model/firebaseConfig');
const firestore = admin.firestore();
const bodyParser = require('body-parser');
const path = require("path");

exports.OrderDanhSach = async (req, res, next) => {
    let msg = '';
    let listDonHang = null;
    let listDonHangJson = [];

    try {
        listDonHang = await firestore.collection('DonHang').get();
        if (listDonHang.empty) {
            console.log('No matching listDonHang.');
            return;
        }
        listDonHang.docs.forEach(doc => {
            listDonHangJson.push(doc.data());
        });

        // console.log('donhang:' + listDonHang);
        msg = 'Lấy dữ liệu thành công !';

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(505).send('Error fetching data');
    }

    res.render('order/donhang', {
        title: "Order", listdonhang: listDonHangJson
    });
};
exports.delete = async(req,res,next)=>{
     try {
        let id = req.params.id;   
        await firestore.collection('DonHang').doc(id).delete();

        res.redirect('/Orders');
     } catch (error) {
        console.error('Error deleting data:',error);
        res.status(500).send('Error deleting data from Firestore')  ;  
     }

};

exports.addDonHang = async(req,res,next)=>{
    try {
        let data = {
            Address: req.body.Address,
            Name_Staff:req.body.Name_Staff,
            Name_User:req.body.Name_User,
            Name_product:req.body.Name_product,
            NgayDat:req.body.NgayDat,
            Status:req.body.Status,
            TenDonHang:req.body.TenDonHang
        }
       
        await firestore.collection('DonHang').add(data)
          .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
               res.json({'message':'successful','ID':docRef.id}); 
           })
        res.redirect('/Orders');

    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).send('Error adding data to Firestore');
    }
};