import React, { useState, useEffect } from 'react';
import ButtonAgregar from "../../component/button/button";  // Usamos el componente de botón
import styles from './style/tienda.module.css';
import axiosInstance from "../../connection/Axios";
import obtenerImagenPorNombre from "../../component/imageDina/image";
import { useCart } from '../../component/cart/CartProviderContext';

function Tienda() {
  const { addToCart } = useCart();  // Usamos la función addToCart del contexto

  const [licores, setLicores] = useState([]);
  const [comidas, setComidas] = useState([]);
  const [busqueda, setBusqueda] = useState("");  // Estado para la búsqueda
  const [productosFiltrados, setProductosFiltrados] = useState({ licores: [], comidas: [] });




  const clienteId = localStorage.getItem('clienteId');



  // Función para realizar la búsqueda por nombre
  useEffect(() => {
    if (busqueda === "") {
      // Si no hay búsqueda, muestra todos los productos
      setProductosFiltrados({
        licores: licores,
        comidas: comidas
      });
    } else {
      // Si hay texto en la búsqueda, filtrar los productos por nombre
      const productosFiltrados = {
        licores: licores.filter(prod =>
          prod.nombre.toLowerCase().includes(busqueda.toLowerCase())
        ),
        comidas: comidas.filter(prod =>
          prod.nombre.toLowerCase().includes(busqueda.toLowerCase())
        )
      };
      setProductosFiltrados(productosFiltrados);
    }
  }, [busqueda, licores, comidas]); 
 
  //cargar productos del backend
  useEffect(() => {
    const listaLicores = async () => {
      try {
        const responseLicor = await axiosInstance.get("/api/cart/licores");
        const productosLicor = responseLicor.data.map((prod) => ({
          ...prod,
          imagen: obtenerImagenPorNombre(prod.nombre),  // Asignar imagen a cada producto
        }));
        setLicores(productosLicor);
      } catch (error) {
        console.error("Error al cargar licores:", error);
      }
    };

    const listaComidas = async () => {
      try {
        const responseComida = await axiosInstance.get("/api/cart/comidas");
        const productosComida = responseComida.data.map((prod) => ({
          ...prod,
          imagen: obtenerImagenPorNombre(prod.nombre),  // Asignar imagen a cada producto
        }));
        setComidas(productosComida);
      } catch (error) {
        console.error("Error al cargar comidas:", error);
      }
      
    }

    listaLicores();
    listaComidas();
   
  }, [clienteId]);



  // Función para agregar al carrito con cantidad desde la alerta
  const handleAddToCart = (item) => {
    const cantidadDisponible = item.stock; // constate para restringir por cantidad


    // Pedir la cantidad mediante una alerta
    const cantidad = parseInt(prompt(`¿Cuántas unidades de ${item.nombre} deseas agregar al carrito?`));






    // Verificar que la cantidad sea válida
    if (isNaN(cantidad) || cantidad <= 0) {
      alert("Por favor, ingresa una cantidad válida.");
    }else if (cantidad > cantidadDisponible) {
    
      alert(`Cantidad de unidades no disponible\nintente nuevamente.`);
    }else {
      addToCart(item, cantidad);  // Agregar el producto al carrito con la cantidad seleccionada
      alert(`${item.nombre} agregado al carrito con ${cantidad} unidades.`);
    }
  };

  return (
    <div>
      {/* Formulario de búsqueda */}
    
      <div className={styles["buscar"]}>
        <input 
          type="text" 
          placeholder="Buscar productos..."
          value={busqueda} 
          onChange={(e) => setBusqueda(e.target.value)} 
        />
      </div>

      {/* Mostrar los productos filtrados de licores */}
      <h2>Catálogo de Licores</h2>
      <section className={styles["catalogo"]}>
        {productosFiltrados.licores.length > 0 ? (
          productosFiltrados.licores.map((item) => (
            <div key={item.idProducto} className={styles["producto"]}>
              {item.imagen && <img src={item.imagen} alt={item.nombre} />}
              <hr />
              <h4>{item.nombre}</h4>
              <p className={styles["p-precio"]}>Precio: ${item.precios}</p>
              <ButtonAgregar label="Agregar al carrito" onClick={() => handleAddToCart(item)} />
            </div>
          ))
        ) : (
          <p>No se encontraron licores para la búsqueda.</p>
        )}
      </section>

      {/* Mostrar los productos filtrados de comidas */}
      <h2>Catálogo de Comidas</h2>
      <section className={styles["catalogo"]}>
        {productosFiltrados.comidas.length > 0 ? (
          productosFiltrados.comidas.map((item) => (
            <div key={item.idProducto} className={styles.producto}>
              {item.imagen && <img src={item.imagen} alt={item.nombre} />}
              <hr />
              <h4>{item.nombre}</h4>
              <p>Precio: {item.precios}</p>
              <ButtonAgregar label="Agregar al carrito" onClick={() => handleAddToCart(item)} />
            </div>
          ))
        ) : (
          <p>No se encontraron comidas para la búsqueda.</p>
        )}
      </section>
    </div>
  );
}

export default Tienda;
