import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home/Home"
import Conversor from "./components/Conversor/Conversor"
import JogoDaVida from "./components/JogoDaVida/JogoDaVida"
import Divisor from "./components/Divisor/Divisor"

function App() {
  

  return (
   

      <Routes>
        
        <Route path='/' element={<Home/>}></Route>

        <Route path='/conversor' element={<Conversor/>}></Route>

        <Route path='/jogodavida' element={<JogoDaVida/>}></Route>

        <Route path='/divisor' element={<Divisor/>}></Route>

      </Routes>

     
  )
}

export default App
