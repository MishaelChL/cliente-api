import React, {Fragment, useState, useEffect} from 'react';
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom"; // para redireccionar

function EditarCliente(props) {

    //obtener el ID
    const { id } = props.match.params;
    // console.log(id);

    // cliente = state, guardarCliente = funcion para guardar el state
    const [cliente, datosCliente] = useState({
        nombre: "",
        apellido: "",
        empresa: "",
        email: "",
        telefono: "",
    });

    //useEffect, cuando el componente carga
    useEffect( () => {
        //Query a la API
        async function consultarAPI(){
            const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);
            // console.log(clienteConsulta.data);

            // colocar en el state
            datosCliente(clienteConsulta.data);
        }
        
        consultarAPI();
    }, [id]);

    //leer los datos de los formularios
    const actualizarState = (e) => {
        // console.log([e.target.name] + ":" + e.target.value);

        //Almacenar lo que el usuario escribe en el state
        datosCliente({
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

    //envia una peticion por axios para actualizar el cliente
    const actualizarCliente = (e) => {
        e.preventDefault();
        
        //enviar peticion por axios
        clienteAxios.put(`/clientes/${cliente._id}`, cliente)
        .then(res => {
            // console.log(res);
            //validar si hay errores de mongo
            if(res.data.code === 11000){
                // console.log("Error de duplicado de mongo");
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: "Ese cliente ya está registrado"
                });
            }else{
                // console.log(res.data);
                Swal.fire(
                    'Correcto!',
                    'Se actualizó correctamente',
                    'success'
                );
            }

            //redireccionar
            props.history.push("/");
        })
    }

    return (
        <Fragment>
            <h2>Editar Cliente</h2>

            <form onSubmit={actualizarCliente}>
                <legend>Llena todos los campos</legend>

                {/* onChange, onSubmit, onClick */}
                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" name="nombre" onChange={actualizarState} value={cliente.nombre} />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="apellido" onChange={actualizarState} value={cliente.apellido} />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa Cliente" name="empresa" onChange={actualizarState} value={cliente.empresa} />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Cliente" name="email" onChange={actualizarState} value={cliente.email} />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" placeholder="Teléfono Cliente" name="telefono" onChange={actualizarState} value={cliente.telefono} />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Guardar Cambios" disabled={validarCliente()} /> {/* el parentesis indica que se ejecute inmediatamente sin esperar un evento */}
                </div>

            </form>

        </Fragment>
    );
}

//HOC, Hight order component, es una funcion que toma un componente y retorna un nuevo componente
export default withRouter(EditarCliente);