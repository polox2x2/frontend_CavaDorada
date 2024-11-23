import React, { useState } from 'react';

const ListaArray = () => {
    // Estado para almacenar los productos
    const [productos, setProductos] = useState([
        [1, "Ron Brugal", "Ron Brugal Leyenda 700 ml", "Distribuidora de Licores del Perú", "Bebidas Alcohólicas", 50.5, 20, "Activo"],
        [2, "Ron Botrán", "Ron Botrán Añejo 700 ml", "Distribuidora de Licores del Perú", "Bebidas Alcohólicas", 35.0, 25, "Activo"],
        [3, "FLOR DE CAÑA", "FLOR DE CAÑA Spresso Botella 750 ml", "Distribuidora de Licores del Perú", "Bebidas Alcohólicas", 120.0, 50, "Activo"],
        [4, "Green Label", "Green Label 750 ml", "Distribuidora de Licores del Perú", "Bebidas Alcohólicas", 210.0, 20, "Activo"],
        [5, "Black Label", "Black Label 750 ml", "Distribuidora de Licores del Perú", "Bebidas Alcohólicas", 180.0, 35, "Activo"],
        [6, "Gin BULLDOG", "Gin BULLDOG London Dry 750 ml", "Licores del Sur", "Bebidas Alcohólicas", 45.0, 15, "Activo"],
        [7, "Tequila DON JULIO", "Tequila DON JULIO 1942 750 ml", "Licores del Sur", "Bebidas Alcohólicas", 120.0, 10, "Activo"],
        [8, "LA BOTIJA", "LA BOTIJA Tabernero Acholado botella 750 ml", "Licores del Sur", "Bebidas Alcohólicas", 95.0, 30, "Activo"],
        [9, "Gran Malo", "Gran Malo 750 ml", "Licores del Sur", "Bebidas Alcohólicas", 150.0, 25, "Activo"],
        [10, "Blue Label", "Blue Label 750 ml", "Licores del Sur", "Bebidas Alcohólicas", 700.0, 10, "Activo"],
        [11, "Ron CAPTAIN MORGAN", "Ron CAPTAIN MORGAN 700 ml", "Licores Nacionales e Internacionales", "Bebidas Alcohólicas", 40.0, 30, "Activo"],
        [12, "Vodka Smirnoff", "Vodka Smirnoff Green Apple 700 ml", "Licores Nacionales e Internacionales", "Bebidas Alcohólicas", 38.0, 22, "Activo"],
        [13, "Jager Meister", "Jager Meister 750 ml", "Licores Nacionales e Internacionales", "Bebidas Alcohólicas", 110.0, 40, "Activo"],
        [14, "Gold Label", "Gold Label 750 ml", "Licores Nacionales e Internacionales", "Bebidas Alcohólicas", 250.0, 15, "Activo"]
    ]);

    const [productoId, setProductoId] = useState(15); 

    // Estados para los nuevos productos
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: '',
        descripcion: '',
        proveedor: '',
        categoria: '',
        precio: 0,
        stock: 0,
        estado: 'Activo'
    });
    // Función para manejar el cambio en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoProducto(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Función para agregar un nuevo producto
    const agregarProducto = () => {
        const { nombre, descripcion, proveedor, categoria, precio, stock } = nuevoProducto;
        if (nombre && descripcion && proveedor && categoria && precio > 0 && stock > 0) {
            const productoNuevo = [
                productoId,
                nombre,
                descripcion,
                proveedor,
                categoria,
                precio,
                stock,
                'Activo'
            ];

            setProductos([...productos, productoNuevo]);
            setProductoId(productoId + 1);

         
            setNuevoProducto({
                nombre: '',
                descripcion: '',
                proveedor: '',
                categoria: '',
                precio: 0,
                stock: 0,
                estado: 'Activo'
            });
        } else {
            alert("Por favor complete todos los campos.");
        }
    };

    // Función para eliminar un producto
    const eliminarProducto = (id) => {
        const index = productos.findIndex(producto => producto[0] === id);
        if (index !== -1) {
            productos.splice(index, 1);
            setProductos([...productos]);  
        } else {
            console.log("Producto no encontrado");
        }
    };

    return (
        <div>
            <h1>Productos </h1>

            <h3>Agregar Producto</h3>
            <label>Nombre:</label>
            <input
                type="text"
                name="nombre"
                value={nuevoProducto.nombre}
                onChange={handleChange}
            />
            <label>Descripción:</label>
            <input
                type="text"
                name="descripcion"
                value={nuevoProducto.descripcion}
                onChange={handleChange}
            />
            <label>Proveedor:</label>
            <input
                type="text"
                name="proveedor"
                value={nuevoProducto.proveedor}
                onChange={handleChange}
            />
            <label>Categoría:</label>
            <input
                type="text"
                name="categoria"
                value={nuevoProducto.categoria}
                onChange={handleChange}
            />
            <label>Precio:</label>
            <input
                type="number"
                name="precio"
                value={nuevoProducto.precio}
                onChange={handleChange}
            />
            <label>Stock:</label>
            <input
                type="number"
                name="stock"
                value={nuevoProducto.stock}
                onChange={handleChange}
            />
            <button onClick={agregarProducto}>Agregar Producto</button>

            <h3>Lista de Productos</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>Id</th>
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
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto[0]}>
                            <td>{producto[0]}</td>
                            <td>{producto[1]}</td>
                            <td>{producto[2]}</td>
                            <td>{producto[3]}</td>
                            <td>{producto[4]}</td>
                            <td>{producto[5]}</td>
                            <td>{producto[6]}</td>
                            <td>{producto[7]}</td>
                            <td>
                                <button onClick={() => eliminarProducto(producto[0])}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaArray;
