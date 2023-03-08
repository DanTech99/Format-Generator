
import './App.css'
import HeaderNav from './components/HeaderNav'
import FormDatePdf from './components/FormDatePdf'

function App() {

  return (
    <>
    <HeaderNav />
    <main className='container-fluid p-4 mx-auto'>
        <FormDatePdf />
    </main>
    </>
    
     
  )
}

export default App
