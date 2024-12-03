import React, { useState, useEffect } from 'react';
import { useCart } from './CartProviderContext';  // Usamos el hook useCart
import { jsPDF } from "jspdf";  // Importamos jsPDF
import axiosInstance from '../../connection/Axios';  // Usar axios para las llamadas API

function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();  // Accedemos al carrito y funciones
  const [clientData, setClientData] = useState(null);  // Inicializamos el estado para los datos del cliente

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
    clearCart();  // Limpia todo el carrito
  };

  // Función para generar el PDF y preguntarle al usuario si desea descargarlo
  const handleDownloadPDF = () => {
    // Preguntamos al usuario si desea descargar el PDF
    const confirmDownload = window.confirm("¿Quieres descargar el resumen del carrito en PDF?");

    if (confirmDownload) {
      // Creamos el PDF
      const doc = new jsPDF();

      // Añadimos el contenido al PDF
      doc.setFontSize(16);
      doc.text("Resumen del Carrito", 10, 10);

      let yOffset = 20; // Offset para el contenido del carrito

      // Recorrer los productos en el carrito y agregarlos al PDF
      cart.forEach((item) => {
        doc.setFontSize(12);
        doc.text(`${item.nombre} - ${item.cantidad} x ${item.precios} = ${item.cantidad * item.precios}`, 10, yOffset);
        yOffset += 10;
      });

      // Añadimos el total del carrito (opcional)
      const total = cart.reduce((acc, item) => acc + (item.precios * item.cantidad), 0);
      doc.text(`Total: ${total}`, 10, yOffset);

      // Generamos el archivo PDF y lo descargamos
      doc.save("carrito_resumen.pdf");
    } else {
      console.log("El usuario ha cancelado la descarga del PDF.");
    }
  };

  // Función para procesar la compra y reducir el stock
  const handleBuy = async () => {
    // Preguntamos al usuario si está seguro de comprar
    const confirmBuy = window.confirm("¿Estás seguro de que deseas comprar estos productos?");
    
    if (confirmBuy) {
      try {
        // Reducir el stock de cada producto
        for (const item of cart) {
          const response = await axiosInstance.put(`/api/cart/reducir-stock/${item.idProducto}`, {
            cantidad: item.cantidad,
          });

          if (response.status === 200) {
            console.log(`${item.nombre} stock reducido exitosamente`);
          } else {
            console.log(`Error al reducir stock de ${item.nombre}`);
          }
        }

        // Vaciar el carrito después de la compra
        clearCart();
        alert("Compra exitosa. ¡Gracias por tu compra!");
      } catch (error) {
        console.error("Error durante el proceso de compra:", error);
        alert("Hubo un error al procesar tu compra. Intenta nuevamente.");
      }
    } else {
      console.log("Compra cancelada por el usuario.");
    }
  };

  return (
    <div>
      {clientData ? (
        <div>
          <h2>Bienvenido, {clientData.nombre}</h2>

          {/* Mostrar los productos del carrito */}
          <h3>Tu Carrito de Compras</h3>
          {cart.length > 0 ? (
            <div>
              <ul>
                {cart.map((item) => (
                  <li key={item.idProducto}>
                    <div>
                      <img src={item.imagen} alt={item.nombre} width="100" />
                      <h4>{item.nombre}</h4>
                      <p>Precio: {item.precios}</p>
                      <p>Cantidad: {item.cantidad}</p>
                      <button onClick={() => handleRemoveFromCart(item.idProducto)}>Eliminar</button>
                    </div>
                    <hr />
                  </li>
                ))}
              </ul>
              <button onClick={handleClearCart}>Vaciar Carrito</button>
            </div>
          ) : (
            <p>No tienes productos en el carrito.</p>
          )}

          {/* Botón para comprar */}
          <button onClick={handleBuy}>Comprar</button>

          {/* Botón para descargar el PDF */}
          <button onClick={handleDownloadPDF}>Descargar Resumen en PDF</button>
        </div>
      ) : (
        <div>
          <p>Por favor, inicie sesión para proceder.</p>
        </div>
      )}
    </div>
  );
}

export default CartPage;
