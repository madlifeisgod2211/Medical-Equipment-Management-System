require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const itemCabinetRouter = require('./routes/itemCabinet');
const parameterRouter = require('./routes/parameter');
const userDeviceRouter = require('./routes/userDevice');
const checkRFIDRouter = require('./routes/checkRFID');
const itemSmartBagRouter = require('./routes/itemSmartBag');

const cors = require('cors');
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-ver1.fcpms.mongodb.net/mern-ver1?retryWrites=true&w=majority`
      // { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();

app.get('/', (req, res) => res.send('Hello world'));
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/items', itemCabinetRouter);
app.use('/api/parameters', parameterRouter);
app.use('/api/userDevices', userDeviceRouter);
app.use('/api/rfidTags', checkRFIDRouter);
app.use('/api/itemSmartBag', itemSmartBagRouter);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
