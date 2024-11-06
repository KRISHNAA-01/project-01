// "use client";
// import React, { createContext, useContext, useState } from 'react';
// import axios from 'axios';
// import api from './axios.js';

// const CartContext = createContext();

// const CartProvider = ({ children }) => {
//     const [count, setCount] = useState(0);
//     const [cartItem, setCartItem] = useState([]);

//     // Fetch cart items from the backend
//     const fetchCartItems = async () => {
//         try {
//             const { data } = await api.get('/cart'); // Adjust URL as needed
//             setCartItem(data);
//             setCount(data.reduce((total, item) => total + item.quantity, 0)); // Update total count
//         } catch (error) {
//             console.error("Error fetching cart items:", error);
//         }
//     };

//     // Load cart data on component mount
//     React.useEffect(() => {
//         fetchCartItems();
//     }, []);

//     // Add item to cart
//     const addItemToCart = async (productDetails) => {
//         try {
//             const existingItemIndex = cartItem.findIndex((item) => item._id === productDetails._id);

//             if (existingItemIndex !== -1) {
//                 await increaseQuantity(productDetails._id);
//             } else {
//                 const { data } = await api.post('/cart/add', { items: [{ productId: productDetails._id, quantity: 1 }] });
//                 setCartItem(data.items);
//                 setCount(prevCount => prevCount + 1);
//             }
//         } catch (error) {
//             console.error("Error adding item to cart:", error);
//         }
//     };

//     // Remove item from cart
//     const removeItemFromCart = async (_id) => {
//         try {
//             await api.delete(`/cart/remove/${_id}`);
//             setCartItem((prevItems) => prevItems.filter(item => item.product._id !== _id));
//             setCount(prevCount => Math.max(prevCount - 1, 0));
//         } catch (error) {
//             console.error("Error removing item from cart:", error);
//         }
//     };
    

//     // Increase quantity of an item
//     const increaseQuantity = async (_id) => {
//         try {
//             await api.post(`/cart/increase/${_id}`);
//             setCartItem((prevItems) =>
//                 prevItems.map(item =>
//                     item.product._id === _id ? { ...item, quantity: item.quantity + 1 } : item
//                 )
//             );
//             setCount(prevCount => prevCount + 1);
//         } catch (error) {
//             console.error("Error increasing item quantity:", error);
//         }
//     };

//     // Decrease quantity of an item
//     const decreaseQuantity = async (_id) => {
//         try {
//             await api.post(`/cart/decrease/${_id}`);
//             setCartItem((prevItems) =>
//                 prevItems
//                     .map(item =>
//                         item.product._id === _id
//                             ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity }
//                             : item
//                     )
//                     .filter(item => item.quantity > 0) // Remove item if quantity is 0
//             );
//             setCount(prevCount => Math.max(prevCount - 1, 0));
//         } catch (error) {
//             console.error("Error decreasing item quantity:", error);
//         }
//     };

//     return (
//         <CartContext.Provider value={{ count, setCount, cartItem, setCartItem, addItemToCart, removeItemFromCart, increaseQuantity, decreaseQuantity }}>
//             {children}
//         </CartContext.Provider>
//     );
// };

// export { CartProvider, CartContext };




"use client";
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import api from './axios.js';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [count, setCount] = useState(0);
    const [cartItem, setCartItem] = useState([]);

    // Fetch cart items from the backend
    const fetchCartItems = async () => {
        try {
            const { data } = await api.get('/cart'); // Adjust URL as needed
            setCartItem(data);
            setCount(data.reduce((total, item) => total + item.quantity, 0)); // Update total count
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

    // Load cart data on component mount
    React.useEffect(() => {
        fetchCartItems();
    }, []);
    const addItemToCart = async (productDetails) => {
        try {
            const existingItemIndex = cartItem.findIndex((item) => item._id === productDetails._id);
            if (existingItemIndex !== -1) {
                await increaseQuantity(productDetails._id);
            } else {
                await api.post('/cart/add', { items: [{ productId: productDetails._id, quantity: 1 }] });
            }
            fetchCartItems();  // Refetch cart after action
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };
    
    const removeItemFromCart = async (_id) => {
        try {
            await api.delete(`/cart/remove/${_id}`);
            fetchCartItems();  // Refetch cart after action
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };
    
    const increaseQuantity = async (_id) => {
        try {
            await api.post(`/cart/increase/${_id}`);
            fetchCartItems();  // Refetch cart after action
        } catch (error) {
            console.error("Error increasing item quantity:", error);
        }
    };
    
    const decreaseQuantity = async (_id) => {
        try {
            await api.post(`/cart/decrease/${_id}`);
            fetchCartItems();  // Refetch cart after action
        } catch (error) {
            console.error("Error decreasing item quantity:", error);
        }
    };
    

    return (
        <CartContext.Provider value={{ count, setCount, cartItem, setCartItem, addItemToCart, removeItemFromCart, increaseQuantity, decreaseQuantity,fetchCartItems }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartProvider, CartContext };
