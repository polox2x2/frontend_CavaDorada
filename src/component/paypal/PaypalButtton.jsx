import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React ,{useState} from "react";
import styles from './style/paypalButton.module.css'


const PaypalButtonComponent = () => {

    const [price, setPrice] = useState (0);
    const initialOptions = {
    "client-id": "AVIAeO8TFYJMKDVrU69tGiit4LmCouqFyI_OkXobJcAPTYZeGDGe1SAoooD3GD0iLlX9cO4I2SlHq-aL" , 
    currency : "USD" , 
    intent : "capture" , 
    }

   
    const createOrder = (data,actions) => {
    
    return actions.order.create({
        purchase_units:[
        {
            amount:{
                currency_code:"USD",
                value:price
            }
        }
        ]
    
    })
    }
    function handleChangePay(e){
        setPrice(e.target.value);
    }

    const onAcpprove = (data, actions) =>{
    return actions.order.capture().then(function (details){
            alert ("Transaccion Completa by" +details.payer.name.given_name)
    })
    }

    return(
    <PayPalScriptProvider options={initialOptions}>
        
        <PayPalButtons  className={styles["button"]}
        style={{
            layout: "vertical",
            color: "blue",
            shape: "rect",
            label: "pay",
          }}
                    createOrder = {(data, actions) => createOrder(data, actions)}
                    onAcpprove={(data, actions) => onAcpprove (data,actions)}
        />
    
    </PayPalScriptProvider>
    )
    }

    export default PaypalButtonComponent;