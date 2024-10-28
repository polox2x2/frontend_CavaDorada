import styles from './style/nosotros.module.css'
function Nosotros (){

    return(
        <>
           
    <div className={styles['div-nosotros']}>
      <h1 className={styles['h1-nosotros']}>NOSOTROS</h1>
      <h1 className={styles['h1-descripcion']}>
        10 AÑOS, 3 TIENDAS Y MILES DE HISTORIAS DE CLIENTES SATISFECHOS NOS<br />
        RESPALDAN...
      </h1>
      <img src="./Nsotros-cavadorada.jpg" alt="Nosotros" className={styles['img-Nosotros']} />
      <h2 className={styles['h2-nosotros']}>QUIENES SOMOS</h2>
      <p className={styles['p-quienesSomos']}>
        SOMOS LA CAVA DORADA,
        <i className={styles['p-i-quienesSomos']}> LA CADENA PERUANA DE LICORES Y COMIDAS MAS IMPORTANTES DE LA REGION</i>
        , QUE DESDE HACE 10 AÑOS, NOS DEDICAMOS A LA VENTA AL POR MAYOR Y MENOR DE LOS MEJORES VINOS Y LICORES DEL MERCADO LOCAL, ASI MISMO DE UNA EXPERIENCIA CULINARIA UNICA.
      </p>
      <p className={styles['p-quienesSomos']}>
        <i className={styles['p-i-quienesSomos']}>VARIEDAD, SERVICIO Y GARANTÍA</i>, HAN SIDO SIEMPRE NUESTROS PILARES, DONDE LO MÁS IMPORTANTE, HA SIDO QUE TODOS NUESTROS CLIENTES VIVAN UNA EXPERIENCIA POSTIVA A TRAVÉS DE CADA BOTELLA ABIERTA. HOY ADEMÁS LA COMPLEMENTAMOS CON UNA SERIE DE PRODUCTOS GOURMET, ELEGIDOS MINUCIOSAMENTE PARA MEJORAR NUESTRO PORTAFOLIO Y QUE TENGAS TODO LO NECESARIO PARA PASAR BUENOS MOMENTOS.
      </p>
      <p className={styles['p-quienesSomos']}>
        <i className={styles['p-i-quienesSomos']}>¡GRACIAS POR ESTAR ACÁ!</i>, POR TU FIDELIDAD Y PREFERENCIA QUE NOS DA LA OPORTUNIDAD DE SEGUIR CRECIENDO MEDIANTE NUEVAS PLATAFORMAS. AUNQUE NO ESTÉS EN UNA TIENDA FÍSICA DONDE LA RECOMENDACIÓN Y TRATO ES MÁS CERCANO Y DIRECTO, TEN LA SEGURIDAD QUE ESTA PÁGINA QUE PASO POR DIFERENTES ETAPAS PARA PONERLO A TU DISPOSICIÓN.
      </p>
      <h3 className={styles['h3-nosotros']}>¡HAGAMOS UN BRINDIS POR ESTA NUEVA ERA!</h3>
      <p className={styles['p-quienesSomos']}>
        HAGAMOS DE NUESTRO HOGAR, ESE LUGAR PERFECTO PARA DISFRUTAR HOY CON LA FAMILIA Y AMIGOS, PARA MÁS ADELANTE, ESTAR TODOS JUNTOS.
      </p>
      <h4 className={styles['h4-nosotros']}>GUSTAVO BENDEZU LA ROSA.</h4>
      <p className={styles['p-quienesSomos-gerente']}>GERENTE GENERAL</p>
      <div className={styles['div-advertencia']}>
        <p className={styles['p-quienesSomos-advertencia']}>
          TOMAR BEBIDAS ALCOHÓLICAS EN EXCESO ES DAÑINO. ESTÁ PROHIBIDA LA VENTA DE ALCOHOL A MENORES DE 18 AÑOS.
        </p>
      </div>
    </div> 
           
        </>
    )
}

export default Nosotros;