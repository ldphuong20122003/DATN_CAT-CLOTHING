const admin = require('firebase-admin');
const firestore = admin.firestore();


exports.getOrderDetailList = async (req, res, next) => {
    let list = [];
    let OrderDetailsList =null;

    let listpr = null;
    let listJson = [];

    let listst = null;
    let listJsonSt = [];
    try {
        listpr = await admin.firestore().collection('products').get();
        listst = await admin.firestore().collection('Staff').get();
        OrderDetailsList = await firestore.collection('Order Details').get();
        if (OrderDetailsList.empty) {
            console.log('No matching OrderDetailsList.');
            return;
        }
        OrderDetailsList.docs.forEach(doc => {
            list.push(doc.data());
        });
        // console.log("list:", list);
        listpr.docs.forEach(doc => {
            const docData = doc.data();
           
            listJson.push(docData);
           
           
        });

        listst.docs.forEach(doc => {
            listJsonSt.push(doc.data());
        });
    } catch (error) {
        console.error('Fetching error data:', error);
        res.status(500).send('Error fetching data');
    }
    res.render('orderDetails/chitietdonhang', { listOrderDetail: list,product:listJson,Staff:listJsonSt });
}

exports.newbill= async(req,res,next)=>{
    try {
         const collectionRef=admin.firestore().collection('Order Details');
    const Id=collectionRef.doc().id;
    const date =  new Date();

    // Định dạng lại ngày tháng theo định dạng mong muốn
   var newdate= date.getDate()+'/' + (date.getMonth() + 1)   +  '/' +  date.getFullYear();;
    let dataBill={
        id:Id,
        Product : req.body.Product||[],
        SoLuong : req.body.SLSP,
        Staff_name : req.body.Staff_name,
        Time: newdate,
        TongTien : req.body.TongTien,
        Username : req.body.Username,
    }

    const docId=Id? collectionRef.doc(Id):collectionRef.doc();
 await  docId.set(dataBill).then(()=>{
        res.redirect('/OrderDetails');
        return Id;
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"Lỗi khi thêm tài liệu"})
});
    } catch (error) {
        console.error('Error adding data:', error);
    }
   
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