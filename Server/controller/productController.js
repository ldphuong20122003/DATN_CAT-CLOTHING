const md = require('../model/firebaseConfig'); 
const admin = require('firebase-admin');

exports.listProducts = async (req, res, next) => {
    let msg = '';
    let list = null;
    let listJson = [];
    let categories = null;
    let categoriesJson = [];
    

    try {
        list = await admin.firestore().collection('products').get();
        categories = await admin.firestore().collection('Category').get();

        list.docs.forEach(doc => {
            listJson.push(doc.data());
           
        });

        categories.docs.forEach(doc => {
           
            categoriesJson.push(doc.data());
        });
        
        msg = 'Lấy dữ liệu thành công !';
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data from Firestore');
        
    }

    res.render('product/list', { title: "Products", listProducts: listJson, msg: msg, categories: categoriesJson });
}


exports.addProduct= async(req,res,next)=>{
    try {
      
        // const storage = firebase.storage();
        const collectionRef=admin.firestore().collection('products');
        const documentId = req.body.id;
        const Size = req.body.Size || [];
        let data2={
          id: req.body.id,
          Name :req.body.Name,
          Categories :req.body.Categories,
          Content :req.body.Content,
          Price :req.body.Price,
          Img:req.body.Img,
          Size: Size,
        }
        const data = req.body; // Dữ liệu từ request body
        const docID = documentId ? collectionRef.doc(documentId) : collectionRef.doc();
        const dataRef = collectionRef.doc(documentId);
      // Thay thế bằng collection và document ID của bạn

      // Thêm dữ liệu vào collection cụ thể (ví dụ: 'your-collection-name')
      
      docID.set(data2)
    .then(() => {
      res.redirect('/products');
    })
    .catch(error => {
      console.error('Lỗi khi thêm tài liệu:', error);
      res.status(500).json({ message: 'Lỗi khi thêm tài liệu' });
    });
    // const docRef = await collectionRef.add(data);
      
    // Lấy Document ID đã sinh tự động
    
     
      
    } catch (error) {
      console.error('Error adding data:', error);
      res.status(500).send('Error adding data to Firestore');
    }
    
  };

  exports.delete=async(req,res,next)=>{
    try {
        let id = req.params.id; // Lấy ID tài liệu từ URL
    
        // Xóa tài liệu dựa trên ID đã cung cấp
        await admin.firestore().collection('products').doc(id).delete();
    
        res.redirect('/products');
      } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).send('Error deleting data from Firestore');
      }
}

exports.put=async(req,res,next)=>{
    try {
      const docId = req.params.id; // Lấy ID tài liệu từ URL
      const newData = req.body; // Dữ liệu mới từ request body
      const Size = req.body.Size || [];
      let newdata2={
      
        Name :req.body.Name,
        Categories :req.body.Categories,
        Content :req.body.Content,
        Price :req.body.Price,
        Img:req.body.Img,
        Size: Size,
      }
      // Cập nhật tài liệu dựa trên ID và dữ liệu mới đã cung cấp
      await admin.firestore().collection('products').doc(docId).set(newdata2, { merge: true });
  
      res.redirect('/products');
    } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).send('Error updating data in Firestore');
    }
  }
