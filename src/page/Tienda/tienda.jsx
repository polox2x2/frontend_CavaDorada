import React, { useEffect, useState } from "react";
import ButtonAgregar from "../../component/button/button";
import styles from "./style/tienda.module.css";
import obtenerImagenPorNombre from "../../component/imageDina/image";
import axiosInstance from "../../connection/Axios";

function Tienda() {
   
    const [licores, setLicores] = useState([]);
    const [comidas, setComidas] = useState([]);
    const [cart, setCart] = useState([]);

    // Cargar productos desde el backend
    useEffect(() => {
        
        // Cargar licores
        const listaLicores = async () => {
            try {
                const responseLicor = await axiosInstance.get("/api/cart/licores");
                const productosLicor = responseLicor.data.map((prod) => ({
                    ...prod,
                    imagen: obtenerImagenPorNombre(prod.nombre), // Asocia imágenes por nombre
                }));
                setLicores(productosLicor); // Actualiza el estado de licores
                console.log("Licores cargados con éxito");
            } catch (error) {
                console.error("Error al cargar licores:", error);
            }
        };

        // Cargar comidas
        const listaComidas = async () => {
            try {
                const responseComida = await axiosInstance.get("/api/cart/comidas");
                const productosComida = responseComida.data.map((prod) => ({
                    ...prod,
                    imagen: obtenerImagenPorNombre(prod.nombre), // Asocia imágenes por nombre
                }));
                setComidas(productosComida); // Actualiza el estado de comidas
                console.log("Comidas cargadas con éxito");
            } catch (error) {
                console.error("Error al cargar comidas:", error);
            }
        };

        listaLicores();
        listaComidas();
    }, []);

    // Agregar productos al carrito
    const handleAddToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
        alert(`${item.nombre} agregado al carrito`);
    };

    return (
        <>
            {/* Filtros */}
            <section className={styles["filtros"]}>
                <select>
                    <option>Precio</option>
                    <option>Ordenar</option>
                    <option>Categoría</option>
                </select>
                <input type="search" placeholder="Buscar..." />
            </section>

            {/* Catálogo de Licores */}
            <h2 className={styles["h2"]}>Catálogo de Licores</h2>
            <section className={styles["catalogo"]}>
                {licores.map((item) => (
                    <div key={item.idProducto} className={styles["producto"]}>
                        {item.imagen && <img src={item.imagen} alt={item.nombre} />}
                        <hr />
                        <h4 className={styles["h4"]}>{item.nombre}</h4>
                        <p>Precio: {item.precios}</p>
                        <div className={styles["div-button"]}>
                            <ButtonAgregar
                                label="Agregar"
                                onClick={() => handleAddToCart(item)}
                            />
                        </div>
                    </div>
                ))}
            </section>
                
            {/* Catálogo de Comidas */}
            <h2 className={styles["h2"]}>Catálogo de Comidas</h2>
            <section className={styles["catalogo"]}>
                {comidas.map((item) => (
                    <div key={item.idProducto} className={styles["producto"]}>
                        {item.imagen && <img src={item.imagen} alt={item.nombre} />}
                        <hr />
                        <h4 className={styles["h4"]}>{item.nombre}</h4>
                        <p>Precio: {item.precios}</p>
                        <div className={styles["div-button"]}>
                            <ButtonAgregar
                                label="Agregar"
                                onClick={() => handleAddToCart(item)}
                            />
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}

export default Tienda;
