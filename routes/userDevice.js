const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { db } = require('../configFirebase/initFirebase');
const { set, ref, onValue, remove, update } = require('firebase/database');

//Create a user
router.post('/', async (req, res) => {
  const { id, name, role, timeUse, deviceType } = req.body;

  if (!id)
    return res.status(400).json({ success: false, message: 'ID is required!' });
  const newItem = {
    id,
    name,
    role,
    timeUse,
    deviceType,
  };
  try {
    await set(ref(db, '/User/' + id), newItem);
    res.json({
      success: true,
      message: 'User Test is created successfully!',
      item: newItem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

//Get list of user
router.get('/', (req, res) => {
  let userDevicesList = [];
  try {
    onValue(ref(db, '/User'), snapshot => {
      if (snapshot.exists()) {
        userDevicesList = Object.values(snapshot.val());
      } else
        res.status(403).json({
          success: false,
          message: 'There are no data',
          userDevicesList: [],
        });
    });
    res.json({
      success: true,
      userDevicesList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

//Get history of user
router.get('/history', (req, res) => {
  let userDevicesHistory = [];
  try {
    onValue(ref(db, '/User'), snapshot => {
      if (snapshot.exists()) {
        userDevicesHistory = Object.values(snapshot.val());
        let arr = [];
        let arr1 = [];
        for (let i = 0; i < userDevicesHistory.length; i++) {
          if (userDevicesHistory[i].timeUse) {
            arr.push(Object.values(userDevicesHistory[i]?.timeUse));
          } else arr.push(['']);
        }
        for (let i = 0; i < userDevicesHistory.length; i++) {
          arr[i].map(item => {
            arr1.push({
              id: userDevicesHistory[i].id,
              name: userDevicesHistory[i].name,
              deviceType: userDevicesHistory[i]?.deviceType
                ? userDevicesHistory[i].deviceType
                : '',
              role: userDevicesHistory[i].role,
              timeUse: item,
            });
          });
        }

        arr1.sort((a, b) =>
          new Date(
            a?.timeUse.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3')
          ) <
          new Date(b?.timeUse.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'))
            ? 1
            : -1
        );
        userDevicesHistory = [...arr1];
      } else
        res.status(403).json({
          success: false,
          message: 'There are no data',
          userDevicesHistory: [],
        });
    });
    res.json({
      success: true,
      userDevicesHistory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
