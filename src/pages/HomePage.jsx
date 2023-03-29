import HeaderNav from "../layouts/HeaderNav"
import {Link} from 'react-router-dom'
import logopdf from '../assets/logo-generate-pdf.jfif'
import logoexcel from '../assets/logo-generate-excel.jfif'
import logoexceluser from '../assets/logo-generate-excel-user.jfif'



function HomePage() {
  return (
    <>
    <HeaderNav title={"pagina de inicio"} />
    <main className='container  mx-auto  h-screen'>
        <div className="grid md:grid-cols-2 grid-cols-2 items-center w-full h-full justify-center gap-10">
            <div className="container text-center flex flex-col justify-center items-center">
                <h2 className="text-xl mb-5">Generador Hojas de Control</h2>
                <div className="container bg-white shadow-md w-3/4  rounded-full h-auto flex justify-center items-center overflow-hidden">
                   <Link to="/generatepdf" ><img src={logopdf} alt=""/></Link> 
                </div>
            </div>
            <div className="containe text-center flex flex-col justify-center items-center">
                <h2 className="text-xl mb-5">Generador De Reporte</h2>
                <div className="container bg-white shadow-md w-3/4  rounded-full h-auto flex justify-center items-center overflow-hidden">
                   <Link to="/generatexcel" ><img src={logoexcel} alt="" className="w-auto" /></Link> 
                </div>    
            </div>
            {/* <div className="container">
                <div className="container bg-white shadow-md  rounded-full h-1/2 flex justify-center items-center overflow-hidden">
                    <Link to="/generatepdf" ><img src={logoexceluser} alt="" /></Link>
                </div>
               
            </div> */}
        </div>
    </main>
    </>
  )
}

export default HomePage