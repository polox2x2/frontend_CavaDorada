import { useEffect, useState } from "react";
import axiosInstance from "../connection/Axios";
import ButtonAgregar from "../component/button/button";

export default function ListProducto() {
  const [productos, setProducto] = useState([]); 

  // Función para cargar productos
  const MostrarProductos = async () => {
    try {
      const response = await axiosInstance.get("/api/cart/productos/licores");
      setProducto(response.data || []); 
    } catch (e) {
      console.log("Error, no se pudieron cargar los productos: " + e);
    }
  };

//montar el componente
  useEffect(() => {
    MostrarProductos();
  }, []);

  //Renderizar los productos
  const RenderizarProductos = () => {
    if (!productos ||  productos.length=== 0) {
      return (
        <tr>
          <td colSpan="9">No hay productos disponibles</td>
        </tr>
      );
    }
    //condicional para los id 
    const render = [];
    for (let i = 0; i < productos.length; i++) {
      const producto = productos[i];

      render.push(
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{producto[0]}</td>
          <td>{producto[1]}</td>
          <td>{producto[2]}</td>
          <td>{producto[3].descripcion}</td>
          <td>{producto[4]}</td>
          <td>{producto[5]}</td>
          <td>{producto[6] ? "Activo" : "Inactivo"}</td>
          <td>
        <ButtonAgregar
        label="Agregar"
        onClick/>
        <ButtonAgregar
        label="Actualizar"
        onClick/>
        <ButtonAgregar
        label="Eliminar"
        onClick
        />
        </td> 
        </tr>
      );
    }
    return render;
  };




  return (
    <div>
      <h1>Tabla Productos</h1>
        
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Proveedor</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{RenderizarProductos()}</tbody>
      </table>
    </div>
  );
}
