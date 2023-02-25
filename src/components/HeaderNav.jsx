

function HeaderNav() {
  return (
    <header className="container-fluid  bg-success ">
      <nav className=" container-xl d-flex p-2 justify-content-between align-items-center ">
        <div className="title d-flex justify-content-start align-items-center text-light">
          <a href="" className="text-light fs-2 text-decoration-none">Gestion Documental | Generador de hojas de control</a>
        </div>
        <div className=" mode d-flex justify-content-end align-items-center">
            <a href="" className="me-1 btn bg-light">dark</a>
            <a href="" className="me-1 btn bg-light">light</a>
        </div>
      </nav>
        
    </header>
  )
}

export default HeaderNav