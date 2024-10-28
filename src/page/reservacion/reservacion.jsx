import styles from './style/reservacion.module.css'

function Reservación (){
    return (

        <>
        <div id="contenedor" className={styles['contenedor']}>
                <section className={styles['section-contacto']}>
                    <h1 className={styles['h1-contacto']}>Contacta Con Nosotros</h1>
                    <div className={styles['div-contacto']}>
                        <p className={styles['p2-contacto']}>Hola, ¿cómo estás? En La Cava Dorada, estamos aquí para responder a todas tus preguntas y escuchar tus comentarios. Queremos asegurarnos de que tu experiencia con nosotros sea excelente en todo momento.
                            <br /><br />
                            Email: laCavaDorada@gmail.com Teléfono: +51 956 780 058  // +51 912 578 485
                        </p>
                        <br />
                        <div className={styles['div-formulario']}>
                            <input id={styles['correo']} type="text" className={styles['inp-correo']} name="correo" placeholder="Correo..." />
                            <input id={styles['motivo']} type="text" className={styles['inp-motivo']} name="motivo" placeholder="Asunto..." />
                            <input id={styles['comentario']} type="text" className={styles['inp-comentario']} name="comentario" placeholder="Comentario..." />
                            <br />
                            <button type="submit" className={styles['button-enviar']}>Enviar</button>
                        </div>
                    </div>
                </section>
                <section>
                    <div className={styles['div-image-mapa']}>
                        <img className={styles['img-mapa']} src="./mapa.png" alt="Mapa" />
                        <div className={styles['div-direccion']}>
                            <p className={styles['p-direccion']}>Nos puedes ubicar en este locales físico:
                                <br /><br />
                                <a className={styles['i-direccion']} target="_blank" rel="noopener noreferrer" href="https://maps.app.goo.gl/SovnEHPJJyEC49Uz6">Av. Ayabaca S/N, Sector San José, al costado de la SUNAT, Ica 11001</a>
                                <br /><br />
                                ¡Te esperamos en La Cava Dorada para disfrutar de una experiencia única!
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        
        </>
    )



}

export default Reservación;