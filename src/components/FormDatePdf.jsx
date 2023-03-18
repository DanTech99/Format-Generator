
import { useState } from "react"

export default function FormDatePdf() {
    const [datos, setDatos] = useState({
      fecha: '',
      tipo: '',
      firstFlo: '',
      finishFlo: '',
      observaciones: '',
    })

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

    // const deleteItem = (key) => {
    //   setData(data.filter((dato) => dato.index !== key ))
    // }
    
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
              <button type="submit" className="btn btn-primary mb-3" onClick={saveData}>guardar</button>
            </div>
          </form>
        </div>
        <div className="container p-3">
          <table className="md:table-fixed  border-collapse border border-slate-500">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border border-slate-600 p-2">item</th>
                <th className="border border-slate-600 p-2">fecha</th>
                <th className="border border-slate-600 p-2">Tipo de proceso</th>
                <th className="border border-slate-600 p-2">numero de folio que inicia</th>
                <th className="border border-slate-600 p-2">numero de folio que finaliza</th>
                <th className="border border-slate-600 p-2">observaciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((dato, index) => (
              <tr key={index}>
                <td className="border border-slate-700 p-2">{index}</td>
                <td className="border border-slate-700 p-2">{dato.fecha}</td>
                <td className="border border-slate-700 p-2">{dato.tipo}</td>
                <td className="border border-slate-700 p-2">{dato.firstFlo}</td>  
                <td className="border border-slate-700 p-2">{dato.finishFlo}</td>
                <td className="border border-slate-700 p-2">{dato.observaciones}</td>
                {/* <button type="button" className="btn bg-danger btn-sm " onClick={() => deleteItem(index)}>Eliminar</button> */}
              </tr>
                ))}
            </tbody>
          </table>
          <button type="submit" className="btn btn-primary btn-sm" onClick={handleSubmit}>Generar pdf</button>
        </div>
        </div>
      </div>
    </>
  )
}
