
import './App.css'
import HeaderNav from './layouts/HeaderNav';
import GeneratePdf from './components/formGenerate/GeneratePdf';


function App() {
   
  return (
    <>
    <HeaderNav />
    <main className='container p-4 mx-auto'>
        <GeneratePdf />
    </main>
    </>
    
     
  )
}

export default App
