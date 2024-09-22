
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Shared/Navbar/Navbar'
import Footer from './Shared/Footer/Footer'

function App() {

  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default App
