const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { db } = require('../configFirebase/initFirebase');
const { ref, onValue } = require('firebase/database');

//Get all item
router.get('/', (req, res) => {
  let itemSmartBags = [];
  try {
    onValue(ref(db, '/IDTest'), snapshot => {
      if (snapshot.exists()) {
        itemSmartBags = Object.values(snapshot.val());
      } else
        res.status(403).json({
          success: false,
          message: 'There are no data',
          itemSmartBags: [],
        });
    });

    itemSmartBags.map(item => {
      item.name = item.name.replace(/"/g, '');
      item.updateTime = item.updateTime.replace(/"/g, '');
    });
    res.json({
      success: true,
      itemSmartBags,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
