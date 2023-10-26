
import TableListDate from "./TableListData"
import { useState, useEffect } from "react"
import Form from "./Form";

export default function GeneratePdf() {

  /**
   * la ultima ID asignada
   * @type {number}
   */
  const [lastId, setLastId] = useState(0);
  const [initialLastId, setInitialLastId] = useState(0);

  /**
   * hooks para los datos guardados en el array de objetos que se enviara al servidor
   * @type {Array}
   */
  const [data, setData] = useState([])

  /**
   * indica si el campo de fecha inicial está lleno
   * @type {boolean}
   */
  const [campoLleno, setCampoLleno] = useState(false);

  /**
   * indica si el segundo campo de radicado está lleno
   * @type {boolean}
   */
  const [campoLlenoTwo, setCampoLlenoTwo] = useState(false);

  /**
   * indica si el modo de edicion esta activado
   * @type {boolean}
   */
  const [modoEdicion, setModoEdicion] = useState(false);
 
  /**
   * hace referecia a los campos del formulario
   * @type {object}
   */
  const [datos, setDatos] = useState({
      radicado: '',
      fecha: '',
      tipo: '',
      firstFlo: '',
      finishFlo: '',
      observaciones: '',
  })


  /**
   * ---------------------------------------------------
   * maneja el cambio de los valores de entrada del formulario
   * @function handleInputChange
   * @param {object} e - evento de cambio
   * @param {string} e.target.name - el nombre del campo de entrada modificado
   * @param {string} e.target.value - el valor del campo de entrada modificado
   * @returns {void}
   * ---------------------------------------------------
   */

  const handleInputChange = (e) => {

    e.preventDefault()

    const { name, value } = e.target;

    if (name === 'fechaInit' && campoLleno) {
      return; // Si el campo ya está lleno, no permitir cambios
    }
    if (name === 'radicado' && value.length >= 16) {
    setCampoLlenoTwo(true)
    return
    }
    setDatos({
      ...datos,
      [name] : value,
    })

    if (name === 'fechaInit') {
      setCampoLleno(true); // Marcar el campo como lleno cuando se introduce un valor
   }

  }
    
  /**
   * ---------------------------------------------------
   * guardar los datos en el array de objetos
   * @function saveData
   * @param {Object} e - evento de guardar
   * @returns {void}
   * ---------------------------------------------------
   */
  const saveData = (e) => {
    e.preventDefault();

    if (modoEdicion) {
      console.log(modoEdicion)
      const newData = {
        id: datos.id,
        fechaInit: datos.fechaInit,
        radicado: datos.radicado,
        fecha: datos.fecha,
        tipo: datos.tipo,
        firstFlo: datos.firstFlo,
        finishFlo: datos.finishFlo,
        observaciones: datos.observaciones,
      };

    const newDataArray = data.map((item) => item.id === datos.id ? newData : item)

    setData(newDataArray)
    console.log(newDataArray)
    setModoEdicion(false)
    }else {

  
    // Incrementar el valor del último ID utilizado y asignarlo como el ID del nuevo objeto
    const newId = lastId + 1;

    // objeto el cual crea una copia del objeto datos y le adiciona el nuevo dato que asigna un id.
    const newData = {
      ...datos,
      id: newId,
    }
    setLastId(newId)
    
    // actualizar el array data para guardar el nuevo objeto
    setData(data => [...data, newData,])
    console.log(data)
  }
  // limpiar los campos del formulario
    setDatos({
    radicado : '',
    fecha: '',
    tipo: '',
    firstFlo: '',
    finishFlo: '',
    observaciones: '',
    });
  
  }

  /**
   * ---------------------------------------------------
   * resetear el objeto que actualiza los datos del formulario
   * @function clearForm
   * @param {Object} e - evento de cambio
   * @returns {void}
   * ---------------------------------------------------
   */
  const clearForm = (e) => {
  e.preventDefault()
  setDatos({
    radicado : '',
    fecha: '',
    tipo: '',
    firstFlo: '',
    finishFlo: '',
    observaciones: '',
    });
    setCampoLlenoTwo(false)
  }
     
  /**
   * ---------------------------------------------------
   * elimina un registro de la lista de datos en funcion de su id
   * @function eliminarRegistro
   * @param {number} id - el id del registro quue se desea eliminar
   * @returns {void}
   * ---------------------------------------------------
   */
  const eliminarRegistro = id => {
    const filtro = data.filter(item => item.id !== id)
    setData(filtro)
    
  }

  /**
   * ---------------------------------------------------
   * busca un registro en la lista de datos y los establece como datos de edicion en el formulario correspondiente
   * @function editarRegistro
   * @param {number} id el id del registro que se desea editar
   * @returns {void}
   * ---------------------------------------------------
   */
  const editarRegistro = (id) => {
    const registro = data.find((item) => item.id === id)
    setDatos(registro);
    // Cambiar el estado modoEdicion a true
    setModoEdicion(true);
  }

  const limpiarDatos = () => {
    setData([]);
    setLastId(initialLastId);
  };
 

  /**
   * ---------------------------------------------------
   * @async
   * @function handleSubmit
   * @param {Event} e - evento de envio del formulario
   * @returns {void}
   * ---------------------------------------------------
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
     const response = await fetch('https://server-generate-pdf-production.up.railway.app/generatehistoryclinic', {
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
          <Form modoEdicion={modoEdicion} handleInputChange={handleInputChange} datos={datos} campoLleno={campoLleno} saveData={saveData} campoLlenoTwo={campoLlenoTwo} clearForm={clearForm} />
        </div>
        
        <div className="container p-3">
          <TableListDate datos={data} eliminarRegistro={eliminarRegistro} editar={editarRegistro} handleSubmit={handleSubmit} limpiarDatos={limpiarDatos} />
        </div>
      </div>
    </div>
    </>
  )
}
