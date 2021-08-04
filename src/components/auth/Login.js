import React from 'react';

function Login(){

    const leerDatos = () => {
        
    }

    return(
        <div className="login">
            <h2>Iniciar Sesión</h2>

            <div className="contenedor-formulario">
                <form>
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

export default Login;