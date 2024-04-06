const admin = require('firebase-admin');
// const firestore  = admin.firestore();
// firestore.settings({ignoreUndefinedProperties:true});


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


exports.delete=async(req,res,next)=>{
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