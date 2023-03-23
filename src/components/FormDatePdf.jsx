
import TableListDate from "./TableListDate"


export default function FormDatePdf({handleInputChange, datos, campoLleno, campoLlenoTwo, modoEdicion, saveData, eliminarRegistro, editarRegistro, data}) {

  // funcion para tomar los datos del formulario y enviarlos al servidor, el cual respondara enviando un pdf con la plantilla y los datos suministrados
  const handleSubmit = async (e) => {
    e.preventDefault()
     const response = await fetch('http://localhost:3001/generatecontrolpdf', {
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify(data)
     })
     if (response.ok) {
      // descargar el pdf
      const blob =  await response.blob();
      const url =  window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'hoja-de-control.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link)
     }
  }

  
  return (
    <>
    <div className="container text-center">
      <div className="grid md:grid-cols-2 grid-cols-1">
        <div className="container">
          {/* formulario  */}
          <h2>{modoEdicion ? 'editar registro' : 'agregar registro'}</h2>
          <form  className="container w-75 border p-5">
            <div className="mb-3 flex flex-col">
              <label htmlFor="fecha" className="form-label">Fecha de apertura hoja de control (dd/mmm/aaaa)</label>
              <small>en este campo se colocar la fecha en que se diligencia la hoja de control</small>
              <input type="date" className={campoLleno ? "read-only:bg-gray-400 form-input px-4 py-3 rounded-lg": "form-input px-4 py-3 rounded-lg"} id="fechaInit" value={datos.fechaInit} name="fechaInit" onChange={handleInputChange} disabled={campoLleno}  />
            </div>
            <div className="mb-3 flex flex-col">
              <label htmlFor="radicado" className="form-label">Numero de Radicado</label>
              <input type="number" className={campoLlenoTwo ? "read-only:bg-gray-400 form-input px-4 py-3 rounded-lg": "form-input px-4 py-3 rounded-lg"} id="fechaInit" value={datos.radicado} name="radicado" onChange={handleInputChange} disabled={campoLlenoTwo}  />
            </div>
            <div className="mb-3 flex flex-col">
              <label htmlFor="fecha" className="form-label">Fecha de ingreso (dd/mmm/aaaa)</label>
              <input type="date" className="form-input px-4 py-3 rounded-lg" id="fecha" value={datos.fecha} name="fecha" onChange={handleInputChange}  />
            </div>
            <div className="mb-3 flex flex-col">
              <label htmlFor="exampleFormControlInput1" className="form-label" >Nombre Folio</label>
              <input type="text" className="form-input px-4 py-3 rounded-lg" id="exampleFormControlInput1" placeholder="eje: Solicitud" name="tipo" onChange={handleInputChange} value={datos.tipo} />
            </div>
            <div className="mb-3 flex flex-col">
              <label htmlFor="exampleFormControlInput1" className="form-label">No. de Folio que inicia</label>
              <input type="number" className="form-input px-4 py-3 rounded-lg" id="exampleFormControlInput2" placeholder="eje: 01" name="firstFlo" onChange={handleInputChange} value={datos.firstFlo}/>
            </div>
            <div className="mb-3 flex flex-col">
              <label htmlFor="exampleFormControlInput1" className="form-label">No. de Folio que finaliza</label>
              <input type="number" className="form-input px-4 py-3 rounded-lg" id="exampleFormControlInput1" placeholder="eje: 02" name="finishFlo" onChange={handleInputChange} value={datos.finishFlo}/>
            </div>
            <div className="mb-3 flex flex-col">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Observaciones</label>
                <textarea className="form-input px-4 py-3 rounded-lg" id="exampleFormControlTextarea1" rows="3" placeholder="ejem: solicitud cambio de propietario" name="observaciones" onChange={handleInputChange} value={datos.observaciones}></textarea>
            </div>

            <div className="mb-3 mt-4 d-flex justify-content-center">
              <button type="submit" className="btn" onClick={saveData}>{modoEdicion ? 'editar' : 'guardar'}</button>
            </div>
          </form>
        </div>
        <div className="container p-3">
    
          <TableListDate datos={data} eliminarRegistro={eliminarRegistro} editar={editarRegistro} handleSubmit={handleSubmit} />
        </div>
      </div>
    </div>
    </>
  )
}
