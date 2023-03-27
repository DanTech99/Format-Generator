import HeaderNav from "../layouts/HeaderNav"
import GeneratePdf from "../components/formGenerate/GeneratePdf"

export default function GeneratePdfPage() {
  return (
   <>
   <HeaderNav title={"Generador de Hojas de control"} />
   <main className='container p-4 mx-auto'>
        <GeneratePdf />
    </main>
   </>
  )
}
