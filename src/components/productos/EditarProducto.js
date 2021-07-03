import React, {useState, useEffect, Fragment} from 'react';
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

    //archivo = state, guardarArchivo = setState
    const [archivo, guardarArchivo] = useState('');

    useEffect(() => {
        //consultar la api para traer el producto a editar
        const consultarAPI = async () => {
            const productoConsulta = await clienteAxios.get(`/productos/${id}`);
            console.log(productoConsulta.data);
            guardarProducto(productoConsulta.data);
        }
        consultarAPI();
    }, []);

    //edita un producto en la bd
    const editarProducto = async e => {
        e.preventDefault();
        
        //crear un formdata
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        //almacenarlo en BD
        try {
            const res = await clienteAxios.put(`/productos/${id}`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            });
            
            if(res.status === 200){
                Swal.fire(
                    'Editado Correctamente',
                    res.data.mensaje,
                    'success'
                );
            }

            //redireccionar
            props.history.push('/productos')

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo ocurrió mal, intente de nuevo!',
            })
        }
    }

    //leer los datos del formulario
    const leerInformacionProducto = e => {
        guardarProducto({
            //obtener una copia del state y agregar el nuevo
            ...producto,
            [e.target.name]: e.target.value
        })
    }

    //coloca la imagen en el state 
    const leerArchivo = e => {
        guardarArchivo(e.target.files[0]);
    }

    //extraer los valores del state
    const {nombre, precio, imagen} = producto;

    if(!nombre) return <Spinner />

    return(
        <Fragment>
            <h2>Editar Producto</h2>

            <form onSubmit={editarProducto}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Producto" name="nombre" onChange={leerInformacionProducto} defaultValue={nombre} />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" name="precio" min="0.00" step="0.01" placeholder="Precio" onChange={leerInformacionProducto} defaultValue={precio} />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    {
                        imagen ? (
                            <img src={`http://localhost:5000/${imagen}`} alt="imagen" width="300" />  
                        ) : null
                    }
                    <input type="file"  name="imagen" onChange={leerArchivo}  />
                </div>

                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Editar Producto" />
                </div>
            </form>
        </Fragment> 
    );
}

export default EditarProducto;