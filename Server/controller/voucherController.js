const admin = require('firebase-admin');
// const firestore  = admin.firestore();
// firestore.settings({ignoreUndefinedProperties:true});
const firestore = admin.firestore();

exports.listVouchers = async (req, res, next) => {
    let msg = '';
    let list = null;
    let listJson = [];


    try {
        list = await admin.firestore().collection('Vouchers').get();
        // Truy vấn tài liệu từ Firestore

        list.docs.forEach(doc => {
            const docData = doc.data();

            listJson.push(docData);


        });


        msg = 'Lấy dữ liệu thành công !';
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data from Firestore');
        if (!res.headersSent) {
            res.status(500).send('Internal Server Error');
        }

    }

    res.render('../views/Vou/listV.ejs', { title: "Vouchers", listVouchers: listJson });
}


exports.delete = async (req, res, next) => {
    try {
        let id = req.params.id; // Lấy ID tài liệu từ URL

        // Xóa tài liệu dựa trên ID đã cung cấp
        await admin.firestore().collection('Vouchers').doc(id).delete();

        res.redirect('/Vouchers');
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).send('Error deleting data from Firestore');
    }
}

exports.addVoucher = async (req, res, next) => {


    try {

        const addlist = await firestore.collection('Vouchers').add({
            Discount: req.body.discount,
            id: req.body.voucherid,
            Title: req.body.Title,
            From: req.body.from
        });
        console.log('danhsachvoucher:', addlist.Title);
        res.redirect('/Vouchers')
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).send('Error adding data from Firestore');

    }

};

exports.updateVoucher = async (req, res, next) => {
    let _id = req.body.id;
    try {
        await admin.firestore().collection('Vouchers').doc(_id).set({

            Discount: req.body.discount,
            id: req.body.id,
            Title: req.body.Title,
            From: req.body.from

        }, { merge: true });
        res.redirect('/Vouchers');
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).send('Error deleting data from Firestore');
    }
}