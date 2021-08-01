import React, {useState, useEffect, Fragment} from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import FormBuscarProducto from './FormBuscarProducto';
import FormCantidadProducto from './FormCantidadProducto';

function NuevoPedido(props){

    //extraer id del cliente para poder hacer la consulta a la bd, para saber que cliente es...
    const { id } = props.match.params;  //1

    //state
    const [cliente, guardarCliente] = useState({}); //3
    const [busqueda, guardarBusqueda] = useState('');
    const [productos, guardarProductos] = useState([]); //significa que iniciará con un arreglo vacio
    const [total, guardarTotal] = useState(0);

    useEffect(() => {       //Ojooooooooooooooooooo primero se hace el useeffect, luego el usestate
        //obtener el cliente
        const consultarAPI = async () => {
            //consultar el cliente actual 
            const resultado = await clienteAxios.get(`/clientes/${id}`); //2
            // console.log(resultado.data);
            guardarCliente(resultado.data);
        }

        //llamar a la API
        consultarAPI();

        //actualizar el total a pagar
        actualizarTotal();
    }, [productos]);



    const buscarProducto = async e => {
        e.preventDefault();
        
        //obtener los productos de la busqueda
        const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);
        console.log(resultadoBusqueda);

        //si no hubo resultados, mostrar una alerta, caso contrario agregarlo al state
        if(resultadoBusqueda.data[0]){
            let productoResultado = resultadoBusqueda.data[0];
            
            //agregar la llave producto (copia de id)
            productoResultado.producto = resultadoBusqueda.data[0]._id;
            productoResultado.cantidad = 0;
            console.log(productoResultado);

            //ponerlo en el state
            guardarProductos([...productos, productoResultado]) //como primer parametro tendremos una copia de productos para esa forma no perderlo y no reescribamos, y despues agregamos el nuevo

        }else{
            //no hay resultados
            Swal.fire({
                icon: 'error',
                title: 'No resultados',
                text: 'No hay resultados'
            })
        }
    }

    //almacenar una busqueda en el state
    const leerDatosBusqueda = e => {
        guardarBusqueda( e.target.value );
    }

    //actualizar la cantidad de productos
    const restarProductos = i => {
        // console.log('uno menos...', i);

        //copiar el arreglo original
        const todosProductos = [...productos];

        //validar si está en 0 la cantidad no ir menos
        if(todosProductos[i].cantidad === 0) return;

        //caso contrario hacemos el decremento
        todosProductos[i].cantidad--;

        //almacenarlo en el state
        guardarProductos(todosProductos);
    }

    const aumentarProductos = i => {
        // console.log('uno mas...', i);

        //copiar el arreglo original
        const todosProductos = [...productos];

        //incremento
        todosProductos[i].cantidad++;

        //almacenarlo en el state
        guardarProductos(todosProductos);
    }

    //elimina un producto del state
    const eliminarProductoPedido = id => {
        // console.log(id);
        const todosProductos = productos.filter(producto => producto.producto !== id);
        guardarProductos(todosProductos);
    }

    //actualizar el total a pagar
    const actualizarTotal = () => {
        //si el arreglo de productos es igual a 0: el total es 0
        if(productos.length === 0){
            guardarTotal(0);
            return;
        }

        //calcular el nuevo total
        let nuevoTotal = 0;

        //recorrer todos los productos y sus cantidades y precios
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));

        //almacenar el total 
        guardarTotal(nuevoTotal);
    }

    return(
        <Fragment>
            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
                <p>Telefono: {cliente.telefono}</p>
            </div>

            <FormBuscarProducto
                buscarProducto = {buscarProducto}
                leerDatosBusqueda = {leerDatosBusqueda}
            />

            <ul className="resumen">
                {productos.map((producto, index) => (
                    <FormCantidadProducto
                        key={producto.producto}
                        producto={producto}
                        restarProductos={restarProductos}
                        aumentarProductos={aumentarProductos}
                        index={index}
                        eliminarProductoPedido={eliminarProductoPedido}
                    />
                ))}
            </ul>
            
            <p className="total">Total a Pagar: <span>$ {total}</span></p>
            
            { total > 0 ? (
                <form>
                    <input type="submit" className="btn btn-verde btn-block" value="Realizar Pedido"/>
                </form>
            ) : null}
            
        </Fragment>
    )
}

export default NuevoPedido;