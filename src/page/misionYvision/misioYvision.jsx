
import styles from './style/misionYvision.module.css'
function MisionYVision (){

return (
    <>

<div id="contenedor" className={styles['contenedor']}>
            <div className={styles['div-mision-vision']}>
            <div className={styles['div-mision']}>
                <a><img className={styles['img-mision']} alt="" /></a>
                <h1 className={styles['h1-mision']}>Misión</h1>
                <p className={styles['p-mision']}>LA MISIÓN DE “CAVA DORADA” ES OFRECER A SUS CLIENTES UN MENÚ DIVERSO Y ATRACTIVO QUE INCLUYA RICAS COMIDAS Y PIQUEOS, COMO TAMBIÉN DIVERSOS TRAGOS, ACOMPAÑADO DE UN BUEN SERVICIO AL CLIENTE. NUESTRO OBJETIVO ES SER UN LUGAR DONDE LAS PERSONAS PIENSE PRIMERO PARA PODER REUNIRSE Y PASARLA BIEN JUNTO A SUS AMIGOS O FAMILIA.</p>
             </div>
                <div className={styles['div-vision']}>
                <a><img className={styles['img-vision']} alt="" /></a>
                <h1 className={styles['h1-vision']}>Visión</h1>
                <p className={styles['p-mision']}>LA VISIÓN DE LA EMPRESA ES EXPANDIR SU PRESENCIA EN EL MERCADO LOCAL Y CONVERTIRSE EN UN LUGAR MUY CONOCIDO, DESTACÁNDOSE POR LA CREATIVIDAD EN SU COCINA, LA CALIDAD DE SU ATENCIÓN AL CLIENTE Y SU DISEÑO INTERIOR ESPECIAL.</p>
                </div>
            </div>
                
                <div className={styles['div-experiencia']}>
                <a><img className={styles['img-experiencia']} alt="" /></a>
                <h1 className={styles['h1-experiencia']}>Estrategias Y Planes</h1>
                <p className={styles['p-mision']}>PARA MEJORAR LA PRESENCIA EN LÍNEA Y ATRAER MÁS CLIENTES, EL RESTOBAR IMPLEMENTARÁ ESTRATEGIAS DE MARKETING DIGITAL QUE INCLUYEN LA OPTIMIZACIÓN SEO DEL SITIO WEB, UN AUMENTO DE LA ACTIVIDAD EN REDES SOCIALES MEDIANTE CONTENIDO ATRACTIVO Y PUBLICIDAD PAGADA. TAMBIÉN SE ENFOCARÁ EN MEJORAR LA EXPERIENCIA DEL USUARIO, ASEGURANDO QUE SEA SENCILLA LAS RESERVAS EN LÍNEA, ASÍ COMO INCORPORANDO CONTENIDO INTERACTIVO.</p>
            </div>
            
            </div>
    </>
);

}

export default MisionYVision;