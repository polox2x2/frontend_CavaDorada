
import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Crear el proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Cargar el usuario desde localStorage al montar el componente
  useEffect(() => {
    const clienteId = localStorage.getItem('clienteId');
    const clienteEmail = localStorage.getItem('clienteEmail');
    const clienteNombre = localStorage.getItem('clienteNombre');
    const clienteApellido = localStorage.getItem('clienteApellido');
    const clienteDireccion = localStorage.getItem('clienteDireccion');
    const clienteTelefono = localStorage.getItem('clienteTelefono');
    const clienteDocumentoIdentidad = localStorage.getItem('clienteDocumentoIdentidad');

    if (clienteId && clienteEmail) {
      setUser({
        id: clienteId,
        email: clienteEmail,
        nombre: clienteNombre,
        apellido: clienteApellido,
        direccion: clienteDireccion,
        telefono: clienteTelefono,
        documentoIdentidad: clienteDocumentoIdentidad,
      });
    }
  }, []);

  // Función para manejar el login
  const login = (cliente) => {
    setUser(cliente);
    localStorage.setItem('clienteId', cliente.id);
    localStorage.setItem('clienteEmail', cliente.email);
    localStorage.setItem('clienteNombre', cliente.nombre);
    localStorage.setItem('clienteApellido', cliente.apellido);
    localStorage.setItem('clienteDireccion', cliente.direccion);
    localStorage.setItem('clienteTelefono', cliente.telefono);
    localStorage.setItem('clienteDocumentoIdentidad', cliente.documentoIdentidad);
  };

  // Función para manejar el logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('clienteId');
    localStorage.removeItem('clienteEmail');
    localStorage.removeItem('clienteNombre');
    localStorage.removeItem('clienteApellido');
    localStorage.removeItem('clienteDireccion');
    localStorage.removeItem('clienteTelefono');
    localStorage.removeItem('clienteDocumentoIdentidad');
    localStorage.removeItem('cart'); // Opcional: limpiar el carrito al cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
