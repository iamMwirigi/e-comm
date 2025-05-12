import React, { createContext, useState } from "react"; // Grouped React imports
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = ()=> {
    let cart = {};
    // Iterate over the all_product array to use actual product IDs as keys
    for (let i = 0; i < all_product.length; i++) {
        cart[all_product[i].id] = 0; // Use product.id as the key
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [cartItems,setCartItems] = useState(getDefaultCart());
   


    const addToCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }
    
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: Math.max(0, (prev[itemId] || 0) - 1) // Ensure count doesn't go below 0
        }));
    }


    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems)
        {
        if(cartItems[item]>0)
            { // Ensure itemInfo is found before accessing new_price
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];

            }
        }
            return totalAmount;
        
    }
    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem+= cartItems[item];
            }
        }
        return totalItem;
    }

    // Function to clear the cart
    const clearCart = () => {
        setCartItems(getDefaultCart()); // Reset cart to its default empty state
    };


    const contextValue = { // Renamed to contextValue
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart // Expose clearCart to consumers
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
