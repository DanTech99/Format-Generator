
import { useState } from "react"
import TableListDate from "./TableListDate"


export default function FormDatePdf() {

  // estado para recoger los datos del formulario
    const [datos, setDatos] = useState({
      fecha: '',
      tipo: '',
      firstFlo: '',
      finishFlo: '',
      observaciones: '',
    })

    // estado con un array vacio para gurdar los datos del formulario
    const [data, setData] = useState([])

    const handleInputChange = (e) => {
      e.preventDefault()
      const { name, value } = e.target;
      setDatos({
        ...datos,
        [name] : value
      })
    }
    // funcion para ir guardando los datos del formulario en un array de objetos
    const saveData = (e) => {
      e.preventDefault();
      setData(data => [...data, datos])
      setDatos({
      fecha: '',
      tipo: '',
      firstFlo: '',
      finishFlo: '',
      observaciones: '',
      });
    
    }
    // funcion para tomar los datos del formulario y enviarlos al servidor, el cual respondara enviando un pdf con la plantilla y los datos suministrados
    const handleSubmit = async (e) => {
      e.preventDefault()
       const response = await fetch('http://localhost:3000/generatecontrolpdf', {
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
          <form  className="container w-75 border p-5">
            <div className="mb-3 flex flex-col">
              <label htmlFor="fecha" className="form-label">Fecha de ingreso (dd/mmm/aaaa)</label>
              <input type="date" className="form-input px-4 py-3 rounded-lg" id="fecha" value={datos.fecha} name="fecha" onChange={handleInputChange}  />
            </div>
            <div className="mb-3 flex flex-col">
              <label htmlFor="exampleFormControlInput1" className="form-label" >Tipo documental</label>
              <input type="text" className="form-input px-4 py-3 rounded-lg" id="exampleFormControlInput1" placeholder="eje: Solicitud" name="tipo" onChange={handleInputChange} value={datos.tipo} />
            </div>
            <div className="mb-3 flex flex-col">
              <label htmlFor="exampleFormControlInput1" className="form-label">No. de Folio que inicia</label>
              <input type="number" className="form-input px-4 py-3 rounded-lg" id="exampleFormControlInput1" placeholder="eje: 01" name="firstFlo" onChange={handleInputChange} value={datos.firstFlo}/>
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
              <button type="submit" className="btn" onClick={saveData}>guardar</button>
            </div>
          </form>
        </div>
        <div className="container p-3">
          <TableListDate datos={data} />
          <button type="submit" className="btn" onClick={handleSubmit}>Generar pdf</button>
        </div>
        </div>
      </div>
    </>
  )
}
