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
         {items.map((item, index) => {
          {console.log(category,item.category);}
          if (category === "All" || category === item.category) {
            return (
              <FoodItem key={index} id={item._id} name={item.name} price={item.price} description={item.description} category={item.category} image={item.fileName} />
            )
          }
        })}
        
      </div>

    </div>
  )
}

export default FoodDisplay
