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

    }, []);



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
        console.log('uno menos...', i);
    }

    const aumentarProductos = i => {
        console.log('uno mas...', i);
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
                    />
                ))}
            </ul>
            <div className="campo">
                <label>Total:</label>
                <input type="number" name="precio" placeholder="Precio" readonly="readonly" />
            </div>
            <div className="enviar">
                <input type="submit" className="btn btn-azul" value="Agregar Pedido" />
            </div>
            
        </Fragment>
    )
}

export default NuevoPedido;