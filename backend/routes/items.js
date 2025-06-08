const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const Item = require('../models/item.js');  


router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);   
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Route to handle form + file
router.post('/form', upload.single('file'), async (req, res) => {
  try {  
    const { name, description, price, category } = req.body;
    const file = req.file;

    const formEntry = new Item({
      name,
      description,
      price,
      category,
      fileName: file.path,
    });

    await formEntry.save();
    res.status(201).send('Form and file saved');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});  

router.post('/delete', async (req, res) => {
  try {
    const item = await Item.findById(req.body.id);
    fs.unlink(`${item.fileName}`, ()=>{})

    await Item.findByIdAndDelete(req.body.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
