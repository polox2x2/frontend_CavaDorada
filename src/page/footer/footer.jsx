import { Link } from 'react-router-dom';
import styles from './style/footer.module.css'
function Footer (){
    return(
        <>
        
        <footer className={styles['footer']}>
          <div className={styles['links']}>
            <h3 className={styles['h3-footer']}>Enlaces útiles</h3>

            <ul className={styles['ul-footer']}>
              <li className={styles['li-footer']}><Link className={styles['link-footer']} to="#inicio">Inicio</Link></li>
              <li className={styles['li-footer']}><Link className={styles['link-footer']} to="/nosotros">Sobre nosotros</Link></li>
              <li className={styles['li-footer']}><Link className={styles['link-footer']} to="/tienda">Productos</Link></li>
              <li className={styles['li-footer']}><Link className={styles['link-footer']} to="/servicios">Servicios</Link></li>
              <li className={styles['li-footer']}><Link className={styles['link-footer']} to="https://www.gob.pe/institucion/tuempresa/normas-legales/4292845-00002-2023-produce-tu-empresa">Legal</Link></li>
              <li className={styles['li-footer']}><Link className={styles['link-footer']}to="https://seminarium.pe/politicas-de-privacidad">Política de privacidad</Link></li>
              <li className={styles['li-footer']}><Link className={styles['link-footer']} to="#">Foro</Link></li>
              <li className={styles['li-footer']}><Link className={styles['link-footer']} to="/reservacion">Contáctenos</Link></li>
            </ul>
            <p className={styles['p-footer']}>© 2024 La Cava Dorada. Todos los derechos reservados.</p>
          </div>
  
          <div className={styles['about']}>
            <h3 className={styles['h3-footer']}>Sobre nosotros</h3>
            <p className={styles['p-footer']}>Somos un equipo de personas apasionadas cuyo objetivo es mejorar la vida de todos a través de productos disruptivos. 
            Distribuyendo grandes productos para resolver sus problemas.</p>
            <p className={styles['p-footer']}>Nuestros productos están diseñados para satisfacer las necesidades de nuestros clientes.</p>
          </div>
  
          <div className={styles['contac']}>
            <h3 className={styles['h3-footer']}>Contáctenos</h3>
            <p className={styles['p-footer']}>Dirección: Av. Ayabaca S/N, Sector San José, al costado de la SUNAT, Ica 11001</p>
            <p className={styles['p-footer']}>Teléfono: +51 956 780 058 // +51 912 578 485</p>
            <p className={styles['p-footer']}>Email: LaCavaDorada@gmail.com</p>
          </div>
        </footer>
       
      </>
    );
}

export default Footer;