
import './App.css'
import HomePage from './pages/HomePage';
import GeneratePdfPage from './pages/GeneratePdfPage';
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import GenerateExcelPage from './pages/GenerateExcelPage';



function App() {
   
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/generatepdf' element={<GeneratePdfPage />} />
        <Route path='/generatexcel' element={<GenerateExcelPage />} />
      </Routes>         
   </BrowserRouter> 
  )
}

export default App
