import { useEffect, useState } from "react"
import {saveAs} from 'file-saver';
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from 'pizzip/utils/index.js';

function Form() {

  // mantener el input de date actualizado con la fecha actual
  const [fechaActual, setFechaActual] = useState('');
  useEffect(() => {
    const fecha = new Date().toISOString().substr(0, 10);
    setFechaActual(fecha)
  }, [])

  // estados para manejar los datos del formulario
  const [datos, setDatos] = useState([])


  // funcion manejadora de eventos para optener los datos del formulario
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // obtener los datos del formulario
    const getDate = event.target.elements.date.value;
    const getTipo = event.target.elements.tipo.value;
    const getFirstFlo = event.target.elements.firstFlo.value;
    const getFinishFlo = event.target.elements.finishFlo.value;
    const getObservaciones =  event.target.elements.observaciones.value;

    // crear un objeto con los datos del formulario
    const dataObjet = {getDate, getTipo, getFirstFlo, getFinishFlo, getObservaciones};

    // crear un objeto copiando todos los datos del formulario y volviendole a pasar el objeto
    const newData = [...datos, dataObjet];

    // cambiar el estado del objeto
    setDatos(newData);

    console.log(newData);

    // reiniciar el formulario
    event.target.reset();
  }

  // funcion para generar un documento word con los datos del formulario
  const generateWord = () => {
    // cargar la plantilla de word ya construida


    // objeto para remplazar en la plantilla
    const dataWord = {
      datosTabla: datos.map((dato) => [dato.getDate, dato.getTipo, dato.getFirstFlo, dato.getFinishFlo, dato.getObservaciones]),
    };

    // crear el documento word a partir de la plantilla y los datos
    const doc = new Docxtemplater();
    doc.loadZip(new JSZip(template));
    doc.setData(dataWord);
    doc.render();

    console.log(dataWord)

    // descargar el documento generado
    const blob =  doc.getZip().generate({type: 'blob'});
    saveAs(blob, "miDocumento.docx");
  }


  return (
    <>
      <form  className="container w-75 border p-5" onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="fecha" className="form-label">Fecha de ingreso (dd/mmm/aaaa)</label>
          <input type="date" className="form-control" id="fecha" value={fechaActual} name="date" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Tipo documental</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="eje: Solicitud" name="tipo"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">No. de Folio que inicia</label>
          <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="eje: 01" name="firstFlo" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">No. de Folio que finaliza</label>
          <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="eje: 02" name="finishFlo" />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Observaciones</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="ejem: solicitud cambio de propietario" name="observaciones"></textarea>
        </div>

        <div className="mb-3 mt-4 d-flex justify-content-center">
          <button type="submit" className="btn btn-primary mb-3">Guardar</button>
        </div>

         {/* Mostrar los datos almacenados en el estado */}
      <pre>{JSON.stringify(datos, null, 2)}</pre>
      </form>
    </>
  )
}

export default Form