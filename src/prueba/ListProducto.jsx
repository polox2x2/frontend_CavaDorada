import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../connection/Axios"; // Asegúrate de que este archivo está correctamente configurado para hacer peticiones
import ButtonAgregar from "../component/button/button";
import styles from './Style/ListaProducto.module.css';

const FormularioActualizarProducto = ({ productoId, cerrarFormulario }) => {
  const [producto, setProducto] = useState({
    nombre: '',
    precios: '',
    stock: '',
    descripcion: '',
    estado: true,
    categoria: { idCategoria: '', descripcion: '' },
    provedor: { idProvedor: '', nombre: '' }
  });

  const [categorias, setCategorias] = useState([]);
  const [provedores, setProvedores] = useState([]);

  // Cargar categorías, proveedores y producto
  useEffect(() => {
    // Cargar categorías
    axiosInstance.get('/api/categoria')  // Endpoint de categorías
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => console.error('Error al obtener categorías', error));

    // Cargar proveedores
    axiosInstance.get('/api/provedor')  // Endpoint de proveedores
      .then(response => {
        setProvedores(response.data);
      })
      .catch(error => console.error('Error al obtener proveedores', error));

    // Cargar datos del producto
    axiosInstance.get(`/api/cart/productos/${productoId}`)
      .then(response => {
        setProducto(response.data);
      })
      .catch(error => console.error('Error al obtener producto', error));
  }, [productoId]);

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Manejo del envío del formulario (actualizar producto)
  const handleSubmit = (e) => {
    e.preventDefault();

    const productoActualizado = {
      nombre: producto.nombre,
      precios: parseFloat(producto.precios),
      stock: parseInt(producto.stock),
      descripcion: producto.descripcion,
      estado: producto.estado,
      categoria: { idCategoria: parseInt(producto.categoria.idCategoria) },
      provedor: { idProvedor: parseInt(producto.provedor.idProvedor) }
    };

    // Enviar la actualización al backend
    axiosInstance.put(`/api/cart/actualizar/${productoId}`, productoActualizado)
      .then(response => {
        alert('Producto actualizado exitosamente');  // Alerta de éxito
        cerrarFormulario();  // Cerrar el formulario después de actualizar
      })
      .catch(error => {
        alert('Error al actualizar producto');  // Alerta de error
        console.error('Error al actualizar producto', error);
      });
  };

  return (
    <div className={styles['form-container']}>
      <h2>Actualizar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label>Precio:</label>
          <input
            type="number"
            name="precios"
            value={producto.precios}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label>Cantidad:</label>
          <input
            type="number"
            name="stock"
            value={producto.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label>Descripción:</label>
          <input
            type="text"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label>Estado:</label>
          <select name="estado" value={producto.estado ? "1" : "0"} onChange={handleChange}>
            <option value="1">Activo</option>
            <option value="0">Inactivo</option>
          </select>
        </div>
        <div className={styles['form-group']}>
          <label>Categoría:</label>
          <select
            name="categoria.idCategoria"
            value={producto.categoria.idCategoria}
            onChange={handleChange}
            required
          >
            {categorias.map(categoria => (
              <option key={categoria.idCategoria} value={categoria.idCategoria}>
                {categoria.descripcion}
              </option>
            ))}
          </select>
        </div>
        <div className={styles['form-group']}>
          <label>Proveedor:</label>
          <select
            name="provedor.idProvedor"
            value={producto.provedor.idProvedor}
            onChange={handleChange}
            required
          >
            {provedores.map(provedor => (
              <option key={provedor.idProvedor} value={provedor.idProvedor}>
                {provedor.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className={styles['form-actions']}>
          <button type="submit">Actualizar</button>
          <button type="button" onClick={cerrarFormulario}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

const ListProducto = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Función para cargar los productos
  const cargarProductos = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/cart/licores"); // Llamada para obtener todos los productos
      setProductos(response.data || []);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  }, []);

  // Función para eliminar el producto
  const eliminarProducto = async (idProducto) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas desactivar este producto?");
    if (confirmacion) {
      try {
        const response = await axiosInstance.put(`/api/cart/eliminar/${idProducto}`);
        if (response.status === 200) {
          console.log("Producto desactivado correctamente");
          cargarProductos(); // Recargar productos después de desactivar
        }
      } catch (error) {
        console.error("Error al desactivar el producto:", error);
      }
    }
  };

  // Función para mostrar el formulario de actualización
  const actualizarProducto = (producto) => {
    setProductoSeleccionado(producto); // Cargar el producto seleccionado en el formulario
    setShowForm(true); // Mostrar el formulario de actualización
  };

  // Función para cerrar el formulario
  const cerrarFormulario = () => {
    setShowForm(false);
  };

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  const renderProductos = () => {
    if (!productos || productos.length === 0) {
      return (
        <tr>
          <td colSpan="5">No hay productos disponibles.</td>
        </tr>
      );
    }

    return productos.map(producto => (
      <tr key={producto.idProducto}>
        <td>{producto.nombre}</td>
        <td>{producto.precios}</td>
        <td>{producto.stock}</td>
        <td>{producto.estado ? "Activo" : "Inactivo"}</td>
        <td>
          <button onClick={() => actualizarProducto(producto)}>Actualizar</button>
          <button onClick={() => eliminarProducto(producto.idProducto)}>Eliminar</button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <h2>Productos</h2>
      {showForm && <FormularioActualizarProducto productoId={productoSeleccionado.idProducto} cerrarFormulario={cerrarFormulario} />}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {renderProductos()}
        </tbody>
      </table>
    </div>
  );
};

export default ListProducto;
