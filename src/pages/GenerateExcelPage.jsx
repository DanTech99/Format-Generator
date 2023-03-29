import React from 'react'
import GenerateExcel from '../components/ReportGenerate/GenerateExcel'
import HeaderNav from '../layouts/HeaderNav'

function GenerateExcelPage() {
  return (
    <>
   <HeaderNav title={"Generador de Reportes de Usuario"} />
   <main className='container p-4 mx-auto'>
       <GenerateExcel />
    </main>
   </>
  )
}

export default GenerateExcelPage