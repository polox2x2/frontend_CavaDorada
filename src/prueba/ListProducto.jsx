import { useState, useEffect } from "react";
import axiosInstance from "../connection/Axios";
import ButtonAgregar from "../component/button/button"; // Botón para agregar producto
import styles from './Style/ListaProducto.module.css'; // Importar el archivo de CSS Modules

export default function ListProducto() {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [showForm, setShowForm] = useState(false); // Para mostrar/ocultar el formulario de agregar/actualizar

  // Cargar productos
  const MostrarProductos = async () => {
    try {
      const response = await axiosInstance.get("/api/cart/productos/licores");
      setProductos(response.data || []);
    } catch (e) {
      console.error("Error, no se pudieron cargar los productos: " + e);
    }
  };

  // Eliminar producto (eliminación lógica)
  const eliminarProducto = async (id, stock) => {
    if (!stock || stock <= 0) {
      alert("No se puede eliminar un producto con stock 0 o no definido.");
      return;
    }
  
    try {
      // Enviar la solicitud para reducir el stock
      await axiosInstance.put(`/api/cart/reducir-stock/${id}?cantidad=${stock}`);
      alert("Producto eliminado exitosamente. Estado cambiado si el stock llegó a 0.");
      MostrarProductos(); // Actualizar la lista de productos
    } catch (e) {
      console.error("Error al eliminar el producto: " + e);
      alert("Error al eliminar el producto.");
    }
  };
  
  // Actualizar producto
  const actualizarProducto = (id) => {
    // Buscar producto por ID
    const producto = productos.find((p) => p[0] === id);
    setProductoSeleccionado(producto); // Establecer producto seleccionado para editar
    setShowForm(true); // Mostrar el formulario de actualización
  };

  // Agregar producto
  const agregarProducto = () => {
    setProductoSeleccionado(null); // No hay producto seleccionado
    setShowForm(true); // Mostrar formulario vacío para agregar
  };

  // Enviar formulario (crear o actualizar producto)
  const enviarFormulario = async (producto) => {
    try {
      if (productoSeleccionado) {
        // Si existe un producto seleccionado, se actualizará
        await axiosInstance.put(`/api/cart/actualizar/${productoSeleccionado[0]}`, producto);
      } else {
        // Si no existe un producto seleccionado, se agregará uno nuevo
        await axiosInstance.post("/api/cart/crear", producto);
      }
      setShowForm(false); // Ocultar formulario después de guardar
      MostrarProductos(); // Volver a cargar los productos
    } catch (e) {
      console.error("Error al guardar el producto: " + e);
    }
  };

  // Manejar cierre del formulario
  const cerrarFormulario = () => {
    setShowForm(false);
  };

  // Cargar los productos al montar el componente
  useEffect(() => {
    MostrarProductos();
  }, []);

  // Renderizar productos
  const RenderizarProductos = () => {
    if (!productos || productos.length === 0) {
      return (
        <tr>
          <td colSpan="9">No hay productos disponibles</td>
        </tr>
      );
    }
    return productos.map((producto, index) => (
      <tr key={producto[0]}>
        <td>{index + 1}</td>
        <td>{producto[1]}</td>
        <td>{producto[2]}</td>
        <td>{producto[3].descripcion}</td>
        <td>{producto[4]}</td>
        <td>{producto[5]}</td>
        <td>{producto[6] ? "Activo" : "Inactivo"}</td>
        <td>
          <ButtonAgregar label="Actualizar" onClick={() => actualizarProducto(producto[0])} />
          <ButtonAgregar label="Eliminar" onClick={() => eliminarProducto(producto[6])} />
        </td>
      </tr>
    ));
  };

  return (
    <div className={styles['login-container']}>
      <h1>Gestión de Productos</h1>

      {/* Formulario para agregar o actualizar un producto */}
      {showForm && (
        <div className={styles['login-form-container']}>
          <h2>{productoSeleccionado ? "Actualizar Producto" : "Agregar Producto"}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const newProducto = {
                nombre: e.target.nombre.value,
                descripcion: e.target.descripcion.value,
                proveedor: e.target.proveedor.value,
                categoria: e.target.categoria.value,
                precio: e.target.precio.value,
                stock: e.target.stock.value,
                estado: true,
              };
              enviarFormulario(newProducto);
            }}
          >
            <div className={styles['login-form-group']}>
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                defaultValue={productoSeleccionado ? productoSeleccionado[1] : ""}
                required
              />
            </div>
            <div className={styles['login-form-group']}>
              <label>Descripción:</label>
              <input
                type="text"
                name="descripcion"
                defaultValue={productoSeleccionado ? productoSeleccionado[3].descripcion : ""}
                required
              />
            </div>
            <div className={styles['login-form-group']}>
              <label>Precio:</label>
              <input
                type="text"
                name="precio"
                defaultValue={productoSeleccionado ? productoSeleccionado[5] : ""}
                required
              />
            </div>
            <div className={styles['login-form-group']}>
              <label>Categoría:</label>
              <input
                type="text"
                name="categoria"
                defaultValue={productoSeleccionado ? productoSeleccionado[4] : ""}
                required
              />S
            </div>
            <div className={styles['login-form-group']}>
              <label>Proveedor:</label>
              <input
                type="number"
                name="proveedor"
                defaultValue={productoSeleccionado ? productoSeleccionado[2] : ""}
                required
              />
            </div>
            <div className={styles['login-form-group']}>
              <label>Stock:</label>
              <input
                type="number"
                name="stock"
                defaultValue={productoSeleccionado ? productoSeleccionado[6] : ""}
                required
              />
            </div>
            <div className={styles['login-form-actions']}>
              <button type="submit">{productoSeleccionado ? "Actualizar" : "Agregar"}</button>
              <button type="button" onClick={cerrarFormulario}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {/* Botón para agregar un producto */}
      <ButtonAgregar label="Agregar Producto" onClick={agregarProducto} />

      {/* Tabla de productos */}
      <table className={styles['login-table']}>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Proveedor</th>
            <th>Categoria</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{RenderizarProductos()}</tbody>
      </table>
    </div>
  );
}
