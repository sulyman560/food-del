import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
const Add = () => {
  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  })
  const onChangeHandlar = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value })

  }
  const onSubmitHandlar = async (event) => {
    event.preventDefault();
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("description", data.description)
    //formData.append("price", Number(data.price))
    //formData.append("category", data.category)
    //formData.append("image", image)
    await axios.post('http://localhost:4000/uplaod', formData)
    /*if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad"
      })
    }*/
  }



  return (
    <div className='add'>
      <form className='flex-col' method="post" onSubmit={onSubmitHandlar} >
        <div className="add-img-upload flex-col">
          <p>Upload image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' name='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandlar} value={data.name} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Name</p>
          <textarea onChange={onChangeHandlar} value={data.description} name="description" row='6' placeholder='Write content here' />
        </div>
        <div className="add-category-price">

          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandlar} name="category" id="">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product peice</p>
            <input onChange={onChangeHandlar} value={data.price} type="number" name='price' placeholder='$20' />
          </div>
        </div>
        <button type='submit' className='add-button'>Add</button>
      </form>
    </div>
  )
}

export default Add
