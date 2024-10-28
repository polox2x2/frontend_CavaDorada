import Login from "./page/login/login"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from "./page/register/register"
import Principal from "./page/Principal/principal"
import MainLayout from "./Layout/MainLayout"
import Tienda from "./page/Tienda/tienda"
import MisionYVision from "./page/misionYvision/misioYvision"
import Reservación from "./page/reservacion/reservacion"
import Nosotros from "./page/nosotros/nosotros"
function App() {
return( 
<BrowserRouter>
               
   <Routes>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                <Route path="" element={<MainLayout />}>
                <Route index element={<Principal />} /> 
                <Route path="/principal" element={<Principal />} />
                <Route path="tienda" element={<Tienda />} />
                <Route path="misionyvision"element={<MisionYVision/>}/>
                <Route path="reservacion" element={<Reservación/>}/>
                <Route path="nosotros" element={<Nosotros/>}/>
                </Route>     
   </Routes> 

</BrowserRouter>
); 
}

export default App