import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Reviews from './pages/Reviews/Reviews'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
