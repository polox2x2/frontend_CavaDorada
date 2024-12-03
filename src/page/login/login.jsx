import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../connection/Axios';
import styles from './style/login.module.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    clave: ''
  });
  const [message, setMessage] = useState('');  // Manejo de mensaje de error
  const navigate = useNavigate();  // Usar React Router para la navegación

  // Capturar cambios de los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();  // Previene el recargo de la página

    try {
      // Enviamos el login al backend
      const response = await axiosInstance.post('/api/cliente/login', {
        email: formData.email,
        clave: formData.clave
      });

      // Condicional para ver si el login es exitoso
      if (response.status === 200) {
        const cliente = response.data;
        
        // Guardamos los datos del cliente en el localStorage
        localStorage.setItem('clienteId', cliente.id);
        localStorage.setItem('clienteEmail', cliente.email);
        localStorage.setItem('clienteNombre', cliente.nombre);  
        localStorage.setItem('clienteApellido', cliente.apellido);  
        localStorage.setItem('clienteDireccion', cliente.direccion);  
        localStorage.setItem('clienteTelefono', cliente.telefono);  
        localStorage.setItem('clienteDocumentoIdentidad', cliente.documentoIdentidad);
        
        alert('Login Exitoso');
        
        // Redirigir al usuario al inicio o página principal
        navigate('/');
      }
    } catch (error) {
      alert('Correo o Clave incorrectos. Intente nuevamente.');
      console.error('Error en el login:', error.response);
    }
  };

  return (
    <div className={styles['body-fondo']}>
      <main className={styles['login-main-bienvenido']}>
        <div className={styles['login-div-bienvenido']}>
          <section className={styles['login-bienvenido']}>
            <h3 className={styles['Bienvenido-text']}>Bienvenidos a la Cava Dorada</h3>
            <form className={styles['logim-from-label']} onSubmit={handleSubmit}>
              <label className={styles['login-label-correo']} htmlFor="mail">
                <p className={styles['Login-p-Correo']}>Correo</p>
                <input
                  id="mail"
                  type="email"
                  name="email"
                  className={styles['login-input-correo']}
                  placeholder="Correo"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label htmlFor="">
                <p className={styles['login-p-clave']}>Contraseña</p>
                <input
                  id="contrasinal"
                  type="password"
                  name="clave"
                  className={styles['login-input-clave']}
                  placeholder="Clave"
                  value={formData.clave}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <div className={styles['div-buttons']}>
                <button type="submit" className={styles['button-login']}>Login</button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
