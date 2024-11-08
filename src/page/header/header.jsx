
import { Link } from "react-router-dom";
import styles from '../header/style/header.module.css'
function Header (){

    return(
        <>
        <header className={styles['header']}>
        <Link to="/principal"><img  className={styles['img-logo']} src='./logo.png' alt="Logo"/></Link>
        <nav className={styles['nav']}> 
            <Link className={styles['link']} to="tienda" >Tienda</Link>
            <Link className={styles['link']} to="misionyvision" >objetivos</Link>
            <Link className={styles['link']} to="reservacion" >Reservación</Link>
            <Link className={styles['link']} to="nosotros">Nosotros</Link>
        </nav>
        <div className= {styles['cart-login']} id="inicio">
            <Link  to="login" className={styles['login']}>Iniciar Sesión</Link>
            <Link  to="compra" className={styles['carrito']}><img className={styles['img']} src="./carrito.png"/></Link>
        </div>
    </header>
        
        </>

    )
}

export default Header;