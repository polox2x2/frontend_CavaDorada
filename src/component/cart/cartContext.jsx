import { PayPalButtons } from "@paypal/react-paypal-js";
import React, {children, createContext,useState} from "react";
import PaypalButtonComponent from "../paypal/PaypalButtton";

function CartContext() { 
    return (
        
       // <CartContext.Provider value={contextValue}> {children} </CartContext.Provider>
       <PaypalButtonComponent/>
    )

};

export default CartContext;

