
import React from 'react'



function TableListData({datos, eliminarRegistro, editar, handleSubmit}) {

  return (
    <>
    <table className="md:table-fixed  border-collapse border border-slate-500 text-xs">
        <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border border-slate-600 p-2">item</th>
              <th className="border border-slate-600 p-2">fecha de apertura hoja</th>
              <th className="border border-slate-600 p-2">fecha de documento</th>
              <th className="border border-slate-600 p-2">Tipo de proceso</th>
              <th className="border border-slate-600 p-2">numero de folio que inicia</th>
              <th className="border border-slate-600 p-2">numero de folio que finaliza</th>
              <th className="border border-slate-600 p-2">observaciones</th>
              <th className="border border-slate-600 p-2">Acciones</th>

            </tr>
        </thead>
        <tbody>
            {
               datos.length === 0 ? (
               <tr>
                  <td colSpan={8} className="p-3" >no hay registros</td>
               </tr>
              ) :
            (datos.map((dato) => (
            <tr key={dato.id}>
              <td className="border border-slate-700 p-2">{dato.id}</td>
              <td className="border border-slate-700 p-2">{dato.fechaInit}</td>
              <td className="border border-slate-700 p-2">{dato.fecha}</td>
              <td className="border border-slate-700 p-2">{dato.tipo}</td>
              <td className="border border-slate-700 p-2">{dato.firstFlo}</td>  
              <td className="border border-slate-700 p-2">{dato.finishFlo}</td>
              <td className="border border-slate-700 p-2">{dato.observaciones}</td>
              <td className="border p-2 flex">
                <button className='btn bg-red-500' onClick={() => eliminarRegistro(dato.id)}>eliminar</button>
                <button className='btn' onClick={() => editar(dato.id)}>editar</button>
              </td>
              
            </tr>
            )))}
        </tbody>
    </table>
    <button type="submit" className="btn " onClick={handleSubmit}>Generar pdf</button>
    </>
  )
}

export default TableListData