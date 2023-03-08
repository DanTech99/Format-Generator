
import { useState, useEffect } from "react"

export default function FormDatePdf() {

      // mantener el input de date actualizado con la fecha actual
      const [fechaActual, setFechaActual] = useState('');
      useEffect(() => {
        const fecha = new Date().toISOString().substr(0, 10);
        setFechaActual(fecha)
      }, [])


    const [date, setDate] = useState('');
    const [tipo, setTipo] = useState('');
    const [firstFlo, setFirstFlo] = useState('');
    const [finishFlo, setFinishFlo] = useState('');
    const [observaciones, setObservaciones] = useState('');

    const datos = {date, tipo, firstFlo, finishFlo, observaciones};

    const handleSubmit = async (e) => {
      e.preventDefault();

  
       const response = await fetch('http://localhost:3000/formulario', {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(datos)
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
     

      e.target.value = null;
    }
    
  return (
    <>
    <div class="container-fluid text-center">
      <div class="row">
        <div class="col-6">
          <form  className="container w-75 border p-5" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fecha" className="form-label">Fecha de ingreso (dd/mmm/aaaa)</label>
              <input type="date" className="form-control" id="fecha" defaultValue={fechaActual} name="date" onChange={event => setDate(event.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label" >Tipo documental</label>
              <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="eje: Solicitud" name="tipo" onChange={event => setTipo(event.target.value)} defaultValue={tipo} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">No. de Folio que inicia</label>
              <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="eje: 01" name="firstFlo" onChange={event => setFirstFlo(event.target.value)} defaultValue={firstFlo}/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">No. de Folio que finaliza</label>
              <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="eje: 02" name="finishFlo" onChange={event => setFinishFlo(event.target.value)} defaultValue={finishFlo}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Observaciones</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="ejem: solicitud cambio de propietario" name="observaciones" onChange={event => setObservaciones(event.target.value)} defaultValue={observaciones}></textarea>
            </div>

            <div className="mb-3 mt-4 d-flex justify-content-center">
              <button type="submit" className="btn btn-primary mb-3">Guardar</button>
            </div>

            {/* Mostrar los datos almacenados en el estado */}
          {/* <pre>{JSON.stringify(datos, null, 2)}</pre>  */}
          </form>
        </div>
        <div class="col-6">
        <div class="table-responsive">
        <table className="table">
          <thead>
            <tr>
            
              <th scope="col">fecha</th>
              <th scope="col">Tipo de proceso</th>
              <th scope="col">numero de folio que inicia</th>
              <th scope="col">numero de folio que finaliza</th>
              <th scope="col">observaciones</th>x
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{datos.date}</td>
              <td>{datos.tipo}</td>
              <td>{datos.firstFlo}</td>
              <td>{datos.finishFlo}</td>
              <td>{datos.observaciones}</td>
            </tr>
          </tbody>
        </table>
        </div>
        </div>
      </div>
    </div>
  
    </>
  )
}
