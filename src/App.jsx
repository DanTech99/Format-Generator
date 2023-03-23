
import './App.css'
import { useState, useEffect } from "react"
import HeaderNav from './components/HeaderNav'
import FormDatePdf from './components/FormDatePdf'
import TaskCrud from './components/TaskCrud'


function App() {

    /** estado para asignar  */
    const [lastId, setLastId] = useState(0);
    // estado con un array vacio para gurdar los datos del formulario
    const [data, setData] = useState([])
    const [campoLleno, setCampoLleno] = useState(false);
    const [campoLlenoTwo, setCampoLlenoTwo] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false)

     // estado para recoger los datos del formulario
    const [datos, setDatos] = useState({
        fechaInit:'',
        radicado: '',
        fecha: '',
        tipo: '',
        firstFlo: '',
        finishFlo: '',
        observaciones: '',
    })
 
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
      
       // funcion para ir guardando los datos del formulario en un array de objetos
       const saveData = (e) => {
         e.preventDefault();
   
         if (modoEdicion) {
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
           setModoEdicion(false)
         }else {
        
   
          // Incrementar el valor del último ID utilizado y asignarlo como el ID del nuevo objeto
         const newId = lastId + 1;
   
         const newData = {
           ...datos,
           id: newId,
         }
         setLastId(newId)
   
         console.log(data)
         
         setData(data => [...data, newData,])
       }
        /*  let arrayJson = JSON.stringify(data)
         localStorage.setItem("myarray", arrayJson); */
         // reiniciar el formulario
         setDatos({
         fechaInit: '',
         radicado : '',
         fecha: '',
         tipo: '',
         firstFlo: '',
         finishFlo: '',
         observaciones: '',
         });
       
       }
       
       // eliminar registros
       const eliminarRegistro = id => {
         const filtro = data.filter(item => item.id !== id)
         setData(filtro)
       }
   
       // editar registros
   
       const editarRegistro = (id) => {
         const registro = data.find((item) => item.id === id)
   
         setDatos({
           fechaInit: registro.fechaInit,
           radicado: registro.radicado,
           fecha: registro.fecha,
           tipo: registro.tipo,
           firstFlo: registro.firstFlo,
           finishFlo: registro.finishFlo,
           observaciones: registro.observaciones,
         });
   
           // Cambiar el estado modoEdicion a true
       setModoEdicion(true);
       }
   
   
     
       
  return (
    <>
    <HeaderNav />
    <main className='container p-4 mx-auto'>
        <FormDatePdf handleInputChange={handleInputChange} datos={datos} campoLleno={campoLleno} campoLlenoTwo={campoLlenoTwo} saveData={saveData} modoEdicion={modoEdicion} eliminarRegistro={eliminarRegistro} editarRegistro={editarRegistro} data={data}  />
    </main>
    </>
    
     
  )
}

export default App
