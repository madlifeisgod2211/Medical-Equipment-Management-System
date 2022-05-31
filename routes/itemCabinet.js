const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { db } = require('../configFirebase/initFirebase');
const { set, ref, onValue, remove, update } = require('firebase/database');

//Create a item
router.post('/', verifyToken, async (req, res) => {
  const { id, name, status } = req.body;
  if (!id)
    return res.status(400).json({ success: false, message: 'ID is required!' });
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  var createdTime = dd + '/' + mm + '/' + yyyy;
  const updatedTime = '';
  const newItem = {
    id,
    name,
    status,
    createdTime: createdTime,
    updatedTime: updatedTime,
  };
  try {
    await set(ref(db, '/ID/' + id), newItem);
    res.json({
      success: true,
      message: 'Item is created successfully!',
      item: newItem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

//Get all item
router.get('/', verifyToken, (req, res) => {
  let items = [];
  let activeItems = [];
  let inActiveItems = [];
  try {
    onValue(ref(db, '/ID'), snapshot => {
      if (snapshot.exists()) {
        items = Object.values(snapshot.val());
      } else
        res
          .status(403)
          .json({ success: false, message: 'There are no data', items: [] });
    });
    activeItems = items.filter(item => item.status === 1);
    inActiveItems = items.filter(item => item.status === 0);
    items = [...activeItems, ...inActiveItems];
    res.json({
      success: true,
      items,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

//Update a item
router.put('/:id', verifyToken, async (req, res) => {
  const { id, name } = req.body;
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  var hh = String(today.getHours()).padStart(2, '0');
  var mn = String(today.getMinutes()).padStart(2, '0');
  var ss = String(today.getSeconds()).padStart(2, '0');
  var updatedTime = dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + mn + ':' + ss;
  const updateItem = { id, name, updatedTime };

  try {
    await update(ref(db, '/ID/' + id), updateItem);
    res.json({
      success: true,
      message: 'Item is updated successfully!',
      item: updateItem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

//Delete a item
router.delete('/:id', verifyToken, async (req, res) => {
  const id = req.params.id;
  try {
    await remove(ref(db, '/ID/' + id));
    res.json({
      success: true,
      message: 'Delete Item successfully!',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
