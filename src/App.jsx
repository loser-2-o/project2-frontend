import { Routes, Route } from 'react-router-dom'
import Submit from './Submit'
import Login from './Login'
import Admin from './Admin'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Submit />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App