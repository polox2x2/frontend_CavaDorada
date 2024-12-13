import { useState, useEffect } from 'react';
import styles from './Style/principal.module.css';

function Principal() {
    // Estado para controlar la visibilidad del modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mostrar el modal cuando el componente se monta
    useEffect(() => {
        // Abre el modal automáticamente cuando el componente se carga
        setIsModalOpen(true);

        // Opcional: cerrar el modal después de 5 segundos (5000 ms)
        const timer = setTimeout(() => {
            setIsModalOpen(false);
        }, 5000); // 5 segundos

        // Limpiar el temporizador cuando el componente se desmonte
        return () => clearTimeout(timer);
    }, []); // El array vacío [] hace que se ejecute solo una vez, al montar el componente

    // Función para cerrar el modal
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            {/* Banner en Movimiento */}
            <section className={styles['moving-banner']}>
                <div className={styles['moving-banner-content']}>
                    <h2>¡Bienvenidos a CavaDorada! Disfruta de nuestras deliciosas comidas y bebidas.</h2>
                </div>
            </section>

            {/* Bebidas */}
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

                {/* Comidas */}
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

                {/* Marcas Auspiciadas */}
                <h2 className={styles['titulo']}>Nuestras Marcas Auspiciadas</h2>
                <section className={styles['brands-marquee']}>
                    <div className={styles['brands-marquee-content']}>
                        <div className={styles['brand-item']}>
                            <img className={styles['logo']} src='./logoJohnie.jpg' alt="Logo Johnie Walker" />
                        </div>
                        <div className={styles['brand-item']}>
                            <img className={styles['logo']} src='./logoJagermeister.jpg' alt="Logo Jägermeister" />
                        </div>
                        <div className={styles['brand-item']}>
                            <img className={styles['logo']} src='./logoJackDaniels.jpg' alt="Logo Jack Daniels" />
                        </div>
                    </div>
                </section>

                {/* Modal para anuncio */}
                {isModalOpen && (
                    <div className={styles.modal} onClick={closeModal}>
                        <div className={styles['modal-content']}>
                            <img className={styles['modal-image']} src='./model.jpg' alt="Anuncio" />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Principal;