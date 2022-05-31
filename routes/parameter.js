const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { db } = require('../configFirebase/initFirebase');
const { ref, onValue } = require('firebase/database');

router.get('/', verifyToken, async (req, res) => {
  let parameters = [];
  try {
    await onValue(ref(db, '/Parameters'), snapshot => {
      if (snapshot.exists()) parameters = snapshot.val();
      else
        res.status(403).json({
          success: false,
          message: 'There are no data',
          parameters: [],
        });
    });
    res.json({
      success: true,
      parameters,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
