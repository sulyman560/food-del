const userModel = require('../models/userModel')
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth')


router.post('/addCart', authMiddleware, async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        }
        else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Add to cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }

})

router.post('/removeCart', authMiddleware, async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Remove From cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
})

router.post('/getCart', authMiddleware, async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({ success: true, cartData })
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
})


module.exports = router;