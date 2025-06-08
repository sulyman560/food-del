import React, { useContext,useEffect,useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Cart = () => {
  const { cartItem, removeFromCart, getTotal } = useContext(StoreContext)
  const Navigate = useNavigate();

   const [items, setItems] = useState([]);
    const fetchList = async() => {
    const response = axios.get('http://localhost:5000/api/items')
      .then(res => {
        setItems(res.data);
      })
      .catch(err => {
        console.error("Error fetching data", err);
      });
  }

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className='cart'>
      <div className="cart-item">
        <div className="cart-item-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {
          items.map((item, index) => {
            if (cartItem[item._id] > 0) {
              return (
                <>
                  <div className='cart-item-content'>
                    <img src={`http://localhost:5000/` + item.fileName} alt="" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItem[item._id]}</p>
                    <p>${item.price * cartItem[item._id]}</p>
                    <p onClick={() => removeFromCart(item._id)} className='remove'>x</p>
                  </div>
                  <hr />
                </>

              )
            }
          })
        }

      </div>
      <div className="cart-total-container">
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
          <button onClick={()=>Navigate("/Order")}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="promocode">
            <p>If you have a promo code, Enter it here</p>
            <div className="promocode-input">
                <input type="text" placeholder='Promo Code' />
                <button>Submit</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
