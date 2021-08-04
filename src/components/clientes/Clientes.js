import React, {useEffect, useState, Fragment, useContext} from 'react';

import clienteAxios from "../../config/axios";

import Cliente from "./Cliente";
import {Link, withRouter} from "react-router-dom";

import Spinner from '../layout/Spinner';

//importar el context
import { CRMContext } from '../context/CRMContext';

function Clientes(props) {

    //trabajar con el state
    //clientes = statem guardarClientes = funcion para guardar el state
    const [clientes, guardarClientes] = useState([]);

    //utilizar valores del context
    const [auth, guardarAuth] = useContext(CRMContext);
    // console.log(auth);

    //use effect es para los hooks, es similar a componentdidmount y willmount
    useEffect( () => {
        if(auth.token !== ''){
            const abortController = new AbortController();
            const signal = abortController.signal;
            
            //query a la api
            async function consultarApi(){
                try {
                    const clientesConsulta = await clienteAxios.get("/clientes", { 
                        signal, 
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    });
                    // console.log(clientesConsulta.data);
    
                    //colocar el resultado en el state
                    guardarClientes(clientesConsulta.data);
                } catch (error) {
                    //error con autorizacion
                    if(error.response.status == 500){
                        props.history.push('/iniciar-sesion');
                    }
                }
            }

            consultarApi();

            return function cleanup() {
                abortController.abort();
            };
        }else{
            props.history.push('/iniciar-sesion');
        }
    },[clientes]); //los corchetes, cuando los clientes cambien, vuelve a hacer un llamado a consultar Api, es como un refresh a la misma pagina

    //Si el state está como false
    if(!auth.auth){
        props.history.push('/iniciar-sesion');
    }

    if(!clientes.length) return <Spinner />

    return(
        <Fragment>
            <h2>Clientes</h2>

            <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

            <ul className="listado-clientes">
                {clientes.map(cliente => (
                    // console.log(cliente);
                    <Cliente 
                        key={cliente._id} //react necesita si o si de una key, en este caso seria el id, ya que debe ser unico
                        cliente={cliente}
                    />                    
                ))}
            </ul>    
        </Fragment>
    );
}

export default withRouter(Clientes);