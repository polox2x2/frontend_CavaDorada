import React, {children, createContext,useState} from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) =>{ //proveerá los datos del contexto
    const [cart , serCart] = useState ([]); // Estado del carrito

    const addToCart = (product)=>{   // Función para agregar productos al carrito
        serCart ((prevCart) =>[...prevCart, product]) //permite copiar todos los elementos del arreglo
        //y añadir un nuevo elemento al final
    }
    const removeFromCart =(productId) =>{ // Función para eliminar productos del carrito
            serCart ((prevCart)=> prevCart.filter((item)=>item.id !== productId))

    }

    const clearCart = () =>{// Función para vaciar el carrito
        serCart ([])
    }

    const contextValue ={ //Definir el valor del contexto
        cart,
        addToCart,
        removeFromCart,
        clearCart,
    };

    return (
        <CartContext.Provider value={contextValue}> {children} </CartContext.Provider>
    )

}

