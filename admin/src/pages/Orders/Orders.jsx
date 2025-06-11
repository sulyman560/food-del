import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import { assets } from '../../assets/assets';
import './Orders.css'
const Orders = () => {
  const [data, setData] = useState([])
  const fetchOrders = async () => {
    const response = await axios.get("https://food-del-backend-czhf.onrender.com/api/order/orderList");
    setData(response.data.data);
    console.log(response.data.data);
  }
  const statusHandlar = async(event,orderId) => {
    const response = await axios.post('https://food-del-backend-czhf.onrender.com/api/order/updateStatus',{
      orderId,
      status:event.target.value
    })
    if (response.data.success) {
      await fetchOrders();
    }
    
  }
  useEffect(() => {
    fetchOrders();
  }, [])
  return (
    <div className='my-orders add flex-col'>
      <h2>Order Page</h2>
      <div className="container">
        {
          data.map((order, index) => {
            return (
              <div key={index} className='my-orders-order'>
                <img src={assets.parcel_icon} alt="" />
                <div>
                  <p className='order-item-food'>{order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity
                    }
                    else {
                      return item.name + " x " + item.quantity + ", "
                    }
                  })}</p>

                  <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
                  <div className='order-item-address'>
                    <p>{order.address.street + ","}</p>
                    <p>{order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.zipcode}</p>
                  </div>
                  <p>{order.address.phone}</p>
                </div>
                <p>Items: {order.items.length}</p>
                <p>${order.amount}.00</p>

                <select onChange={(event)=>statusHandlar(event,order._id)} value={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out of Delivery">Out of Delivery</option>
                  <option value="Deliveried">Deliveried</option>
                </select>
                
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
export default Orders
