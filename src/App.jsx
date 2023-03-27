
import './App.css'
import HomePage from './pages/HomePage';
import GeneratePdfPage from './pages/GeneratePdfPage';
import GeneratePdf from './components/formGenerate/GeneratePdf';
import { BrowserRouter, Route,Routes } from 'react-router-dom'


function App() {
   
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/generatepdf' element={<GeneratePdfPage />} />
      </Routes>         
   </BrowserRouter> 
  )
}

export default App
