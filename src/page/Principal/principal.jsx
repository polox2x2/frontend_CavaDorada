import styles from './Style/principal.module.css';

function Principal() {
    return (
        <>
            <h2 className={styles['titulo']}>Bebidas</h2>
            <div className={styles['container']}>
                <section className={styles['services']}>
                    <div className={styles['service-item']}>
                        <img className={styles['bebidas']} src=".\bebida1.gif" alt="Bebida 1" />
                    </div>
                    <div className={styles['service-item']}>
                        <img className={styles['bebidas']} src='./bebida2.gif' alt="Bebida 2" />
                    </div>
                    <div className={styles['service-item']}>
                        <img className={styles['bebidas']} src='./bebida3.gif' alt="Bebida 3" />
                    </div>
                </section>
                <h2 className={styles['titulo']}>Comidas</h2>
                <section className={styles['foods']}>
                    <div className={styles['food-item']}>
                        <img className={styles['comidas']} src='./comida1.gif' alt="Comida 1" />
                    </div>
                    <div className={styles['food-item']}>
                        <img className={styles['comidas']} src='./comida2.gif' alt="Comida 2" />
                    </div>
                    <div className={styles['food-item']}>
                        <img className={styles['comidas']} src='./comida3.gif' alt="Comida 3" />
                    </div>
                </section>
                <h2 className={styles['titulo']}>Nuestras Marcas Auspiciadas</h2>
                <section className={styles['drinks']}>
                    <div className={styles['drinks-item']}>
                        <img className={styles['logo']} src='./logoJohnie.jpg' alt="Logo Johnie Walker" />
                    </div>
                    <div className={styles['drinks-item']}>
                        <img className={styles['logo']} src='./logoJagermeister.jpg' alt="Logo Jägermeister" />
                    </div>
                    <div className={styles['drinks-item']}>
                        <img className={styles['logo']} src='./logoJackDaniels.jpg' alt="Logo Jack Daniels" />
                    </div>
                </section>
            </div>
               
        </>
    )
}

export default Principal;
