import React, {useEffect} from 'react';

import clienteAxios from "../../config/axios";

function Clientes() {

    //use effect es para los hooks, es similar a componentdidmount y willmount
    useEffect( () => {

        //query a la api
        const consultarApi = async () => {
            const clientesConsulta = await clienteAxios.get("/clientes");
            console.log(clientesConsulta);
        }

        consultarApi();
    },[]);

    return(
        <h2>Clientes</h2>
    );
}

export default Clientes;