import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Restaurant from "./pages/Restaurant"
import Contact from "./pages/Contact"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/contact" element={<Contact />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
