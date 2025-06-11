// src/FormComponent.jsx
import React, { useState } from 'react';
import './Add.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

function FormComponent() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad',
  });
  const [file, setFile] = useState(null);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('file', file);



    try {
      const response = await axios.post('https://food-del-backend-czhf.onrender.com/api/items/form', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Form and file uploaded!');
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  return (
    <div className="add">
      <form className='flex-col' onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload image</p>
          <label htmlFor="image">
            <img src={ assets.upload_area} alt="" />
          </label>
          <input onChange={handleFileChange} type="file" id='image' name='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input name="name" placeholder="Name" onChange={handleChange} required />
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea name="description" onChange={handleChange} row='6' placeholder='Write content here' required />
        </div>

        <div className="add-category-price">

          <div className="add-category flex-col">
            <p>Product Category</p>
            <select name="category" placeholder="category" onChange={handleChange} >
              <option value="Salad">Salad</option>
              <option value="MuttonDish">Mutton Dish</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="Pizza">Pizza</option>
              <option value="Tikka">Tikka</option>
              <option value="VajaPora">VajaPora</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input name="price" onChange={handleChange} placeholder='$20' required />
          </div>
        </div>
        <button type="submit" className='add-button'>Add Item</button>
      </form>
    </div>

  );
}

export default FormComponent;
