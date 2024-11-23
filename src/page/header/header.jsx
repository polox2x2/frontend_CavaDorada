
import { Link } from "react-router-dom";
import styles from '../header/style/header.module.css'
import { useState } from "react";
function Header (){

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };



    return(
        <>
         <header className={styles['header']}>
                <Link to="/principal">
                    <img className={styles['img-logo']} src='./logo.png' alt="Logo" />
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
                    <Link to="/login" className={styles['login']}>Iniciar Sesión</Link>
                    <Link to="/compra" className={styles['carrito']}>
                        <img className={styles['img']} src="./carrito.png" alt="Carrito" />
                    </Link>
                </div>
            </header>

        
        </>

    )
}

export default Header;