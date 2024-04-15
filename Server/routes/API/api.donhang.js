var express = require('express');
var router = express.Router();
const db = require('../../model/firebaseConfig'); 


/* GET home page. */
router.get('/', async(req, res, next) =>{
  try {
    const snapshot = await db.collection('DonHang').get();
    const data = [];

    snapshot.forEach(doc => {
      data.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.status(200).json(data);
    
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data from Firestore');
  }});

  router.post('/add',async(req,res,next)=>{
    try {
      const data = req.body; // Dữ liệu từ request body
  
      // Thêm dữ liệu vào collection cụ thể (ví dụ: 'your-collection-name')
      const docRef = await db.collection('DonHang').add(data);
  
      res.status(201).send(`Document created with ID: ${docRef.id}`);
    } catch (error) {
      console.error('Error adding data:', error);
      res.status(500).send('Error adding data to Firestore');
    }
  });

  router.delete('/delete/:id',async(req,res,next)=>{
    try {
      const docId = req.params.id; // Lấy ID tài liệu từ URL
  
      // Xóa tài liệu dựa trên ID đã cung cấp
      await db.collection('DonHang').doc(docId).delete();
  
      res.status(200).send(`Document with ID: ${docId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting data:', error);
      res.status(500).send('Error deleting data from Firestore');
    }
  });

  router.put('/update/:id',async(req,res,next)=>{
    try {
      const docId = req.params.id; // Lấy ID tài liệu từ URL
      const newData = req.body; // Dữ liệu mới từ request body
  
      // Cập nhật tài liệu dựa trên ID và dữ liệu mới đã cung cấp
      await db.collection('DonHang').doc(docId).set(newData, { merge: true });
  
      res.status(200).send(`Document with ID: ${docId} updated successfully`);
    } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).send('Error updating data in Firestore');
    }
  })
  //code chỉ sửa được status không được phép sửa cái khác
router.patch('/update/status/:id',async(req,res,next)=>{
  try {
    const docId = req.params.id; // Lấy ID tài liệu từ URL
    const newData = req.body; // Dữ liệu mới từ request body


     if (Object.keys(newData).length === 1 && newData.hasOwnProperty('status')) {
    // Cập nhật chỉ trường "status" dựa trên ID
    await db.collection('DonHang').doc(docId).update(newData);

    res.status(200).send(`Document with ID: ${docId} updated successfully`);
  } else {
    // Nếu request body chứa nhiều hơn trường "status", từ chối yêu cầu hoặc xử lý theo ý của bạn
    res.status(400).send('Bad Request: Only "status" field is allowed to be updated');
  }

    // res.status(200).send(`Document with ID: ${docId} updated successfully`);
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).send('Error updating data in Firestore');
  }
})

module.exports = router;