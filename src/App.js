import React, {Fragment} from 'react';

/* Layout */
import Header from "./components/layout/Header";
import Navegacion from "./components/layout/Navegacion";

function App() {
  return (
    <Fragment>
      <Header/>
      <div class="grid contenedor contenido-principal">
        <Navegacion/>
        <main class="caja-contenido col-9">
          {/* TODO : A los diferentes componentes */}
        </main>
      </div>
    </Fragment>
  );
}

export default App;