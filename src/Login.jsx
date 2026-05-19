import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      const res = await axios.post('https://project2-backend-8nz7.onrender.com/login', { username, password })
      localStorage.setItem('token', res.data.token)
      navigate('/admin')
    } catch (err) {
      setError('Wrong username or password!')
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-96 border border-gray-800">
        <h2 className="text-2xl font-bold text-center text-blue-400 mb-6">Admin Login</h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <input
          className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 mb-4 placeholder-gray-500 focus:outline-none focus:border-blue-500"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && document.getElementById('password').focus()}
        />
        <input
          id="password"
          className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 mb-6 placeholder-gray-500 focus:outline-none focus:border-blue-500"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-500 transition"
          onClick={handleSubmit}
        >
          Login
        </button>
        <button
          className="w-full bg-gray-800 text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-700 mt-3 transition"
          onClick={() => navigate('/')}
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default Login