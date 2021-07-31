import React, {useState, useEffect, Fragment} from 'react';
import clienteAxios from '../../config/axios';
import FormBuscarProducto from './FormBuscarProducto';
import Swal from 'sweetalert2';

function NuevoPedido(props){

    //extraer id del cliente para poder hacer la consulta a la bd, para saber que cliente es...
    const { id } = props.match.params;  //1

    //state
    const [cliente, guardarCliente] = useState({}); //3
    const [busqueda, guardarBusqueda] = useState('');

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
                <li>
                    <div className="texto-producto">
                        <p className="nombre">Macbook Pro</p>
                        <p className="precio">$250</p>
                    </div>
                    <div className="acciones">
                        <div className="contenedor-cantidad">
                            <i className="fas fa-minus"></i>
                            <input type="text" name="cantidad" />
                            <i className="fas fa-plus"></i>
                        </div>
                        <button type="button" className="btn btn-rojo">
                            <i className="fas fa-minus-circle"></i>
                                Eliminar Producto
                        </button>
                    </div>
                </li>
                <li>
                    <div className="texto-producto">
                        <p className="nombre">Macbook Pro</p>
                        <p className="precio">$250</p>
                    </div>
                    <div className="acciones">
                        <div className="contenedor-cantidad">
                            <i className="fas fa-minus"></i>
                            <input type="text" name="cantidad" />
                            <i className="fas fa-plus"></i>
                        </div>
                        <button type="button" className="btn btn-rojo">
                            <i className="fas fa-minus-circle"></i>
                                Eliminar Producto
                        </button>
                    </div>
                </li>
                <li>
                    <div className="texto-producto">
                        <p className="nombre">Macbook Pro</p>
                        <p className="precio">$250</p>
                    </div>
                    <div className="acciones">
                        <div className="contenedor-cantidad">
                            <i className="fas fa-minus"></i>
                            <input type="text" name="cantidad" />
                            <i className="fas fa-plus"></i>
                        </div>
                        <button type="button" className="btn btn-rojo">
                            <i className="fas fa-minus-circle"></i>
                                Eliminar Producto
                        </button>
                    </div>
                </li>
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