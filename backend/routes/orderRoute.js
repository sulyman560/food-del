const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth')
const userModel = require('../models/userModel.js');
const orderModel = require('../models/orderModel.js');
const stripe = require('stripe')('sk_test_51RTMuqCOLZazUu8KyiOWA9s9s2tOY09CdjaaiIt6KOAmUs0sfRp6bXATBlnYSsYO1aAHl4HYBkT42Ml1kFzW8rAN00ClLUJ5h4');


//const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
  const { name, address, items } = req.body;

  try {
    const line_items = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment', // Optional
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      metadata: {
        customer_name: name,
        shipping_address: address,
      },
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/place', authMiddleware, async (req, res) => {
  const frontend_url = "https://food-del-frontend1-5l6a.onrender.com"
  try {
    const { userId, items, amount, address } = req.body;
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})
    
    const line_items = items.map((item)=>({
        price_data:{
            currency:"usd",
            product_data:{
                name:item.name
            },
            unit_amount:item.price*127
        },
        quantity:item.quantity
    }))
    line_items.push({
        price_data:{
            currency:"usd",
            product_data:{
                name:"Delivary Charges"
            },
            unit_amount:2*127
        },
        quantity:1
    })
    const session = await stripe.checkout.sessions.create({
        line_items:line_items,
        mode:'payment',
        success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    })
    res.json({success:true,session_url:session.url});
    

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
})
router.post('/verify', async(req,res) => {
  const {orderId , success} = req.body;
  try {
    if (success==="true") {
      await orderModel.findByIdAndUpdate(orderId,{payment:true});
      res.json({success:true,message:"Paid"});
    }
    else{
      await orderModel.findByIdAndDelete(orderId);
      res.json({success:false,message:"Not Paid"});
    }
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"});
  }
})
router.post('/orderUser',authMiddleware, async(req,res) => {
    try {
      const orders = await orderModel.find({userId:req.body.userId});
      res.json({success:true,data:orders})
    } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"})
    }
})
router.get('/orderList', async(req,res) => {
    try {
      const orders = await orderModel.find({});
      res.json({success:true,data:orders})
    } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"})
    }
})
router.post('/updateStatus', async(req,res) => {
    try {
      await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
      res.json({success:true,message:"Status Updated"})
    } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"})
    }
})

module.exports = router;
