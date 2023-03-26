import React from 'react'


export default function Form({modoEdicion, handleInputChange, datos, campoLleno, saveData, campoLlenoTwo, clearForm }) {
  return (
    <>
   {/* formulario  */}
   <h2>{modoEdicion ? 'editar registro' : 'agregar registro'}</h2>
   <form  className="container w-75 border p-5">
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

     <div className="mb-3 mt-4 flex  justify-content-center">
       <button type="submit" className="btn" onClick={saveData}>{modoEdicion ? 'Actualizar' : 'guardar'}</button>
       <button type="submit" className="btn bg-red-500 hover:bg-red-400" onClick={clearForm}>Limpiar</button>

     </div>
   </form>
   </>
  )
}
