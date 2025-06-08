import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const {getTotal,token,cartItem,url,items} = useContext(StoreContext)
  const [data , setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })
  const onChangeHandlar = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }
 /*
  useEffect(()=>{
    console.log(data);
    
  },[data])*/
  
  const placeOrder = async(event) =>{
    
    event.preventDefault();
    let orderItems = [];
    items.map((item)=>{
      if (cartItem[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    })
 //console.log(orderItems); 
   let orderData = {
    address:data,
    items:orderItems,
    amount:getTotal()+2,
   }
    const response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    
    if (response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("error");
    } 
  } 
  const navigate = useNavigate();
  useEffect(()=>{
    if (!token) {
      navigate('/Cart')
    }
    else if(getTotal() === 0){
      navigate('/Cart')
    }
  },[token])
  return (
    <>
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
            <input name='firstName' required onChange={onChangeHandlar} value={data.firstName} type="text" placeholder='First name' />
            <input name='lastName' required onChange={onChangeHandlar} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input name='email' required onChange={onChangeHandlar} value={data.email} type="email" placeholder='E-mail' id="" />
        <input name='street' required onChange={onChangeHandlar} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
            <input name='city' required onChange={onChangeHandlar} value={data.city} type="text" placeholder='City' />
            <input name='state' required onChange={onChangeHandlar} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
            <input name='zipcode' required onChange={onChangeHandlar} value={data.zipcode} type="text" placeholder='Zip code' />
            <input name='country' required onChange={onChangeHandlar} value={data.country} type="text" placeholder='Country' />
        </div>
        <input name='phone' required onChange={onChangeHandlar} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-content">
            <p>Sub total</p>
            <p>${getTotal()}</p>
          </div>
          <hr />
          <div className="cart-total-content">
            <p>Delivary Fee</p>
            <p>${getTotal()===0?0:2}</p>
          </div>
          <hr />
          <div className="cart-total-content">
            <b>Total</b>
            <p>${getTotal()===0?0:getTotal() + 2}</p>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
    </>
  )
}

export default PlaceOrder
