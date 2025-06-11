import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ItemList.css'

function ItemList() {
  const [items, setItems] = useState([]);
  const removeItem = async(id) => {
    const response = await axios.post(`https://food-del-backend-czhf.onrender.com/api/items/delete`,{id:id})
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message)  
      }
  }
  const fetchList = async() => {
    const response = axios.get('https://food-del-backend-czhf.onrender.com/api/items')
      .then(res => {
        setItems(res.data);
      })
      .catch(err => {
        console.error("Error fetching data", err);
      });
      if(response.data.success){

      }
  }
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className='list add flex-col'>
      <p className='title-p'>All foods list</p>
      <div className="list-table">
        <div className="list-table-format title">

          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b>Category</b>
          <b>Action</b>
        </div>
        {
          items.map(item => (
            <div className="list-table-format">
              <img src={`http://localhost:5000/` + item.fileName} alt="" />
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p>{item.category}</p>
              <p onClick={()=>removeItem(item._id)} className='remove'>X</p>
            </div>
               ))
        }  
      </div>

    </div>
  );
}
import { toast } from 'react-toastify';
export default ItemList;
