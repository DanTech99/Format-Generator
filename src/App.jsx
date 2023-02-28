
import './App.css'
import HeaderNav from './components/HeaderNav'
import Form from './components/Form'
import { Test } from './components/Test'

function App() {

  return (
    <>
    <HeaderNav />
    <main className='container-flui p-4 mx-auto'>
      <div className="container">
        {/* <Form /> */}
        <Test />
      </div>
    </main>
    </>
    
     
  )
}

export default App
