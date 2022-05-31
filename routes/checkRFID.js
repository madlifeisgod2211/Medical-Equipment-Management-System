const express = require('express');
const router = express.Router();
// const verifyToken = require('../middleware/auth');
const { db } = require('../configFirebase/initFirebase');
const { ref, onValue, set } = require('firebase/database');
const { binarySearch } = require('./binarySearch');

//Get all RFID tags
router.get('/', (req, res) => {
  let rfidTags = {};
  let items = [];
  let idItems = [];
  let positionArr = [];
  let activeItems = [];
  let inActiveItems = [];
  let rfidTagsArr = [];
  try {
    onValue(ref(db, '/Test'), snapshot => {
      if (snapshot.exists()) {
        // rfidTags = Object.values(snapshot.val());
        rfidTags = snapshot.val();
      } else
        res.status(403).json({
          success: false,
          message: 'There are no data',
          rfidTags: [],
        });
    });
    onValue(ref(db, '/ID'), snapshot => {
      if (snapshot.exists()) {
        items = Object.values(snapshot.val());
      } else
        res.status(403).json({
          success: false,
          message: 'There are no data',
          items: [],
        });
    });

    rfidTagsArr = Object.keys(rfidTags);
    console.log(rfidTagsArr);

    // console.log(rfidTags);
    // rfidTags = Object.values(rfidTags);

    items.sort((a, b) => (a < b ? -1 : 1));
    items.map(item => {
      idItems.push(item.id);
      item.status = 0;
    });
    for (let i = 0; i < rfidTagsArr.length; i++) {
      let position = binarySearch(rfidTagsArr[i], idItems);
      if (position < 0) items = [...items];
      else positionArr.push(position);
    }
    positionArr.map(item => {
      for (let i = 0; i < items.length; i++) {
        if (item === i) items[i].status = 1;
      }
    });

    activeItems = items.filter(item => item.status === 1);
    inActiveItems = items.filter(item => item.status === 0);
    items = [...activeItems, ...inActiveItems];

    //Post back to firebase
    items.map(async item => {
      try {
        await set(ref(db, '/ID/' + item.id), item);
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ success: false, message: 'Internal server error' });
      }
    });
    res.json({
      success: true,
      rfidTags,
      items,
      positionArr,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
