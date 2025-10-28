import {useState, useEffect, createContext} from 'react';

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    
    const [cart, setCart] = useState(null);

    const fetchRandomCart=()=> {
        fetch('https://dummyjson.com/carts')
            .then((res) => res.json())
            .then((data) => setCart(data.carts[0]))
            .catch(error=> console.error('Error cargando user:', error));
    };

    useEffect(()=>{
        fetchRandomCart();
    }, []);

    return (
        <CartContext.Provider value={{cart, fetchRandomCart}}>
            {children}
        </CartContext.Provider>
    );

};