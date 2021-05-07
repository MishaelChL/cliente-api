import React, {useEffect, useState, Fragment} from 'react';

import clienteAxios from "../../config/axios";

function Clientes() {

    //trabajar con el state
    //clientes = statem guardarClientes = funcion para guardar el state
    const [clientes, guardarClientes] = useState([]);

    //query a la api
    const consultarApi = async () => {
        const clientesConsulta = await clienteAxios.get("/clientes");
        // console.log(clientesConsulta.data);

        //colocar el resultado en el state
        guardarClientes(clientesConsulta.data);
    }

    //use effect es para los hooks, es similar a componentdidmount y willmount
    useEffect( () => {
        consultarApi();
    },[]);

    return(
        <Fragment>
            <h2>Clientes</h2>
            <ul className="listado-clientes">
                {clientes.map(cliente => {
                    console.log(cliente);                    
                })}
            </ul>    
        </Fragment>
    );
}

export default Clientes;