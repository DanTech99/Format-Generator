import { useEffect, useState } from "react"
import {saveAs} from 'file-saver';
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from 'pizzip/utils/index.js';


function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback)
}
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

    const formData = new FormData(event.target);
    // obtener los datos del formulario
    const getDate = formData.get('date');
    const getTipo = formData.get('tipo');
    const getFirstFlo = formData.get('firstFlo');
    const getFinishFlo = formData.get('finishFlo');
    const getObservaciones =  formData.get('observaciones');

    // crear un objeto con los datos del formulario
    const data = {getDate, getTipo, getFirstFlo, getFinishFlo, getObservaciones};

    // cambiar el estado del objeto
    setDatos(prevData => [...prevData, data]);

    // reiniciar el formulario
    e.target.value = null
  }

  // funcion para generar un documento word con los datos del formulario
  const generateWord = () => {
    // cargar la plantilla de word ya construida
    try {
      loadFile('http://localhost:3001/file',
    function (error, content) {
      if (error) {
        throw error;
      }

      var zip = new PizZip(content)
      var doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      }); 

    // objeto para remplazar en la plantilla
    const dataWord = {
      datosTabla: datos.map((dato) => [dato.getDate, dato.getTipo, dato.getFirstFlo, dato.getFinishFlo, dato.getObservaciones]),
    };

      // doc.setData(dataWord);
      doc.render(dataWord);
      var blob =  doc.getZip().generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });

      // guardar y descargar el documento generado
      saveAs(blob, "output.docx");
    });  
    } catch (error) {
      console.error('este es el error' + error)
    }
    
  };


  return (
    <>
      <form  className="container w-75 border p-5" onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="fecha" className="form-label">Fecha de ingreso (dd/mmm/aaaa)</label>
          <input type="date" className="form-control" id="fecha" defaultValue={fechaActual} name="date" />
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
      <button type="button" className="btn btn-secondary mb-3 ms-2" onClick={generateWord}>Generate file.docx</button>
      </>

  )
}

export default Form