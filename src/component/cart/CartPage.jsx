import React, { useState, useEffect } from 'react';
import { useCart } from './CartProviderContext'; 
import { jsPDF } from "jspdf";  
import axiosInstance from '../../connection/Axios';  
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";  
import styles from './Style/cartPage.module.css';  
import { motion } from 'framer-motion';
function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();  // Accedemos al carrito y funciones
  const [clientData, setClientData] = useState(null);  // Estado para los datos del cliente
  const [price, setPrice] = useState(0);  // Estado para el precio total
  const [showDiscountModal, setShowDiscountModal] = useState(false); 

  const initialOptions = {
    "client-id": "AVIAeO8TFYJMKDVrU69tGiit4LmCouqFyI_OkXobJcAPTYZeGDGe1SAoooD3GD0iLlX9cO4I2SlHq-aL", 
    currency: "USD", 
    intent: "capture", 
  };

  
  // Calcular el precio total del carrito
  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + (item.precios * item.cantidad), 0);
    setPrice(total);
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  //mostrar el Modal 
  useEffect(() => {
    const hasLiquor = cart.some(item => item.categoria === "licor");  // Verifica si hay licores
    if (hasLiquor) {
      setShowDiscountModal(true);  // Muestra el modal si hay licores
    }
  }, [cart]);
  
  const DiscountModal = () => {
    return (
      <div className={styles['modal']}>
        <div className={styles['modal-content']}>
          <h3>¡Descuento Especial en Licores!</h3>
          <p>Estás recibiendo un descuento especial en ellos.</p>
          
          <button 
            onClick={() => setShowDiscountModal(false)} 
            className={styles['boton-cerrar']}
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  };
  
  

  // Esta función se llama al cargar la página para obtener los datos del cliente desde localStorage
  useEffect(() => {
    const clienteId = localStorage.getItem('clienteId');
    const clienteEmail = localStorage.getItem('clienteEmail');
    
    if (clienteId && clienteEmail) {
      setClientData({ 
        id: clienteId, 
        email: clienteEmail,
        nombre: localStorage.getItem('clienteNombre'),
        apellido: localStorage.getItem('clienteApellido'),
        direccion: localStorage.getItem('clienteDireccion'),
        telefono: localStorage.getItem('clienteTelefono'),
        documentoIdentidad: localStorage.getItem('clienteDocumentoIdentidad')
      });
      console.log('Cliente encontrado:', clienteId, clienteEmail);
    } else {
      console.log('No se encontró cliente en localStorage');
    }
  }, []);  // Solo ejecutarlo una vez al montar el componente

  // Función para eliminar un producto del carrito
  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);  // Elimina el producto del carrito
  };


  // Función para vaciar todo el carrito
  const handleClearCart = () => {
    localStorage.removeItem('cart');
    clearCart();  // Limpia todo el carrito
  };

  const handleDownloadPDF = () => {
    // Preguntamos al usuario si desea descargar el PDF
    const confirmDownload = window.confirm("¿Quieres descargar el resumen del carrito en PDF?");
  
    if (confirmDownload) {
      // Creamos el PDF
      const doc = new jsPDF();
  
      // Ruta del logo
      const logoSrc = '/Logo-cavaDorada_AI2.jpg';
  
      // Cargamos el logo como imagen en el PDF
      const logoWidth = 50; // Ancho del logo
      const logoHeight = 50; // Alto del logo
  
      const img = new Image();
      img.src = logoSrc;
  
      img.onload = () => {
        // Añadimos el logo al PDF
        doc.addImage(img, 'JPEG', 10, 10, logoWidth, logoHeight);
  
        // Título de la empresa
        doc.setFontSize(18);
        doc.setFont('Helvetica', 'bold');
        doc.text("La Cava Dorada", 70, 30);
  
        // Añadimos una línea decorativa debajo del título
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.line(10, 60, 200, 60); // Línea horizontal
  
        // Título del documento
        doc.setFontSize(16);
        doc.setFont('Helvetica', 'normal');
        doc.text("Resumen del Carrito", 10, 70);
  
        // Datos del cliente
        if (clientData) {
          doc.setFontSize(12);
          doc.text(`Cliente: ${clientData.nombre} ${clientData.apellido}`, 10, 80);
          doc.text(`Correo: ${clientData.email}`, 10, 90);
          doc.text(`Dirección: ${clientData.direccion}`, 10, 100);
          doc.text(`Teléfono: ${clientData.telefono}`, 10, 110);
          doc.text(`Documento de Identidad: ${clientData.documentoIdentidad}`, 10, 120);
        }
  
        let yOffset = clientData ? 130 : 80; // Ajustar el offset si hay datos del cliente
  
        // Recorrer los productos en el carrito y agregarlos al PDF
        cart.forEach((item, index) => {
          doc.setFontSize(12);
          doc.text(
            `${index + 1}. ${item.nombre} - ${item.cantidad} x ${item.precios} = ${item.cantidad * item.precios}`,
            10,
            yOffset
          );
          yOffset += 10;
        });
  
        // Añadimos el total del carrito
        doc.setFont('Helvetica', 'bold');
        doc.text(`Total: ${price}`, 10, yOffset + 10);
  
        // Generamos el archivo PDF y lo descargamos
        doc.save("carrito_resumen.pdf");
      };
    } else {
      console.log("El usuario ha cancelado la descarga del PDF.");
    }
  };
  const handleBuy = async () => {
    // Verificar si el carrito está vacío
    if (cart.length === 0) {
      alert("No hay productos en el carrito para realizar una compra.");
      return;
    }
  
    // Preguntar al usuario si está seguro de comprar
    const confirmBuy = window.confirm("¿Estás seguro de que deseas comprar estos productos?");
    
    if (confirmBuy) {
      try {
        // Reducir el stock de cada producto
        for (const item of cart) {
          const response = await axiosInstance.put(`/api/cart/reducir-stock/${item.idProducto}?cantidad=${item.cantidad}`);
  
          if (response.status === 200) {
            console.log(`${item.nombre} stock reducido exitosamente`);
          } else {
            console.log(`Error al reducir stock de ${item.nombre}`);
          }
        }
  
        // Vaciar el carrito después de la compra
        clearCart();
        localStorage.removeItem('cart'); 
        alert("Compra exitosa. ¡Gracias por tu compra!");
  
        // Generar el PDF de la compra
        const doc = new jsPDF('portrait', 'mm', 'a4'); // Tamaño carta (A4)
  
        // Ruta del logo
        const logoSrc = '/Logo-cavaDorada_AI2.jpg';
  
        const logoWidth = 40; // Ancho del logo
        const logoHeight = 40; // Alto del logo
  
        const img = new Image();
        img.src = logoSrc;
  
        img.onload = () => {
          // Agregar el logo y título
          doc.addImage(img, 'JPEG', 10, 10, logoWidth, logoHeight);
          doc.setFontSize(22);
          doc.setFont('Helvetica', 'bold');
          doc.text("Resumen de la Compra", 70, 25);
          doc.setFontSize(12);
          doc.setFont('Helvetica', 'normal');
          doc.text("La Cava Dorada - Detalles del Pedido", 70, 32);
  
          // Línea separadora
          doc.setDrawColor(0, 0, 0);
          doc.setLineWidth(0.5);
          doc.line(10, 50, 200, 50);
  
          // Sección: Información del cliente
          doc.setFontSize(14);
          doc.setFont('Helvetica', 'bold');
          doc.text("Información del Cliente:", 10, 60);
          doc.setFontSize(12);
          doc.setFont('Helvetica', 'normal');
          if (clientData) {
            doc.text(`Nombre: ${clientData.nombre} ${clientData.apellido}`, 10, 70);
            doc.text(`Correo: ${clientData.email}`, 10, 80);
            doc.text(`Dirección: ${clientData.direccion}`, 10, 90);
            doc.text(`Teléfono: ${clientData.telefono}`, 10, 100);
            doc.text(`Documento: ${clientData.documentoIdentidad}`, 10, 110);
          } else {
            doc.text("No se encontró información del cliente.", 10, 70);
          }
  
          // Sección: Lista de productos
          doc.setFontSize(14);
          doc.setFont('Helvetica', 'bold');
          doc.text("Productos en el Pedido:", 10, 130);
  
          let yOffset = 140; // Punto inicial de la lista
          cart.forEach((item, index) => {
            doc.setFontSize(12);
            doc.setFont('Helvetica', 'normal');
            doc.text(
              `${index + 1}. ${item.nombre} - ${item.cantidad} x $${item.precios.toFixed(2)} = $${(item.cantidad * item.precios).toFixed(2)}`,
              10,
              yOffset
            );
            yOffset += 10;
            if (yOffset > 270) { // Manejar salto de página
              doc.addPage();
              yOffset = 20; // Reiniciar posición en nueva página
            }
          });
  
          // Sección: Total del pedido
          if (yOffset + 20 > 270) {
            doc.addPage();
            yOffset = 20; // Ajustar para nueva página
          }
          doc.setFontSize(14);
          doc.setFont('Helvetica', 'bold');
          doc.text("Total del Pedido:", 10, yOffset + 10);
          doc.setFontSize(12);
          doc.text(`$${price.toFixed(2)}`, 50, yOffset + 10);
  
          // Pie de página
          doc.setFontSize(10);
          doc.setFont('Helvetica', 'italic');
          doc.text("Gracias por su compra en La Cava Dorada. ¡Lo esperamos pronto!", 10, 290);
  
          // Descargar el PDF
          doc.save("resumen_compra.pdf");
        };
      } catch (error) {
        console.error("Error durante el proceso de compra:", error);
        alert("Hubo un error al procesar tu compra. Intenta nuevamente.");
      }
    } else {
      console.log("Compra cancelada por el usuario.");
    }
  };
  
  // Función de PayPal para crear la orden
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: price,  // Usamos el precio calculado
          },
        },
      ],
    });
  };

  // Función que se ejecuta después de la aprobación de PayPal
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      alert("Transacción completada por " + details.payer.name.given_name);
      handleBuy();  // Llamamos a handleBuy después de la transacción de PayPal
    });
  };

  return (
    <div className={styles['contenedor-carrito']}>
        {showDiscountModal && <DiscountModal />} 

      {clientData ? (
        <div className={styles['contenido-carrito']}>
          <h2 className={styles['titulo-bienvenida']}>Bienvenido, {clientData.nombre}</h2>
          <h3>Tu Carrito de Compras</h3>
          {cart.length > 0 ? (
            <motion.div 
              className={styles["catalogo"]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <ul>
                {cart.map((item) => (
                  <motion.li 
                    key={item["idProducto"]}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles["producto"]}>
                      <motion.img 
                        src={item.imagen} 
                        alt={item.nombre} 
                        initial={{ width: '100px', height: '100px' }}  // Tamaño inicial
                        animate={{ width: '150px', height: '150px' }}  // Tamaño cuando la animación se active
                        transition={{ duration: 0.5 }} // Tiempo de transición
                        style={{ objectFit: 'cover', borderRadius: '8px' }} 
                        whileHover={{ scale: 1.1 }} 
                      />
                      <h4>{item.nombre}</h4>
                      <p>Precio:  ${item.precios} USD</p>
                      <p>Cantidad:  {item.cantidad}</p>
                      <motion.button 
                        className={styles['boton-eliminar']}
                        onClick={() => handleRemoveFromCart(item.idProducto)}
                        whileHover={{ scale: 1.05 }}
                        
                      >
                        Eliminar
                      </motion.button>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ) : (
            <p>No tienes productos en el carrito.</p>
          )}
  
          <div className={styles['resumen-total']}>
            <h3 className={styles['titulo-total']}>Total</h3>
            <p className={styles['valor-total']}>${price}</p>
          </div>
  
          <div className={styles['acciones-pago']}>
            <button 
              className={styles['boton-pagar']} 
              onClick={handleBuy}
            >
              Procesar Pago
            </button>
            <div className={styles['contenedor-boton-paypal']}>
              <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                  className={styles['boton-paypal']}
                  style={{ layout: "vertical", color: "blue", shape: "rect", label: "pay" }}
                  createOrder={createOrder}
                  onApprove={onApprove}
                />
              </PayPalScriptProvider>
            </div>
          </div>
        </div>
      ) : (
        <p className={styles['mensaje-carrito-vacio']}>No hay productos en el carrito</p>
      )}
    </div>
  );
}

export default CartPage;


