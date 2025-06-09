// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const itemsRoute = require('./routes/items.js');
const userRoute = require('./routes/userRoute.js')
const cartRoute = require('./routes/cartRoute.js')
const orderRoute = require('./routes/orderRoute.js')
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const connectDB = async () => {
    await mongoose.connect('mongodb+srv://sulyman:560162@cluster0.cebizie.mongodb.net/foods').then(()=>console.log("Db connected"));
}

connectDB();

// Routes
app.use('/api/items', itemsRoute);
app.use('/api/user',userRoute);
app.use('/api/cart',cartRoute);
app.use('/api/order',orderRoute);

// Static route to access uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
