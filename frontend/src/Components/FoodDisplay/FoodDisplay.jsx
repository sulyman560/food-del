import React, { useEffect, useState, useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import axios from 'axios';
const FoodDisplay = ({ category }) => {
 const {getTotal,token,cartItem,url} = useContext(StoreContext)
 const [items, setItems] = useState([]);
  const fetchList = async () => {
    const response = axios.get('https://food-del-backend-czhf.onrender.com/api/items')
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
  //const { food_list } = useContext(StoreContext)
  return (
    <div className='foodDisplay'>
      <h2>Top dishes near you</h2>
      <div className="foodDisplay-list">
         {
          items.map(item => (
            <div className="list-table-format">
              <img src={`https://food-del-backend-czhf.onrender.com/` + item.fileName} alt="" />
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p>{item.category}</p>
              <p onClick={()=>removeItem(item._id)} className='remove'>X</p>
            </div>
               ))
        }  
        
      </div>

    </div>
  )
}

export default FoodDisplay
