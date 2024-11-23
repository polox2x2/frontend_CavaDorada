
import { useState } from 'react';
import styles from '../login/style/login.module.css';
import { Link } from 'react-router-dom';
import axiosInstance from '../../connection/Axios';

function Login() { 

  const [formData, setFormData]= useState ({
      email: '',
      clave : ''

  })
 //manejar  mensaje de errores 
  const [message , setMessage] =useState('')

 // capturar cambios  de los input
 const handleInputChange =  (e) => {
  const { name, value } = e.target;
  setFormData({ 
    ...formData,
     [name]: value });
 };

 //manejar el submit del formulario 

 const handleSubmit = async (e) =>{
  e.preventDefault(); //previene el recargo de la pagina
  
  try {
    const response = await axiosInstance.post('/api/cliente/login',{ 
      email: formData.email,
      clave: formData.clave
  });
    //condicional para ver si el login es exitoso, se dirige a la principal
    if (response.status === 200){
      alert('Login Exitoso', response.data);
      console.log("")
      window.location.href = '/';
    }
      


  }catch (error){ 
    alert('Correo o Clave fallido,Intente Nuevamente');
    console.log("Hubo un error")
    console.error("Error en el login:", error.response);
  }
 };

  return ( 
    <>
       <div className={styles['body-fondo']}>
        <main className={styles['login-main-bienvenido']}>
          <div className={styles['login-div-bienvenido']}>
            <section className={styles['login-bienvenido']}>
              <h3 className={styles['Bienvenido-text']}>Bienvenidos a la Cava Dorada</h3>
              <form className={styles['logim-from-label']} onSubmit={handleSubmit}>
                <label className={styles['login-label-correo']} htmlFor="mail">
                  <p className={styles['Login-p-Correo']}>
                    Correo
                  </p>
                  <input
                    id="mail"
                    type="email"
                    name='email'
                    className={styles['login-input-correo']}
                    placeholder="Correo"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </label>

                <div>
                  <label htmlFor="">
                    <p className={styles['login-p-clave']}>
                      Contraseña
                    </p>
                    <input
                      id="contrasinal"
                      type="password"
                      name='clave'
                      className={styles['login-input-clave']}
                      placeholder="Clave"
                      value={formData.clave}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <br />
                  <a id="olv-div" className={styles['olv-div']} href="#">
                    ¿Olvidaste tu clave?
                  </a>
                  <p></p>
                  <label htmlFor="remember">
                    <input type="checkbox" defaultChecked />
                    Recuérdame
                  </label>
                <div className={styles['div-buttons']}>
                <button type="submit" className={styles['button-login']}>
                    Login
                  </button>
                  <Link to='/register'  id="olv-div" className={styles['button-register']}>
                    Register
                  </Link>
                </div>
                
                </div>
              </form>
            </section>
          </div>
        </main>        
      </div>
  </>
)
 }
export default Login;