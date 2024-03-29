import { Link } from "react-router-dom"

function HeaderNav({title}) {
  return (
    <header className="container-fluid mx-auto  bg-blue-500 p-2 ">
      <nav className=" container m-auto flex p-2 justify-between align-items-center ">
        <div className="">
          <Link to="/" className="btn bg-green-500">⬅ Inicio</Link>
        </div>
        <div className="text-white text-2xl">
          <a href="" className="">Gestion Documental | {title}</a>
        </div>
        <div className="text-white flex items-center content-center">
            <a href="">Gesccol E.I.C.E</a>
        </div>
      </nav>
        
    </header>
  )
}

export default HeaderNav