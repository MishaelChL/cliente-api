import React, {Fragment, useState} from 'react';
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom"; // para redireccionar

function EditarCliente(props) {

    //obtener el ID
    const { id } = props.match.params;
    // console.log(id);

    // cliente = state, guardarCliente = funcion para guardar el state
    const [cliente, guardarCliente] = useState({
        nombre: "",
        apellido: "",
        empresa: "",
        email: "",
        telefono: "",
    });

    //leer los datos de los formularios
    const actualizarState = (e) => {
        // console.log([e.target.name] + ":" + e.target.value);

        //Almacenar lo que el usuario escribe en el state
        guardarCliente({
            //obtener copia del state actual
            ...cliente, //<- es una copia los 3 puntos
            [e.target.name] : e.target.value
        });
        // console.log(cliente);
    }

    //validar formulario
    const validarCliente = () => {
        //Destructuring
        const {nombre, apellido, email, empresa, telefono} = cliente;

        //revisar que las propiedades del objeto tengan contenido
        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;

        //return true o false
        return valido;
    }

    return (
        <Fragment>
            <h2>Nuevo Cliente</h2>

            <form>
                <legend>Llena todos los campos</legend>

                {/* onChange, onSubmit, onClick */}
                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" name="nombre" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="apellido" onChange={actualizarState} />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa Cliente" name="empresa" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Cliente" name="email" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" placeholder="Teléfono Cliente" name="telefono" onChange={actualizarState} />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Cliente" disabled={validarCliente()} /> {/* el parentesis indica que se ejecute inmediatamente sin esperar un evento */}
                </div>

            </form>

        </Fragment>
    );
}

//HOC, Hight order component, es una funcion que toma un componente y retorna un nuevo componente
export default withRouter(EditarCliente);