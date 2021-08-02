import React from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';

function DetallesPedido(props){
    const {cliente} = props.pedido;
    
    const eliminarPedido = id => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Luego no hay vuelta atrás",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, elimínalo!'          
        }).then((result) => {
            if (result.value) {                 
                // llamado a axios
                clienteAxios.delete(`/pedidos/${id}`).then(res => {
                    Swal.fire('Eliminado!',
                    'El cliente se ha eliminado.',
                    'success'
                )})
            }
        }); 
    }   

    return(
        <li className="pedido">
            <div className="info-pedido">
                <p className="id">ID: {props.pedido._id}</p>
                <p className="nombre">Cliente: {cliente.nombre} {cliente.apellido}</p>

                <div className="articulos-pedido">
                    <p className="productos">Artículos Pedido: </p>
                    <ul>
                        {props.pedido.pedido.map(articulos => (
                            <li key={props.pedido._id+articulos.producto._id}>
                                <p>Nombre: {articulos.producto.nombre}</p>
                                <p>Precio: ${articulos.producto.precio}</p>
                                <p>Cantidad: {articulos.cantidad}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="total">Total: ${props.pedido.total} </p>
            </div>
            <div className="acciones">
                <button type="button" className="btn btn-rojo btn-eliminar" onClick={() => eliminarPedido(props.pedido._id)}>
                    <i className="fas fa-times"></i>
                    Eliminar Pedido
                </button>
            </div>
        </li>
    );
}

export default DetallesPedido;