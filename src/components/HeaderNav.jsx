import PreselectionDemo from "./SwitchBtnMode"

function HeaderNav() {
  return (
    <header className="container-fluid mx-auto  bg-blue-500 p-2 ">
      <nav className=" container m-auto d-flex p-2 flex justify-between align-items-center ">
        <div className="text-white text-2xl">
          <a href="" className="">Gestion Documental | Generador de hojas de control</a>
        </div>
        <div className="text-white items-center content-center">
            <PreselectionDemo/>
        </div>
      </nav>
        
    </header>
  )
}

export default HeaderNav