
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Shared/Navbar/Navbar'
import Footer from './Shared/Footer/Footer'

function App() {

  return (
    <div className='max-w-6xl mx-auto flex flex-col min-h-screen'>
      <div className='flex-grow'>
        <Navbar></Navbar>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default App
