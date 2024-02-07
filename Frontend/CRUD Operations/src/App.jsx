import Navbar from "./Components/Navbar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Create from "./Components/Create";
import Read from "./Components/Read";
import Update from  "./Components/Update";
function App() {

  return (
    <div>
      <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route  exact path="/" element={<Create/>}></Route>
        <Route  exact path="/all" element={<Read />}></Route>
        <Route  exact path="/:id" element={<Update />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
