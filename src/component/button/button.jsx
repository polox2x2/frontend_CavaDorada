import styles from './style/button.module.css'

function ButtonAgregar({label="",onClick,type="button"}){

return(

    <div>

        <button 
         
         type={type}
         className={styles['button-agregar']} 
         onClick={onClick} 
         >
            {label}

         </button>

    </div>

)




            

}

export default ButtonAgregar ;