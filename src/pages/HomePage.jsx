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
        <div className="grid md:grid-cols-3 grid-cols-2 items-center w-full h-full justify-center gap-10">
            <div className="container bg-white shadow-md  rounded-full h-1/2 flex justify-center items-center overflow-hidden">
               <Link to="/generatepdf" ><img src={logopdf} alt=""  /></Link>
            </div>
            <div className="container bg-white shadow-md  rounded-full h-1/2 flex justify-center items-center overflow-hidden">
                <Link to="/generatepdf" ><img src={logoexcel} alt="" /></Link>
            </div>
            <div className="container bg-white shadow-md  rounded-full h-1/2 flex justify-center items-center overflow-hidden">
                <Link to="/generatepdf" ><img src={logoexceluser} alt="" /></Link>
            </div>
        </div>
    </main>
    </>
  )
}

export default HomePage