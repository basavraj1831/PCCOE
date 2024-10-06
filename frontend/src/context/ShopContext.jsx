import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaIndianRupeeSign } from "react-icons/fa6";


export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = <FaIndianRupeeSign/>;
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search,setSearch] = useState('');
    const [token,setToken] = useState('');
    const [showSearch,setShowSearch] = useState(false);
    const [cartItems,setCartItems] = useState({});
    const [products,setProducts] = useState([]);
    const [triggerProduct,setTriggerProduct] = useState(false);
    const navigate = useNavigate();

    const addToCart = async (itemId) => {

        if (!token) {
            toast.error("You need to log in first..", {
                className: 'toast-custom'
            });
            return;
        }


        let cartData = structuredClone(cartItems);
    
        const itemInfo = products.find((product) => product._id === itemId);
    
        if (!itemInfo) {
            toast.error("Product not found", {
                className: 'toast-custom'
            });
            return;
        }

        if (itemInfo.quantity === 0) {
            toast.error("Product is out of stock..", {
                className: 'toast-custom'
            });
            return;
        }
    
        if (cartData[itemId] && cartData[itemId] >= itemInfo.quantity) {
            toast.error("Out of Stock...!!!", {
                className: 'toast-custom'
            });
            return;
        }
    

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        }
        else {
            cartData[itemId] = {};
            cartData[itemId]= 1;
        }
        setCartItems(cartData);

            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId}, { headers: { token} });
            } catch (error) {
                toast.error(error.message,{
                    className:'toast-custom'
                })
            }

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
                try {
                    if (cartItems[items] > 0) {
                        totalCount += cartItems[items];
                    }
                } catch (error) {
                    console.log(error);
                }
        }
        return totalCount;
    };

    const updateQuantity = async (itemId,quantity) => {
        let cartData = structuredClone(cartItems);
        const itemInfo = products.find((product) => product._id === itemId);

        // If item doesn't exist or isn't found, return an error
        if (!itemInfo) {
            toast.error("Product not found", {
                className: 'toast-custom'
            });
            return;
        }
    
        // Check if quantity exceeds stock availability
        if (quantity > itemInfo.quantity) {
            toast.error(`Only ${itemInfo.quantity} items left..!!`, {
                className: 'toast-custom'
            });
            return;
        }
        cartData[itemId]= quantity;
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, quantity }, { headers: { token} });
            } catch (error) {
                toast.error(error.message,{
                    className:'toast-custom'
                })
            }
        }
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
          let itemInfo = products.find((product) => product._id === items)
            try {
                if (cartItems[items]> 0) {
                    totalAmount += itemInfo.price * cartItems[items];
                }
            } catch (error) {
                console.log(error);
            }
        }
        return totalAmount;
    };
    
    const getProductsData = async () => {
        try {
           const response = await axios.get(backendUrl + '/api/product/list');
           if (response.data.success) {
           setProducts(response.data.products);
           setTriggerProduct(false);
           }
        } catch (error) {
            toast.error(error.message,{
                className:'toast-custom'
            })
        }
    } 
    
    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {},{ headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            toast.error(error.message,{
                className:'toast-custom'
            })
        }
    }

    useEffect(() => {
        getProductsData();
    },[])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
          setToken(localStorage.getItem('token'));
          getUserCart(localStorage.getItem('token'));
        }
    },[])

    const value = {
        products, currency, delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,addToCart,setCartItems,getCartCount,updateQuantity,getCartAmount,
        navigate,backendUrl,setToken,token, setTriggerProduct, triggerProduct, getProductsData
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;