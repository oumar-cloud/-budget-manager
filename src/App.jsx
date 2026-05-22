import "./App.css"

import {
BrowserRouter,
Routes,
Route,
Link
}
from "react-router-dom"

import Home from "./pages/Home"
import Statistiques from "./pages/Statistiques"

function App(){

return(

<BrowserRouter>

<div className="menu">

<Link to="/">

Accueil

</Link>

<Link to="/statistiques">

Statistiques

</Link>

</div>


<Routes>

<Route
path="/"
element={<Home/>}
/>

<Route
path="/statistiques"
element={<Statistiques/>}
/>

</Routes>

</BrowserRouter>

)

}

export default App