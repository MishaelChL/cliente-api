import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import {withRouter} from 'react-router-dom';
import Spinner from '../layout/Spinner';

function EditarProducto(props) {

    //obtener el id del producto
    const {id} = props.match.params;

    //producto = state, y funcion  para actualizar
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: '',
        imagen: ''
    })

    useEffect(() => {
        //consultar la api para traer el producto a editar
        const consultarAPI = async () => {
            const productoConsulta = await clienteAxios.get(`/productos/${id}`);
            console.log(productoConsulta.data);
            guardarProducto(productoConsulta.data);
        }
        consultarAPI();
    }, []);

    return(
        <h2>EditarProductos</h2>
    );
}

export default EditarProducto;