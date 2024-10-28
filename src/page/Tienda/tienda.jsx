import ButtonAgregar from '../../component/button/button';
import styles from './style/tienda.module.css';
import axios from '../../conexion/Axios';

const handleAddToCart = async (productoId) =>{
    try{
            await axios.post('/cart/add',{productoId})
            alert ("Producto Agregado al carrito")
    }catch (error){
            console.log("Error al agregar al carrito",error);
            alert ("Error al agregar el producto")
    }
};
const handlePurchase = async (productoId) => {
    
    try{
        await axios.post('/cart/checkout', {productoId});
        alert ("compra realizada con exito")
    }catch (error){
        console.log("Error al realizar la compra :", error);
        alert ("Error al realizar la compra")
    }
    

};

const handleClick = () =>{
    alert("agregado!!!");
}
const handleClickCompra = () =>{
    alert ("comprado")
}
function Tienda (){
    
    return (
        
            <>
          <section className={styles['filtros']}>
                <select>
                    <option>Precio</option>
                    <option>Ordenar</option>
                    <option>Categoría</option>
                </select>
                <input type="search" placeholder="Buscar..." />
            </section>
            <h2 className={styles['h2']}>Catálogo de Licores</h2>
            <section className={styles['catalogo']}>
            
                <div className={styles['producto']}>
                    <img className={styles['img-1']} src="./ronBrugal.png" alt="Ron Brugal Leyenda 700 ml" />
                    <hr />
                    <h4 className={styles['h4']}>Ron Brugal Leyenda 700 ml</h4>
                    <div className={styles['div-button']}>
                       <ButtonAgregar 
                       label='agregar'
                       onClick={() => handleAddToCart(1)}
                       type='submit'/>
                        <ButtonAgregar 
                                label='comprar'
                                onClick={() => handlePurchase(1)} 
                                type='submit'
                                
                                />
                    </div>
                                <p>★★★★★</p>
                </div>
                <div className={styles['producto']}>
                    <img src="./GinBULLDOG.png" alt="Gin BULLDOG London Dry 750 ml" />
                    <hr />
                    <h4 className={styles['h4']}>Gin BULLDOG London Dry 750 ml</h4>
                    <div className={styles['div-button']}>
                       <ButtonAgregar 
                       label='agregar'
                       onClick={handleClick} 
                       type='submit'/>
                        <ButtonAgregar 
                                label='comprar'
                                onClick={handleClickCompra} 
                                type='submit'
                                
                                />
                    </div>
                    <p>★★★★★</p>
                </div>
                <div className={styles['producto']}>
                    <img src="./TequilaDonJulio.png" alt="Tequila DON JULIO 1942 750 ml" />
                    <hr />
                    <h4 className={styles['h4']}>Tequila DON JULIO 1942 750 ml</h4>
                    <div className={styles['div-button']}>
                       <ButtonAgregar 
                       label='agregar'
                       onClick={handleClick} 
                       type='submit'/>
                        <ButtonAgregar 
                                label='comprar'
                                onClick={handleClickCompra} 
                                type='submit'
                                
                                />
                    </div>
                    <p>★★★★★</p>
                </div>
                <div className={styles['producto']}>
                    <img src="./RonBotránRoajú.png" alt="Ron Botrán Añejo 700 ml" />
                    <hr />
                    <h4 className={styles['h4']}>Ron Botrán Añejo 700 ml</h4>
                    <div className={styles['div-button']}>
                       <ButtonAgregar 
                       label='agregar'
                       onClick={handleClick} 
                       type='submit'/>
                        <ButtonAgregar 
                                label='comprar'
                                onClick={handleClickCompra} 
                                type='submit'
                                
                                />
                    </div>
                    <p>★★★★★</p>
                </div>
                <div className={styles['producto']}>
                    <img src="./RonCAPTAINMORGAN.png" alt="Ron CAPTAIN MORGAN 700 ml" />
                    <hr />
                    <h4 className={styles['h4']}>Ron CAPTAIN MORGAN 700 ml</h4>
                    <div className={styles['div-button']}>
                       <ButtonAgregar 
                       label='agregar'
                       onClick={handleClick} 
                       type='submit'/>
                        <ButtonAgregar 
                                label='comprar'
                                onClick={handleClickCompra} 
                                type='submit'
                                
                                />
                    </div>
                    <p>★★★★★</p>
                </div>
                <div className={styles['producto']}>
                    <img src="./VodkaSmirnoffGreenApple.png" alt="Vodka Smirnoff Green Apple 700 ml" />
                    <hr />
                    <h4 className={styles['h4']}>Vodka Smirnoff Green Apple 700 ml</h4>
                    <div className={styles['div-button']}>
                       <ButtonAgregar 
                       label='agregar'
                       onClick={handleClick} 
                       type='submit'/>
                        <ButtonAgregar 
                                label='comprar'
                                onClick={handleClickCompra} 
                                type='submit'
                                
                                />
                    </div>
                    <p>★★★★★</p>
                </div>
                
            </section>
            <h2>Catálogo de Comidas</h2>
            <section className={styles['catalogo']}>
                <div className={styles['producto']}>
                    <img src="./CausaRellena.png" alt="Causa Rellena" />
                    <hr />
                    <h4 className={styles['h4']}>Causa Rellena</h4>
                    <div className={styles['div-button']}>
                       <ButtonAgregar 
                       label='agregar'
                       onClick={handleClick} 
                       type='submit'/>
                        <ButtonAgregar 
                                label='comprar'
                                onClick={handleClickCompra} 
                                type='submit'
                                
                                />
                    </div>
                    <p>★★★★★</p>
                </div>
                <div className={styles['producto']}>
                    <img src="./PolloalaBrasa.png" alt="Pollo a la Brasa" />
                    <hr />
                    <h4 className={styles['h4']}>Pollo a la Brasa</h4>
                    <div className={styles['div-button']}>
                       <ButtonAgregar 
                       label='agregar'
                       onClick={handleClick} 
                       type='submit'/>
                        <ButtonAgregar 
                                label='comprar'
                                onClick={handleClickCompra} 
                                type='submit'
                                
                                />
                    </div>
                    <p>★★★★★</p>
                </div>
                <div className={styles['producto']}>
                    <img src="./ArrozConPollo.png" alt="Arroz con Pollo" />
                    <hr />
                    <h4 className={styles['h4']}>Arroz con Pollo</h4>
                    <div className={styles['div-button']}>
                       <ButtonAgregar 
                       label='agregar'
                       onClick={handleClick} 
                       type='submit'/>
                        <ButtonAgregar 
                                label='comprar'
                                onClick={handleClickCompra} 
                                type='submit'
                                
                                />
                    </div>
                    <p>★★★★★</p>
                </div>
                <div className={styles['producto']}>
                    <img src="./PapaHuancaina.png" alt="Papa a la Huancaína" />
                    <hr />
                    <h4 className={styles['h4']}>Papa a la Huancaína</h4>
                    <div className={styles['div-button']}>
                       <ButtonAgregar 
                       label='agregar'
                       onClick={handleClick} 
                       type='submit'/>
                        <ButtonAgregar 
                                label='comprar'
                                onClick={handleClickCompra} 
                                type='submit'
                                
                                />
                    </div>
                    <p>★★★★★</p>
                </div>
                <div className={styles['producto']}>
                    <img src="./carapulcra.png" alt="Sopa seca con Carapulcra" />
                    <hr />
                    <h4 className={styles['h4']}>Sopa seca con Carapulcra</h4>
                    <div className={styles['div-button']}>
                       <ButtonAgregar 
                       label='agregar'
                       onClick={handleClick} 
                       type='submit'/>
                        <ButtonAgregar 
                                label='comprar'
                                onClick={handleClickCompra} 
                                type='submit'
                                
                                />
                    </div>
                    <p>★★★★★</p>
                </div>
                <div className={styles['producto']}>
                    <img src="./pallaresverdes.png" alt="Picante de pallares verdes" />
                    <hr />
                    <h4 className={styles['h4']}>Picante de pallares verdes</h4>
                    <div className={styles['div-button']}>
                       <ButtonAgregar 
                       label='agregar'
                       onClick={handleClick} 
                       type='submit'/>
                        <ButtonAgregar 
                                label='comprar'
                                onClick={handleClickCompra} 
                                type='submit'
                                
                                />
                    </div>
                    <p>★★★★★</p>
                </div>
            </section>
            
            </>


    );


}

export default Tienda;