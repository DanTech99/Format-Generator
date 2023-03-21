import React from 'react'

function TableListDate({datos}) {
  return (
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
            </tr>
        </thead>
        <tbody>
            {datos.map((dato, index) => (
            <tr key={index}>
              <td className="border border-slate-700 p-2">{index}</td>
              <td className="border border-slate-700 p-2">{dato.fechaInit}</td>
              <td className="border border-slate-700 p-2">{dato.fecha}</td>
              <td className="border border-slate-700 p-2">{dato.tipo}</td>
              <td className="border border-slate-700 p-2">{dato.firstFlo}</td>  
              <td className="border border-slate-700 p-2">{dato.finishFlo}</td>
              <td className="border border-slate-700 p-2">{dato.observaciones}</td>
            </tr>
            ))}
        </tbody>
    </table>
  )
}

export default TableListDate