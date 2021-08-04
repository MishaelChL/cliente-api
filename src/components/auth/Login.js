import React, {useContext, useState} from 'react';
import Swal from 'sweetalert2';
import clienteAxios from "../../config/axios";
import { withRouter } from 'react-router-dom';

//Context
import { CRMContext } from '../context/CRMContext';

function Login(props){

    //Auth y token
    const [auth, guardarAuth] = useContext(CRMContext);
    // console.log(auth);

    //State con los datos del formulario
    const [credenciales, guardarCredenciales] = useState({});

    //almacenar lo q el usuario escribe en el state
    const leerDatos = e => {
        guardarCredenciales({
            ...credenciales,
            [e.target.name] : e.target.value
        })
    }

    //iniciar sesion en el servidor
    const iniciarSesion = async e => {
        e.preventDefault();

        //autenticar el usuario
        try {
            const respuesta = await clienteAxios.post('/iniciar-sesion', credenciales);
            console.log(respuesta);

            //extraer el token y colocarlo en el localstorage
            const { token } = respuesta.data;
            localStorage.setItem('token', token);

            //colocar en el state el token
            guardarAuth({
                token,
                auth: true
            })

            //alerta
            Swal.fire({
                icon: 'success',
                title: 'Login Correcto',
                text: 'Has iniciado sesión'
            })

            //redireccionar
            props.history.push('/');

        } catch (error) {
            console.log(error);
           Swal.fire({
               icon: 'error',
               title: 'Hubo un error',
               text: error.response.data.mensaje
           }) 
        }
    }

    return(
        <div className="login">
            <h2>Iniciar Sesión</h2>

            <div className="contenedor-formulario">
                <form onSubmit={iniciarSesion}>
                    <div className="campo">
                        <label type="text">Email</label>
                        <input type="email" name="email" placeholder="Email para Iniciar Sesión" required onChange={leerDatos}/>
                    </div>
                    <div className="campo">
                        <label type="text">Password</label>
                        <input type="password" name="password" placeholder="Password para Iniciar Sesión" required onChange={leerDatos}/>
                    </div>
                    <input type="submit" value="Iniciar Sesión" className="btn btn-verde btn-block" />
                </form>
            </div>
        </div>
    );
}

export default withRouter(Login);