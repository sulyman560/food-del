import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
export const StoreContext = createContext(null)


const StoreContextProvider = (props) => {
    const [cartItem, setCartItem] = useState({});
    const url = "https://food-del-backend-czhf.onrender.com"
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([])
    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/items/");
        setFoodList(response.data.data)
    }

    const addToCart = async(itemId) => {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url+"/api/cart/addCart",{itemId},{headers:{token}})
        }
    }
    const removeFromCart = async(itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url+"/api/cart/removeCart",{itemId},{headers:{token}})
        }
    }

    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItem[item];
            }
        }
        return totalAmount;
    }
        const [items, setItems] = useState([]);
        const fetchList = async() => {
        const response = axios.get(url+'api/items')
          .then(res => {
            setItems(res.data);
          })
          .catch(err => {
            console.error("Error fetching data", err);
          });
      }
      const getTotal = () => {
            let totalAmount = 0;
            for (const item in cartItem) {
                if (cartItem[item] > 0) {
                    let itemInfo = items.find((product) => product._id === item);
                    totalAmount += itemInfo.price * cartItem[item];
                }
            }
            return totalAmount;
        }
        const loadCartData = async(token) => {
            const response = await axios.post(url+"/api/cart/getCart",{},{headers:{token}})
            setCartItem(response.data.cartData);
        }
    useEffect(() => {
        async function loadData() {
            await fetchList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }         
        }
        loadData();
    }, [])

    const contextValue = {
        food_list,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotal,
        url,
        token,
        setToken,
        fetchList,
        items

    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )




}

export default StoreContextProvider;
