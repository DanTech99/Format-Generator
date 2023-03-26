import React, { useState, useEffect } from "react";

function Formulario() {
  const [fechaActual, setFechaActual] = useState(new Date().toISOString().substr(0, 10));

  useEffect(() => {
    setFechaActual(new Date().toISOString().substr(0, 10));
  }, []);

  return (
    <form>
      <label>
        Fecha:
        <input type="date" name="fecha" value={fechaActual} />
      </label>
      <br />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default Formulario;

