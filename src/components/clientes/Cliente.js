import React from 'react';
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios"

function Cliente ({cliente}) {
    //console.log(props); //sirve para ver que valor estas pasando desde clientes, linea 34 o tambien se puede usar directamente {cliente} en vez de props
    // console.log(cliente);

    const { _id, nombre, apellido, empresa, email, telefono } = cliente;

    //eliminar cliente
    const eliminarCliente = idCliente => {
        // console.log("eliminando..." , idCliente);

        Swal.fire({
            title: 'Estas seguro?',
            text: "Un cliente eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {

                //llamado a axios
                clienteAxios.delete(`/clientes/${idCliente}`)
                .then(res => {
                    // console.log(res);
                    Swal.fire(
                        'Eliminado!',
                        res.data.mensaje,
                        'success'
                    )
                });
            }
        });
    }
    
    return (
        <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">{nombre} {apellido}</p>
                <p className="empresa">{empresa}</p>
                <p>{email}</p>
                <p>Tel: {telefono}</p>
            </div>
            <div className="acciones">
                <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Cliente
                </Link>
                <button type="button" className="btn btn-rojo btn-eliminar" onClick={() => eliminarCliente(_id)}>
                    <i className="fas fa-times"></i>
                    Eliminar Cliente
                </button>
            </div>
        </li>
    );
}

export default Cliente;