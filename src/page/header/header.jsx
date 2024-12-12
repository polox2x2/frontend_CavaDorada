// src/component/header/Header.js
import { Link } from "react-router-dom";
import styles from '../header/style/header.module.css';
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../component/context/AuthContext";


function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0); // Contador de productos en el carrito
    const { user, logout } = useContext(AuthContext); // Consumir AuthContext

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    // Función para actualizar el contador del carrito
    const updateCartCount = () => {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        if (storedCart) {
            const totalItems = storedCart.reduce((total, item) => total + item.cantidad, 0);
            setCartCount(totalItems); // Calcula el total de productos en el carrito
        } else {
            setCartCount(0);
        }
    };

    useEffect(() => {
        updateCartCount(); // Actualizar el contador al cargar el componente
    }, []);

    // Escuchar cambios en el carrito para actualizar el contador
    useEffect(() => {
        const handleStorageChange = () => {
            updateCartCount();
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Manejar el logout
    const handleLogout = () => {
        logout();
        alert('Sesión cerrada exitosamente.');
    };

    return (
        <>
            <header className={styles['header']}>
                <Link to="/principal">
                    <img className={styles['img-logo']} src='/Logo-cavaDorada_AI2.jpg' alt="Logo" />
                </Link>

                <div className={styles['hamburger-menu']} onClick={toggleMenu}>
                    <span className={styles['bar']}></span>
                    <span className={styles['bar']}></span>
                    <span className={styles['bar']}></span>
                </div>

                <nav className={`${styles['nav']} ${isMenuOpen ? styles['show'] : ''}`}>
                    <Link className={styles['link']} to="/tienda">Tienda</Link>
                    <Link className={styles['link']} to="/misionyvision">Objetivos</Link>
                    <Link className={styles['link']} to="/reservacion">Reservación</Link>
                    <Link className={styles['link']} to="/nosotros">Nosotros</Link>
                </nav>

                <div className={styles['cart-login']} id="inicio">
                    {user ? (
                        <button onClick={handleLogout} className={styles['login']}>Cerrar Sesión</button>
                    ) : (
                        <Link to="/login" className={styles['login']}>Iniciar Sesión</Link>
                    )}
                    <Link to="/compra" className={styles['carrito']}>
                        <img className={styles['img']} src="./carrito.png" alt="Carrito" />
                        {cartCount > 0 && <span className={styles['cart-count']}>{cartCount}</span>} {/* Muestra el contador */}
                    </Link>
                </div>
            </header>
        </>
    );
}

export default Header;
