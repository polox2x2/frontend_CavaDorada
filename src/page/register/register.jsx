import { useState } from 'react';
import styles from '../register/style/register.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register () {
 // capturamos la informacion del formulario 
  const [formData , setFromData] = useState ({

    nombre: '',
    apellido: '',
    direccion: '',
    telefono: '',
    documentoIdentidad: '',
    email: '',
    clave: '',
    confirmarClave: ''
  })
  //controlamos los cambios de los input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFromData({
      ...formData,
      [name]: value
    });
  };

  
  //manejar formularios 
  
  const handleSubmit= async (e) =>{
    e.preventDefault();
  

  //controlar las contraseñas 

  if(formData.clave !== formData.confirmarClave){
    alert ("Las contraseñas no coinciden");
    return;
  }

  //enviar datos al backend 
  try{

 
  const response = await axios.post('http://localhost:8080/api/cliente/crear',{

        nombre: formData.nombre,
        apellido: formData.apellido,
        direccion: formData.direccion,
        telefono: formData.telefono,
        documentoIdentidad: formData.documentoIdentidad,
        email: formData.email,
        clave: formData.clave

  });
  console.log('cliente registrado ', response.data);

//validacion de la respuesta 
  if(response.status === 200){ 
    alert('Registro exitoso');
    window.location.to= "/login";
 }else{
  alert('Error en el registro');
 }
 }catch (error){
  console.error('Hubo un problema con el registro:', error);  
  alert('Hubo un error ');
}
 };
  return (

     
        <>
           <div className={styles['body-fondo']}>
      <main className={styles['register-main']}>
        <section className={styles['register-seccion']}>
          <div className={styles['register-div-h2']}>
            <h2 className={styles['register-h2']}>Registro</h2>
          </div>
          <div className={styles['register-div-table']}>
          <form onSubmit={handleSubmit}>

            <table className={styles['register-table']}>
              <tbody>
                <tr>
                  <th>Nombre:</th>
                  <th>
                    <input 
                    type='text' 
                    name='nombre'
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    /></th>
                </tr>
                <tr>
                  <th>Apellido:</th>
                  <th>
                    <input
                     type="text" 
                     name='apellido'
                     value={formData.apellido}
                     onChange={handleInputChange}
                     required
                     /></th>
                </tr>
                <tr>
                  <th>Dirección:</th>
                  <th>
                    <input 
                    type="text" 
                    name='direccion'
                    value={formData.direccion}
                    onChange={handleInputChange}
                    required 
                    /></th>
                </tr>
                <tr>
                  <th>Teléfono:</th>
                  <th><input 
                  type="number" 
                  name='telefono'
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required 
                  maxLength="9" 
                   /></th>
                </tr>
                <tr>
                  <th>DNI:</th>
                  <th><input 
                  type="number"
                  name='documentoIdentidad'
                  value={formData.documentoIdentidad}
                  onChange={handleInputChange}
                  required
                   maxLength="8" 
                    /></th>
                </tr>
                <tr>
                  <th>Email:</th>
                  <th>
                    <input 
                    type="email" 
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    /></th>
                </tr>
                <tr>
                  <th>Clave:</th>
                  <th>
                    <input
                     type="password" 
                     name='clave'
                    value={formData.clave}
                    onChange={handleInputChange}
                    required
                     minLength="6" 
                     
                     /></th>
                </tr>
                <tr>
                  <th>Confirmar Clave:</th>
                  <th>
                    <input
                     type="password"
                     name='confirmarClave'
                     value={formData.confirmarClave}
                     onChange={handleInputChange}
                     required
                      minLength="6" 
                       /></th>
                </tr>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" required />
                      Acepto los <a href="#">términos y condiciones</a>
                    </label>
                  </th>
                </tr>
              </tbody>
            </table>
          <div className={styles['register-div-button']}>
          <button type="submit" className={styles['register-button-register']}>
                    Registrar
                  </button>        
          <Link to="/login" className={styles['register-button-atras']} >Login</Link>
          </div>
          </form>
          </div>

        </section>
      </main>
      <footer className={styles['register-footer']}>
        <small>
          Visítanos en
          <a href="https://web.facebook.com/login/device-based/regular/login/?login_attempt=1&next=https%3A%2F%2Fweb.facebook.com%2Fdialog%2Foauth%3Fclient_id%3D124024574287414%26locale%3Des_LA%26redirect_uri%3Dhttps%253A%252F%252Fwww.instagram.com%252Faccounts%252Fsignup%252F%26response_type%3Dcode%252Cgranted_scopes%26scope%3Demail%26state%3D%257B%2522fbLoginKey%2522%253A%25221uy20ip1ehz0nmbrys97s1e8dhgeu0ij1ietol414ntrv11yk31he%2522%252C%2522fbLoginReturnURL%2522%253A%2522%252Ffxcal%252Fdisclosure%252F%253Fnext%253D%25252F%2522%257D%26ret%3Dlogin%26fbapp_pres%3D0%26logger_id%3D4927daf9-5011-4e35-b7b4-ec354c423773%26tp%3Dunspecified%26cbt%3D1724892152318&lwv=120&lwc=1348028"
             title="La Cava Dorada">Grupo-Drinks</a>
        </small>
      </footer>
    </div>
        </>
    )
}
export default Register;