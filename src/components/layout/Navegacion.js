import React from 'react';

const Navegacion = () => { //Esta es una forma de crear funciones, hay otra con functions
    return (
        <aside class="sidebar col-3">
            <h2>Administración</h2>

            <nav class="navegacion">
                <a href="index.html" class="clientes">Clientes</a>
                <a href="productos.html" class="productos">Productos</a>
                <a href="pedidos.html" class="pedidos">Pedidos</a>
            </nav>
        </aside>
    );
}

export default Navegacion;