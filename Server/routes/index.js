var express = require('express');
var router = express.Router();
const db = require('../model/firebaseConfig'); 

/* GET home page. */
router.get('/', async(req, res, next) =>{
  try {
    const snapshot = await db.collection('products').get();
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

module.exports = router;
