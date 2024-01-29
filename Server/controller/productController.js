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
exports.loginScreen = async (req, res, next) => {
    res.render('home/login', { title: "Login",message:''});
}
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../uploads');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now()  + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + ext);
    }
});
const upload = multer({ storage: storage });
const bucket = admin.storage().bucket();
exports.addProduct= async(req,res,next)=>{
    upload.single('avatar')(req, res, async (err) => {
        if (err) {
            console.error('Lỗi tải lên tệp tin:', err);
            res.status(500).json({ message: 'Lỗi tải lên tệp tin' });
            return;
        }
    const fileName=req.file.filename;
        const filePath = path.resolve(req.file.path);
        const options = {
            destination: fileName
        };
        await bucket.upload(filePath, options);
        const UrlFile='https://firebasestorage.googleapis.com/v0/b/produc-e30a9.appspot.com/o/'+fileName+'?alt=media&token=1f7538b4-68a2-408e-8bc6-96f8f5a51650';
try {

            const collectionRef = admin.firestore().collection('products');
            const documentId = req.body.id;
            const Size = req.body.Size || [];
            let data2 = {
                id: req.body.id,
                Name: req.body.Name,
                Categories: req.body.Categories,
                Content: req.body.Content,
                Price: req.body.Price,
                Img: UrlFile,
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
                    res.status(500).json({message: 'Lỗi khi thêm tài liệu'});
                });
            // const docRef = await collectionRef.add(data);

            // Lấy Document ID đã sinh tự động


        } catch (error) {
            console.error('Error adding data:', error);
          v
        }

    });


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
    upload.single('avatar2')(req, res, async (err) => {
        if (err) {
            console.error('Lỗi tải lên tệp tin:', err);
            res.status(500).json({ message: 'Lỗi tải lên tệp tin' });
            return;
        }
        const fileName=req.file.filename;
        const filePath = path.resolve(req.file.path);
        // const options = {
        //     destination: fileName
        // };
        // await bucket.upload(filePath, options);
        // const UrlFile='https://firebasestorage.googleapis.com/v0/b/produc-e30a9.appspot.com/o/'+fileName+'?alt=media&token=1f7538b4-68a2-408e-8bc6-96f8f5a51650';
        // try {
        //     const Size = req.body.Size || [];
        //     let data2 = {
        //         id: req.body.id,
        //         Name: req.body.Name,
        //         Categories: req.body.Categories,
        //         Content: req.body.Content,
        //         Price: req.body.Price,
        //         Img: UrlFile,
        //         Size: Size,
        //     }
        //
        //     const docId = req.params.id; // Lấy ID tài liệu từ URL
        //     const newData = req.body; // Dữ liệu mới từ request body
        //
        //     // Cập nhật tài liệu dựa trên ID và dữ liệu mới đã cung cấp
        //     await admin.firestore().collection('products').doc(docId).set(data2, { merge: true });
        //     res.redirect('/products');
        //     // const docRef = await collectionRef.add(data);
        //
        //     // Lấy Document ID đã sinh tự động
        //
        //
        // } catch (error) {
        //     console.error('Error adding data:', error);
        //     res.status(500).send('Error adding data to Firestore');
        // }

    });
  }
