const admin = require('firebase-admin');
const firestore = admin.firestore();

exports.getOrderDetailList = async (req, res, next) => {
    let list = [];
    let OrderDetailsList =null;
    try {
        OrderDetailsList = await firestore.collection('Order Details').get();
        if (OrderDetailsList.empty) {
            console.log('No matching OrderDetailsList.');
            return;
        }
        OrderDetailsList.docs.forEach(doc => {
            list.push(doc.data());
        });
        // console.log("list:", list);
        
    } catch (error) {
        console.error('Fetching error data:', error);
        res.status(500).send('Error fetching data');
    }
    res.render('orderDetails/chitietdonhang', { listOrderDetail: list });
}

exports.delete = async (req, res, next) => {
    try {
        let id = req.params.id;
        await firestore.collection('Order Details').doc(id).delete();
        res.redirect('/OrderDetails');
    } catch (error) {
        console.error('fetching error data',error);
        res.status(500).send('Error data');
    }
    
}

exports.put = async(req,res,next) =>{
    
    let dataOrderdetail = {
        DonHang: req.body.idDonHang,
        Product: req.body.sanpham,
        SoLuong:req.body.soluong,
        Staff_name:req.body.tennhanvien,
        TongTien:req.body.sotien,
        Username:req.body.nguoidung
    }
    
    try {
        console.log(dataOrderdetail);
        const id = req.params.id;
        await firestore.collection('Order Details').doc(id).set(dataOrderdetail,{merge : true});
        res.redirect('/OrderDetails');
    } catch (error) {
        console.error('fetching error data',error);
        res.status(500).send('Error data');
    }
    

}